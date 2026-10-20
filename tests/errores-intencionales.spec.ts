import { test, expect } from "@playwright/test";

// Pruebas que FALLAN A PROPÓSITO para estudiar los mensajes de error.
// Ejecútalas con:  npm run test:laboratorio

test.describe("Laboratorio de errores @laboratorio", () => {
  test("E1 - agregar producto al carrito", async ({ page }) => {
    await page.goto("/catalogo.html");

    await expect(page.getByTestId("producto")).toHaveCount(4);

    await page
      .getByTestId("producto")
      .first()
      .getByRole("button", { name: "Agregar al carrito" })
      .click();

    await expect(page.getByText("Carrito: 1 productos")).toBeVisible();
  });

  test("E2 - agregar un producto específico al carrito", async ({ page }) => {
    await page.goto("/catalogo.html");

    await expect(page.getByTestId("producto")).toHaveCount(4);

    const producto = page
      .getByTestId("producto")
      .filter({ hasText: "Mouse inalámbrico" });

    await producto
      .getByRole("button", {
        name: "Agregar al carrito",
      })
      .click();

    await expect(page.getByText("Carrito: 1 productos")).toBeVisible();
  });

  test("E3 - verificar el encabezado de TiendaUT", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Bienvenido a TiendaUT",
    );
  });

  test("E4 - validar inicio de sesión incorrecto", async ({ page }) => {
    await page.goto("/login.html");

    await page.getByLabel("Usuario").fill("alumno");
    await page.getByLabel("Contraseña").fill("mal");

    await page.getByRole("button", { name: "Entrar" }).click();

    await expect(page).toHaveURL(/login\.html/);

    await expect(
      page.getByText("Usuario o contraseña incorrectos"),
    ).toBeVisible();
  });

  test("E5 - verificar que el servidor está disponible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Bienvenido a TiendaUT",
    );
  });

  test("E6 - vaciar carrito sin errores de JavaScript", async ({ page }) => {
    const errores: string[] = [];

    page.on("pageerror", (error) => {
      errores.push(error.message);
    });

    await page.goto("/catalogo.html");

    await expect(page.getByTestId("producto")).toHaveCount(4);

    await page
      .getByTestId("producto")
      .first()
      .getByRole("button", { name: "Agregar al carrito" })
      .click();

    await page.getByRole("button", { name: "Vaciar carrito" }).click();

    expect(errores).toEqual([]);
  });

  test("E7 - verificar encabezado con await", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Bienvenido a TiendaUT" }),
    ).toBeVisible();
  });

  test("E8 - buscar un producto", async ({ page }) => {
    await page.goto("/catalogo.html");

    await expect(page.getByTestId("producto")).toHaveCount(4);

    await page.getByPlaceholder("Buscar producto").fill("mouse");

    await expect(
      page.getByTestId("producto").filter({ hasText: "Mouse inalámbrico" }),
    ).toBeVisible();
  });
});
