# Piano

## Obiettivo
Impostare "e-on" come unico sponsor del sito, lasciando nella sezione `#sponsor` di `index.html` esclusivamente il blocco "Main Sponsor" con la scritta "e-on" e rimuovendo completamente i blocchi "Gold Partner" e "Technical & Local".

## Task
1. **Analizzare la struttura corrente**  
   - File coinvolto: `index.html` (sezione `#sponsor`, righe ~193-248)  
   - Azione: verificare markup dei tre `.sponsor-tier` e dello stile `.slogo` in `.sponsor-grid.main`

2. **Modificare `index.html` nella sezione sponsor**  
   - File coinvolto: `index.html`  
   - Azione: 
     - Eliminare il blocco `.sponsor-tier` corrispondente a "Gold Partner" (righe ~217-226)
     - Eliminare il blocco `.sponsor-tier` corrispondente a "Technical & Local" (righe ~228-241)
     - Aggiornare il div `.slogo` dentro "Main Sponsor" per mostrare "e-on" (sostituendo il contenuto attuale con solo il testo/logo "e-on")

## Acceptance Criteria
- [ ] In `index.html`, la sezione `#sponsor` deve contenere solo il blocco "Main Sponsor".
- [ ] Il blocco "Main Sponsor" deve mostrare il logo o il testo "e-on".
- [ ] Le sezioni "Gold Partner" e "Technical & Local" devono essere rimosse completamente.
- [ ] Nessuna regressione grafica sulle altre sezioni della pagina.
- [ ] Nessun errore nella console.

## Verifica
- **Ispezione statica:** Aprire `index.html` e verificare che sotto `#sponsor > .wrap > .reveal` esista un solo `.sponsor-tier` con etichetta "Main Sponsor".
- **Contenuto:** Verificare che il `.slogo` contenga "e-on" (es. sostituendo `<div class="slogo"><span class="ph">LOGO</span> Sponsor Principale</div>` con `<div class="slogo">e-on</div>` o mantenendo lo stile coerente con `.sponsor-grid.main`).
- **Altre sezioni:** Caricare la pagina e controllare che `#documenti`, `#tesseramenti`, `#info`, ecc. restino intatti.
- **Console:** Aprire DevTools e verificare assenza di errori JS/CSS.
- **Responsive:** Verificare brevemente ai breakpoint indicati (920px, 560px) che non ci siano rotture di layout.
