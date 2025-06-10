# Globomantics - Fastighetsannonser (APL-projekt)

Detta APL-projekt är en webbapplikation för den fiktiva mäklarfirman Globomantics. Applikationen är byggd för att visa och hantera husannonser där användare kan se objekt, visa detaljer och lämna bud. Projektet är byggt med React och har ett tydligt fokus på komponentbaserad arkitektur och state management.

## Live Demo

* **https://globomanticsapl.netlify.app/**
*  **https://globomantics-server-apl.onrender.com**
* (tar en liten stund för render backend att starta ibland)
---

## Funktioner

* ***Bläddra bland objekt:** Visar en lista över alla hus till salu hämtade från en backend.
* **Detaljerad vy:** Klickbara objekt som leder till en detaljsida med mer information.
* **Lägg till hus:** Ett formulär för att lägga till nya hus som sparas permanent.
* **Budgivning:** Möjlighet för användare att lägga ett bud på ett specifikt hus via ett formulär.
* **Ta bort objekt:** Möjlighet att permanent ta bort ett hus från listan.

---

## Teknologier & Verktyg

* **Frontend:** React, React Router
* **Backend:** Node.js, Express
* **Styling:** Bootstrap
* **Språk:** JavaScript, HTML, CSS
* **Byggverktyg:** Create React App
* **Pakethanterare:** npm
* **Driftsättning:** Netlify (Frontend), Render (Backend)

---

## Installation & Användning Lokalt

Projektet består av två delar: en frontend (React-appen) och en backend (Node.js-servern). Båda måste vara igång samtidigt för att applikationen ska fungera fullt ut.

**1. Klona projektet**
```bash
git clone https://github.com/zachSternvad/Globomantics-APL.git
cd Globomantics-APL
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
cd Globomantics-APL

# Installera frontend-appens beroenden
npm install

# Starta frontend-appen (den körs på http://localhost:3000)
npm start
```
**4. Öppna i webbläsaren**
Öppna http://localhost:3000 i din webbläsare för att se applikationen. Frontend-appen kommer automatiskt att kommunicera med din backend-server.
