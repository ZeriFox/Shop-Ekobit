# Shop Ekobit

Frontend ecommerce in Angular e TypeScript, predisposto per Vercel e Firestore.

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

Queste variabili non devono avere il prefisso `NEXT_PUBLIC_`. `.env.local` è
ignorato da Git; su Vercel le stesse tre variabili vanno impostate nelle
Environment Variables del progetto per Development, Preview e Production.

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
| `active` | boolean | no; `false` nasconde il prodotto |

La Vercel Function `GET /api/products` restituisce fino a 60 prodotti validi.
Se Firebase non è ancora configurato, la homepage mantiene automaticamente il
catalogo demo. Per eseguire frontend e Function insieme in locale usa
`vercel dev`; con `ng serve` il catalogo demo resta attivo.

## Controlli

```bash
npm run check
npm run build
```
