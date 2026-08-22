# Shop Ekobit

Frontend ecommerce multipagina in Angular e TypeScript, con catalogo Firestore
letto esclusivamente da una Vercel Function server-side.

## Sviluppo locale

```bash
npm install
npm start
```

Il sito è disponibile su [http://localhost:4200](http://localhost:4200).

## Firebase Admin

Firebase viene usato soltanto sul server. Copia `.env.example` in `.env.local` e
inserisci una service-account key valida e non condivisa:

```dotenv
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=""
FIREBASE_DATABASE_ID=shop
```

Queste variabili non devono avere prefissi pubblici. `.env.local` è ignorato da
Git; su Vercel le credenziali vanno impostate nelle Environment Variables del
progetto. `FIREBASE_DATABASE_ID` è opzionale e usa `shop` come valore
predefinito. Per i Preview Deployment è preferibile un progetto Firebase
separato da quello di produzione.

La collection Firestore attesa è `products` nel database Enterprise nominato
`shop`. Ogni documento usa il proprio ID e
può contenere questi campi:

| Campo | Tipo | Obbligatorio |
| --- | --- | --- |
| `brand` | string | sì |
| `name` | string | sì |
| `category` | string | sì |
| `image` | string | sì |
| `price` | number | sì |
| `oldPrice` | number | no |
| `badge` | string | no |
| `description` | string | no |
| `gallery` | string[] | no |
| `features` | string[] | no |
| `specifications` | map di stringhe | no |
| `stock` | number | no |
| `featured` | boolean | no |
| `active` | boolean | no; `false` nasconde il prodotto |

La Function `GET /api/products` in `api/products.js` legge fino a 100 documenti
attivi, valida i campi e restituisce il catalogo con una breve cache CDN. Se la
collection è vuota o la Function non è raggiungibile durante lo sviluppo con
`ng serve`, Angular usa i cinque prodotti demo localizzati inclusi. Per provare
frontend e Function insieme usa `vercel dev`.

## Lingue e routing

Lo storefront supporta italiano, inglese, francese, tedesco e spagnolo tramite
URL localizzati. La root reindirizza a `/it`; esempi:

- `/it/catalogo`, `/en/catalog`, `/fr/catalogue`, `/de/katalog`, `/es/catalogo`
- `/it/prodotto/:id`, `/en/product/:id`, `/de/produkt/:id`
- pagine localizzate per carrello, chi siamo, assistenza e contatti
- privacy, cookie, termini e condizioni, spedizioni e resi in ogni lingua

Il cambio lingua conserva pagina, prodotto e parametri di ricerca. Titolo,
descrizione, canonical e attributo `lang` vengono aggiornati durante la
navigazione.

## Privacy e contenuti esterni

Il pannello consensi salva nel browser preferenze separate per strumenti
analitici, marketing e contenuti esterni. Google Maps nella pagina contatti non
viene caricato prima del consenso. Le bozze legali descrivono l'implementazione
attuale, ma devono essere validate e completate da un consulente prima del
lancio commerciale.

Le pagine sono caricate in lazy loading e condividono una sola istanza del
catalogo, del carrello e dei preferiti.

## Controlli

```bash
npm run check
npm run build
```
