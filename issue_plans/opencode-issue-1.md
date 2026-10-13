# Piano

## Obiettivo
Aggiornare le quote di iscrizione annuali nella pagina statica `index.html` secondo la richiesta del titolare, mantenendo invariata la formattazione esistente e senza introdurre regressioni di contenuto o stile.

## Task

1. **[Verifica] Identificare le righe esatte da modificare** (file coinvolti: `index.html`)
   - Leggere le righe ~288, ~300 e ~313 di `index.html` per confermare il contesto testuale delle card "Minibasket", "Under 13 / 19" e "Senior / Serie D".
   - Verificare che la sezione in cui compaiono sia effettivamente quella dedicata alle quote/iscrizioni.

2. **[Modifica] Aggiornare i prezzi** (file coinvolti: `index.html`)
   - Modificare la card **Minibasket** (riga 288): da `€ 280` a `€ 300`. Mantenere `<small>/anno</small>` invariato.
   - Modificare la card **Under 13 / 19** (riga 300): da `€ 360` a `€ 390`. Mantenere `<small>/anno</small>` invariato.
   - Modificare la card **Senior / Serie D** (riga 313): da `€ 420` a `€ 450`. Mantenere `<small>/anno</small>` invariato.

3. **[Verifica post-modifica] Controllo integrità** (file coinvolti: `index.html`)
   - Verificare che le modifiche siano corrette, coerenti con il contesto HTML e che non siano state alterate altre parti della pagina.
   - Verificare la corretta renderizzazione della sezione e l'assenza di errori in console.

## Acceptance Criteria

- [ ] Il prezzo per "Minibasket" in `index.html` è aggiornato a `300`.
- [ ] Il prezzo per "Under 13 / 19" in `index.html` è aggiornato a `390`.
- [ ] Il prezzo per "Senior / Serie D" in `index.html` è aggiornato a `450`.
- [ ] La formattazione con `<small>/anno</small>` rimane invariata per tutte e tre le card.
- [ ] Nessuna regressione di stile o contenuto nella pagina `index.html`.
- [ ] Nessuna modifica al file `DESIGN-SYSTEM.md`.
- [ ] Nessuna modifica ad altre sezioni o pagine del sito (`scorebug.html` o altre).
- [ ] Il diff finale mostra esclusivamente le tre modifiche ai prezzi sopra indicate.

## Verifica

**Lettura e conferma del contesto (prima della modifica):**
- `read /home/runner/work/basket/basket/index.html` con `offset: 270, limit: 60` (per ispezionare righe 270–330) oppure focus sulle righe 288, 300, 313.

**Verifica visiva e funzionale (dopo modifica):**
- Aprire `index.html` direttamente nel browser e controllare che nelle card corrispondenti siano visibili `€ 300 /anno`, `€ 390 /anno`, `€ 450 /anno`.
- Verificare il layout ai breakpoint 920px e 560px (sezione quote/responsive).
- Controllare la console del browser: nessun errore JS/CSS.

**Verifica testuale (dopo modifica):**
- `git diff index.html` – deve mostrare solo le tre righe modificate (cambiamento dei valori numerici da 280→300, 360→390, 420→450).
- `grep -n '"Minibasket\|Under 13 / 19\|Senior / Serie D"' index.html` – conferma presenza e contesto corretto.
- `grep -A 2 -B 2 '€/anno\|/anno' index.html | grep -n '300\|390\|450'` – conferma i nuovi importi presenti con la formattazione `/anno`.
