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
```

Queste variabili non devono avere prefissi pubblici. `.env.local` è ignorato da
Git; su Vercel le stesse tre variabili vanno impostate nelle Environment
Variables del progetto. Per i Preview Deployment è preferibile un progetto
Firebase separato da quello di produzione.

La collection Firestore attesa è `products`. Ogni documento usa il proprio ID e
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
Function non è raggiungibile durante lo sviluppo con `ng serve`, Angular usa il
catalogo demo incluso. Per provare frontend e Function insieme usa `vercel dev`.

## Routing

- `/` — homepage
- `/catalogo` — catalogo con ricerca, categoria, offerte e ordinamento
- `/prodotto/:id` — pagina prodotto dinamica
- `/carrello` — carrello persistente
- `/chi-siamo` e `/assistenza` — pagine informative

Le pagine sono caricate in lazy loading e condividono una sola istanza del
catalogo, del carrello e dei preferiti.

## Controlli

```bash
npm run check
npm run build
```
