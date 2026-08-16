import { Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { ShopHeaderComponent } from "./components/shop-header.component";
import { CatalogService } from "./services/catalog.service";

@Component({
  selector: "app-root",
  imports: [RouterLink, RouterOutlet, ShopHeaderComponent],
  templateUrl: "./app.html",
})
export class App {
  private readonly catalog = inject(CatalogService);

  constructor() {
    this.catalog.load();
  }
}
