# Piano

## Obiettivo
Rimuovere dal markup della sezione Tesseramenti di `index.html` i tre elementi `<div class="price">…</div>` (con i relativi `<small>/anno</small>`) nelle card Minibasket, Under 13 / 19 e Senior / Serie D, senza toccare nessun altro file o elemento della pagina.

## Task
1. Eliminare `<div class="price">€ 300<small>/anno</small></div>` dalla card Minibasket, mantenendo invariati `<h3>`, `.age`, `<ul>` e il pulsante. — File: `index.html` (riga 356).
2. Eliminare `<div class="price">€ 390<small>/anno</small></div>` dalla card `Under 13 / 19` (`.tess.feat`). — File: `index.html` (riga 368).
3. Eliminare `<div class="price">€ 450<small>/anno</small></div>` dalla card Senior / Serie D. — File: `index.html` (riga 381).
4. Controllare che non restino occorrenze di `class="price"` né di importi in euro in `index.html`, e che il testo introduttivo della sezione e i passi `.tstep` siano invariati. — File: `index.html` (sola lettura).
5. Verificare che non servano modifiche CSS: `.tess ul` ha già `margin: 18px 0 24px` e `.tess .btn` usa `margin-top: auto`, quindi lista e pulsante restano allineati senza il prezzo. — File: `styles.css` (sola lettura, nessuna modifica).
6. Verificare il risultato a desktop e alle larghezze 920px, 560px e 400px, controllando la console del browser. — File: `index.html` (nessuna modifica aggiuntiva).

## Acceptance Criteria
- [ ] Nessun elemento `<div class="price">` presente in `index.html`.
- [ ] Nessun importo (`€ 300`, `€ 390`, `€ 450`, `/anno`) visibile nella sezione `#tesseramenti`.
- [ ] Le tre card mantengono titolo, età, elenco puntato e pulsante, con il pulsante ancora in basso e in allineamento con le altre card.
- [ ] `git diff -- index.html` mostra esclusivamente la rimozione delle tre righe di prezzo.
- [ ] Nessuna modifica a `styles.css`, `app.js`, `DESIGN-SYSTEM.md`, `CNAME` o `.github/workflows/`.
- [ ] Nessun errore o warning nuovo nella console del browser.
- [ ] Layout pulito senza spazi vuoti o disallineamenti a 400px di larghezza.

## Verifica
```bash
git status --short
git diff --check
git diff -- index.html
rg -n 'class="price"|€' index.html
```
- `git status --short`: deve elencare solo `index.html`.
- `git diff -- index.html`: esattamente 3 righe eliminate, nessuna aggiunta.
- `rg`: nessun risultato (comando con exit code 1 atteso).
- Servire la pagina in locale: `python3 -m http.server 8000`, poi aprire `http://localhost:8000/index.html`.
- DevTools → Console: nessun errore.
- DevTools → dispositivo/width: controllare 1280px, 920px, 560px e 400px; verificare che le card della sezione «Tesseramenti» siano allineate, senza buchi dove era il prezzo, con testi e pulsanti leggibili e senza overflow orizzontale.
- Non sono presenti script di build, lint o typecheck nel progetto (sito statico senza gestore di pacchetti); la verifica si limita a diff, ricerca nel markup e controllo visivo/console.
