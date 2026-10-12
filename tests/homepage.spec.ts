import { test, expect } from "@playwright/test";

test("homepage renders local assets without console errors or overflow", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Selangkah/ })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Yang baru. Yang berarti." }),
  ).toBeVisible();
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await expect
    .poll(() =>
      page.evaluate(() =>
        Array.from(
          document.querySelectorAll<HTMLImageElement>(".brand img, .hero img"),
        ).every((img) => img.complete && img.naturalWidth > 0),
      ),
    )
    .toBe(true);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-homepage.png`,
    fullPage: true,
  });
});

test("theme choice persists across reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Aktifkan tema gelap" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Aktifkan tema terang" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("hero controls change the article and open the correct detail", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Artikel utama berikutnya" }).click();
  await expect(page.locator(".hero-copy h2")).toHaveText(
    "Bukan hanya lebih cepat. AI mulai berpikir lebih jauh.",
  );
  await page.getByRole("button", { name: "Baca Selengkapnya" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading")).toHaveText(
    "Bukan hanya lebih cepat. AI mulai berpikir lebih jauh.",
  );
  await expect(
    dialog.getByRole("link", { name: "Jelajahi sumber asli" }),
  ).toHaveAttribute(
    "href",
    "https://platform.openai.com/docs/guides/reasoning",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Baca Selengkapnya" }),
  ).toBeFocused();
});

test("search, empty state, topic filters, and reset work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Buka pencarian" }).click();
  await page.getByRole("textbox", { name: "Cari konten AI" }).fill("neural");
  await page.getByRole("button", { name: "Cari", exact: true }).click();
  await expect(page.locator(".news-grid .content-card")).toHaveCount(1);
  await expect(page.locator(".news-grid")).toContainText(
    "Apa yang sebenarnya dipelajari neural network?",
  );
  await page
    .getByRole("textbox", { name: "Cari konten AI" })
    .fill("tidak-ada-konten-ini");
  await expect(
    page.getByRole("heading", { name: "Belum ada yang cocok." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Jelajahi semua konten", exact: true })
    .click();
  await page.getByRole("button", { name: "Regulasi", exact: true }).click();
  await expect(page.locator(".news-grid .content-card")).toHaveCount(1);
  await expect(page.locator(".news-grid")).toContainText(
    "Mengenal tata kelola AI",
  );
  await page.getByRole("button", { name: "Reset filter" }).click();
  await expect(page.locator(".news-grid .content-card")).toHaveCount(4);
});

test("bookmarks persist, collection filters, and removal updates the empty state", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", {
      name: "Simpan: Bukan hanya lebih cepat. AI mulai berpikir lebih jauh.",
      exact: true,
    })
    .click();
  await page.reload();
  await expect(
    page.getByRole("button", {
      name: "Hapus simpanan: Bukan hanya lebih cepat. AI mulai berpikir lebih jauh.",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.locator(".collection-button").click();
  await expect(
    page.getByRole("heading", { name: "Ruang simpan kamu." }),
  ).toBeVisible();
  await expect(page.locator(".news-grid .content-card")).toHaveCount(1);
  await page
    .getByRole("button", {
      name: "Hapus simpanan: Bukan hanya lebih cepat. AI mulai berpikir lebih jauh.",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("heading", { name: "Ide bagus layak disimpan." }),
  ).toBeVisible();
});

test("navigation reaches sections and learning content opens", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile")
    await page.getByRole("button", { name: "Buka menu" }).click();
  const nav = page.getByRole("navigation", {
    name:
      testInfo.project.name === "mobile" ? "Navigasi mobile" : "Navigasi utama",
  });
  await nav.getByRole("button", { name: "Belajar AI", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Rasa ingin tahu, jadi bisa." }),
  ).toBeInViewport();
  if (testInfo.project.name === "mobile")
    await expect(
      page.getByRole("navigation", { name: "Navigasi mobile" }),
    ).not.toBeVisible();
  await page.locator(".learn-card").first().click();
  await expect(page.getByRole("dialog").getByRole("heading")).toHaveText(
    "Mulai dari sini: kenalan dengan AI.",
  );
  await page.getByRole("button", { name: "Tutup detail" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("video is loaded only after a deliberate play action", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", {
      name: "Buka Satu jam untuk memahami dunia large language model.",
      exact: true,
    })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Tonton di YouTube" }),
  ).toHaveAttribute("href", "https://www.youtube.com/watch?v=zjkBMFhNj_g");
  await page.route("https://www.youtube-nocookie.com/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<p>External video placeholder for offline test</p>",
    }),
  );
  await page.getByRole("button", { name: "Putar video" }).click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    "https://www.youtube-nocookie.com/embed/zjkBMFhNj_g?autoplay=1",
  );
});

test("privacy controls clear saved content and reset theme", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Simpan artikel pilihan", exact: true })
    .click();
  await page.getByRole("button", { name: "Aktifkan tema gelap" }).click();
  await page.getByRole("button", { name: "Privasi", exact: true }).click();
  await page
    .getByRole("button", { name: "Hapus simpanan & reset tema" })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator(".count-badge")).toHaveText("0");
  await page.getByRole("button", { name: "Tutup detail" }).click();
  await page.reload();
  await expect(page.locator(".count-badge")).toHaveText("0");
});
