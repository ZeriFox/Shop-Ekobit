import { Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { CookieConsentComponent } from "./components/cookie-consent.component";
import { ShopHeaderComponent } from "./components/shop-header.component";
import { COMPANY } from "./config/company";
import { I18nService } from "./i18n/i18n.service";
import { CatalogService } from "./services/catalog.service";
import { CookieConsentService } from "./services/cookie-consent.service";

@Component({
  selector: "app-root",
  imports: [RouterLink, RouterOutlet, CookieConsentComponent, ShopHeaderComponent],
  templateUrl: "./app.html",
})
export class App {
  private readonly catalog = inject(CatalogService);
  readonly i18n = inject(I18nService);
  readonly consent = inject(CookieConsentService);
  readonly company = COMPANY;

  constructor() {
    this.catalog.load();
  }
}
