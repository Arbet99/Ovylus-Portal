import { test, expect } from "@playwright/test";

test("homepage renders local assets without console errors or overflow", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /AI agent bisa/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Artikel seputar AI" }),
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
  await expect(page.locator(".hero-copy h1")).toContainText(
    /Bagaimana AI.*menyelesaikan soal/,
  );
  await page.getByRole("button", { name: "Baca Selengkapnya" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading")).toHaveText(
    "Bagaimana model AI menyelesaikan soal yang rumit?",
  );
  await expect(
    dialog.getByRole("link", { name: "Baca sumber asli" }),
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
    page.getByRole("heading", { name: "Tidak ada hasil yang cocok" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Jelajahi semua konten", exact: true })
    .click();
  await page.getByRole("button", { name: "Regulasi", exact: true }).click();
  await expect(page.locator(".news-grid .content-card")).toHaveCount(1);
  await expect(page.locator(".news-grid")).toContainText(
    "Siapa yang bertanggung jawab atas penggunaan AI?",
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
      name: "Simpan: Bagaimana model AI menyelesaikan soal yang rumit?",
      exact: true,
    })
    .click();
  await page.reload();
  await expect(
    page.getByRole("button", {
      name: "Hapus simpanan: Bagaimana model AI menyelesaikan soal yang rumit?",
      exact: true,
    }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.locator(".collection-button").click();
  await expect(
    page.getByRole("heading", { name: "Artikel yang kamu simpan" }),
  ).toBeVisible();
  await expect(page.locator(".news-grid .content-card")).toHaveCount(1);
  await page
    .getByRole("button", {
      name: "Hapus simpanan: Bagaimana model AI menyelesaikan soal yang rumit?",
      exact: true,
    })
    .click();
  await expect(
    page.getByRole("heading", { name: "Belum ada artikel tersimpan" }),
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
    page.getByRole("heading", { name: /Mulai dari dasar/ }),
  ).toBeInViewport();
  if (testInfo.project.name === "mobile")
    await expect(
      page.getByRole("navigation", { name: "Navigasi mobile" }),
    ).not.toBeVisible();
  await page.locator(".learn-card").first().click();
  await expect(page.getByRole("dialog").getByRole("heading")).toHaveText(
    "Dasar AI: istilah, cara kerja, dan keterbatasannya",
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
      name: "Buka Mengenal model bahasa besar bersama Andrej Karpathy",
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

test("video shelf controls move the visible videos in both directions", async ({
  page,
}) => {
  await page.goto("/");
  const rail = page.getByRole("region", {
    name: "Daftar video, dapat digeser",
  });
  await rail.scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("button", { name: "Video sebelumnya", exact: true }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Video berikutnya", exact: true })
    .click();
  await expect
    .poll(() => rail.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(20);
  await expect(
    page.getByRole("button", { name: "Video sebelumnya", exact: true }),
  ).toBeEnabled();
  await page
    .getByRole("button", { name: "Video sebelumnya", exact: true })
    .click();
  await expect.poll(() => rail.evaluate((el) => el.scrollLeft)).toBeLessThan(4);
});

test("learning interests change recommendations and open the matching guide", async ({
  page,
}) => {
  await page.goto("/");
  const options = page.getByRole("group", { name: "Pilih kebutuhan belajar" });
  await options
    .getByRole("button", { name: "Saya ingin menghemat waktu kerja" })
    .click();
  await expect(
    options.getByRole("button", { name: "Saya ingin menghemat waktu kerja" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".recommendations")).toContainText(
    "Mencatat formulir ke spreadsheet secara otomatis",
  );
  await expect(page.locator(".recommendations")).not.toContainText(
    "Dasar AI: istilah",
  );
  await page
    .locator(".recommendations")
    .getByRole("button", {
      name: "Mencatat formulir ke spreadsheet secara otomatis",
    })
    .click();
  await expect(page.getByRole("dialog").getByRole("heading")).toHaveText(
    "Mencatat formulir ke spreadsheet secara otomatis",
  );
  await page.getByRole("button", { name: "Tutup detail" }).click();
  await options
    .getByRole("button", { name: "Saya ingin memahami cara kerjanya" })
    .click();
  await expect(page.locator(".recommendations")).toContainText(
    "Apa yang sebenarnya dipelajari neural network?",
  );
});

test("reduced motion leaves content visible and disables decorative motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero-copy")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".hero-media")).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await expect(page.locator(".reveal-ready")).toHaveCount(0);
  await page.getByRole("button", { name: "Artikel utama berikutnya" }).click();
  await expect(page.locator(".hero-copy h1")).toContainText(
    /Bagaimana AI.*menyelesaikan soal/,
  );
  await page.locator(".starter-section").scrollIntoViewIfNeeded();
  await expect(page.locator(".starter-section")).toHaveCSS("opacity", "1");
});

test("hero artwork uses pointer motion only on devices that support hover", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const media = page.locator(".hero-media");
  if (testInfo.project.name === "mobile") {
    await media.dispatchEvent("pointermove", {
      clientX: 25,
      clientY: 25,
      pointerType: "touch",
    });
    expect(
      await media.evaluate((el) => el.style.getPropertyValue("--tilt-y")),
    ).toBe("");
    return;
  }
  await media.hover({ position: { x: 25, y: 25 } });
  await expect
    .poll(() => media.evaluate((el) => el.style.getPropertyValue("--tilt-y")))
    .not.toBe("");
  expect(
    await media.evaluate((el) =>
      parseFloat(el.style.getPropertyValue("--tilt-y")),
    ),
  ).not.toBe(0);
  await page.mouse.move(5, 5);
  await expect
    .poll(() => media.evaluate((el) => el.style.getPropertyValue("--tilt-y")))
    .toBe("0deg");
});
