const { test, expect } = require("@playwright/test");
const { before, beforeEach } = require("node:test");
test.beforeEach(async ({ page }) => {
  await page.goto("https://playground-drab-six.vercel.app/login");
});

test("LoginSucess", async ({ page }) => {
  await page.getByPlaceholder("Digite seu usuário").fill("teste");
  await page.getByPlaceholder("Digite sua senha").fill("password123");
  await page.getByRole("button", { name: "Logar" }).click();
  await expect(page.getByText("Usuário logado com sucesso!")).toBeVisible();
  await expect(page.getByText("Usuário logado com sucesso!")).toHaveText(
    "Usuário logado com sucesso! Redirecionando..."
  );
});

test("LoginFail", async ({ page }) => {
  await page.getByPlaceholder("Digite seu usuário").fill("testefail");
  await page.getByPlaceholder("Digite sua senha").fill("password");
  await page.getByRole("button", { name: "Logar" }).click();
  await expect(page.getByText("Usuário não encontrado!")).toBeVisible();
  await expect(page.getByText("Usuário não encontrado!")).toHaveText(
    "Usuário não encontrado!"
  );
});

test("BlockedAccount", async ({ page }) => {
  await page.getByPlaceholder("Digite seu usuário").fill("testeblock");
  await page.getByPlaceholder("Digite sua senha").fill("password123");
  await page.getByRole("button", { name: "Logar" }).click();
  await expect(page.getByText("Usuário bloqueado!")).toBeVisible();
  await expect(page.getByText("Usuário bloqueado!")).toHaveText(
    "Usuário bloqueado!"
  );
});

test("ThreeTimesWrongPassword", async ({ page }) => {
  await page.goto("https://playground-drab-six.vercel.app/login");
  for (let i = 0; i < 2; i++) {
    await page.getByPlaceholder("Digite seu usuário").fill("teste");
    await page.getByPlaceholder("Digite sua senha").fill("password12");
    await page.getByRole("button", { name: "Logar" }).click();
  }
});
