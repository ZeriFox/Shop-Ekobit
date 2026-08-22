import { Component, computed, inject } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { LucideArrowRight, LucideFileCheck2, LucideInfo, LucideMail } from "@lucide/angular";
import { COMPANY } from "../config/company";
import { I18nService, type Locale } from "../i18n/i18n.service";

type LegalDocument = "privacy" | "cookies" | "terms" | "shipping";
type LegalCopy = { intro: string; sections: Array<{ title: string; body: string }> };

const LEGAL_COPY: Record<Locale, Record<LegalDocument, LegalCopy>> = {
  it: {
    privacy: { intro: "Questa informativa descrive come Ekobit tratta i dati personali quando visiti il sito, ci contatti o utilizzi i servizi dello shop.", sections: [
      { title: "Titolare e contatti", body: "Il titolare è Ekobit S.r.l., Via Firenze 185, 88900 Crotone (KR), Italia. Per richieste privacy puoi scrivere a info@ekobit.it." },
      { title: "Dati, finalità e basi giuridiche", body: "Possiamo trattare dati tecnici di navigazione, preferenze, richieste di contatto e, quando il checkout sarà attivo, dati necessari a ordini, pagamenti, consegna, assistenza e obblighi fiscali. Le basi sono esecuzione del contratto, obbligo legale, interesse legittimo e consenso quando richiesto." },
      { title: "Conservazione e destinatari", body: "Conserviamo i dati per il tempo necessario alla finalità e ai termini di legge. Possiamo utilizzare fornitori di hosting, pagamento, consegna e assistenza vincolati da accordi adeguati. Gli eventuali trasferimenti extra SEE richiederanno garanzie conformi al GDPR." },
      { title: "I tuoi diritti", body: "Puoi chiedere accesso, rettifica, cancellazione, limitazione, opposizione e portabilità, oltre a revocare il consenso. Puoi anche presentare reclamo al Garante per la protezione dei dati personali." },
    ]},
    cookies: { intro: "Il sito usa memoria locale e, solo con la tua scelta, può caricare servizi esterni. Nessuno strumento opzionale è attivo per impostazione predefinita.", sections: [
      { title: "Strumenti necessari", body: "Lingua, carrello, preferiti e scelta cookie sono memorizzati nel browser per fornire le funzioni richieste. Questi dati non vengono usati per pubblicità comportamentale." },
      { title: "Analisi e marketing", body: "Gli strumenti analitici e marketing non sono ancora installati. Se verranno aggiunti, resteranno disattivati fino a un consenso libero e revocabile." },
      { title: "Contenuti esterni", body: "Google Maps viene caricato soltanto dopo il consenso ai contenuti esterni. Il fornitore può trattare dati tecnici secondo la propria informativa." },
      { title: "Gestione delle preferenze", body: "Puoi riaprire in ogni momento il pannello dal footer. Puoi anche cancellare dati locali e cookie dalle impostazioni del browser." },
    ]},
    terms: { intro: "Queste condizioni costituiscono una bozza precontrattuale per il futuro shop e dovranno essere completate con pagamenti, destinazioni servite e condizioni logistiche definitive.", sections: [
      { title: "Venditore", body: "Il venditore è Ekobit S.r.l., Via Firenze 185, 88900 Crotone (KR), Italia, P. IVA IT02424510796, contattabile a info@ekobit.it." },
      { title: "Prodotti, prezzi e ordini", body: "Caratteristiche, disponibilità, prezzo in euro, imposte e costi di consegna saranno mostrati prima dell’ordine. Il contratto si conclude solo dopo la conferma espressa di Ekobit e l’esito positivo del pagamento." },
      { title: "Recesso e garanzia", body: "Il consumatore può esercitare il recesso entro 14 giorni dalla consegna, salvo eccezioni di legge. I beni nuovi sono coperti dalla garanzia legale di conformità applicabile nello Stato del consumatore e comunque secondo le norme UE e italiane." },
      { title: "Responsabilità e legge applicabile", body: "Restano impregiudicati i diritti inderogabili del consumatore nel proprio Paese UE. Reclami e richieste possono essere inviati a info@ekobit.it; prima del lancio saranno indicati eventuali organismi ADR competenti." },
    ]},
    shipping: { intro: "Le opzioni di consegna saranno attivate progressivamente. Destinazioni, tempi e costi definitivi verranno sempre mostrati prima del pagamento.", sections: [
      { title: "Consegne", body: "Le spedizioni saranno tracciate e disponibili soltanto verso le destinazioni selezionabili al checkout. Tempi stimati, corriere, eventuali limiti e costi saranno comunicati prima dell’ordine." },
      { title: "Danni e mancata consegna", body: "Segnala tempestivamente imballi danneggiati o anomalie, conservando fotografie e documentazione. Ti assisteremo senza limitare i diritti previsti dalla garanzia legale." },
      { title: "Recesso entro 14 giorni", body: "Puoi comunicare la decisione di recedere entro 14 giorni dalla consegna. Salvo diversa indicazione o prodotto difettoso, il costo della restituzione può essere a carico del cliente." },
      { title: "Come richiedere un reso", body: "Scrivi a info@ekobit.it indicando numero d’ordine, prodotto e motivo. Ti invieremo istruzioni e indirizzo di rientro; non spedire prodotti senza autorizzazione." },
    ]},
  },
  en: {
    privacy: { intro: "This notice explains how Ekobit processes personal data when you browse, contact us or use the shop services.", sections: [
      { title: "Controller and contact", body: "The controller is Ekobit S.r.l., Via Firenze 185, 88900 Crotone (KR), Italy. Privacy requests can be sent to info@ekobit.it." },
      { title: "Data, purposes and legal bases", body: "We may process technical browsing data, preferences, contact requests and, once checkout is active, data needed for orders, payments, delivery, support and tax duties. Legal bases include contract performance, legal obligations, legitimate interests and consent where required." },
      { title: "Retention and recipients", body: "Data is kept only as long as needed and required by law. Hosting, payment, delivery and support providers may process data under suitable agreements. Transfers outside the EEA will require GDPR safeguards." },
      { title: "Your rights", body: "You may request access, correction, deletion, restriction, objection and portability, and withdraw consent. You may also complain to the competent data protection authority." },
    ]},
    cookies: { intro: "The site uses local storage and may load external services only after your choice. Optional tools are off by default.", sections: [
      { title: "Necessary storage", body: "Language, cart, wishlist and consent choices are stored in your browser to provide requested features. They are not used for behavioural advertising." },
      { title: "Analytics and marketing", body: "Analytics and marketing tools are not installed yet. If added, they will remain off until freely given, revocable consent." },
      { title: "External content", body: "Google Maps loads only after consent to external content. The provider may process technical data under its own notice." },
      { title: "Managing preferences", body: "You can reopen the panel from the footer at any time and remove local data or cookies in your browser settings." },
    ]},
    terms: { intro: "These terms are a pre-contractual draft for the future shop and must be completed with final payment, destination and logistics details.", sections: [
      { title: "Seller", body: "The seller is Ekobit S.r.l., Via Firenze 185, 88900 Crotone (KR), Italy, VAT IT02424510796, reachable at info@ekobit.it." },
      { title: "Products, prices and orders", body: "Features, availability, euro price, taxes and delivery costs will be shown before ordering. A contract is formed only after Ekobit confirms the order and payment succeeds." },
      { title: "Withdrawal and legal guarantee", body: "Consumers may withdraw within 14 days of delivery, subject to legal exceptions. New goods benefit from the applicable legal conformity guarantee under EU, Italian and mandatory local consumer rules." },
      { title: "Liability and applicable law", body: "Mandatory consumer rights in the customer’s EU country remain unaffected. Complaints may be sent to info@ekobit.it; relevant ADR bodies will be listed before launch." },
    ]},
    shipping: { intro: "Delivery options will be enabled progressively. Final destinations, times and costs will always be shown before payment.", sections: [
      { title: "Delivery", body: "Tracked shipping will be available only to destinations selectable at checkout. Estimated times, carrier, limits and costs will be provided before ordering." },
      { title: "Damage or failed delivery", body: "Report damaged packaging or anomalies promptly and keep photos and documents. We will assist without restricting your legal guarantee rights." },
      { title: "14-day withdrawal", body: "You may notify us of withdrawal within 14 days of delivery. Unless stated otherwise or the item is defective, return costs may be borne by the customer." },
      { title: "Requesting a return", body: "Email info@ekobit.it with order number, product and reason. We will send instructions and the return address; do not ship without authorization." },
    ]},
  },
  fr: {
    privacy: { intro: "Cette notice explique comment Ekobit traite les données personnelles lors de la navigation, des contacts et de l’utilisation de la boutique.", sections: [
      { title: "Responsable et contact", body: "Le responsable est Ekobit S.r.l., Via Firenze 185, 88900 Crotone (KR), Italie. Écrivez à info@ekobit.it pour toute demande." },
      { title: "Données, finalités et bases", body: "Nous pouvons traiter les données techniques, préférences, demandes et, lorsque le paiement sera actif, les données nécessaires aux commandes, paiements, livraisons, assistance et obligations fiscales." },
      { title: "Conservation et destinataires", body: "Les données sont conservées pendant la durée nécessaire et légale. Des prestataires d’hébergement, paiement, livraison et assistance peuvent intervenir avec des garanties appropriées." },
      { title: "Vos droits", body: "Vous pouvez demander accès, rectification, effacement, limitation, opposition et portabilité, retirer votre consentement et saisir l’autorité compétente." },
    ]},
    cookies: { intro: "Le site utilise le stockage local et ne charge les services externes qu’après votre choix.", sections: [
      { title: "Stockage nécessaire", body: "Langue, panier, favoris et consentement sont enregistrés dans le navigateur pour fournir les fonctions demandées." },
      { title: "Analyse et marketing", body: "Ces outils ne sont pas encore installés et resteront désactivés sans consentement libre et révocable." },
      { title: "Contenus externes", body: "Google Maps est chargé uniquement après consentement. Le fournisseur peut traiter des données techniques selon sa politique." },
      { title: "Vos préférences", body: "Rouvrez le panneau depuis le pied de page ou supprimez les données dans les réglages du navigateur." },
    ]},
    terms: { intro: "Ces conditions sont un projet précontractuel pour la future boutique, à compléter avant le lancement.", sections: [
      { title: "Vendeur", body: "Ekobit S.r.l., Via Firenze 185, 88900 Crotone (KR), Italie, TVA IT02424510796, info@ekobit.it." },
      { title: "Produits, prix et commandes", body: "Caractéristiques, disponibilité, prix en euros, taxes et livraison seront affichés avant la commande. Le contrat naît après confirmation et paiement accepté." },
      { title: "Rétractation et garantie", body: "Le consommateur dispose de 14 jours après livraison pour se rétracter, sauf exceptions légales. La garantie légale de conformité applicable reste entière." },
      { title: "Droit applicable", body: "Les droits impératifs du consommateur dans son pays UE restent protégés. Les réclamations peuvent être envoyées à info@ekobit.it." },
    ]},
    shipping: { intro: "Les options de livraison seront activées progressivement. Destinations, délais et coûts seront affichés avant paiement.", sections: [
      { title: "Livraison", body: "L’expédition suivie sera proposée uniquement vers les destinations disponibles au paiement." },
      { title: "Dommages", body: "Signalez rapidement tout emballage endommagé et conservez photos et documents." },
      { title: "Rétractation sous 14 jours", body: "Vous pouvez notifier votre rétractation dans les 14 jours suivant la livraison. Les frais de retour peuvent rester à votre charge, sauf défaut." },
      { title: "Demander un retour", body: "Écrivez à info@ekobit.it avec le numéro de commande et le produit pour recevoir les instructions." },
    ]},
  },
  de: {
    privacy: { intro: "Diese Hinweise erklären, wie Ekobit personenbezogene Daten beim Besuch, bei Kontaktanfragen und bei der Shop-Nutzung verarbeitet.", sections: [
      { title: "Verantwortlicher", body: "Verantwortlich ist Ekobit S.r.l., Via Firenze 185, 88900 Crotone (KR), Italien. Datenschutzanfragen: info@ekobit.it." },
      { title: "Daten, Zwecke und Rechtsgrundlagen", body: "Wir können technische Daten, Präferenzen, Anfragen und künftig für Bestellung, Zahlung, Lieferung, Support und Steuerpflichten erforderliche Daten verarbeiten." },
      { title: "Speicherung und Empfänger", body: "Daten werden nur zweck- und gesetzmäßig gespeichert. Hosting-, Zahlungs-, Versand- und Supportanbieter können unter geeigneten Vereinbarungen eingebunden sein." },
      { title: "Ihre Rechte", body: "Sie können Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Übertragbarkeit verlangen, Einwilligungen widerrufen und sich beschweren." },
    ]},
    cookies: { intro: "Die Website nutzt lokalen Speicher und lädt externe Dienste nur nach Ihrer Auswahl.", sections: [
      { title: "Notwendiger Speicher", body: "Sprache, Warenkorb, Merkliste und Einwilligung werden für gewünschte Funktionen im Browser gespeichert." },
      { title: "Analyse und Marketing", body: "Diese Werkzeuge sind noch nicht installiert und bleiben ohne freiwillige, widerrufliche Einwilligung aus." },
      { title: "Externe Inhalte", body: "Google Maps wird nur nach Einwilligung geladen. Der Anbieter kann technische Daten nach eigenen Hinweisen verarbeiten." },
      { title: "Einstellungen", body: "Öffnen Sie das Panel jederzeit über den Footer oder löschen Sie lokale Daten im Browser." },
    ]},
    terms: { intro: "Diese Bedingungen sind ein vorvertraglicher Entwurf für den künftigen Shop und vor dem Start zu vervollständigen.", sections: [
      { title: "Verkäufer", body: "Ekobit S.r.l., Via Firenze 185, 88900 Crotone (KR), Italien, USt-IdNr. IT02424510796, info@ekobit.it." },
      { title: "Produkte, Preise und Bestellungen", body: "Eigenschaften, Verfügbarkeit, Euro-Preis, Steuern und Versandkosten werden vor der Bestellung angezeigt. Der Vertrag entsteht nach Bestätigung und erfolgreicher Zahlung." },
      { title: "Widerruf und Gewährleistung", body: "Verbraucher können binnen 14 Tagen nach Lieferung widerrufen, vorbehaltlich gesetzlicher Ausnahmen. Die anwendbare gesetzliche Gewährleistung bleibt bestehen." },
      { title: "Anwendbares Recht", body: "Zwingende Verbraucherrechte im jeweiligen EU-Land bleiben unberührt. Beschwerden: info@ekobit.it." },
    ]},
    shipping: { intro: "Die Lieferoptionen werden schrittweise aktiviert. Ziele, Zeiten und Kosten erscheinen vor der Zahlung.", sections: [
      { title: "Lieferung", body: "Verfolgter Versand erfolgt nur an im Checkout auswählbare Ziele." },
      { title: "Schäden", body: "Melden Sie beschädigte Verpackungen zeitnah und bewahren Sie Fotos und Unterlagen auf." },
      { title: "14 Tage Widerruf", body: "Der Widerruf kann binnen 14 Tagen nach Lieferung erklärt werden. Rücksendekosten können außer bei Mängeln beim Kunden liegen." },
      { title: "Rückgabe anfordern", body: "Senden Sie Bestellnummer und Produkt an info@ekobit.it, um Anweisungen zu erhalten." },
    ]},
  },
  es: {
    privacy: { intro: "Este aviso explica cómo Ekobit trata los datos personales al navegar, contactar y utilizar la tienda.", sections: [
      { title: "Responsable y contacto", body: "El responsable es Ekobit S.r.l., Via Firenze 185, 88900 Crotone (KR), Italia. Solicitudes: info@ekobit.it." },
      { title: "Datos, fines y bases", body: "Podemos tratar datos técnicos, preferencias, consultas y, cuando se active el pago, datos necesarios para pedidos, pagos, entregas, asistencia y obligaciones fiscales." },
      { title: "Conservación y destinatarios", body: "Los datos se conservan durante el tiempo necesario y legal. Proveedores de alojamiento, pago, entrega y asistencia pueden intervenir con garantías adecuadas." },
      { title: "Tus derechos", body: "Puedes solicitar acceso, rectificación, supresión, limitación, oposición y portabilidad, retirar el consentimiento y reclamar ante la autoridad competente." },
    ]},
    cookies: { intro: "El sitio usa almacenamiento local y solo carga servicios externos después de tu elección.", sections: [
      { title: "Almacenamiento necesario", body: "Idioma, carrito, favoritos y consentimiento se guardan en el navegador para prestar las funciones solicitadas." },
      { title: "Analítica y marketing", body: "Estas herramientas aún no están instaladas y seguirán desactivadas sin consentimiento libre y revocable." },
      { title: "Contenido externo", body: "Google Maps solo se carga tras el consentimiento. El proveedor puede tratar datos técnicos según su política." },
      { title: "Gestionar preferencias", body: "Puedes reabrir el panel desde el pie de página o borrar los datos en el navegador." },
    ]},
    terms: { intro: "Estas condiciones son un borrador precontractual para la futura tienda y deberán completarse antes del lanzamiento.", sections: [
      { title: "Vendedor", body: "Ekobit S.r.l., Via Firenze 185, 88900 Crotone (KR), Italia, IVA IT02424510796, info@ekobit.it." },
      { title: "Productos, precios y pedidos", body: "Características, disponibilidad, precio en euros, impuestos y entrega aparecerán antes del pedido. El contrato nace tras la confirmación y el pago aceptado." },
      { title: "Desistimiento y garantía", body: "El consumidor dispone de 14 días desde la entrega para desistir, salvo excepciones legales. Se mantiene la garantía legal de conformidad aplicable." },
      { title: "Ley aplicable", body: "Los derechos imperativos del consumidor en su país de la UE permanecen protegidos. Reclamaciones: info@ekobit.it." },
    ]},
    shipping: { intro: "Las opciones de entrega se activarán progresivamente. Destinos, plazos y costes se mostrarán antes del pago.", sections: [
      { title: "Entrega", body: "Los envíos con seguimiento solo estarán disponibles a destinos seleccionables en el checkout." },
      { title: "Daños", body: "Informa pronto de embalajes dañados y conserva fotos y documentos." },
      { title: "Desistimiento en 14 días", body: "Puedes comunicar el desistimiento en los 14 días posteriores a la entrega. El coste de devolución puede corresponder al cliente salvo defecto." },
      { title: "Solicitar devolución", body: "Escribe a info@ekobit.it con número de pedido y producto para recibir instrucciones." },
    ]},
  },
};

@Component({
  imports: [RouterLink, LucideArrowRight, LucideFileCheck2, LucideInfo, LucideMail],
  templateUrl: "./legal.page.html",
})
export class LegalPage {
  private readonly route = inject(ActivatedRoute);
  readonly i18n = inject(I18nService);
  readonly company = COMPANY;
  readonly document = (this.route.snapshot.data["document"] as LegalDocument | undefined) ?? "privacy";
  readonly copy = computed(() => LEGAL_COPY[this.i18n.locale()][this.document]);
  readonly title = computed(() => this.i18n.t(`page.${this.document}`));
}
