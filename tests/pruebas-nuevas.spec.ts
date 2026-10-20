import { test, expect } from "@playwright/test";

test.describe("Pruebas adicionales de TiendaUT", () => {
  test("N1 - verificar los precios de los productos", async ({ page }) => {
    await page.goto("/catalogo.html");

    const productos = page.getByTestId("producto");

    await expect(productos).toHaveCount(4);

    await expect(
      productos.filter({ hasText: "Teclado mecánico" }),
    ).toContainText("$899");

    await expect(
      productos.filter({ hasText: "Mouse inalámbrico" }),
    ).toContainText("$349");
  });

  test("N2 - agregar dos productos al carrito", async ({ page }) => {
    await page.goto("/catalogo.html");

    const productos = page.getByTestId("producto");
    await expect(productos).toHaveCount(4);

    await productos
      .nth(0)
      .getByRole("button", { name: "Agregar al carrito" })
      .click();

    await productos
      .nth(1)
      .getByRole("button", { name: "Agregar al carrito" })
      .click();

    await expect(page.getByTestId("contador-carrito")).toHaveText("2");
  });

  test("N3 - buscar un producto inexistente", async ({ page }) => {
    await page.goto("/catalogo.html");

    await expect(page.getByTestId("producto")).toHaveCount(4);

    await page
      .getByPlaceholder("Buscar producto")
      .fill("Producto inexistente XYZ");

    await expect(page.getByTestId("producto")).toHaveCount(0);
  });
});
