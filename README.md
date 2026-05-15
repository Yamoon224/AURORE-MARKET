# Aurore Beauty

Boutique e-commerce moderne construite avec Next.js 16, axee sur les produits de beaute, avec internationalisation FR/EN, panier persistant, multi-devises et commande via WhatsApp.

## Apercu

Aurore Beauty propose un parcours d'achat simple et rapide:

- catalogue produits alimente par DummyJSON
- page produit detaillee
- panier persistant (Zustand + localStorage)
- checkout avec recapitulatif
- envoi de commande via WhatsApp
- support des langues francais/anglais
- support des devises USD, EUR, XOF

## Stack technique

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- next-intl (i18n)
- Zustand (state management persistant)
- react-hot-toast
- lucide-react

## Fonctionnalites principales

- Internationalisation
	- locales: en, fr
	- routage localise via next-intl
	- messages dans le dossier messages

- Catalogue et data
	- source API: https://dummyjson.com/products
	- categories et filtres sur la page produits
	- cartes produits uniformes

- Panier et checkout
	- ajout/suppression/modification quantite
	- total automatique selon devise choisie
	- persistance entre rafraichissements

- Paiement/commande
	- generation d'un message de commande
	- ouverture de WhatsApp vers: +225 59 34 38 66

## Installation

Prerequis:

- Node.js 20+
- npm

Etapes:

```bash
npm install
npm run dev
```

Application disponible sur:

- http://localhost:3000

## Scripts utiles

```bash
npm run dev     # lance le serveur de developpement
npm run build   # build de production
npm run start   # demarre le build en production
npm run lint    # verifie le code avec ESLint
```

## Structure du projet

```text
src/
	app/
		[locale]/
			page.tsx
			products/
			checkout/
	components/
		home/
		layout/
		products/
		providers/
		ui/
	i18n/
	lib/
	stores/
	types/
messages/
middleware.ts
```

## Configuration i18n

- locales definies dans src/i18n/routing.ts
- middleware next-intl dans middleware.ts
- navigation localisee via src/navigation.ts

## Devises supportees

- USD
- EUR
- XOF

La conversion et le formatage sont centralises dans src/lib/currency.ts.

## Notes de developpement

- Le projet utilise des composants client pour les interactions panier, theme et selecteurs.
- Les etats persistants utilisent skipHydration pour eviter les erreurs SSR/CSR.
- Les pages produits recuperent les donnees DummyJSON avec revalidation.

## Roadmap possible

- integration d'un vrai backend de commandes
- systeme d'authentification utilisateur
- historique des commandes
- tests e2e (Playwright)
- dashboard admin

## Licence

Projet prive.
# AURORE-MARKET
