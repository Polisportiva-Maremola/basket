# Istruzioni per gli agenti

Questo repository è il sito della Polisportiva Maremola – Basket, pubblicato con GitHub Pages su https://basket.polmaremola.it. Le modifiche arrivano da due agenti: **opencode** (le issue con `/oc`, tramite `.github/workflows/opencode.yml`) e l'**assistente del CMS** che lavora per il gruppo Telegram della società.

## Prima di modificare

Leggi **[DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)**: token di colore, tipografia e spazi, componenti con il markup da copiare, voce dei testi, accessibilità e regole per le modifiche. Ogni modifica visiva deve essere coerente con quel documento; se lo cambia (un token nuovo, un componente nuovo), aggiorna anche il documento nello stesso commit.

## Il progetto

- Sito statico: `index.html` (l'unica pagina), `styles.css`, `app.js`, `assets/`, più `scorebug.html` (overlay TV per lo streaming, pagina a sé).
- Nessuna build, nessun gestore di pacchetti, nessun framework: quello che c'è nel ramo `main` va online così com'è.
- Testi in italiano, con il tono descritto in DESIGN-SYSTEM.md §5.

## Regole

- Non modificare `CNAME` (lega il sito al dominio) né `.github/workflows/` senza una richiesta esplicita.
- Non rinominare gli id, le classi e gli attributi `data-*` usati da `app.js` (elenco in DESIGN-SYSTEM.md §7.1).
- Usa le variabili CSS di `:root`, non valori letterali nuovi; niente stili inline.
- Niente nuove dipendenze esterne (font, librerie, script da CDN) senza un motivo scritto nella issue.
- Percorsi relativi per file e immagini; immagini con `alt` descrittivo; nessun segreto o dato personale nel repository (è pubblico).
- Verifica su mobile ai breakpoint 920px e 560px, e che la console del browser non mostri errori.
- Modifiche piccole e mirate: una issue, una modifica.
