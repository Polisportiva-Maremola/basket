# Piano

## Obiettivo

Aggiornare la sezione `#sponsor` di `index.html` sostituendo il segnaposto testuale `e-on` con il logo E-on fornito via URL. Il blocco “Main Sponsor” deve contenere esclusivamente quel logo, senza altri partner, mantenendo struttura, testi e layout esistenti. Per vincolo della richiesta, l’unico file modificabile è `index.html`.

## Task

1. **Verificare lo stato attuale della sezione sponsor** — `index.html:192-210`
   - Confermare che `.sponsor-grid.main` contenga solo `<div class="slogo">e-on</div>`.
   - Confermare che non esistano altri tier, partner o loghi nella sezione (`gold`, `tech`, `.ph`, ecc.).
   - Risultato atteso: nessun altro sponsor da rimuovere oltre al testo `e-on`.

2. **Sostituire il segnaposto con l’immagine del logo** — `index.html:204-206`
   - Sostituire il contenuto di `.slogo` con un tag `<img>`.
   - Usare l’URL fornito, codificando `&` come `&amp;` nell’attributo HTML:
     ```html
     <div class="slogo">
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3YDvQEK_QLD3VmGztPiRMD--da4-TaSXIfDJ9v5TcSa9sD8lbe2MJqdk&amp;s"
            alt="Logo E-on" loading="lazy" decoding="async">
     </div>
     ```
   - Non impostare `width`/`height` espliciti e non usare stili inline, così l’immagine resta scalabile tramite la regola globale `img { max-width: 100%; display: block; }` (`styles.css:75`) e il flex centrato di `.slogo` (`styles.css:425-435`).

3. **Mantenere invariato il resto della sezione e della pagina** — `index.html`
   - Non modificare kicker, titolo, testo introduttivo, `tier-label`, numerazione, navigazione o altre sezioni.
   - Non modificare `styles.css`, coerentemente con il vincolo “Non modificare altri file al di fuori di `index.html`”.
   - Se il layout risultasse rotto a 400px, fermarsi e chiedere l’estensione dello scope prima di toccare il CSS.

4. **Verificare la disponibilità dell’URL del logo** — URL esterno fornito
   - Controllare che risponda con HTTP 200 e `content-type: image/*` (verificato in fase di piano: `image/jpeg`, `content-length: 2176`).
   - Segnalare come rischio residuo che si tratta di un URL esterno Google/gstatic, non di un asset locale: può cambiare o non essere più disponibile.

5. **Controllare il diff finale** — `index.html`
   - Verificare che l’unico file modificato sia `index.html`.
   - Verificare che la modifica riguardi esclusivamente il contenuto di `.sponsor-grid.main`.

## Acceptance Criteria

- [ ] In `index.html`, `.sponsor-grid.main` contiene esclusivamente il logo E-on tramite tag `<img>`.
- [ ] Il tag `<img>` usa come `src` l’URL fornito dal titolare (con `&` codificato come `&amp;`).
- [ ] L’attributo `alt` è esattamente `Logo E-on`.
- [ ] Non restano altri partner, loghi segnaposto o elementi `.slogo` testuali nella sezione sponsor.
- [ ] Non vengono introdotti stili inline né modifiche a `styles.css`.
- [ ] Nessun altro file del repository risulta modificato (`git diff --stat` mostra solo `index.html`).
- [ ] Testi, navigazione e struttura delle altre sezioni restano invariati.
- [ ] Il logo è visibile e non deformato; il layout della sezione sponsor resta integro a 1280px, 920px, 560px e 400px.
- [ ] L’immagine si carica senza errori di rete e la console del browser non mostra errori.
- [ ] L’URL del logo risponde HTTP 200 con content type immagine.

## Verifica

- **Diff e scope**
  - `git status --short`
  - `git diff --stat` → deve mostrare solo `index.html`.
  - `git diff -- index.html` → deve mostrare solo la sostituzione del contenuto di `.slogo`.

- **Controllo markup**
  - `grep -n "sponsor-grid\\|slogo\\|Logo E-on\\|e-on" index.html`
  - Verificare che non compaiano più segnaposto testuali o altri loghi nella sezione sponsor.
  - Verificare che `src` contenga l’URL richiesto e `alt="Logo E-on"`.

- **Verifica URL immagine**
  - `curl -sS -I -L '<URL_fornito>'` → attendersi `HTTP/2 200`, `content-type: image/jpeg`.

- **Verifica visiva e responsive**
  - Avviare un server statico locale: `python3 -m http.server 8000`.
  - Aprire `http://localhost:8000/#sponsor`.
  - Con i DevTools controllare 1280px, 920px, 560px e 400px: logo centrato, proporzioni corrette, nessun overflow orizzontale.
  - Aprire la console: nessun errore e nessuna richiesta immagine fallita.
  - Verificare che le altre sezioni e la navigazione siano invariate.
