# CineSeat
# 🎬 CineSeat – Webová aplikace pro rezervaci vstupenek

![Status](https://img.shields.io/badge/Status-Completed-success)
![Technology](https://img.shields.io/badge/Tech-Vanilla%20JS%20%7C%20Tailwind%20%7C%20LocalStorage-blue)
![License](https://img.shields.io/badge/License-MIT-green)

Webová Single Page Application (SPA) simulující rezervační systém kina. Aplikace je postavena na čistém JavaScriptu (ES6+) s využitím architektury **MVC** a pro persistenci dat využívá **Local Storage** prohlížeče.

---

## 📋 Obsah
1. [O projektu](#-o-projektu)
2. [Funkční specifikace](#-funkční-specifikace)
3. [Technická specifikace](#-technická-specifikace)
4. [Architektura (MVC)](#-architektura-mvc)
5. [Datový Model](#-datový-model-json)
6. [Instalace a spuštění](#-instalace-a-spuštění)

---

## ℹ️ O projektu

Cílem projektu bylo vytvořit klientskou aplikaci s dominancí logiky na straně prohlížeče. Aplikace umožňuje uživatelům vybírat sedadla v sálech s různou kapacitou, počítá cenu v reálném čase a simuluje chování reálného rezervačního systému.

**Klíčové vlastnosti:**
* **Dominance na klientovi:** Veškerá logika běží v prohlížeči (JavaScript).
* **Persistenc dat:** Data (filmy, obsazenost) jsou trvale uložena v **Local Storage** (přežijí refresh stránky).
* **Dynamické UI:** Vykreslování sálu se mění podle kapacity vybraného filmu.
* **Moderní design:** Využití Tailwind CSS, Dark Mode a 3D efektu plátna.

---

## 🎯 Funkční specifikace

### Uživatelské role

Aplikace rozlišuje dvě role, které lze přepínat v hlavičce aplikace:

#### 1. 👤 Návštěvník (Guest)
* **Zobrazení sálu:** Vidí vizuální mapu sedadel (Bílá = Obsazené, Šedá = volné).
* **Výběr filmu:** Může přepínat mezi filmy uloženými v aplikaci; při změně se načte relevantní rozložení sálu a cena.
* **Rezervace:** Kliknutím označí sedadla (zmodrají) a tlačítkem "Rezervovat" potvrdí výběr. Data se uloží.
* **Validace:** Nemůže označit již obsazená sedadla.

#### 2. 🛠️ Administrátor (Admin)
* Má všechna oprávnění Návštěvníka.
* **Admin Dashboard:** Vidí rozšířený ovládací panel pro správu kina.
* **CRUD Filmů:**
    * *Přidat film:* Může vytvořit nový film s názvem, cenou a **specifickým počtem sedadel**.
    * *Smazat film:* Může odstranit aktuálně vybraný film.
* **Správa sálu:**
    * *Reset:* Může vymazat všechny rezervace u aktuálního filmu (např. po skončení promítání).

---

## ⚙️ Technická specifikace

### Použité technologie
* **Jazyk:** JavaScript (ES6 Modules, OOP)
* **Styling:** CSS3, Tailwind CSS (CDN), Custom CSS pro 3D efekty
* **Úložiště:** LocalStorage API (JSON formát)
* **Struktura:** HTML5 (Sémantické tagy)

### Adresářová struktura
```text
cine-seat/
│
├── index.html           # Hlavní HTML struktura (View skeleton)
├── css/
│   └── style.css        # Vlastní styly (3D plátno, animace, scrollbary)
├── js/
│   ├── app.js           # Entry point (bootstrapping aplikace)
│   ├── CinemaModel.js   # Business logika a state management
│   ├── CinemaView.js    # Manipulace s DOM a UI
│   └── CinemaController.js # Propojení Modelu a View
└── README.md            # Dokumentace
```
---

## 🏗 Architektura (MVC)
Aplikace striktně dodržuje návrhový vzor **Model-View-Controller**, což zajišťuje oddělení datové logiky od uživatelského rozhraní a usnadňuje budoucí údržbu kódu.

### 1. Model (`CinemaModel.js`)
Model představuje "mozek" aplikace a datovou vrstvu.

* **Zodpovědnost:** Spravuje veškerá data (seznam filmů, stav sedadel) a business logiku.
* **Persistence:** Zajišťuje ukládání (`saveToStorage`) a načítání (`loadFromStorage`) dat z `localStorage`.
* **Klíčové metody:**
    * `addMovie(title, price, seats)`: Vytvoří nový objekt filmu.
    * `bookTickets()`: Převede sedadla z "dočasně vybraných" na "trvale obsazená".
    * `getSeatStatus()`: Vrací data potřebná pro vykreslení (obsazenost, kapacita).

### 2. View (`CinemaView.js`)
View se stará výhradně o vizuální stránku (UI) a manipulaci s DOMem.

* **Zodpovědnost:** Vykresluje HTML na základě dat a odchytává vstupy uživatele.
* **Interaktivita:** Zobrazuje/skrývá Admin Panel podle role (`toggleAdminMode`).
* **Klíčové metody:**
    * `renderSeats(total, occupied, selected)`: Dynamicky generuje mřížku sedadel.
    * `renderMovieOptions(movies)`: Plní dropdown menu seznamem filmů.
    * `bindSelectSeat(handler)`: Registruje posluchače událostí (kliknutí).

### 3. Controller (`CinemaController.js`)
Controller funguje jako prostředník, který řídí tok aplikace.

* **Zodpovědnost:** Propojuje Model a View. Reaguje na události z View a volá metody Modelu.
* **Klíčové metody:**
    * `init()`: Spouští aplikaci a načítá data.
    * `renderAll()`: Centrální metoda, která získá čerstvá data z Modelu a přikáže View překreslit celou obrazovku.
    * `handleAddMovie()`: Zpracuje formulář pro nový film a předá data Modelu.

## 💾 Datový Model

Data jsou uchovávána v `localStorage` pod klíčem `cinemaMovies`. Jde o pole objektů ve formátu JSON.

**Struktura uložených dat:**
```json
[
  {
    "id": 17049823115,       // Unikátní ID (Timestamp)
    "title": "Duna: Část 2", // Název filmu
    "price": 250,            // Cena za lístek
    "totalSeats": 48,        // Kapacita sálu
    "occupied": [2, 5, 6]    // Pole indexů obsazených sedadel
  },
  {
    "id": 17049824220,
    "title": "Joker",
    "price": 200,
    "totalSeats": 32,
    "occupied": []
  }
]