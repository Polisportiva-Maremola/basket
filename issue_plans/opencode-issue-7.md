# Piano

## Obiettivo
Aggiungere `object-fit: cover` al tag `<img>` dello sponsor E.ON (Main Sponsor), garantendo un ritaglio uniforme dell'immagine nel contenitore `.slogo` senza alterare la struttura HTML.

## Task
1. **[ANALISI]** Individuare il contesto esatto dell'immagine E.ON in `index.html`
   - File coinvolti: `index.html` (linea ~210)
   - Azione: Confermare posizione: `<div class="slogo"><img src="...encrypted-tbn0.gstatic.com..." alt="Logo E-on" ...></div>` nel tier Main Sponsor

2. **[STILE]** Aggiungere regole CSS per le immagini nei loghi sponsor
   - File coinvolti: `styles.css`
   - Azione: Definire `object-fit: cover` per `.slogo img` (e opzionalmente dimensioni). È necessario assicurare che l'immagine riempia il contenitore mantenendo il ritaglio. Considerare `width: 100%; height: 100%` sul tag `<img>` per far sì che `object-fit` abbia effetto, dato che `.slogo` è flex con altezza minima (`min-height: 150px` per `.sponsor-grid.main .slogo`).
   - Note: Il CSS attuale non imposta stili espliciti su `.slogo img` - l'immagine viene ridimensionata naturalmente dal contenitore flex. Per applicare `object-fit: cover` correttamente, servono dimensioni definite sull'elemento img.

3. **[VERIFICA]** Validazione visiva e tecnica
   - File coinvolti: Nessuno (verifica)
   - Azione: Controllare che l'immagine venga ritagliata correttamente, che il layout rimanga invariato, e che non ci siano regressioni su altri sponsor (anche se attualmente solo E.ON è presente).

## Acceptance Criteria
- [ ] In `styles.css` esiste una regola che applica `object-fit: cover` al tag `<img>` all'interno di `.slogo`
- [ ] L'immagine ha `width: 100%` e `height: 100%` (o dimensioni adeguate) affinché `object-fit: cover` funzioni correttamente
- [ ] Solo lo stile dell'immagine viene modificato, nessuna modifica ad `index.html`, classi, id o attributi `data-*`
- [ ] Il contenitore `.slogo` mantiene le sue proprietà (flex centering, bordi, ombre) invariati
- [ ] La modifica usa le variabili CSS esistenti (nessun valore letterale non necessario)
- [ ] Nessuna nuova dipendenza esterna aggiunta
- [ ] Il codice segue le convenzioni del progetto (no stili inline)

## Verifica
**Comandi da lanciare:**
```bash
# Verifica sintassi CSS (se disponibile)
npx stylelint styles.css 2>&1 | tail -20
# oppure solo controllo visivo - nessun build necessario
```

**Cosa controllare:**
- [ ] Aprire `index.html` nel browser - la sezione sponsor "Main Sponsor" mostra il logo E.ON con `object-fit: cover` applicato
- [ ] Verificare che l'immagine venga ritagliata per riempire il contenitore `.slogo` (altezza 150px) senza distorsioni indesiderate
- [ ] Controllare responsive sui breakpoint 920px e 560px - il layout della griglia sponsor rimane corretto
- [ ] Aprire la console del browser - nessun errore JavaScript/CSS
- [ ] Verificare che non ci siano modifiche ad altri elementi della pagina
- [ ] Confermare che `alt="Logo E-on"` rimane invariato
