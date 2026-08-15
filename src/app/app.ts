import { HttpClient } from "@angular/common/http";
import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  computed,
  effect,
  inject,
  signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  LucideArrowLeft,
  LucideArrowRight,
  LucideCheck,
  LucideChevronDown,
  LucideCircleUserRound,
  LucideEye,
  LucideHeadphones,
  LucideHeart,
  LucideMenu,
  LucideMinus,
  LucidePlus,
  LucideSearch,
  LucideShieldCheck,
  LucideShoppingBag,
  LucideSnowflake,
  LucideSparkles,
  LucideTrash2,
  LucideTruck,
  LucideTv,
  LucideWarehouse,
  LucideWashingMachine,
  LucideX,
} from "@lucide/angular";

type Product = {
  id: string;
  brand: string;
  name: string;
  category: string;
  image: string;
  price: number;
  oldPrice: number;
  badge: string;
  description: string;
};

type CartLine = {
  productId: string;
  quantity: number;
};

const HERO_SLIDES = [
  {
    image: "/banners/piccoli-elettrodomestici.png",
    alt: "Solo i migliori piccoli elettrodomestici su Ekobit",
    label: "Scelte per ogni giorno",
  },
  {
    image: "/banners/spedizione-gratuita.png",
    alt: "Spedizioni gratuite sui marchi selezionati",
    label: "Consegna che conviene",
  },
  {
    image: "/banners/lavatrici.png",
    alt: "Promozione su asciugatrici e lavatrici",
    label: "Speciale lavaggio",
  },
] as const;

const CATEGORIES = [
  "Tutti",
  "Lavaggio",
  "Freddo",
  "Cottura",
  "Pulizia",
  "Piccoli elettrodomestici",
] as const;

const DEMO_PRODUCTS: Product[] = [
  {
    id: "philips-x3003",
    brand: "PHILIPS",
    name: "X3003/00 Rasoio elettrico Shaver 3000X Wet & Dry",
    category: "Piccoli elettrodomestici",
    image: "/products/philips-rasoio.jpg",
    price: 49.9,
    oldPrice: 64.9,
    badge: "-23%",
    description:
      "Rasatura confortevole a secco o sotto la doccia, con testine flessibili e impugnatura ergonomica.",
  },
  {
    id: "electrolux-loc3s40x2",
    brand: "ELECTROLUX",
    name: "LOC3S40X2 Forno da incasso 72 L Multifunzione Vapore",
    category: "Cottura",
    image: "/products/electrolux-forno.jpg",
    price: 399,
    oldPrice: 459,
    badge: "Novità",
    description:
      "Cottura uniforme e funzione vapore per risultati croccanti fuori e morbidi dentro, in una cavità da 72 litri.",
  },
  {
    id: "dyson-v15s",
    brand: "DYSON",
    name: "V15s Detect Submarine Aspirapolvere e Lavapavimenti",
    category: "Pulizia",
    image: "/products/dyson-v15s.jpg",
    price: 799,
    oldPrice: 949,
    badge: "-16%",
    description:
      "Aspira e lava i pavimenti con rilevamento intelligente della polvere e fino a 60 minuti di autonomia.",
  },
  {
    id: "aeg-l6fbi945",
    brand: "AEG",
    name: "L6FBI945 Lavatrice 9 kg 1400 giri con motore inverter",
    category: "Lavaggio",
    image: "/products/aeg-lavatrice.jpg",
    price: 529,
    oldPrice: 619,
    badge: "-15%",
    description:
      "Capacità da 9 kg, motore inverter e programmi vapore per prendersi cura dei tessuti riducendo i consumi.",
  },
  {
    id: "hisense-rr106",
    brand: "HISENSE",
    name: "RR106D4CRE Frigorifero monoporta 82 L rosso",
    category: "Freddo",
    image: "/products/hisense-frigorifero.jpg",
    price: 219,
    oldPrice: 259,
    badge: "-15%",
    description:
      "Un frigorifero compatto dal carattere rétro, perfetto per piccoli spazi, uffici e seconde case.",
  },
];

const currency = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
});

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false;
  const product = value as Record<string, unknown>;

  return (
    typeof product["id"] === "string" &&
    typeof product["brand"] === "string" &&
    typeof product["name"] === "string" &&
    typeof product["category"] === "string" &&
    typeof product["image"] === "string" &&
    typeof product["price"] === "number" &&
    typeof product["oldPrice"] === "number" &&
    typeof product["badge"] === "string" &&
    typeof product["description"] === "string"
  );
}

@Component({
  selector: "app-root",
  imports: [
    FormsModule,
    LucideArrowLeft,
    LucideArrowRight,
    LucideCheck,
    LucideChevronDown,
    LucideCircleUserRound,
    LucideEye,
    LucideHeadphones,
    LucideHeart,
    LucideMenu,
    LucideMinus,
    LucidePlus,
    LucideSearch,
    LucideShieldCheck,
    LucideShoppingBag,
    LucideSnowflake,
    LucideSparkles,
    LucideTrash2,
    LucideTruck,
    LucideTv,
    LucideWarehouse,
    LucideWashingMachine,
    LucideX,
  ],
  templateUrl: "./app.html",
})
export class App implements OnInit, OnDestroy {
  private readonly http = inject(HttpClient);
  private carouselTimer: ReturnType<typeof setInterval> | undefined;
  private toastTimer: ReturnType<typeof setTimeout> | undefined;

  readonly heroSlides = HERO_SLIDES;
  readonly categories = CATEGORIES;
  readonly products = signal<Product[]>(DEMO_PRODUCTS);
  readonly activeSlide = signal(0);
  readonly carouselPaused = signal(false);
  readonly query = signal("");
  readonly searchOpen = signal(false);
  readonly activeCategory = signal<(typeof CATEGORIES)[number]>("Tutti");
  readonly wishlist = signal<Set<string>>(new Set());
  readonly cart = signal<CartLine[]>([]);
  readonly cartOpen = signal(false);
  readonly menuOpen = signal(false);
  readonly quickProductId = signal<string | null>(null);
  readonly toast = signal("");

  readonly normalizedQuery = computed(() =>
    this.query().trim().toLocaleLowerCase("it"),
  );
  readonly searchMatches = computed(() => {
    const query = this.normalizedQuery();
    if (!query) return [];

    return this.products()
      .filter((product) =>
        `${product.brand} ${product.name} ${product.category}`
          .toLocaleLowerCase("it")
          .includes(query),
      )
      .slice(0, 4);
  });
  readonly visibleProducts = computed(() => {
    const category = this.activeCategory();
    return category === "Tutti"
      ? this.products()
      : this.products().filter((product) => product.category === category);
  });
  readonly quickProduct = computed(() => {
    const productId = this.quickProductId();
    return productId
      ? (this.products().find((product) => product.id === productId) ?? null)
      : null;
  });
  readonly cartItems = computed(() =>
    this.cart().flatMap((line) => {
      const product = this.products().find(
        (item) => item.id === line.productId,
      );
      return product ? [{ ...line, product }] : [];
    }),
  );
  readonly cartCount = computed(() =>
    this.cart().reduce((total, line) => total + line.quantity, 0),
  );
  readonly cartTotal = computed(() =>
    this.cartItems().reduce(
      (total, line) => total + line.product.price * line.quantity,
      0,
    ),
  );
  readonly overlayOpen = computed(
    () => this.cartOpen() || this.menuOpen() || this.quickProduct() !== null,
  );

  constructor() {
    effect((onCleanup) => {
      if (!this.overlayOpen()) return;

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      onCleanup(() => {
        document.body.style.overflow = previousOverflow;
      });
    });
  }

  ngOnInit(): void {
    this.loadCatalog();
    this.carouselTimer = setInterval(() => {
      if (!this.carouselPaused()) this.changeSlide(1);
    }, 4400);
  }

  ngOnDestroy(): void {
    if (this.carouselTimer) clearInterval(this.carouselTimer);
    if (this.toastTimer) clearTimeout(this.toastTimer);
  }

  @HostListener("document:keydown.escape")
  closeOnEscape(): void {
    this.closeOverlays();
  }

  private loadCatalog(): void {
    this.http.get<unknown>("/api/products").subscribe({
      next: (payload) => {
        if (!payload || typeof payload !== "object") return;
        const remoteProducts = (payload as { products?: unknown }).products;
        if (
          Array.isArray(remoteProducts) &&
          remoteProducts.length > 0 &&
          remoteProducts.every(isProduct)
        ) {
          this.products.set(remoteProducts);
        }
      },
      error: () => {
        // The demo catalog remains available until Firebase is configured.
      },
    });
  }

  formatCurrency(value: number): string {
    return currency.format(value);
  }

  changeSlide(direction: number): void {
    this.activeSlide.update(
      (current) =>
        (current + direction + this.heroSlides.length) % this.heroSlides.length,
    );
  }

  setCategory(category: (typeof CATEGORIES)[number], scroll = false): void {
    this.activeCategory.set(category);
    this.menuOpen.set(false);
    if (scroll) {
      setTimeout(
        () =>
          document
            .getElementById("prodotti")
            ?.scrollIntoView({ behavior: "smooth" }),
        80,
      );
    }
  }

  openFeaturedProduct(): void {
    const products = this.products();
    this.quickProductId.set(products[2]?.id ?? products[0]?.id ?? null);
  }

  submitSearch(event: Event): void {
    event.preventDefault();
    const firstMatch = this.searchMatches()[0];
    if (!firstMatch) return;
    this.quickProductId.set(firstMatch.id);
    this.searchOpen.set(false);
  }

  chooseSearchResult(productId: string): void {
    this.quickProductId.set(productId);
    this.searchOpen.set(false);
  }

  closeSearchIfOutside(event: FocusEvent): void {
    const container = event.currentTarget;
    if (
      container instanceof HTMLElement &&
      !(event.relatedTarget instanceof Node && container.contains(event.relatedTarget))
    ) {
      this.searchOpen.set(false);
    }
  }

  moveHeroGlow(event: PointerEvent, element: HTMLElement): void {
    const bounds = element.getBoundingClientRect();
    element.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    element.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  }

  isLiked(productId: string): boolean {
    return this.wishlist().has(productId);
  }

  toggleWishlist(product: Product): void {
    const next = new Set(this.wishlist());
    const wasLiked = next.has(product.id);
    if (wasLiked) next.delete(product.id);
    else next.add(product.id);
    this.wishlist.set(next);
    this.showToast(wasLiked ? "Rimosso dai preferiti" : "Salvato nei preferiti");
  }

  addToCart(product: Product): void {
    this.cart.update((current) => {
      const existing = current.find((line) => line.productId === product.id);
      return existing
        ? current.map((line) =>
            line.productId === product.id
              ? { ...line, quantity: line.quantity + 1 }
              : line,
          )
        : [...current, { productId: product.id, quantity: 1 }];
    });
    this.showToast(`${product.brand} aggiunto al carrello`);
  }

  updateQuantity(productId: string, delta: number): void {
    this.cart.update((current) =>
      current.flatMap((line) => {
        if (line.productId !== productId) return [line];
        const quantity = line.quantity + delta;
        return quantity > 0 ? [{ ...line, quantity }] : [];
      }),
    );
  }

  addQuickProductToCart(product: Product): void {
    this.addToCart(product);
    this.quickProductId.set(null);
    this.cartOpen.set(true);
  }

  closeOverlays(): void {
    this.cartOpen.set(false);
    this.menuOpen.set(false);
    this.quickProductId.set(null);
  }

  private showToast(message: string): void {
    this.toast.set(message);
    if (this.toastTimer) clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(""), 2400);
  }
}
