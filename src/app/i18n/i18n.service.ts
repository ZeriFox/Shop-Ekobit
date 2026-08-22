import { DOCUMENT } from "@angular/common";
import { Injectable, inject, signal } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

export const LOCALES = ["it", "en", "fr", "de", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export type PageKey =
  | "home"
  | "catalog"
  | "product"
  | "cart"
  | "about"
  | "support"
  | "contact"
  | "privacy"
  | "cookies"
  | "terms"
  | "shipping";

export const LANGUAGES: ReadonlyArray<{ code: Locale; short: string; label: string }> = [
  { code: "it", short: "IT", label: "Italiano" },
  { code: "en", short: "EN", label: "English" },
  { code: "fr", short: "FR", label: "Français" },
  { code: "de", short: "DE", label: "Deutsch" },
  { code: "es", short: "ES", label: "Español" },
];

export const SLUGS: Record<Locale, Record<PageKey, string>> = {
  it: { home: "", catalog: "catalogo", product: "prodotto", cart: "carrello", about: "chi-siamo", support: "assistenza", contact: "contatti", privacy: "privacy", cookies: "cookie", terms: "termini-condizioni", shipping: "spedizioni-resi" },
  en: { home: "", catalog: "catalog", product: "product", cart: "cart", about: "about-us", support: "support", contact: "contact", privacy: "privacy", cookies: "cookies", terms: "terms-conditions", shipping: "shipping-returns" },
  fr: { home: "", catalog: "catalogue", product: "produit", cart: "panier", about: "a-propos", support: "assistance", contact: "contact", privacy: "confidentialite", cookies: "cookies", terms: "conditions-generales", shipping: "livraison-retours" },
  de: { home: "", catalog: "katalog", product: "produkt", cart: "warenkorb", about: "ueber-uns", support: "hilfe", contact: "kontakt", privacy: "datenschutz", cookies: "cookies", terms: "agb", shipping: "versand-rueckgabe" },
  es: { home: "", catalog: "catalogo", product: "producto", cart: "carrito", about: "quienes-somos", support: "ayuda", contact: "contacto", privacy: "privacidad", cookies: "cookies", terms: "terminos-condiciones", shipping: "envios-devoluciones" },
};

const COPY: Record<Locale, Record<string, string>> = {
  it: {
    "top.shipping": "Spedizione tracciata • assistenza umana",
    "nav.home": "Home", "nav.shop": "Shop", "nav.new": "Novità", "nav.offers": "Offerte", "nav.about": "Chi siamo", "nav.support": "Assistenza", "nav.contact": "Contatti",
    "nav.categories": "Categorie", "nav.account": "Account", "nav.wishlist": "Preferiti", "nav.cart": "Carrello", "nav.help": "Serve aiuto?", "nav.talk": "Parla con noi",
    "search.placeholder": "Cerca prodotti, marchi, categorie…", "search.quick": "Risultati rapidi", "search.none": "Nessun risultato", "search.popular": "Ricerche popolari", "search.all": "Vedi tutti i risultati",
    "cart.title": "Il tuo carrello", "cart.items": "articoli", "cart.emptyTitle": "Il carrello è pronto", "cart.emptyText": "Aggiungi un prodotto: resterà salvato mentre navighi.", "cart.start": "Inizia lo shopping", "cart.total": "Totale", "cart.shipping": "Spedizione calcolata al checkout", "cart.open": "Vai al carrello",
    "home.kicker": "Smart living · made simple", "home.titleA": "Tecnologia per la casa,", "home.titleB": "scelta con criterio.", "home.lead": "Una selezione chiara di elettrodomestici utili, supportata da persone vere e da oltre vent’anni di esperienza.", "home.explore": "Esplora lo shop", "home.story": "Conosci Ekobit", "home.delivery": "Spedizione tracciata", "home.deliveryText": "Tempi e costi chiari prima del pagamento", "home.secure": "Pagamenti protetti", "home.secureText": "Provider certificati e dati cifrati", "home.support": "Supporto umano", "home.supportText": "Prima, durante e dopo l’acquisto", "home.curated": "Selezione curata", "home.curatedText": "Meno rumore, più prodotti sensati", "home.categoriesKicker": "Trova il prodotto giusto", "home.categories": "Esplora per ambiente", "home.all": "Tutto il catalogo", "home.featuredKicker": "Scelte del momento", "home.featured": "Prodotti in evidenza", "home.catalog": "Apri il catalogo", "home.demo": "Catalogo dimostrativo", "home.demoText": "Questi prodotti di esempio mostrano l’esperienza dello shop mentre prepariamo l’assortimento reale.", "home.manifesto": "Non il catalogo più grande. Quello più chiaro.", "home.manifestoText": "Ekobit unisce competenza, semplicità e un’esperienza digitale progettata per scegliere senza stress.", "home.years": "anni di esperienza", "home.countries": "lingue disponibili", "home.human": "assistenza reale",
    "catalog.kicker": "Tecnologia, senza confusione", "catalog.all": "Tutti i prodotti", "catalog.lead": "Una selezione essenziale, prezzi chiari e supporto prima e dopo l’acquisto.", "catalog.sort": "Ordina", "catalog.featured": "In evidenza", "catalog.priceAsc": "Prezzo crescente", "catalog.priceDesc": "Prezzo decrescente", "catalog.name": "Nome", "catalog.updating": "Aggiornamento catalogo…", "catalog.demo": "Stai esplorando il catalogo dimostrativo.", "catalog.found": "prodotti trovati", "catalog.empty": "Nessun prodotto trovato", "catalog.emptyText": "Prova una categoria diversa o una ricerca più semplice.", "catalog.reset": "Azzera i filtri",
    "product.details": "Dettagli", "product.add": "Aggiungi al carrello", "product.unavailable": "Non disponibile", "product.available": "Disponibile", "product.fast": "Consegna tracciata", "product.fastText": "Tempi e costi sempre visibili", "product.protected": "Acquisto protetto", "product.protectedText": "Garanzia legale applicabile", "product.sheet": "Scheda prodotto", "product.specs": "Caratteristiche tecniche", "product.related": "Prodotti correlati", "product.loading": "Caricamento prodotto…", "product.notFound": "Prodotto non trovato", "product.back": "Torna al catalogo",
    "page.about": "Chi siamo", "page.support": "Assistenza", "page.contact": "Contatti", "page.privacy": "Privacy policy", "page.cookies": "Cookie policy", "page.terms": "Termini e condizioni", "page.shipping": "Spedizioni e resi",
    "footer.tagline": "Tecnologia utile, scelta con cura e supportata da persone vere.", "footer.shop": "Acquista", "footer.company": "Ekobit", "footer.legal": "Informazioni legali", "footer.rights": "Tutti i diritti riservati.", "footer.settings": "Preferenze cookie",
    "cookie.kicker": "La tua privacy, senza trucchi", "cookie.title": "Scegli tu cosa attivare", "cookie.text": "Usiamo solo memoria tecnica per lingua, carrello e preferenze. Mappe e futuri strumenti statistici restano spenti finché non li autorizzi.", "cookie.reject": "Solo necessari", "cookie.accept": "Accetta tutto", "cookie.customize": "Personalizza", "cookie.save": "Salva preferenze", "cookie.necessary": "Necessari", "cookie.necessaryText": "Lingua, carrello e consenso. Sempre attivi.", "cookie.analytics": "Analitici", "cookie.analyticsText": "Misurazione aggregata, non ancora installata.", "cookie.marketing": "Marketing", "cookie.marketingText": "Campagne personalizzate, non ancora installate.", "cookie.external": "Contenuti esterni", "cookie.externalText": "Consente di caricare Google Maps.",
    "common.learn": "Scopri di più", "common.remove": "Rimuovi", "common.continue": "Continua lo shopping", "common.subtotal": "Subtotale", "common.checkout": "Procedi al checkout", "common.calculated": "Calcolata dopo", "common.quantity": "Quantità", "common.draft": "Bozza informativa da validare prima dell’apertura commerciale.",
  },
  en: {
    "top.shipping": "Tracked delivery • human support",
    "nav.home": "Home", "nav.shop": "Shop", "nav.new": "New in", "nav.offers": "Offers", "nav.about": "About us", "nav.support": "Support", "nav.contact": "Contact",
    "nav.categories": "Categories", "nav.account": "Account", "nav.wishlist": "Wishlist", "nav.cart": "Cart", "nav.help": "Need help?", "nav.talk": "Talk to us",
    "search.placeholder": "Search products, brands, categories…", "search.quick": "Quick results", "search.none": "No results", "search.popular": "Popular searches", "search.all": "See all results",
    "cart.title": "Your cart", "cart.items": "items", "cart.emptyTitle": "Your cart is ready", "cart.emptyText": "Add a product and it will stay saved while you browse.", "cart.start": "Start shopping", "cart.total": "Total", "cart.shipping": "Shipping calculated at checkout", "cart.open": "Open cart",
    "home.kicker": "Smart living · made simple", "home.titleA": "Home technology,", "home.titleB": "chosen with purpose.", "home.lead": "A clear selection of useful appliances, backed by real people and more than twenty years of experience.", "home.explore": "Explore the shop", "home.story": "Meet Ekobit", "home.delivery": "Tracked delivery", "home.deliveryText": "Clear timing and costs before payment", "home.secure": "Protected payments", "home.secureText": "Certified providers and encrypted data", "home.support": "Human support", "home.supportText": "Before, during and after your purchase", "home.curated": "Curated selection", "home.curatedText": "Less noise, more sensible products", "home.categoriesKicker": "Find the right product", "home.categories": "Explore by space", "home.all": "Full catalog", "home.featuredKicker": "Current picks", "home.featured": "Featured products", "home.catalog": "Open catalog", "home.demo": "Demo catalog", "home.demoText": "These sample products demonstrate the shopping experience while we prepare the real assortment.", "home.manifesto": "Not the biggest catalog. The clearest one.", "home.manifestoText": "Ekobit combines expertise, simplicity and a digital experience designed for stress-free choices.", "home.years": "years of experience", "home.countries": "available languages", "home.human": "real support",
    "catalog.kicker": "Technology, without the noise", "catalog.all": "All products", "catalog.lead": "A focused selection, clear pricing and support before and after purchase.", "catalog.sort": "Sort", "catalog.featured": "Featured", "catalog.priceAsc": "Price: low to high", "catalog.priceDesc": "Price: high to low", "catalog.name": "Name", "catalog.updating": "Updating catalog…", "catalog.demo": "You are exploring the demo catalog.", "catalog.found": "products found", "catalog.empty": "No products found", "catalog.emptyText": "Try another category or a simpler search.", "catalog.reset": "Reset filters",
    "product.details": "Details", "product.add": "Add to cart", "product.unavailable": "Unavailable", "product.available": "Available", "product.fast": "Tracked delivery", "product.fastText": "Timing and costs always visible", "product.protected": "Protected purchase", "product.protectedText": "Applicable legal guarantee", "product.sheet": "Product sheet", "product.specs": "Technical details", "product.related": "Related products", "product.loading": "Loading product…", "product.notFound": "Product not found", "product.back": "Back to catalog",
    "page.about": "About us", "page.support": "Support", "page.contact": "Contact", "page.privacy": "Privacy policy", "page.cookies": "Cookie policy", "page.terms": "Terms and conditions", "page.shipping": "Shipping and returns",
    "footer.tagline": "Useful technology, carefully selected and supported by real people.", "footer.shop": "Shop", "footer.company": "Ekobit", "footer.legal": "Legal information", "footer.rights": "All rights reserved.", "footer.settings": "Cookie preferences",
    "cookie.kicker": "Your privacy, no tricks", "cookie.title": "Choose what to enable", "cookie.text": "We only use technical storage for language, cart and preferences. Maps and future analytics stay off until you allow them.", "cookie.reject": "Necessary only", "cookie.accept": "Accept all", "cookie.customize": "Customize", "cookie.save": "Save preferences", "cookie.necessary": "Necessary", "cookie.necessaryText": "Language, cart and consent. Always on.", "cookie.analytics": "Analytics", "cookie.analyticsText": "Aggregate measurement, not installed yet.", "cookie.marketing": "Marketing", "cookie.marketingText": "Personalized campaigns, not installed yet.", "cookie.external": "External content", "cookie.externalText": "Allows Google Maps to load.",
    "common.learn": "Learn more", "common.remove": "Remove", "common.continue": "Continue shopping", "common.subtotal": "Subtotal", "common.checkout": "Proceed to checkout", "common.calculated": "Calculated later", "common.quantity": "Quantity", "common.draft": "Information draft to be legally reviewed before commercial launch.",
  },
  fr: {
    "top.shipping": "Livraison suivie • assistance humaine", "nav.home": "Accueil", "nav.shop": "Boutique", "nav.new": "Nouveautés", "nav.offers": "Offres", "nav.about": "À propos", "nav.support": "Assistance", "nav.contact": "Contact", "nav.categories": "Catégories", "nav.account": "Compte", "nav.wishlist": "Favoris", "nav.cart": "Panier", "nav.help": "Besoin d’aide ?", "nav.talk": "Parlez-nous",
    "search.placeholder": "Rechercher produits, marques, catégories…", "search.quick": "Résultats rapides", "search.none": "Aucun résultat", "search.popular": "Recherches populaires", "search.all": "Voir tous les résultats",
    "cart.title": "Votre panier", "cart.items": "articles", "cart.emptyTitle": "Votre panier est prêt", "cart.emptyText": "Ajoutez un produit : il restera enregistré pendant votre visite.", "cart.start": "Commencer mes achats", "cart.total": "Total", "cart.shipping": "Livraison calculée au paiement", "cart.open": "Voir le panier",
    "home.kicker": "Smart living · made simple", "home.titleA": "La technologie maison,", "home.titleB": "choisie avec exigence.", "home.lead": "Une sélection claire d’appareils utiles, avec une assistance humaine et plus de vingt ans d’expérience.", "home.explore": "Explorer la boutique", "home.story": "Découvrir Ekobit", "home.delivery": "Livraison suivie", "home.deliveryText": "Délais et coûts clairs avant le paiement", "home.secure": "Paiements protégés", "home.secureText": "Prestataires certifiés et données chiffrées", "home.support": "Assistance humaine", "home.supportText": "Avant, pendant et après l’achat", "home.curated": "Sélection soignée", "home.curatedText": "Moins de bruit, plus de produits pertinents", "home.categoriesKicker": "Trouvez le bon produit", "home.categories": "Explorer par univers", "home.all": "Tout le catalogue", "home.featuredKicker": "Nos choix", "home.featured": "Produits en vedette", "home.catalog": "Ouvrir le catalogue", "home.demo": "Catalogue de démonstration", "home.demoText": "Ces exemples présentent l’expérience de la boutique pendant la préparation de l’assortiment réel.", "home.manifesto": "Pas le plus grand catalogue. Le plus clair.", "home.manifestoText": "Ekobit associe expertise, simplicité et expérience numérique sans stress.", "home.years": "ans d’expérience", "home.countries": "langues disponibles", "home.human": "assistance réelle",
    "catalog.kicker": "La technologie, en toute simplicité", "catalog.all": "Tous les produits", "catalog.lead": "Une sélection essentielle, des prix clairs et une assistance complète.", "catalog.sort": "Trier", "catalog.featured": "En vedette", "catalog.priceAsc": "Prix croissant", "catalog.priceDesc": "Prix décroissant", "catalog.name": "Nom", "catalog.updating": "Mise à jour du catalogue…", "catalog.demo": "Vous explorez le catalogue de démonstration.", "catalog.found": "produits trouvés", "catalog.empty": "Aucun produit trouvé", "catalog.emptyText": "Essayez une autre catégorie ou une recherche plus simple.", "catalog.reset": "Réinitialiser",
    "product.details": "Détails", "product.add": "Ajouter au panier", "product.unavailable": "Indisponible", "product.available": "Disponible", "product.fast": "Livraison suivie", "product.fastText": "Délais et coûts toujours visibles", "product.protected": "Achat protégé", "product.protectedText": "Garantie légale applicable", "product.sheet": "Fiche produit", "product.specs": "Caractéristiques techniques", "product.related": "Produits associés", "product.loading": "Chargement du produit…", "product.notFound": "Produit introuvable", "product.back": "Retour au catalogue",
    "page.about": "À propos", "page.support": "Assistance", "page.contact": "Contact", "page.privacy": "Politique de confidentialité", "page.cookies": "Politique cookies", "page.terms": "Conditions générales", "page.shipping": "Livraison et retours", "footer.tagline": "Une technologie utile, sélectionnée avec soin et soutenue par de vraies personnes.", "footer.shop": "Acheter", "footer.company": "Ekobit", "footer.legal": "Informations légales", "footer.rights": "Tous droits réservés.", "footer.settings": "Préférences cookies",
    "cookie.kicker": "Votre vie privée, sans piège", "cookie.title": "Choisissez ce que vous activez", "cookie.text": "Seul le stockage technique est utilisé. Les cartes et futurs outils statistiques restent désactivés sans votre accord.", "cookie.reject": "Nécessaires uniquement", "cookie.accept": "Tout accepter", "cookie.customize": "Personnaliser", "cookie.save": "Enregistrer", "cookie.necessary": "Nécessaires", "cookie.necessaryText": "Langue, panier et consentement. Toujours actifs.", "cookie.analytics": "Statistiques", "cookie.analyticsText": "Mesure agrégée, pas encore installée.", "cookie.marketing": "Marketing", "cookie.marketingText": "Campagnes personnalisées, pas encore installées.", "cookie.external": "Contenu externe", "cookie.externalText": "Autorise le chargement de Google Maps.", "common.learn": "En savoir plus", "common.remove": "Supprimer", "common.continue": "Continuer mes achats", "common.subtotal": "Sous-total", "common.checkout": "Passer au paiement", "common.calculated": "Calculée plus tard", "common.quantity": "Quantité", "common.draft": "Projet informatif à faire valider avant l’ouverture commerciale.",
  },
  de: {
    "top.shipping": "Sendungsverfolgung • persönlicher Support", "nav.home": "Start", "nav.shop": "Shop", "nav.new": "Neuheiten", "nav.offers": "Angebote", "nav.about": "Über uns", "nav.support": "Hilfe", "nav.contact": "Kontakt", "nav.categories": "Kategorien", "nav.account": "Konto", "nav.wishlist": "Merkliste", "nav.cart": "Warenkorb", "nav.help": "Brauchen Sie Hilfe?", "nav.talk": "Kontakt aufnehmen",
    "search.placeholder": "Produkte, Marken, Kategorien suchen…", "search.quick": "Schnelle Ergebnisse", "search.none": "Keine Ergebnisse", "search.popular": "Beliebte Suchen", "search.all": "Alle Ergebnisse",
    "cart.title": "Ihr Warenkorb", "cart.items": "Artikel", "cart.emptyTitle": "Ihr Warenkorb ist bereit", "cart.emptyText": "Fügen Sie ein Produkt hinzu – es bleibt beim Surfen gespeichert.", "cart.start": "Einkaufen", "cart.total": "Gesamt", "cart.shipping": "Versand wird an der Kasse berechnet", "cart.open": "Warenkorb öffnen",
    "home.kicker": "Smart living · made simple", "home.titleA": "Technik für Zuhause,", "home.titleB": "bewusst ausgewählt.", "home.lead": "Eine klare Auswahl sinnvoller Haushaltsgeräte – mit echten Menschen und über zwanzig Jahren Erfahrung.", "home.explore": "Shop entdecken", "home.story": "Ekobit kennenlernen", "home.delivery": "Verfolgte Lieferung", "home.deliveryText": "Klare Zeiten und Kosten vor der Zahlung", "home.secure": "Geschützte Zahlungen", "home.secureText": "Zertifizierte Anbieter und verschlüsselte Daten", "home.support": "Persönlicher Support", "home.supportText": "Vor, während und nach dem Kauf", "home.curated": "Kuratierte Auswahl", "home.curatedText": "Weniger Lärm, mehr sinnvolle Produkte", "home.categoriesKicker": "Das richtige Produkt finden", "home.categories": "Nach Wohnbereich entdecken", "home.all": "Gesamter Katalog", "home.featuredKicker": "Aktuelle Auswahl", "home.featured": "Empfohlene Produkte", "home.catalog": "Katalog öffnen", "home.demo": "Demo-Katalog", "home.demoText": "Diese Beispielprodukte zeigen das Einkaufserlebnis, während wir das echte Sortiment vorbereiten.", "home.manifesto": "Nicht der größte Katalog. Der klarste.", "home.manifestoText": "Ekobit verbindet Kompetenz, Einfachheit und stressfreies digitales Einkaufen.", "home.years": "Jahre Erfahrung", "home.countries": "verfügbare Sprachen", "home.human": "echter Support",
    "catalog.kicker": "Technik, ganz ohne Umwege", "catalog.all": "Alle Produkte", "catalog.lead": "Eine klare Auswahl, transparente Preise und Support vor und nach dem Kauf.", "catalog.sort": "Sortieren", "catalog.featured": "Empfohlen", "catalog.priceAsc": "Preis aufsteigend", "catalog.priceDesc": "Preis absteigend", "catalog.name": "Name", "catalog.updating": "Katalog wird aktualisiert…", "catalog.demo": "Sie sehen den Demo-Katalog.", "catalog.found": "Produkte gefunden", "catalog.empty": "Keine Produkte gefunden", "catalog.emptyText": "Versuchen Sie eine andere Kategorie oder eine einfachere Suche.", "catalog.reset": "Filter zurücksetzen",
    "product.details": "Details", "product.add": "In den Warenkorb", "product.unavailable": "Nicht verfügbar", "product.available": "Verfügbar", "product.fast": "Verfolgte Lieferung", "product.fastText": "Zeiten und Kosten immer sichtbar", "product.protected": "Geschützter Kauf", "product.protectedText": "Anwendbare gesetzliche Gewährleistung", "product.sheet": "Produktdaten", "product.specs": "Technische Daten", "product.related": "Ähnliche Produkte", "product.loading": "Produkt wird geladen…", "product.notFound": "Produkt nicht gefunden", "product.back": "Zurück zum Katalog",
    "page.about": "Über uns", "page.support": "Hilfe", "page.contact": "Kontakt", "page.privacy": "Datenschutz", "page.cookies": "Cookie-Richtlinie", "page.terms": "Allgemeine Geschäftsbedingungen", "page.shipping": "Versand und Rückgabe", "footer.tagline": "Nützliche Technik, sorgfältig ausgewählt und von echten Menschen begleitet.", "footer.shop": "Shop", "footer.company": "Ekobit", "footer.legal": "Rechtliches", "footer.rights": "Alle Rechte vorbehalten.", "footer.settings": "Cookie-Einstellungen",
    "cookie.kicker": "Ihre Privatsphäre, ohne Tricks", "cookie.title": "Sie entscheiden", "cookie.text": "Wir verwenden nur technischen Speicher. Karten und zukünftige Statistiktools bleiben ohne Zustimmung aus.", "cookie.reject": "Nur notwendige", "cookie.accept": "Alle akzeptieren", "cookie.customize": "Anpassen", "cookie.save": "Einstellungen speichern", "cookie.necessary": "Notwendig", "cookie.necessaryText": "Sprache, Warenkorb und Einwilligung. Immer aktiv.", "cookie.analytics": "Analyse", "cookie.analyticsText": "Aggregierte Messung, noch nicht installiert.", "cookie.marketing": "Marketing", "cookie.marketingText": "Personalisierte Kampagnen, noch nicht installiert.", "cookie.external": "Externe Inhalte", "cookie.externalText": "Erlaubt das Laden von Google Maps.", "common.learn": "Mehr erfahren", "common.remove": "Entfernen", "common.continue": "Weiter einkaufen", "common.subtotal": "Zwischensumme", "common.checkout": "Zur Kasse", "common.calculated": "Später berechnet", "common.quantity": "Menge", "common.draft": "Informationsentwurf, vor dem Verkaufsstart rechtlich zu prüfen.",
  },
  es: {
    "top.shipping": "Envío con seguimiento • asistencia humana", "nav.home": "Inicio", "nav.shop": "Tienda", "nav.new": "Novedades", "nav.offers": "Ofertas", "nav.about": "Quiénes somos", "nav.support": "Ayuda", "nav.contact": "Contacto", "nav.categories": "Categorías", "nav.account": "Cuenta", "nav.wishlist": "Favoritos", "nav.cart": "Carrito", "nav.help": "¿Necesitas ayuda?", "nav.talk": "Habla con nosotros",
    "search.placeholder": "Buscar productos, marcas, categorías…", "search.quick": "Resultados rápidos", "search.none": "Sin resultados", "search.popular": "Búsquedas populares", "search.all": "Ver todos los resultados",
    "cart.title": "Tu carrito", "cart.items": "artículos", "cart.emptyTitle": "Tu carrito está listo", "cart.emptyText": "Añade un producto y seguirá guardado mientras navegas.", "cart.start": "Empezar a comprar", "cart.total": "Total", "cart.shipping": "Envío calculado al finalizar", "cart.open": "Abrir carrito",
    "home.kicker": "Smart living · made simple", "home.titleA": "Tecnología para casa,", "home.titleB": "elegida con criterio.", "home.lead": "Una selección clara de electrodomésticos útiles, respaldada por personas reales y más de veinte años de experiencia.", "home.explore": "Explorar la tienda", "home.story": "Conocer Ekobit", "home.delivery": "Entrega con seguimiento", "home.deliveryText": "Plazos y costes claros antes del pago", "home.secure": "Pagos protegidos", "home.secureText": "Proveedores certificados y datos cifrados", "home.support": "Asistencia humana", "home.supportText": "Antes, durante y después de la compra", "home.curated": "Selección cuidada", "home.curatedText": "Menos ruido, más productos útiles", "home.categoriesKicker": "Encuentra el producto adecuado", "home.categories": "Explora por ambiente", "home.all": "Todo el catálogo", "home.featuredKicker": "Selección actual", "home.featured": "Productos destacados", "home.catalog": "Abrir catálogo", "home.demo": "Catálogo de demostración", "home.demoText": "Estos productos de ejemplo muestran la experiencia mientras preparamos el surtido real.", "home.manifesto": "No el catálogo más grande. El más claro.", "home.manifestoText": "Ekobit combina experiencia, sencillez y una experiencia digital sin estrés.", "home.years": "años de experiencia", "home.countries": "idiomas disponibles", "home.human": "asistencia real",
    "catalog.kicker": "Tecnología, sin complicaciones", "catalog.all": "Todos los productos", "catalog.lead": "Una selección clara, precios transparentes y asistencia antes y después de comprar.", "catalog.sort": "Ordenar", "catalog.featured": "Destacados", "catalog.priceAsc": "Precio ascendente", "catalog.priceDesc": "Precio descendente", "catalog.name": "Nombre", "catalog.updating": "Actualizando catálogo…", "catalog.demo": "Estás explorando el catálogo de demostración.", "catalog.found": "productos encontrados", "catalog.empty": "No se encontraron productos", "catalog.emptyText": "Prueba otra categoría o una búsqueda más sencilla.", "catalog.reset": "Restablecer filtros",
    "product.details": "Detalles", "product.add": "Añadir al carrito", "product.unavailable": "No disponible", "product.available": "Disponible", "product.fast": "Entrega con seguimiento", "product.fastText": "Plazos y costes siempre visibles", "product.protected": "Compra protegida", "product.protectedText": "Garantía legal aplicable", "product.sheet": "Ficha del producto", "product.specs": "Características técnicas", "product.related": "Productos relacionados", "product.loading": "Cargando producto…", "product.notFound": "Producto no encontrado", "product.back": "Volver al catálogo",
    "page.about": "Quiénes somos", "page.support": "Ayuda", "page.contact": "Contacto", "page.privacy": "Política de privacidad", "page.cookies": "Política de cookies", "page.terms": "Términos y condiciones", "page.shipping": "Envíos y devoluciones", "footer.tagline": "Tecnología útil, seleccionada con cuidado y respaldada por personas reales.", "footer.shop": "Comprar", "footer.company": "Ekobit", "footer.legal": "Información legal", "footer.rights": "Todos los derechos reservados.", "footer.settings": "Preferencias de cookies",
    "cookie.kicker": "Tu privacidad, sin trucos", "cookie.title": "Tú eliges qué activar", "cookie.text": "Solo usamos almacenamiento técnico. Los mapas y futuras estadísticas permanecen desactivados sin permiso.", "cookie.reject": "Solo necesarias", "cookie.accept": "Aceptar todo", "cookie.customize": "Personalizar", "cookie.save": "Guardar preferencias", "cookie.necessary": "Necesarias", "cookie.necessaryText": "Idioma, carrito y consentimiento. Siempre activas.", "cookie.analytics": "Analítica", "cookie.analyticsText": "Medición agregada, todavía no instalada.", "cookie.marketing": "Marketing", "cookie.marketingText": "Campañas personalizadas, todavía no instaladas.", "cookie.external": "Contenido externo", "cookie.externalText": "Permite cargar Google Maps.", "common.learn": "Más información", "common.remove": "Eliminar", "common.continue": "Seguir comprando", "common.subtotal": "Subtotal", "common.checkout": "Finalizar compra", "common.calculated": "Calculado después", "common.quantity": "Cantidad", "common.draft": "Borrador informativo pendiente de revisión legal antes del lanzamiento comercial.",
  },
};

const CATEGORY_COPY: Record<Locale, Record<string, string>> = {
  it: { Tutti: "Tutti", Lavaggio: "Lavaggio", Freddo: "Freddo", Cottura: "Cottura", Pulizia: "Pulizia", "Piccoli elettrodomestici": "Piccoli elettrodomestici" },
  en: { Tutti: "All", Lavaggio: "Laundry", Freddo: "Cooling", Cottura: "Cooking", Pulizia: "Cleaning", "Piccoli elettrodomestici": "Small appliances" },
  fr: { Tutti: "Tous", Lavaggio: "Lavage", Freddo: "Froid", Cottura: "Cuisson", Pulizia: "Nettoyage", "Piccoli elettrodomestici": "Petit électroménager" },
  de: { Tutti: "Alle", Lavaggio: "Wäschepflege", Freddo: "Kühlen", Cottura: "Kochen", Pulizia: "Reinigung", "Piccoli elettrodomestici": "Kleingeräte" },
  es: { Tutti: "Todos", Lavaggio: "Lavado", Freddo: "Frío", Cottura: "Cocción", Pulizia: "Limpieza", "Piccoli elettrodomestici": "Pequeños electrodomésticos" },
};

function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && (LOCALES as readonly string[]).includes(value));
}

@Injectable({ providedIn: "root" })
export class I18nService {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  readonly locale = signal<Locale>(this.localeFromUrl(this.router.url));
  readonly languages = LANGUAGES;

  constructor() {
    this.applyLocale(this.localeFromUrl(this.router.url), this.router.url);
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => {
      this.applyLocale(this.localeFromUrl(event.urlAfterRedirects), event.urlAfterRedirects);
    });
  }

  t(key: string): string {
    return COPY[this.locale()][key] ?? COPY.en[key] ?? key;
  }

  category(value: string): string {
    return CATEGORY_COPY[this.locale()][value] ?? value;
  }

  route(page: PageKey, id?: string): string {
    const locale = this.locale();
    const slug = SLUGS[locale][page];
    const base = slug ? `/${locale}/${slug}` : `/${locale}`;
    return id ? `${base}/${encodeURIComponent(id)}` : base;
  }

  currency(value: number): string {
    return new Intl.NumberFormat(this.locale(), { style: "currency", currency: "EUR" }).format(value);
  }

  switchLanguage(locale: Locale): void {
    if (locale === this.locale()) return;
    const [path, suffix = ""] = this.router.url.split(/(?=[?#])/);
    const parts = path.split("/").filter(Boolean);
    const currentLocale = isLocale(parts[0]) ? parts[0] : this.locale();
    const currentSlug = parts[1] ?? "";
    const page = (Object.keys(SLUGS[currentLocale]) as PageKey[]).find((key) => SLUGS[currentLocale][key] === currentSlug) ?? "home";
    const id = page === "product" ? parts[2] : undefined;
    const nextSlug = SLUGS[locale][page];
    const nextPath = `/${locale}${nextSlug ? `/${nextSlug}` : ""}${id ? `/${id}` : ""}${suffix}`;
    void this.router.navigateByUrl(nextPath);
  }

  private localeFromUrl(url: string): Locale {
    const value = url.split(/[?#]/)[0].split("/").filter(Boolean)[0];
    return isLocale(value) ? value : "it";
  }

  private applyLocale(locale: Locale, url: string): void {
    this.locale.set(locale);
    this.document.documentElement.lang = locale;
    const page = this.pageFromUrl(url, locale);
    const titleKey: Record<PageKey, string> = {
      home: "home.kicker", catalog: "catalog.all", product: "product.details", cart: "nav.cart",
      about: "page.about", support: "page.support", contact: "page.contact", privacy: "page.privacy",
      cookies: "page.cookies", terms: "page.terms", shipping: "page.shipping",
    };
    this.document.title = page === "home" ? `Ekobit | ${this.t(titleKey[page])}` : `${this.t(titleKey[page])} | Ekobit`;
    this.upsertMeta("description", page === "home" ? this.t("home.lead") : this.t("footer.tagline"));
    const cleanPath = url.split(/[?#]/)[0] || `/${locale}`;
    this.upsertCanonical(`${this.document.location.origin}${cleanPath}`);
  }

  private pageFromUrl(url: string, locale: Locale): PageKey {
    const slug = url.split(/[?#]/)[0].split("/").filter(Boolean)[1] ?? "";
    return (Object.keys(SLUGS[locale]) as PageKey[]).find((page) => SLUGS[locale][page] === slug) ?? "home";
  }

  private upsertMeta(name: string, content: string): void {
    let element = this.document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
    if (!element) {
      element = this.document.createElement("meta");
      element.name = name;
      this.document.head.appendChild(element);
    }
    element.content = content;
  }

  private upsertCanonical(href: string): void {
    let element = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!element) {
      element = this.document.createElement("link");
      element.rel = "canonical";
      this.document.head.appendChild(element);
    }
    element.href = href;
  }
}
