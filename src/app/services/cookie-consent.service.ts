import { isPlatformBrowser } from "@angular/common";
import { Injectable, PLATFORM_ID, computed, inject, signal } from "@angular/core";

export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  external: boolean;
  updatedAt: string;
};

const CONSENT_KEY = "ekobit-consent-v1";

function parsePreferences(value: string | null): CookiePreferences | null {
  if (!value) return null;
  try {
    const source = JSON.parse(value) as Partial<CookiePreferences>;
    return {
      necessary: true,
      analytics: source.analytics === true,
      marketing: source.marketing === true,
      external: source.external === true,
      updatedAt: typeof source.updatedAt === "string" ? source.updatedAt : new Date(0).toISOString(),
    };
  } catch {
    return null;
  }
}

@Injectable({ providedIn: "root" })
export class CookieConsentService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly preferences = signal<CookiePreferences | null>(null);
  readonly settingsOpen = signal(false);
  readonly bannerVisible = computed(() => this.preferences() === null || this.settingsOpen());
  readonly canLoadExternal = computed(() => this.preferences()?.external === true);

  constructor() {
    if (isPlatformBrowser(this.platformId)) this.preferences.set(parsePreferences(localStorage.getItem(CONSENT_KEY)));
  }

  acceptAll(): void {
    this.save({ analytics: true, marketing: true, external: true });
  }

  rejectOptional(): void {
    this.save({ analytics: false, marketing: false, external: false });
  }

  save(selection: Pick<CookiePreferences, "analytics" | "marketing" | "external">): void {
    const next: CookiePreferences = { necessary: true, ...selection, updatedAt: new Date().toISOString() };
    this.preferences.set(next);
    this.settingsOpen.set(false);
    if (isPlatformBrowser(this.platformId)) localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
  }

  enableExternal(): void {
    const current = this.preferences();
    this.save({ analytics: current?.analytics ?? false, marketing: current?.marketing ?? false, external: true });
  }

  openSettings(): void {
    this.settingsOpen.set(true);
  }
}
