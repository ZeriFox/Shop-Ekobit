import type { Route, Routes } from "@angular/router";
import { LOCALES, SLUGS, type Locale } from "./i18n/i18n.service";

const TITLES: Record<Locale, Record<string, string>> = {
  it: { home: "Ekobit | Tecnologia europea per la casa", catalog: "Catalogo | Ekobit", product: "Prodotto | Ekobit", cart: "Carrello | Ekobit", about: "Chi siamo | Ekobit", support: "Assistenza | Ekobit", contact: "Contatti | Ekobit", privacy: "Privacy policy | Ekobit", cookies: "Cookie policy | Ekobit", terms: "Termini e condizioni | Ekobit", shipping: "Spedizioni e resi | Ekobit" },
  en: { home: "Ekobit | European home technology", catalog: "Catalog | Ekobit", product: "Product | Ekobit", cart: "Cart | Ekobit", about: "About us | Ekobit", support: "Support | Ekobit", contact: "Contact | Ekobit", privacy: "Privacy policy | Ekobit", cookies: "Cookie policy | Ekobit", terms: "Terms and conditions | Ekobit", shipping: "Shipping and returns | Ekobit" },
  fr: { home: "Ekobit | Technologie pour la maison", catalog: "Catalogue | Ekobit", product: "Produit | Ekobit", cart: "Panier | Ekobit", about: "À propos | Ekobit", support: "Assistance | Ekobit", contact: "Contact | Ekobit", privacy: "Confidentialité | Ekobit", cookies: "Cookies | Ekobit", terms: "Conditions générales | Ekobit", shipping: "Livraison et retours | Ekobit" },
  de: { home: "Ekobit | Europäische Haustechnik", catalog: "Katalog | Ekobit", product: "Produkt | Ekobit", cart: "Warenkorb | Ekobit", about: "Über uns | Ekobit", support: "Hilfe | Ekobit", contact: "Kontakt | Ekobit", privacy: "Datenschutz | Ekobit", cookies: "Cookies | Ekobit", terms: "AGB | Ekobit", shipping: "Versand und Rückgabe | Ekobit" },
  es: { home: "Ekobit | Tecnología europea para el hogar", catalog: "Catálogo | Ekobit", product: "Producto | Ekobit", cart: "Carrito | Ekobit", about: "Quiénes somos | Ekobit", support: "Ayuda | Ekobit", contact: "Contacto | Ekobit", privacy: "Privacidad | Ekobit", cookies: "Cookies | Ekobit", terms: "Términos y condiciones | Ekobit", shipping: "Envíos y devoluciones | Ekobit" },
};

function localizedRoutes(locale: Locale): Route[] {
  const slug = SLUGS[locale];
  return [
    { path: locale, title: TITLES[locale]["home"], loadComponent: () => import("./pages/home.page").then((module) => module.HomePage) },
    { path: `${locale}/${slug.catalog}`, title: TITLES[locale]["catalog"], loadComponent: () => import("./pages/catalog.page").then((module) => module.CatalogPage) },
    { path: `${locale}/${slug.product}/:id`, title: TITLES[locale]["product"], loadComponent: () => import("./pages/product.page").then((module) => module.ProductPage) },
    { path: `${locale}/${slug.cart}`, title: TITLES[locale]["cart"], loadComponent: () => import("./pages/cart.page").then((module) => module.CartPage) },
    { path: `${locale}/${slug.about}`, title: TITLES[locale]["about"], loadComponent: () => import("./pages/about.page").then((module) => module.AboutPage) },
    { path: `${locale}/${slug.support}`, title: TITLES[locale]["support"], loadComponent: () => import("./pages/support.page").then((module) => module.SupportPage) },
    { path: `${locale}/${slug.contact}`, title: TITLES[locale]["contact"], loadComponent: () => import("./pages/contact.page").then((module) => module.ContactPage) },
    { path: `${locale}/${slug.privacy}`, title: TITLES[locale]["privacy"], data: { document: "privacy" }, loadComponent: () => import("./pages/legal.page").then((module) => module.LegalPage) },
    { path: `${locale}/${slug.cookies}`, title: TITLES[locale]["cookies"], data: { document: "cookies" }, loadComponent: () => import("./pages/legal.page").then((module) => module.LegalPage) },
    { path: `${locale}/${slug.terms}`, title: TITLES[locale]["terms"], data: { document: "terms" }, loadComponent: () => import("./pages/legal.page").then((module) => module.LegalPage) },
    { path: `${locale}/${slug.shipping}`, title: TITLES[locale]["shipping"], data: { document: "shipping" }, loadComponent: () => import("./pages/legal.page").then((module) => module.LegalPage) },
  ];
}

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "it" },
  ...LOCALES.flatMap(localizedRoutes),
  { path: "catalogo", pathMatch: "full", redirectTo: "it/catalogo" },
  { path: "carrello", pathMatch: "full", redirectTo: "it/carrello" },
  { path: "chi-siamo", pathMatch: "full", redirectTo: "it/chi-siamo" },
  { path: "assistenza", pathMatch: "full", redirectTo: "it/assistenza" },
  { path: "**", redirectTo: "it" },
];
