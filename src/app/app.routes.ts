import type { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", title: "Ekobit | Elettrodomestici per la tua casa", loadComponent: () => import("./pages/home.page").then((module) => module.HomePage) },
  { path: "catalogo", title: "Catalogo | Ekobit", loadComponent: () => import("./pages/catalog.page").then((module) => module.CatalogPage) },
  { path: "prodotto/:id", title: "Prodotto | Ekobit", loadComponent: () => import("./pages/product.page").then((module) => module.ProductPage) },
  { path: "carrello", title: "Carrello | Ekobit", loadComponent: () => import("./pages/cart.page").then((module) => module.CartPage) },
  { path: "chi-siamo", title: "Chi siamo | Ekobit", loadComponent: () => import("./pages/about.page").then((module) => module.AboutPage) },
  { path: "assistenza", title: "Assistenza | Ekobit", loadComponent: () => import("./pages/support.page").then((module) => module.SupportPage) },
  { path: "**", redirectTo: "" },
];
