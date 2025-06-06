# Globomantics - Fastighetsannonser (APL-projekt)

Detta APL-projekt är en webbapplikation för den fiktiva mäklarfirman Globomantics. Applikationen är byggd för att visa och hantera husannonser där användare kan se objekt, visa detaljer och lämna bud. Projektet är byggt med React och har ett tydligt fokus på komponentbaserad arkitektur och state management.

## Live Demo

**[Länk till en live-version av projektet](https://din-live-länk-här.com)** *(Tips: Ladda upp ditt projekt till en gratistjänst som Netlify eller Vercel och klistra in länken här. Det är mycket värdefullt för rekryterare!)*

---

## Funktioner

* **Bläddra bland objekt:** Visar en lista över hus till salu med adress, land och pris.
* **Detaljerad vy:** Genom att klicka på ett hus visas en detaljerad sida med mer information och bilder.
* **Lägg till hus:** En funktion för att lägga till nya hus i listan (simulerat via "Add"-knapp).
* **Budgivning:** Möjlighet för användare att lägga ett bud på ett specifikt hus via ett formulär.

---

## Teknologier & Verktyg

* **Frontend:** React, React Router
* **Backend:** Node.js, Express
* **Styling:** Bootstrap
* **Språk:** JavaScript, HTML, CSS
* **Byggverktyg:** Create React App
* **Pakethanterare:** npm

---

## Installation & Användning Lokalt

Projektet består av två delar: en frontend (React-appen) och en backend (Node.js-servern). Båda måste vara igång samtidigt för att applikationen ska fungera fullt ut.

**1. Klona projektet**
```bash
git clone <URL_till_ditt_repository>
cd <projekt-mapp>
```
**2. Konfigurera & starta Backend-servern**
*(Denna terminal ska du låta vara igång)*
```bash
# Gå in i server-mappen
cd server

# Installera serverns beroenden
npm install

# Starta servern (den körs på http://localhost:4000)
node server.js
```
**3. Konfigurera & starta Frontend-appen**
Öppna en ny, andra terminal och gå till projektets rotmapp.
*(Låt den första terminalen med servern vara igång)*
```bash

# Gå till projektets rotmapp (om du inte redan är där)
cd <projekt-mapp>

# Installera frontend-appens beroenden
npm install

# Starta frontend-appen (den körs på http://localhost:3000)
npm start
```
**4. Öppna i webbläsaren**
Öppna http://localhost:3000 i din webbläsare för att se applikationen. Frontend-appen kommer automatiskt att kommunicera med din backend-server.