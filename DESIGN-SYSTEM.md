# Design system: Polisportiva Maremola, sito basket

Questo documento descrive il design system così come è scritto nel codice al commit `6b77084` (sito pubblicato su https://basket.polmaremola.it, dominio indicato in `CNAME`). Non contiene regole che il codice non abbia già: dove il codice non dice niente, il documento lo segnala.

File del sito:

- `index.html`: la pagina, una sola.
- `styles.css`: tutto lo stile del sito (693 righe), con i token in `:root`.
- `app.js`: orologio, countdown, ticker, roster, count-up dei contatori (`app.js:137-152`), reveal, scroll-spy della nav (`app.js:170-185`), menu mobile, pannello della diretta.
- `assets/crest.svg`: lo stemma, un segnaposto ("stemma (placeholder)", `crest.svg:1`).
- `assets/favicon.svg`, `favicon.ico` (16/32/48 px), `assets/favicon-32.png`, `assets/apple-touch-icon.png` (180 px) e `assets/icon-512.png`: la favicon, ricavata dallo stemma senza la scritta «PM» (illeggibile in piccolo); le icone quadrate hanno il fondo `#070d24`. Se cambia lo stemma, vanno rigenerate.
- `scorebug.html`: l'overlay TV per lo streaming. È una pagina a sé, con stile proprio (vedi §4.20).

Per chi legge:

- **Chi modifica i contenuti**: §5 (voce), §4 (che markup copiare), §7.
- **Agente di sviluppo (opencode, issue del repo)**: tutto, in particolare §2, §4, §7 e §8.
- **Assistente del CMS per i piccoli ritocchi di stile**: §2 (usare i token), §4 (fai / non fare), §6 e §7.

---

## 1. Principi e identità visiva

- **Metafora: diretta TV per videogioco sportivo.** Il commento di testata lo dice: `broadcast × videogame` (`styles.css:2`). Lessico da regia (scorebug, ticker "Stats Live", LIVE, VS) e da videogioco NBA 2K (player card con "OVR", commento "2K-style player cards", `app.js:69`).
- **Solo tema scuro.** Fondo "arena" navy (`--navy-950`, `styles.css:55`), blu elettrico come colore di marca, ciano per accenti e luci, rosso per i segnali "live". Non esistono temi alternativi né `prefers-color-scheme`.
- **Palette dichiarata**: "navy arena + electric blue + white + cyan glow" (`styles.css:4`).
- **Quattro famiglie con ruoli fissi** (`styles.css:6-7`): Saira Condensed per i titoli, Chakra Petch per l'interfaccia HUD, JetBrains Mono per dati ed etichette, DM Sans per il testo.
- **Segni ricorrenti**: bordi disegnati come `box-shadow` inset di 1px, che all'hover diventano ciano; angoli tagliati con `clip-path`; testo "vuoto" solo contornato (`-webkit-text-stroke`); maiuscolo applicato via CSS; etichette mono molto spaziate.
- **Movimento**: comparsa allo scroll, sollevamento all'hover, una sola curva di easing principale (`cubic-bezier(0.22,1,0.36,1)`).

---

## 2. Token

Tutte le variabili stanno in un solo blocco `:root` (`styles.css:12-46`). Non ci sono variabili in altri scope. Tutte le 23 variabili sono usate almeno una volta.

### 2.1 Colori

Valori in `oklch`. La colonna "≈ hex" è una conversione approssimata (sRGB), utile solo come riferimento: nel codice va scritto il token.

**Superfici e linee**

| Token | Valore | ≈ hex | Uso |
|---|---|---|---|
| `--navy-950` | `oklch(0.145 0.045 264)` | `#03091d` | Fondo pagina (`styles.css:55`), fondo finale di `.pcard`, testo su ciano (`.captain-flag`, :412) |
| `--navy-900` | `oklch(0.185 0.055 264)` | `#06112b` | Fondo e termine dei gradienti delle card (scorebug, tess, info-card) |
| `--navy-850` | `oklch(0.225 0.060 264)` | — | Inizio dei gradienti delle card (`.scorebug` :273, `.tess` :468, `.info-card` :495) |
| `--navy-800` | `oklch(0.275 0.065 264)` | — | Parte alta di `.pcard` (:381), termine dei gradienti blu (:294, :451) |
| `--navy-700` | `oklch(0.345 0.070 264)` | — | Solo lo stemma della squadra ospite (`.team.away .crest`, :295) |
| `--line` | `oklch(0.42 0.06 264 / 0.55)` | — | Bordi, separatori, inset shadow. Token più usato (35 usi) |
| `--line-soft` | `oklch(0.42 0.06 264 / 0.28)` | — | Separatori leggeri (righe info, footer, piede della mappa) |

**Marca ed energia**

| Token | Valore | ≈ hex | Uso |
|---|---|---|---|
| `--blue` | `oklch(0.62 0.195 256)` | `#1f83f8` | Pulsante primario, scheda attiva, bordo della card in evidenza, pallini timeline |
| `--blue-bright` | `oklch(0.72 0.165 252)` | `#4ca8ff` | `<em>` dei titoli (:109), hover del primario, contorno di "Basket" nell'H1 (:253) |
| `--cyan` | `oklch(0.83 0.13 222)` | `#50daff` | Kicker, etichette, numeri del countdown, colore di hover dei bordi (33 usi) |
| `--cyan-soft` | `oklch(0.83 0.13 222 / 0.18)` | — | Luce ambientale (:71), cerchietti delle liste prezzi (:481) |

**Neutri**

| Token | Valore | ≈ hex | Uso |
|---|---|---|---|
| `--white` | `oklch(0.985 0.004 250)` | `#f8fafd` | Titoli, testo su blu, hover dei link |
| `--ink` | `oklch(0.90 0.012 258)` | `#d9dee6` | Testo del corpo (`body`, :56) |
| `--ink-soft` | `oklch(0.72 0.02 260)` | `#9da5b1` | Paragrafi introduttivi, link della nav, testi secondari |
| `--ink-dim` | `oklch(0.58 0.025 262)` | `#727b8a` | Micro etichette, footer. Contrasto al limite: vedi §6 |

**Segnale broadcast**

| Token | Valore | ≈ hex | Uso |
|---|---|---|---|
| `--live` | `oklch(0.635 0.235 24)` | `#f92c3c` | Pallino live, testo "LIVE", etichetta del ticker |
| `--live-glow` | `oklch(0.70 0.22 26 / 0.5)` | — | Alone del pallino live (keyframes `pulse`, :165-169) e del pin (:512) |
| `--gold` | `oklch(0.83 0.145 86)` | `#f1c047` | Solo le voci "in crescita" del ticker (`.ticker-item .up`, :341) |

**Colori letterali fuori dai token.** In `styles.css`, escluse le definizioni in `:root` (righe 12-46), ci sono 27 valori `oklch()` distinti scritti a mano (32 occorrenze), quasi tutti velature navy semitrasparenti (tonalità 264) e bagliori blu per le ombre (tonalità 252-256). L'elenco con le righe è in §8. Fuori da `styles.css`: lo stroke del campo nell'hero (`index.html:56`), lo stemma in hex (`crest.svg`), il thumbnail del bundler in hex (`index.html:8-17`), lo scorebug TV in hex (§4.20).

### 2.2 Tipografia

**Famiglie** (`styles.css:40-43`), caricate da Google Fonts con `@import` e `display=swap` (`styles.css:10`). Non ci sono `@font-face` né font locali.

| Token | Famiglia | Ruolo | Pesi caricati | Pesi usati nel CSS |
|---|---|---|---|---|
| `--font-display` | `'Saira Condensed', 'Arial Narrow', sans-serif` | Titoli, numeri grandi, nomi | 500-900 | 700, 800, 900 |
| `--font-hud` | `'Chakra Petch', system-ui, sans-serif` | Nav, pulsanti, tab, h4, etichette di colonna | 400-700 | 600, 700 |
| `--font-mono` | `'JetBrains Mono', monospace` | Kicker, pill, dati, countdown, micro etichette | 400, 500, 700 | 400, 500, 700 |
| `--font-body` | `'DM Sans', system-ui, sans-serif` (asse opsz 9..40) | Testo corrente | 400-700 | 400 (700 solo da `<b>`/`<strong>`) |

Pesi caricati e mai dichiarati in CSS: Saira 500 e 600, Chakra 400 e 500, DM Sans 500 e 600.

**Scala dei corpi.** Non esiste una scala a token: ogni regola scrive il suo valore in `rem` (36 valori distinti da 0.5 a 6.4rem nelle dichiarazioni `font-size: Nrem`; 39 contando anche 3.4, 3.6 e 7rem che compaiono solo dentro i `clamp()`). Il corpo base non è dichiarato, quindi vale il default del browser. I valori presenti, per fascia:

| Fascia | Valori (rem) | Esempi |
|---|---|---|
| Titolo hero (fluido) | `clamp(3.4rem, 9vw, 7rem)` | `.hero h1` (:248) |
| Titolo di sezione (fluido) | `clamp(2.1rem, 5vw, 3.6rem)` | `.sec-title` (:102) |
| Numeri grandi display | 2.1 · 2.2 · 2.4 · 2.6 · 6.4 | `.hero-meta b` (:263), `.yr` (:360), `.tstep .n` (:487), `.ovr b`/`.price` (:396, :477), `.pnum` (:401) |
| Titoli di card e marchio | 1.1 · 1.18 · 1.2 · 1.4 · 1.5 · 1.7 · 1.9 · 2 | `.info-card h3` (:496), `.brand-name b` (:189), `.pname` (:406), `.cd b` (:308), `.tess h3` (:475) |
| Testo di lettura | 1.05 · 1.12 | `.section-head p` (:113), `.hero p.lede` (:258) |
| UI e HUD | 0.74 – 1 | `.nav a` 0.82 (:198), `.tab` 0.82 (:370), `.btn` 0.92 (:123) |
| Micro etichette mono | 0.5 – 0.72 | `.kicker` 0.72 (:84), `.pill` 0.66 (:149), `.cd span` 0.55 (:309), `.pstat span` 0.5 (:411) |

**Interlinea**: corpo `1.6` (`styles.css:57`), l'unico valore sopra 1. Titoli e numeri: `0.8` (`.ovr b`, `.pnum`), `0.86` (`.hero h1`), `0.95` (`.sec-title`, `.pname`), `1` (9 occorrenze).

**Spaziatura tra lettere** (sempre in `em`):

- negativa solo sui titoli display: `-0.01em` (`.sec-title`, :104), `-0.015em` (`.hero h1`, :249);
- etichette mono in maiuscolo: da 0.06 a 0.22em (`.kicker` 0.22em, :86; i valori più bassi sono `.foot-bot` 0.06em, :528, e `.doc-info span` 0.08em, :458);
- HUD e pulsanti: da 0.03 a 0.16em (i valori più alti sono `.ticker-label` 0.16em, :329, `.tier-label b` 0.16em, :419, e `.foot-col b` 0.14em, :525);
- casi speciali: `.brand-name span` 0.34em (:193), `.hero h1 .city` 0.5em (:255).

**Maiuscolo**: si ottiene con `text-transform: uppercase` in CSS, non scrivendo in maiuscolo nell'HTML. Sono in maiuscolo tutti i titoli display, tutti gli elementi HUD e quasi tutte le etichette mono. Il testo DM Sans non è mai in maiuscolo (unica eccezione `.pname small`, :407).

### 2.3 Spazi

Non ci sono token di spaziatura: tutto è in `px`, scritto nelle regole. Valori ricorrenti:

| Uso | Valore | Riferimento |
|---|---|---|
| Padding verticale delle sezioni | 96px, 64px sotto i 560px | `.section` :111, :670 |
| Spazio sotto l'intestazione di sezione | 48px | `.section-head` :112 |
| Padding laterale del contenitore | 28px, 18px sotto i 560px | `.wrap` :79, :669 |
| Padding card grandi | 28px | `.tess` :467, `.info-card` :495 |
| Padding card medie | 18px / 22px | `.pcard` :383, `.doc` :444 / `.tstep` :486 |
| Barre di scorebug | 13px 18px | `.scorebug-top` :280, `.scorebug-foot` :312 |
| Pulsante | 14px 26px | `.btn` :126 |
| Tab | 10px 18px | `.tab` :372 |
| Link nav | 9px 13px | `.nav a` :200 |
| Pill | 5px 11px | `.pill` :152 |
| Gap tra card in griglia | 14px (sponsor, documenti), 18px (roster, tesseramenti) | :421, :442, :378, :465 |
| Gap più frequenti in generale | 10px (×7), 14px (×6) | — |
| Separatore a griglia | `gap: 1px` su fondo `--line` (`.countdown`) o `--line-soft` (`.pstats`) | `.countdown` :304-305, `.pstats` :408 |
| Offset delle ancore | `scroll-padding-top: 88px` | `html` :50 |

### 2.4 Raggi

Nessun token. Valori presenti:

| Valore | Uso tipico | Righe |
|---|---|---|
| 4px | Controlli: pulsante, nav, tab, chip `.pos` | :127, :200, :372, :398, :654 |
| 6px · 8px | Card piccole, documenti, sponsor, step | :226, :408, :459 · :427, :445, :486, :636 |
| 10px | Card grandi: scorebug, pcard, tess, info-card, mappa | :274, :380, :467, :495, :503 |
| 12px | Stemma squadra nello scorebug | :289 |
| 100px | Pill | :153 |
| 50% | Pallini (live, timeline, liste) | :160, :356, :481 |
| 50% 50% 50% 0 | Pin a goccia della mappa | :512 |
| 2px · 3px · 5px · 7px | Casi singoli | :350 · :224 · :450, :602 · :434, :515 |

Angoli tagliati con `clip-path` invece del raggio: `.btn` 9px (:130), `.ticker-label` 12px (:330), `.captain-flag` 10px (:412).

### 2.5 Bordi e ombre

**Bordo standard**: `box-shadow: inset 0 0 0 1px var(--line)`. Sugli elementi interattivi all'hover diventa `inset 0 0 0 1px var(--cyan)`.

- Bordo inset e hover ciano: `.btn-ghost` (:143), `.tab` (:376), `.pcard` (:392), `.slogo` (:433), `.doc` (:448), `.socials a` (:516), `.live-close` (:615-619).
- Solo bordo inset, senza nessuna regola `:hover`: `.pill` (:146-157), `.tess` (:466-471), `.tstep` (:486), `.info-card` (:495), `.burger` (:226).

I bordi CSS veri (`border`) sono tutti `1px solid var(--line)` o `var(--line-soft)` e servono da separatori (HUD :178, ticker :321, footer :528 ecc.).

**Ombre di elevazione** (offset verticale / sfocatura), tutte con colori letterali scuri o blu:

| Ombra | Dove |
|---|---|
| `0 8px 20px` | stemma casa :294, tab attiva :375 |
| `0 14px 30px` / `0 18px 38px` | `.btn-primary` / al suo hover (:135, :137) |
| `0 14px 34px` / `0 22px 48px` | `.pcard` / al suo hover (:382, :392) |
| `0 18px 44px` | `.tess.feat` (:472) |
| `0 30px 70px` | `.scorebug` (:275) |
| `drop-shadow(0 3px 8px oklch(0.2 0.1 260 / 0.6))` | stemma del brand (`.brand img`, :186) |
| `text-shadow: 0 6px 40px oklch(0.4 0.18 256 / 0.6)` | `.hero h1` (:251) |

**Glow**: `0 0 8px var(--cyan)` sotto il link attivo (:207); `0 0 0 3px var(--blue), 0 0 14px var(--blue)` sui pallini timeline (:357), variante ciano (:359); `0 0 0 6px var(--live-glow)` sul pin (:512).

### 2.6 Movimento

Nessun token: durate e curve sono scritte nelle regole.

| Durata | Uso |
|---|---|
| 0.15s | hover di nav, tab, social, footer, chiusura live |
| 0.18s · 0.2s | pulsanti, documenti · sponsor |
| 0.25s | pcard |
| 0.35s | apertura/chiusura del pannello live |
| 0.45s + ritardo `40 + i*45` ms | comparsa scaglionata delle card del roster (`app.js:119-124`) |
| 0.7s | comparsa allo scroll `.reveal` (:531) |
| 1100 ms | count-up dei numeri hero, easing `1-(1-p)^3` (`app.js:138-152`) |
| 1.6s infinita | `pulse` del pallino live (:163) |
| 38s infinita | scorrimento del ticker (:333) |

- **Curva principale**: `cubic-bezier(0.22,1,0.36,1)` (CSS :128, :385, :531, :551, :558; JS `app.js:122`).
- `ease-out` solo per `pulse`; `linear` per il ticker. Le altre transizioni non hanno curva esplicita (quindi `ease`).
- **Keyframes**: `pulse` (box-shadow da 0 a 9px, :165-169) e `ticker` (`translateX(0)` → `-50%`, :342).
- `scroll-behavior: smooth` su `html` (:50).
- **Non esiste** `prefers-reduced-motion` (vedi §6).

### 2.7 Livelli (z-index)

Nessuna scala a token. Valori: 0 e 1 per sovrapposizioni locali, 2 (`.hero-grid` :241, `.captain-flag` :412), 3 (`.ticker` :320), **100** (`.hud` :175), **220** (`.live-offcanvas` :544).

### 2.8 Breakpoint

Due sole media query, entrambe `max-width`: l'impostazione è desktop-first.

| Breakpoint | Righe | Cosa cambia |
|---|---|---|
| `max-width: 920px` | `styles.css:643-667` | Nav nascosta e burger visibile; orologio nascosto; hero e info a una colonna (gap di `.hero-grid` da 48 a 36px, :664); mappa alta 260px |
| `max-width: 560px` | `styles.css:668-693` | Padding laterale 18px; sezioni a 64px; `.hero-meta` con gap 22px (:671); pannello live a tutto schermo senza titolo; `.live-close` ridotto a 24×24px (:677-683) |

Il resto della responsività viene dalle griglie `auto-fit`/`auto-fill` (§3) e dai tre `clamp()` dei titoli.

---

## 3. Layout e griglia

**Contenitore.** Tutte le sezioni usano `.wrap`: `max-width: var(--maxw)` (1240px), `margin: 0 auto`, `padding: 0 28px` (`styles.css:79`). La barra HUD usa la stessa larghezza (`.hud-inner`, :181-182).

**Struttura della pagina** (`index.html`):

```
header.hud#hud                         barra fissa in alto (sticky, 72px)
main#top
  section.hero                         campo SVG + titolo + scorebug + ticker
  section.section#storia               01
  section.section#roster               02
  section.section#sponsor              03
  section.section#documenti            04
  section.section#tesseramenti         05
  section.section#info                 06
aside.live-offcanvas#liveOffcanvas     pannello della diretta (fuori da main)
footer.foot
script app.js
```

**Misura del testo**: `.section-head` max 720px (:112); paragrafi `.section-head p` 60ch (:113), `.hero p.lede` 46ch (:258), `.tl-item p` 30ch (:363).

**Griglie con colonne fisse**

| Selettore | Colonne | Gap | Riga |
|---|---|---|---|
| `.hero-grid` | `1.15fr 0.85fr` (1 colonna sotto 920px) | 48px (36px sotto 920px) | :242, :664 |
| `.matchup` | `1fr auto 1fr` | 8px | :286 |
| `.countdown` | `repeat(4, 1fr)` | 1px | :304 |
| `.pstats` | `repeat(3, 1fr)` | 1px | :408 |
| `.info-grid` | `1fr 1fr` (1 colonna sotto 920px) | 24px | :494, :665 |
| `.sponsor-grid.main` | `1fr` | 14px | :422 |

**Griglie responsive senza media query**

| Selettore | Colonne | Gap | Riga |
|---|---|---|---|
| `.tl-grid` | `repeat(auto-fit, minmax(210px, 1fr))` | 0 | :352 |
| `.roster` | `repeat(auto-fill, minmax(220px, 1fr))` | 18px | :378 |
| `.sponsor-grid.gold` | `repeat(auto-fill, minmax(220px, 1fr))` | 14px | :423 |
| `.sponsor-grid.tech` | `repeat(auto-fill, minmax(160px, 1fr))` | 14px | :424 |
| `.docs` | `repeat(auto-fill, minmax(300px, 1fr))` | 14px | :442 |
| `.tess-grid` | `repeat(auto-fit, minmax(280px, 1fr))` | 18px | :465 |
| `.tess-steps` | `repeat(auto-fit, minmax(200px, 1fr))` | 18px | :485 |

**Pattern di layout ricorrenti**:

- centratura con `display: grid; place-items: center` per icone e sigle (`.team .crest`, `.slogo .ph`, `.doc-dl`, `.socials a`, `.live-close`);
- card in colonna con il piede spinto in basso da `margin-top: auto` (`.pcard` :384 + :405, `.tess` :470 + :483);
- separatori ottenuti con `gap: 1px` su un fondo `--line` (`.countdown` :304-305) o `--line-soft` (`.pstats` :408).

---

## 4. Componenti

Convenzioni di naming (vale per tutti):

- classi in inglese, kebab-case, senza BEM: i sotto-elementi prendono il prefisso del blocco (`scorebug-top`, `pcard-body`, `doc-ic`);
- varianti come classe aggiuntiva breve (`.tess.feat`, `.team.home`, `.sponsor-grid.gold`, `.btn-primary`);
- figli generici selezionati per contesto senza classe (`.cd b`, `.team span`, `.yr small`);
- stati applicati da JS: `.active`, `.open`, `.in`, `body.live-open`; stato dei tab tramite `[aria-selected="true"]`;
- id usati da JS in camelCase (`rosterGrid`, `liveToggle`); id delle sezioni in italiano minuscolo (`storia`, `tesseramenti`). Fa eccezione `scorebug.html`, con id in kebab-case (`dot-home`, `score-home`, `shot-clock`, §4.20);
- commenti di blocco: `<!-- ═══════════ NOME ═══════════ -->` in HTML, `/* ════ NOME ════ */` in CSS. In HTML ci sono anche commenti semplici: `<!-- court line art -->` (`index.html:54`), `<!-- SCOREBUG -->` (:90), `<!-- TICKER -->` (:123).

### 4.1 Kicker (etichetta di sezione)

**Scopo**: etichetta numerata sopra il titolo di sezione; nell'hero indica la stagione.

```html
<span class="kicker">01 — La nostra storia</span>
```

- CSS `styles.css:82-97`: mono 0.72rem, maiuscolo, `letter-spacing: 0.22em`, colore `--cyan`, trattino sfumato 22×2px davanti (`::before`).
- Formato del contenuto: `NN — Titolo`, da 01 a 06 (`index.html:136, 173, 192, 230, 274, 332`). Nell'hero: `Stagione 2025 / 26 · Serie D` (`index.html:70`).

**Fai**: numera in sequenza le sezioni; usa la lineetta lunga `—` con spazi.
**Non fare**: non scriverlo in maiuscolo nell'HTML (lo fa il CSS); non saltare numeri.

### 4.2 Titolo di sezione e intestazione

**Scopo**: aprire ogni sezione con kicker, titolo e una o due frasi.

```html
<div class="section-head reveal">
  <span class="kicker">02 — Il roster</span>
  <h2 class="sec-title">Scegli il tuo <em>quintetto</em></h2>
  <p>Una o due frasi di introduzione.</p>
</div>
```

- `.sec-title` (`styles.css:99-109`): display 800, `clamp(2.1rem, 5vw, 3.6rem)`, maiuscolo, interlinea 0.95. `em` non è corsivo ed è colorato `--blue-bright`.
- `.section-head` (`styles.css:112-113`): max 720px, margine sotto 48px; `p` in `--ink-soft`, 1.05rem, max 60ch.
- Il `p` è facoltativo (in Info manca, `index.html:331-334`).

**Fai**: metti in `<em>` l'ultima parte del titolo (§5).
**Non fare**: non togliere `reveal` da una intestazione per una sola sezione (le altre la hanno tutte); non usare `<em>` per il corsivo.

### 4.3 Pulsante

**Scopo**: invito all'azione. È sempre un `<a>`.

```html
<a href="#tesseramenti" class="btn btn-primary">Tesserati ora</a>
<a href="#roster" class="btn btn-ghost">Il roster ▸</a>
```

- Base `.btn` (`styles.css:119-131`): HUD 700, 0.92rem, maiuscolo, padding 14×26, raggio 4, angolo in basso a destra tagliato di 9px con `clip-path`.
- `.btn-primary` (:132-137): fondo `--blue`, testo bianco. Hover: fondo `--blue-bright`, `translateY(-2px)`, ombra con anello ciano.
- `.btn-ghost` (:138-143): velatura navy, bordo inset `--line`. Hover: bordo e testo ciano, `translateY(-2px)`.
- Dentro `.tess`: `margin-top: auto; justify-content: center` (:483).
- Stati `:focus-visible` e `:active`: **non definiti** (vedi §6).

**Fai**: un solo primario per gruppo (hero: 1 primario + 1 ghost, `index.html:80-81`; tesseramenti: primario solo nella card in evidenza).
**Non fare**: non usare `<button>` con queste classi senza verificare lo stile (il reset di `button` è a :77); non aggiungere altri pulsanti bianco-su-blu finché il contrasto non è corretto (§6).

### 4.4 Pill e pallino live

**Scopo**: badge con pallino pulsante.

```html
<span class="pill"><span class="dot-live"></span> Reparto Agonistico</span>
```

- `.pill` (`styles.css:146-157`): mono 0.66rem, maiuscolo, raggio 100px, bordo inset `--line`. Usata solo in `index.html:71`.
- `.dot-live` (:159-169): cerchio 8×8 `--live`, animazione `pulse 1.6s ease-out infinite`. Compare in `index.html:43, 71, 94, 125`.

**Fai**: usa `.dot-live` per indicare qualcosa in diretta.
**Non fare**: non moltiplicarlo: oggi pulsa sempre, anche senza diretta (§8).

### 4.5 Brand (stemma + nome)

```html
<a href="#top" class="brand">
  <img src="assets/crest.svg" alt="Stemma Polisportiva Maremola">
  <span class="brand-name">
    <b>Maremola</b>
    <span>Basket · Polisportiva</span>
  </span>
</a>
```

- CSS `styles.css:185-195`: immagine larga 38px con `drop-shadow`; `b` display 800 maiuscolo bianco; `span` mono 0.56rem ciano.
- Nel footer è un `div.brand` (non un link) e l'immagine è larga 52px (`index.html:385-391`, `styles.css:523`).

### 4.6 Header / HUD

**Scopo**: barra fissa con marchio, navigazione, pulsante LIVE e orologio.

```html
<header class="hud" id="hud">
  <div class="hud-inner">
    <a href="#top" class="brand">…</a>
    <nav class="nav" id="nav">
      <a href="#storia">Storia</a>
      …
    </nav>
    <div class="hud-clock">
      <button class="live-toggle" id="liveToggle" aria-label="Apri diretta live"
              aria-expanded="false" aria-controls="liveOffcanvas">
        <span class="lv"><span class="dot-live"></span>LIVE</span>
      </button>
      <span id="clock">--:--:--</span>
    </div>
    <button class="burger" id="burger" aria-label="Menu"><span></span></button>
  </div>
</header>
```

- `.hud` (`styles.css:174-179`): `position: sticky; top: 0`, `z-index: 100`, velatura navy all'82% con `backdrop-filter: blur(14px)`, bordo inferiore `--line`. `.hud-inner` alto 72px (:180-184).
- Link nav (:196-208): HUD, maiuscolo, `--ink-soft`. Hover: bianco con velatura. `.active`: ciano con barra di 2px e glow (`::after`).
- `.live-toggle` (:215-225): testo `--live` in grassetto; ha `:focus-visible` con outline ciano di 2px. Sotto 920px diventa un riquadro con bordo (:652-660).
- Burger (:226-228): nascosto, visibile sotto 920px (:661). Con `.hud.open` la nav diventa una colonna assoluta a `top: 72px` (:662-663).

**Comportamento JS**:

- Orologio: scrive `HH:MM:SS` in `#clock` ogni secondo (`app.js:8-16`). Nascosto sotto 920px (`styles.css:651`).
- Scroll-spy: `IntersectionObserver` con `rootMargin: '-45% 0px -50% 0px'` che mette `.active` sul link della sezione visibile (`app.js:171-185`). Il link trova la sezione dal suo `href`.
- Burger: il click alterna `.open` su `.hud`; il click su un link della nav la toglie (`app.js:188-195`).
- LIVE: è un toggle. Se il pannello ha già `.open` lo chiude con `closeLiveOffcanvas()`, altrimenti lo apre (`app.js:242-248`, §4.15).

**Fai**: per una nuova voce di menu, aggiungi un `<a href="#id-sezione">` in `.nav`: lo scroll-spy la gestisce da solo se l'`id` esiste. L'`href` deve essere nella forma `#id`: lo scroll-spy lo usa come selettore CSS (`document.querySelector(a.getAttribute('href'))`, `app.js:173`). Deduzione non provata in un browser: un link in `.nav` con un URL esterno o un'altra pagina farebbe lanciare un `SyntaxError` e fermerebbe il resto dello script (menu mobile e pannello live, `app.js:188-263`).
**Non fare**: non cambiare l'altezza di 72px senza aggiornare `scroll-padding-top: 88px` (:50) e `top: 72px` del menu mobile (:662).

### 4.7 Hero

```html
<section class="hero">
  <svg class="hero-court" … aria-hidden="true">…</svg>
  <div class="wrap hero-grid">
    <div>
      <div class="hero-eyebrow">
        <span class="kicker">Stagione 2025 / 26 · Serie D</span>
        <span class="pill"><span class="dot-live"></span> Reparto Agonistico</span>
      </div>
      <h1>
        Maremola
        <span class="line2">Basket</span>
        <span class="city">Pietra Ligure · SV</span>
      </h1>
      <p class="lede">…</p>
      <div class="hero-cta">…pulsanti…</div>
      <div class="hero-meta">…contatori…</div>
    </div>
    <aside class="scorebug" aria-label="Prossima partita">…</aside>
  </div>
  <div class="ticker" aria-hidden="true">…</div>
</section>
```

- `.hero-court` (`index.html:55-65`, `styles.css:234-239`): disegno del campo in SVG, opacità 0.5, sfumato verso il basso con `mask-image`.
- `h1` (:246-257): display 900, `clamp(3.4rem, 9vw, 7rem)`; `.line2` in testo contornato `--blue-bright` di 2px; `.city` a 0.30em, ciano, `letter-spacing: 0.5em`.
- `p.lede` (:258): `--ink-soft`, 1.12rem, max 46ch.

### 4.8 Contatori (count-up)

```html
<div class="hero-meta">
  <div class="m" data-count="1987"><b>1987</b><span>Anno di fondazione</span></div>
  <div class="m" data-count="180"><b>180+</b><span>Atleti tesserati</span></div>
</div>
```

- CSS `styles.css:260-268`: `b` display 800 2.1rem; `span` mono 0.62rem maiuscolo `--ink-dim`.
- JS `countUp` (`app.js:138-152`): anima da 0 a `data-count` in 1100 ms quando `.hero-meta` entra in vista (`app.js:155-168`). Se il testo originale contiene `+`, lo rimette alla fine, ma solo all'ultimo fotogramma (`prog === 1 ? suffix : ''`, `app.js:148`). `.hero-meta` non ha la classe `reveal`: è osservata a parte dallo stesso `IntersectionObserver` (`app.js:167-168`).

**Fai**: tieni allineati `data-count` e il testo del `<b>` (il testo è ciò che si vede senza JS).
**Non fare**: non mettere testo non numerico in `data-count`.

### 4.9 Scorebug "Prossima partita"

```html
<aside class="scorebug" aria-label="Prossima partita">
  <div class="scorebug-top">
    <span>Prossima · Serie D · Girone A</span>
    <span class="live"><span class="dot-live"></span> J-7</span>
  </div>
  <div class="matchup">
    <div class="team home"><div class="crest">MAR</div><b>Maremola</b><span>Casa · 12-3</span></div>
    <div class="vs">VS</div>
    <div class="team away"><div class="crest">SVN</div><b>Savona</b><span>Trasf. · 10-5</span></div>
  </div>
  <div class="scorebug-when">SAB 06 GIU · 21:00 · PalaMaremola</div>
  <div class="countdown" id="countdown">
    <div class="cd"><b data-cd="d">--</b><span>Giorni</span></div>
    <div class="cd"><b data-cd="h">--</b><span>Ore</span></div>
    <div class="cd"><b data-cd="m">--</b><span>Min</span></div>
    <div class="cd"><b data-cd="s">--</b><span>Sec</span></div>
  </div>
  <div class="scorebug-foot"><span>Biglietti · Settore Tifoseria</span><a href="#info">Come arrivare ▸</a></div>
</aside>
```

- CSS `styles.css:271-316`. `.scorebug`: gradiente navy 850→900, raggio 10, ombra `0 30px 70px`. `.team .crest`: 60×60, raggio 12, sigla di 3 lettere. Varianti `.team.home` (gradiente blu con glow) e `.team.away` (navy 700→850). `.cd b`: mono 1.7rem ciano.
- JS (`app.js:20-47`): calcola il prossimo sabato alle 21:00 e aggiorna ogni secondo i `[data-cd]` a due cifre. Seleziona per `data-cd`, non per `#countdown`. La data obiettivo (`target`) è calcolata una sola volta al caricamento (`app.js:30`) e mai ricalcolata: arrivato a zero il countdown resta fermo a 00 (`Math.max(0, …)`, `app.js:38`) finché la pagina non viene ricaricata.

**Fai**: la squadra di casa va in `.team.home`, quella in trasferta in `.team.away`; sigle di 3 lettere maiuscole.
**Non fare**: non considerare la data scritta come collegata al countdown: oggi non lo è (§8).

### 4.10 Ticker "Stats Live"

```html
<div class="ticker" aria-hidden="true">
  <div class="ticker-label"><span class="dot-live"></span> Stats Live</div>
  <div class="ticker-track-wrap">
    <div class="ticker-track" id="ticker"></div>
  </div>
</div>
```

- Il contenuto non è nell'HTML: lo genera `app.js:50-67` dall'array `feed` di oggetti `{ k, t, up? }`. Ogni voce diventa `<span class="ticker-item"><span class="k">K</span> <span class="up">T</span></span>`, dove `class="up"` c'è solo se `i.up` è vero; altrimenti lo span ha `class=""` (`app.js:63-64`; oggi 5 voci su 8 sono senza `up`, `app.js:51-58`); l'HTML è inserito due volte per il loop continuo.
- CSS `styles.css:319-342`: etichetta su fondo `--live` con taglio obliquo; scorrimento 38s lineare infinito, in pausa all'hover; `.k` ciano maiuscolo, `.up` `--gold`.

**Fai**: per cambiare le notizie modifica l'array `feed` in `app.js`; usa `up: true` per un dato positivo.
**Non fare**: non mettere informazioni importanti solo qui: il ticker è `aria-hidden` e non arriva agli screen reader.

### 4.11 Timeline

```html
<div class="timeline reveal">
  <div class="timeline-bar"></div>
  <div class="tl-grid">
    <div class="tl-item">
      <div class="yr"><small>Il fischio d'inizio</small>1987</div>
      <h4>Fondazione</h4>
      <p>Una frase breve.</p>
    </div>
    <div class="tl-item cap">…</div>
  </div>
</div>
```

- CSS `styles.css:347-363`: barra di 3px; pallino assoluto a `top: -54px` con anello `--blue` e glow; variante `.tl-item.cap` con anello `--cyan` (usata per il 2014, `index.html:154`). `.yr` display 2.2rem; `.yr small` mono ciano; `p` max 30ch.

**Fai**: usa `.cap` per una sola tappa da evidenziare.

### 4.12 Tab e card giocatore (roster)

```html
<div class="tabs reveal" role="tablist">
  <button class="tab" role="tab" aria-selected="true" data-roster="prima">Prima Squadra</button>
  <button class="tab" role="tab" aria-selected="false" data-roster="under">Under 19</button>
  <button class="tab" role="tab" aria-selected="false" data-roster="mini">Minibasket</button>
</div>
<div class="roster reveal" id="rosterGrid"></div>
```

Card generata da `renderRoster` (`app.js:97-125`):

```html
<article class="pcard">
  <span class="captain-flag">Capitano</span>
  <div class="pcard-top">
    <div class="ovr"><b>86</b><span>OVR</span></div>
    <span class="pos">PG</span>
  </div>
  <div class="pnum">4</div>
  <div class="pcard-body">
    <div class="pname">M. Ferro<small>Playmaker</small></div>
    <div class="pstats">
      <div class="pstat"><b>18</b><span>PT</span></div>
      …×3
    </div>
  </div>
</article>
```

- Dati: oggetto `rosters` (`app.js:70-94`), chiavi `prima`, `under`, `mini`. Campi di ogni giocatore: `n` (nome), `r` (ruolo), `pos`, `num`, `ovr`, `cap` (facoltativo), `st` (tre coppie `[etichetta, valore]`).
- Tab (`styles.css:368-376`): attivo con `[aria-selected="true"]`, fondo `--blue` con glow; hover sui non attivi con bordo ciano. JS (`app.js:128-135`): al click aggiorna `aria-selected` e chiama `renderRoster(data-roster)`.
- Card (`styles.css:379-412`): gradiente 800→900→950, raggio 10, `min-height: 320px`. Hover: `translateY(-6px)`, bordo ciano, glow radiale (`::before`). `.ovr b` display 900 2.6rem ciano; `.pnum` 6.4rem contornato `--line`; `.captain-flag` ciano con `clip-path`.
- Casi speciali: con `cap: true` compare la bandierina, testo "Squad" se la chiave è `mini` (`app.js:106`); se `num <= 0` al posto del numero compare 🏀 (`app.js:104`).
- Entrata: stagger con stili inline (`app.js:119-124`). Render iniziale: `renderRoster('prima')` (`app.js:126`).

**Fai**: per aggiungere un giocatore aggiungi un oggetto all'array giusto in `rosters`, sempre con tre statistiche in `st`. Per una nuova squadra aggiungi una chiave in `rosters` e un `button.tab` con `data-roster` uguale.
**Non fare**: non scrivere card a mano in `#rosterGrid`: `renderRoster` sostituisce il contenuto con `innerHTML`.

### 4.13 Sponsor

```html
<div class="sponsor-tier">
  <div class="tier-label"><b>Gold Partner</b><span class="ln"></span></div>
  <div class="sponsor-grid gold">
    <div class="slogo"><span class="ph">LOGO</span> Partner A</div>
  </div>
</div>
```

- CSS `styles.css:417-437`. Varianti di griglia: `.main` (1 colonna, card alta 150px, testo 2rem, bordo blu, `.ph` 54px su fondo blu), `.gold` (minmax 220px), `.tech` (minmax 160px, card 72px, testo 1rem).
- `.slogo`: alta 96px, display 800; hover con testo bianco e bordo ciano. `.ph` è il riquadro segnaposto del logo (34×34).
- Oggi i loghi sono segnaposto di testo (`index.html:201-219`): `.ph` con `LOGO` per main e gold, `SP` per tech. Nessun JS.

**Non fare**: il codice non prevede ancora un'immagine dentro `.slogo`; chi la aggiunge deve definirne lo stile.

### 4.14 Documenti

```html
<a class="doc" href="#">
  <div class="doc-ic"><b>PDF</b></div>
  <div class="doc-info"><b>Statuto societario</b><span>PDF · 240 KB · agg. 2024</span></div>
  <div class="doc-dl">↓</div>
</a>
```

- CSS `styles.css:442-460`: griglia minmax 300px; `.doc-ic` 46×56 con angolo piegato (`::after`); hover: bordo ciano, `translateX(3px)`, `.doc-dl` su fondo blu.
- Formato della riga di dettaglio: `TIPO · PESO` più un terzo campo facoltativo e variabile (`index.html:238-263`): `agg. 2024` (:238), `agg. 2025` (:243), `stagione 25/26` (:248), nessuno (`PDF · 60 KB`, :253; `DOCX · 40 KB`, :258), `GDPR` (:263). L'icona del documento a :257 dice `DOC` mentre il dettaglio a :258 dice `DOCX`.
- Tutti gli `href` sono `#` (segnaposto). Nessun JS.

**Fai**: metti il percorso reale del file in `href`.

### 4.15 Pannello della diretta (offcanvas)

```html
<aside class="live-offcanvas" id="liveOffcanvas" role="dialog" aria-modal="true"
       aria-labelledby="liveTitle" aria-hidden="true">
  <div class="live-panel" role="document">
    <header class="live-panel-head">
      <h2 id="liveTitle">Maremola Live</h2>
      <button class="live-close" id="liveClose" aria-label="Chiudi diretta">
        <span aria-hidden="true">×</span>
      </button>
    </header>
    <div class="live-panel-body">
      <iframe id="liveFrame" data-src="https://streaming.ricordatiilatte.it/embed/video"
              title="Owncast" referrerpolicy="origin" allowfullscreen></iframe>
    </div>
  </div>
  <button class="live-backdrop" id="liveBackdrop" aria-label="Chiudi diretta live"></button>
</aside>
```

- CSS `styles.css:537-638`: chiuso con `opacity: 0; visibility: hidden; pointer-events: none`; `.open` lo mostra con dissolvenza di 0.35s; `z-index: 220`; `body.live-open` blocca lo scroll. Sotto 560px: titolo nascosto, iframe a tutto schermo (:672-692).
- JS (`app.js:198-263`). Apertura: salva il focus, aggiunge `.open`, `aria-hidden="false"`, `body.live-open`, `aria-expanded="true"` sul toggle, copia `data-src` in `src`, sposta il focus su `#liveClose`. Chiusura: l'inverso, toglie `src` (lo stream si ferma) e riporta il focus. Si chiude con il pulsante ×, con il click sullo sfondo, con Esc e con un secondo click su `#liveToggle`, che è un toggle (`app.js:242-248`).

**Fai**: cambia la sorgente solo nell'attributo `data-src`.
**Non fare**: non mettere `src` direttamente sull'iframe: lo stream partirebbe al caricamento della pagina.

### 4.16 Tesseramenti (card piano e passi)

```html
<div class="tess feat">
  <span class="mode">Settore giovanile</span>
  <h3>Under 13 / 19</h3>
  <span class="age">Nati 2007 — 2014</span>
  <div class="price">€ 360<small>/anno</small></div>
  <ul>
    <li>3 allenamenti + campionato FIP</li>
  </ul>
  <a href="#info" class="btn btn-primary">Iscriviti ora</a>
</div>

<div class="tstep"><div class="n">01</div><h4>Compila il modulo</h4><p>…</p></div>
```

- `.tess` (`styles.css:465-483`): gradiente 850→900, raggio 10, flex a colonna, pulsante in fondo. `.price` display 2.6rem. Ogni `li` ha un cerchio `--cyan-soft` e una spunta "✓" generata in CSS (:481-482).
- Variante `.tess.feat`: bordo blu di 1.5px, ombra, nastro diagonale "PIÙ SCELTO" scritto nel CSS (`content`, :473). Contiene il `btn-primary`; le altre card il `btn-ghost`.
- `.tstep` (:485-489): `.n` 2.4rem in testo contornato `--blue`.

**Fai**: una sola card `.feat` per griglia.
**Non fare**: il testo "PIÙ SCELTO" non si cambia dall'HTML: è in `styles.css:473`.

### 4.17 Info, contatti e mappa

```html
<div class="info-grid reveal">
  <div class="info-card">
    <h3>Segreteria</h3>
    <div class="info-row"><span class="lbl">Sede</span><span class="val"><b>A.S.D. Polisportiva Maremola</b><br>Viale della Repubblica 74, Pietra Ligure (SV)</span></div>
    <div class="info-row"><span class="lbl">Telefono</span><span class="val"><a href="tel:+39019617539">019 617539</a></span></div>
    <div class="socials"><a href="#" aria-label="Instagram">IG</a>…</div>
  </div>
  <figure class="mappa">
    <iframe class="mappa-frame" title="Mappa: …" src="https://www.openstreetmap.org/export/embed.html?bbox=…&amp;layer=mapnik&amp;marker=LAT%2CLON" loading="lazy"></iframe>
    <figcaption class="mappa-piede"><span>Viale della Repubblica 74 · Pietra Ligure</span><a href="https://www.openstreetmap.org/?mlat=LAT&amp;mlon=LON#map=18/LAT/LON" target="_blank" rel="noopener">Apri la mappa ▸</a></figcaption>
  </figure>
</div>
```

- `.info-row` (`styles.css`, blocco INFO / CONTATTI): `.lbl` larga 110px, mono ciano; l'ultima riga è senza bordo. I link dentro `.val` (telefono) ereditano il colore e diventano ciano all'hover.
- `.socials a`: 42×42 con sigla di 2 lettere e `aria-label`; hover ciano.
- `.mappa`: card con raggio 10px, fondo `--navy-900` e bordo `inset 0 0 0 1px var(--line)`. Dentro, l'iframe di OpenStreetMap (`.mappa-frame`, altezza fissa 360px, 260px sotto i 920px: la mappa nell'iframe prende la misura al caricamento) e il piede `.mappa-piede` in mono maiuscolo `--ink-soft` con il link «Apri la mappa ▸» in `--cyan`. Palazzetto: edificio OSM way/202329447 (palestra in Viale della Repubblica, angolo via Cesare Battisti), centro 44.154418, 8.293509. Nessuna libreria o chiave: è l'embed ufficiale di OpenStreetMap.

**Fai**: ogni icona social deve avere un `aria-label` con il nome del servizio; l'iframe della mappa deve avere un `title`. **Non fare**: non sostituire l'embed con librerie di mappe (Leaflet, Google Maps) senza un motivo scritto nella issue.

### 4.18 Footer

```html
<footer class="foot">
  <div class="wrap">
    <div class="foot-top">
      <div><div class="brand">…</div><p>…</p></div>
      <div class="foot-cols">
        <div class="foot-col"><b>Società</b><a href="#storia">Storia</a>…</div>
      </div>
    </div>
    <div class="foot-bot"><span>© 2026 …</span><span>C.F. … · Affiliata FIP</span></div>
  </div>
</footer>
```

- CSS `styles.css:521-528`: `.foot-col b` HUD ciano maiuscolo; `.foot-col a:hover` bianco; `.foot-bot` mono maiuscolo `--ink-dim`.

### 4.19 Reveal allo scroll (comportamento trasversale)

- `.reveal` parte con `opacity: 0; transform: translateY(26px)` e con `.in` diventa visibile in 0.7s (`styles.css:531-532`).
- JS (`app.js:155-166`): `IntersectionObserver` con threshold 0.18, aggiunge `.in` una sola volta.
- Usato su ogni `.section-head`, `.timeline`, `.tabs`, `.roster`, blocco sponsor, `.docs`, `.tess-grid`, `.tess-steps`, `.info-grid`.

**Fai**: aggiungi `reveal` ai blocchi di una nuova sezione, come nelle altre.
**Non fare**: non metterlo su contenuto essenziale senza sapere che, senza JS, resta invisibile (§6).

### 4.20 Overlay TV `scorebug.html`

**Scopo**: tabellone sovrapposto alla diretta video. Sfondo trasparente "obbligatorio per Larix" (commento in `scorebug.html:7`).

```html
<div class="nba-scorebug">
  <div class="team-block home"><span class="possession-dot" id="dot-home"></span><span class="team-name">…</span></div>
  <div class="score-display" id="score-home">98</div>
  <span class="bonus-badge" id="bonus-home">BONUS</span>
  <span class="bonus-badge" id="bonus-away" style="opacity:0">BONUS</span>
  <div class="score-display" id="score-away">102</div>
  <div class="team-block away"><span class="team-name">…</span><span class="possession-dot" id="dot-away"></span></div>
  <div class="time-panel"><span class="game-time" id="clock">4:12</span><span class="game-quarter" id="quarter">4th QTR</span></div>
  <div class="shot-clock" id="shot-clock">14</div>
</div>
```

- Sistema separato: `<style>` interno (`scorebug.html:6-139`), non usa `styles.css`, `app.js` né i token. Font `'Helvetica Neue', Helvetica, Arial, sans-serif` (:12). Colori in hex: casa `#1e3a8a` con bordo `#f59e0b`, ospite `#b91c1c` con bordo `border-left: 4px solid #ffffff` (:46), ambra `#f59e0b`, rosso `#dc2626`, neutri `#000`, `#161616`, `#282828`, `#0a0a0a`, `#222`, `#888888`, `#ffffff`. Fuori dall'hex: il pallino di possesso ospite è bianco (`background-color: #ffffff`, :64) e l'ombra del tabellone è `rgba(0,0,0,0.8)` (:29).
- Nomi delle squadre segnaposto: `HOM` e `AWY` (`scorebug.html:147, 156`).
- Le classi `.home`/`.away` (`scorebug.html:45-46`) non hanno scope e hanno gli stessi nomi delle varianti `.team.home`/`.team.away` del sito. Gli id sono in kebab-case (`dot-home`, `score-home`, `shot-clock`), non in camelCase come nel sito. `id="clock"` (`scorebug.html:162`) è lo stesso id che `app.js` usa per l'orologio dell'HUD (`index.html:45`, `app.js:8`): oggi non c'è conflitto perché `scorebug.html` non carica `app.js`.
- Corpi in px (10, 11, 22, 28, 34), numeri tabellari (`font-variant-numeric: tabular-nums`, :69), altezza fissa 55px, posizione `top: 40px; left: 40px`.
- Stati: il possesso iniziale è impostato in CSS nascondendo il pallino ospite con `opacity: 0` (:64); il bonus ospite è nascosto con uno stile inline nell'HTML, `style="opacity: 0;"` (:153). Non ci sono classi di stato per possesso e bonus: l'unica classe di stato in CSS è `.shot-clock.danger` su fondo rosso (:135-138).
- Nessuno script: i valori sono statici e nel repo non c'è codice che aggiorni gli id.

**Non fare**: non importare `styles.css` né i token del sito in questa pagina senza decidere prima se l'overlay deve seguire l'identità del sito (oggi non la segue).

---

## 5. Voce e contenuti

**Tono**: informale, si dà del tu, imperativo per gli inviti.

- Esempi: "Tesserati ora" (`index.html:80`), "Scegli il tuo *quintetto*" (174), "Vieni al *palazzetto*" (333).
- Chiusure a slogan: "Si scende in campo." (323), "Cresciamo atleti, non solo giocatori." (392).
- Lessico da broadcast e videogioco (Stats Live, VS, OVR, player card).

**Lunghezze**:

- titoli H2 di 3-5 parole;
- introduzioni di sezione di una o due frasi;
- descrizioni della timeline in una frase;
- voci delle liste prezzi di 3-5 parole.

**Titoli con `<em>`**: ogni `.sec-title` mette in `<em>` la parte finale, che appare in `--blue-bright` e non in corsivo (`styles.css:109`). Esempi: "Quasi quarant'anni *a canestro*", "Tutto in *chiaro*". L'enfasi è solo di colore.

**Maiuscolo**: si scrive normale, il CSS lo trasforma. Fanno eccezione le sigle già maiuscole nell'HTML e nel JS: "LIVE", "VS", "MAR"/"SVN", "J-7" (`index.html:94`), "PDF"/"DOC", "LOGO"/"SP", la data dello scorebug, "OVR" e le posizioni "PG"/"SF"/"C" generate da JS (`app.js:108-109`); in `scorebug.html` "HOM", "AWY", "BONUS", "4th QTR".

**Formati presenti nel codice**

| Cosa | Formato | Riferimento |
|---|---|---|
| Data e ora della partita | `SAB 06 GIU · 21:00 · PalaMaremola` (giorno e mese abbreviati in maiuscolo, ora 24h) | `index.html:109` |
| Data breve | `14/06` | `app.js:55` |
| Orari | `Lun–Ven 17:00–20:00` (lineetta media, 24h) | `index.html:340` |
| Orologio | `HH:MM:SS` | `app.js:8-16` |
| Countdown | due cifre per Giorni / Ore / Min / Sec | `app.js:20-47` |
| Punteggio | `Maremola 78 — 71 Loano · W` | `app.js:51` |
| Record vittorie-sconfitte | `12-3` (scorebug), `12V — 3P` (ticker) | `index.html:100`, `app.js:53` |
| Stagione | `Stagione 2025 / 26`, `Stagione 25/26`, `stagione 25/26` | `index.html:70`, `app.js:58`, `index.html:248` |
| Intervalli di anni | `Nati 2015 — 2019` (lineetta lunga con spazi) | `index.html:283` |
| Prezzi | `€ 280` + `<small>/anno</small>` | `index.html:284` |
| Statistiche giocatore | sigla + valore (PT, AS, RB, ST, 3P, BS, PTI, RIM) | `app.js:72-92`, `app.js:52-54` |
| Statistiche minibasket | etichette `DIV`, `👟`, `🏀`; `ovr: 99` e `pos` U8/U7/U6: le card rappresentano squadre, non giocatori | `app.js:90-92` |

**Separatori tipografici**: `·` tra informazioni sulla stessa riga; `—` nei kicker, negli intervalli e nei punteggi; `▸` nei link testuali che portano altrove ("Il roster ▸", "Come arrivare ▸"); `↓` per scaricare.

**Lingua**: `lang="it"`. Alcune etichette sono in inglese (Main Sponsor, Gold Partner, Stats Live, Top Scorer, OVR) e non hanno `lang="en"` (§6, §8).

---

## 6. Accessibilità

### 6.1 Stato attuale: cosa c'è

- `lang="it"` su entrambe le pagine.
- `alt` sullo stemma (`index.html:27, 386`); campo SVG decorativo `aria-hidden` (55).
- Pulsante LIVE con `aria-label` e `aria-controls` statici nell'HTML (`index.html:42`) e `aria-expanded` aggiornato da JS (`app.js:224, 234`).
- Pannello live: `role="dialog"`, `aria-modal`, `aria-labelledby`; focus spostato sul pulsante di chiusura e restituito alla chiusura; chiusura con Esc (`app.js:218-263`).
- Tab con `role="tablist"`/`role="tab"` e `aria-selected` aggiornato (`app.js:131-132`).
- Social con `aria-label` (`index.html:344-347`).
- `:focus-visible` su `.live-toggle` e `.live-close` (`styles.css:221-225, 621-624`).

### 6.2 Contrasto misurato (WCAG 2.x)

Soglie AA: 4,5:1 testo normale; 3:1 testo grande (≥24px, o ≥18,66px in grassetto) e componenti grafici. Valori calcolati convertendo i token oklch in sRGB, senza considerare le sfumature di `body::before`: i valori reali in alto alla pagina possono essere un po' più bassi.

| Coppia | Uso | Rapporto | Esito |
|---|---|---|---|
| `--ink` su `--navy-950` | testo del corpo | 14,72 | ok |
| `--white` su `--navy-950` | titoli | 19,01 | ok |
| `--ink-soft` su `--navy-950` | lede, paragrafi, nav | 8,00 | ok |
| `--ink-soft` su fondo HUD | nav, orologio | 7,88 | ok |
| `--cyan` su `--navy-950` / `--navy-900` | kicker, countdown | 12,08 / 11,40 | ok |
| `--blue-bright` su `--navy-950` | `<em>` dei titoli | 7,89 | ok |
| `--gold` su ticker | `.up` | 11,81 | ok |
| `--live` su `--navy-950` | "LIVE" | 5,15 | ok |
| `--live` su fondo HUD (`oklch(0.16 0.05 264 / 0.82)` su `--navy-950`, :176) | testo del pulsante LIVE | 5,07 | ok |
| `--navy-950` su `--cyan` | `.captain-flag` | 12,08 | ok |
| `--ink-dim` su `--navy-950` | footer, `.hero-meta span` | 4,63 | al limite |
| `--ink-dim` su `.pstat` | etichette statistiche | 4,52 | al limite |
| `--ink-dim` su `--navy-900` | `.cd span` (:309) | **4,37** | non passa |
| `--ink-dim` su fondo `.doc` | `.doc-info span` (:458) | **4,37** | non passa |
| `--ink-dim` su fondo basso di `.pcard` (da `--navy-900` a `--navy-950`, :381) | `.pcard-body .pname small` (:407) | **4,37 – 4,63** | al limite / non passa |
| `--ink-dim` su `--navy-850` | `.team span`, `.tess .age`, `.price small` (:297, :476, :478) | **4,01** | non passa |
| `--ink-dim` su `--navy-850` | `.vs` (:298): display 800, 1.2rem = 19,2px in grassetto, testo grande (soglia 3:1) | 4,01 | ok |
| `--ink-dim` su `--navy-800` | `.ovr span` (:397) | **3,48** | non passa |
| `--ink-dim` su `.ph` (`--line` su fondo `.slogo` `oklch(0.22 0.04 264 / 0.5)`, :428, su `--navy-950`) | "LOGO"/"SP" (:434) | **2,98** (2,84 all'hover di `.slogo`, fondo :433) | non passa |
| `--white` su `--blue` | `.btn-primary`, tab attiva, nastro "PIÙ SCELTO", `.ph` sponsor principale (:133, :375, :473, :436) | **3,55** | non passa (testo piccolo) |
| `--white` su `--blue-bright` | hover di `.btn-primary` (:137) | **2,41** | non passa |
| `--white` su `--live` | `.ticker-label` (:327) | **3,69** | non passa |
| `--line` su `--navy-900` | numero contornato `.pnum` (:402) | 1,46 | quasi invisibile |

`scorebug.html`: `#888` su `#0a0a0a` 5,58; nero su `#f59e0b` 9,78; bianco su `#dc2626` 4,83; bianco su `#1e3a8a` 10,36; bianco su `#b91c1c` 6,47. Tutti sopra 4,5.

**Testi molto piccoli**, spesso mono, maiuscoli e in `--ink-dim`: 0,5rem (`.pstat span` :411, `.doc-ic b` :455), 0,54rem (`.ovr span` :397), 0,55rem (`.cd span` :309, `.captain-flag` :412), 0,56rem (`.brand-name span` :193, nastro :473), 0,58rem (`.team span` :297).

### 6.3 Problemi aperti

- **Contenuto invisibile senza JS**: `.reveal { opacity: 0 }` (`styles.css:531`) diventa visibile solo grazie ad `app.js:155-166`. Senza JS restano invisibili tutte le sezioni e il roster resta vuoto.
- **Focus**: nessun `:focus-visible` su pulsanti, nav, tab, documenti, social, link del footer. Su `.btn` il `clip-path` (:130) taglia probabilmente anche l'outline di default (deduzione dal comportamento di `clip-path`, non provata in un browser).
- **Movimento**: nessun `prefers-reduced-motion`. Pallino live infinito (4 punti), ticker infinito che si ferma solo con il mouse (:333-334), reveal, count-up, stagger, `scroll-behavior: smooth`.
- **Pannello live**: il focus non resta dentro il dialog (niente focus-trap né `inert` sulla pagina); `title="Owncast"` descrive il software e non il contenuto; `role="document"` superfluo (`index.html:360, 371`).
- **Tab**: mancano `role="tabpanel"`, `aria-controls`, la navigazione con le frecce; il cambio di contenuto non è annunciato.
- **Burger**: niente `aria-expanded` né `aria-controls` (`index.html:47`, `app.js:191`); il menu non si chiude con Esc.
- **Titoli**: la timeline passa da H2 a H4 (`index.html:146-161`); card giocatore e footer senza titoli.
- **Link**: social, documenti e due link del footer hanno `href="#"`; il nome dei link documento è tutto il contenuto concatenato; email e telefono sono link `mailto:`/`tel:`.
- **Lingua**: parti in inglese senza `lang="en"`; emoji 👟 e 🏀 usate come etichette di dati (`app.js:90-92, 104`).
- Nessuno skip link.

### 6.4 Cose da rispettare nelle modifiche

- Testo normale: almeno 4,5:1 sul fondo reale. Per testi piccoli su card (`--navy-850`/`800`) non usare `--ink-dim`: usa `--ink-soft` o più chiaro.
- Ogni nuovo elemento con `:hover` deve avere anche uno stile `:focus-visible` equivalente (modello: `.live-toggle:focus-visible`, `styles.css:221-225`).
- Ogni nuova animazione continua deve potersi fermare; le nuove animazioni andrebbero disattivate con `prefers-reduced-motion: reduce` (oggi non esiste nessuna regola di questo tipo: andrebbe introdotta).
- Immagini con `alt` descrittivo; immagini decorative con `alt=""` o `aria-hidden="true"`.
- Icone e sigle cliccabili con `aria-label`.
- Gerarchia dei titoli senza salti.
- Testo in un'altra lingua marcato con `lang`.

---

## 7. Regole per le modifiche

### 7.1 Cosa non toccare

- **`CNAME`** (contiene `basket.polmaremola.it`): lega il sito al dominio pubblicato.
- **`.github/workflows/opencode.yml`**: è il flusso dell'agente opencode sulle issue e richiede la build di GitHub Pages a fine lavoro (`opencode.yml:487-547`). Non modificarlo come parte di un ritocco al sito.
- Gli id usati da JS: `clock`, `ticker`, `rosterGrid`, `burger`, `hud`, `liveToggle`, `liveOffcanvas`, `liveClose`, `liveBackdrop`, `liveFrame`, e gli attributi `data-count`, `data-cd`, `data-roster`, `data-src`. Rinominarli rompe `app.js`.
- Le classi che `app.js` seleziona: `.reveal` (`app.js:166`), `.hero-meta` e `.m` (`app.js:160, 167`), `.tab[data-roster]` (`app.js:128`), `.nav a` (`app.js:171, 192`), oltre all'attributo `href` dei link della nav (`app.js:173`). Rinominarle rompe reveal, count-up, tab, scroll-spy e menu mobile.
- Gli `id` delle sezioni: sono le ancore della nav, del footer e dello scroll-spy.

### 7.2 Principi

- **Usa le variabili, non i letterali.** Colori con `var(--…)` dalla tabella §2.1; font con `var(--font-…)`; larghezza con `var(--maxw)`. Non aggiungere nuovi valori `oklch()`, hex o rgba se un token esistente fa lo stesso lavoro.
- **Niente stili inline.** Oggi ce ne sono due (`index.html:78`, `index.html:392`): non aggiungerne altri; crea o riusa una classe in `styles.css`.
- **Niente nuove dipendenze esterne senza motivo.** Il sito è HTML/CSS/JS statico, senza build e senza librerie; l'unica risorsa esterna è il CSS di Google Fonts (`styles.css:10`), più l'iframe dello streaming. Nessun nuovo font, framework o script da CDN senza una ragione documentata nell'issue.
- **Riusa i valori ricorrenti** quando un token non c'è: raggio 4px per i controlli e 10px per le card; bordo `inset 0 0 0 1px var(--line)` con hover `var(--cyan)`; curva `cubic-bezier(0.22,1,0.36,1)`; spazi 14px/18px tra card, 28px di padding nelle card grandi.
- **Maiuscolo via CSS**, non nel testo.
- **Mobile**: verifica a 920px e 560px, gli unici breakpoint.
- **Per l'assistente del CMS**: un piccolo ritocco cambia il valore di una proprietà dentro una regola esistente o sostituisce un letterale con un token. Se serve un colore nuovo, si aggiunge prima in `:root` con un nome che segua lo schema esistente (`--navy-NNN`, `--ink-…`), poi lo si usa.

### 7.3 Aggiungere una sezione

1. Copia una `section.section` esistente (per esempio `#documenti`, `index.html:227-267`) e dagli un `id` nuovo in italiano minuscolo.
2. Intestazione: `div.section-head.reveal` con `span.kicker` numerato in sequenza (`07 — …`), `h2.sec-title` con l'ultima parte in `<em>`, `p` di una o due frasi (§4.2).
3. Contenuto dentro lo stesso `.wrap`, in una griglia `auto-fill`/`auto-fit` con `minmax` (§3), con classe `reveal`.
4. Aggiungi il link in `.nav` (`index.html:34-41`) e, se serve, in una `.foot-col`.
5. Stili nuovi in `styles.css`, in un blocco con separatore `/* ════ NOME ════ */`, usando i token.

### 7.4 Aggiungere una card coerente

- Fondo: `linear-gradient(170deg, var(--navy-850), var(--navy-900))` (come `.tess` :468 e `.info-card` :495).
- Raggio 10px; bordo `box-shadow: inset 0 0 0 1px var(--line)`; padding 28px (grande) o 18px (media).
- Se è cliccabile: hover con bordo `var(--cyan)` e spostamento leggero (`translateY(-2px…-6px)` o `translateX(3px)`), e un `:focus-visible` equivalente.
- Titolo della card in `--font-display` 800 maiuscolo; etichette in `--font-mono` maiuscolo spaziato; testo in `--ink-soft`.
- Testi piccoli su questo fondo non in `--ink-dim` (contrasto 4,01, §6.2).
- Piede della card spinto in basso con `display: flex; flex-direction: column` + `margin-top: auto` sull'ultimo elemento.

---

## 8. Incoerenze e debito tecnico rilevati

Ogni voce: dove si trova, cosa succede, proposta. Le proposte sono suggerimenti, non sono ancora nel codice.

### Colori e token

1. **Letterali quasi uguali a un token.** `oklch(0.72 0.16 252)` (`index.html:56`) e `oklch(0.72 0.16 252 / 0.6)` (`styles.css:135`) differiscono da `--blue-bright` (`0.72 0.165 252`) di 0.005 di croma; `oklch(0.145 0.045 264 / 0.99)` (:574) è `--navy-950` con alpha; `oklch(0.175 0.055 264 / 0.98)` (:574) è vicino a `--navy-900`. *Proposta*: usare i token (con `color-mix()` o varianti alpha dedicate).
2. **Velature navy fuori scala.** Superfici a luminosità 0.13, 0.16, 0.20, 0.22, 0.26, 0.30 (`styles.css:139, 154, 176, 203, 280, 322, 398, 409, 428, 433, 445, 448, 486, 618, 656`) non stanno nella scala `--navy-*`; la velatura `0.30 0.05 264` compare con quattro alpha (0.4, 0.45, 0.5, 0.6). *Proposta*: due o tre token di velatura (`--veil`, `--veil-strong`).
3. **Ombre e bagliori senza token.** Ombre scure con croma 0.06 (:275, :382) e 0.07 (:392, :472); glow blu con luminosità 0.4-0.5, croma 0.16-0.18 e cinque alpha diversi (:70, :135, :137, :251, :294, :375, :389). *Proposta*: token `--shadow-*` e `--glow-blue`.
4. **Tre palette scollegate**: sito in oklch con token; stemma e thumbnail in hex (`#1f6bff`, `#0b2a6b`, `#7fb2ff`, `#3f7bff`, `#5fd0ff`, `#0b1024`, `crest.svg:5-19`, `index.html:8-17`); `scorebug.html` in hex con colori propri e font diverso. *Proposta*: decidere se lo stemma e l'overlay devono seguire la palette del sito e allinearli.
5. **Commento sulla provenienza della palette**: "derived from EasyCondominio's blue primary" (`styles.css:5`). *Proposta*: rimuovere il riferimento a un altro progetto.
6. **Colori inline** (`index.html:78`, `index.html:392`). *Proposta*: classi (`.lede strong`, `.foot-top p`).

### Scale non definite

7. **Raggi**: undici valori distinti (2, 3, 4, 5, 6, 7, 8, 10, 12, 100px e 50%), più la goccia `50% 50% 50% 0` del pin (:512), tra cui 5, 6 e 7px (§2.4). *Proposta*: token `--radius-sm` (4px), `--radius-md` (8px), `--radius-lg` (10px), `--radius-pill`.
8. **Durate e curve**: 0.15/0.18/0.2/0.25s per interazioni simili; `transition: all` senza curva (:373, :431, :446, :515); stessa curva scritta in tre modi (`cubic-bezier(0.22,1,0.36,1)` a :128, :385, :531, `cubic-bezier(0.22, 1, 0.36, 1)` a :551, :558 e `cubic-bezier(.22,1,.36,1)` in `app.js:122`). *Proposta*: `--ease-out` e `--dur-fast`/`--dur-base`; transizioni su proprietà esplicite.
9. **z-index** sparsi (0, 1, 2, 3, 100, 220). *Proposta*: token per HUD e overlay.
10. **Scala tipografica e spazi**: 36 corpi in rem e spaziature tutte in px senza token (§2.2, §2.3). *Proposta*: introdurre una scala ridotta per le micro etichette (oggi 0.5–0.72rem in 11 valori).
11. **Scrittura dei valori**: `256/0.4` senza spazi (:294, :375) contro `/ 0.45` (:135); `0.4` contro `0.40`. *Proposta*: uniformare.

### CSS e markup inutilizzati o scollegati

12. **`.tick`** (`styles.css:116`) non è usata e non definisce stile né larghezza del bordo. *Proposta*: rimuoverla.
13. **`.hero-meta.in`**: JS aggiunge `in` a `.hero-meta` (`app.js:158`) ma non esiste regola CSS; serve solo come innesco del count-up. *Proposta*: nessun intervento obbligatorio; documentato qui.
14. **`.shot-clock.danger`** (`scorebug.html:135-138`) e gli id dell'overlay non sono gestiti da nessuno script nel repo. *Proposta*: chiarire da dove arrivano i dati dell'overlay.
15. **Pesi di font caricati e non usati**: Saira 500/600, Chakra 400/500, DM Sans 500/600 (`styles.css:10`). *Proposta*: togliere i pesi inutili dall'URL di Google Fonts.
16. **Residuo di build**: `<template id="__bundler_thumbnail">` con SVG e `data-bg-color` nell'`<head>` (`index.html:8-19`), non usato da `app.js`. *Proposta*: rimuoverlo.
17. **Ticker**: quando `up` è falso viene scritto `class=""` (`app.js:63-64`). *Proposta*: omettere l'attributo.

### Contenuti

18. **Data della partita fissa contro countdown "vivo"**: "SAB 06 GIU · 21:00" (`index.html:109`) e "J-7" (`index.html:94`) sono statici, mentre il countdown punta sempre al prossimo sabato alle 21 (`app.js:19-29`). *Proposta*: una sola fonte (data in un attributo `data-` letta da JS, che genera sia il testo sia il countdown).
19. **Pallino live sempre acceso** su pulsante LIVE, pill, scorebug e ticker (`index.html:43, 71, 94, 125`) anche senza diretta. *Proposta*: accenderlo solo durante una diretta.
20. **Testi rivolti al gestore visibili al pubblico**: "Schede dimostrative, statistiche di esempio." (175), "Loghi segnaposto…" (194), "Sostituisci i collegamenti con i tuoi PDF." (232), stemma "placeholder" (`crest.svg:1`). *Proposta*: sostituirli con i contenuti reali prima di considerare il sito definitivo.
22. **Lingue e sigle miste**: inglese senza `lang` (`index.html:43, 125, 175, 192-213`; `app.js:52, 106, 108`); sigle italiane e inglesi insieme (PT/AS/RB/ST/PTI/RIM con 3P/BS/PG/SF/C, `app.js:72-92`); `scorebug.html` con `lang="it"` e testi in inglese ("4th QTR", "BONUS", titolo "NBA Style Scoreboard Overlay"). *Proposta*: scegliere una lingua per le sigle e marcare le parti inglesi.
23. **Formati della stagione diversi**: "2025 / 26" (`index.html:70`) e "25/26" (`index.html:248`, `app.js:58`). *Proposta*: un solo formato.

### Accessibilità e prestazioni (dettaglio in §6)

24. **Contenuto nascosto senza JS** (`styles.css:531`). *Proposta*: nascondere `.reveal` solo quando JS è attivo (per esempio con una classe `js` su `<html>` aggiunta dallo script).
25. **Contrasto bianco su blu 3,55 e su blue-bright 2,41** (`styles.css:133, 137, 375, 436, 473`). *Proposta*: blu più scuro per i fondi con testo, o testo `--navy-950`.
26. **`--ink-dim` sotto 4,5:1 sulle card** (`styles.css:297, 309, 397, 407, 434, 458, 476, 478`). *Proposta*: `--ink-soft` su fondi navy-850/800, o un `--ink-dim` più chiaro.
27. **Focus non visibile** (`styles.css:130` e assenza di `:focus-visible`). *Proposta*: regola comune di `:focus-visible` con outline ciano, applicata anche dove c'è `clip-path` (per esempio con `box-shadow` o un outline su un elemento che non viene tagliato).
28. **Nessun `prefers-reduced-motion`**. *Proposta*: un blocco che fermi `pulse`, ticker, reveal e `scroll-behavior`.
29. **Pannello live senza focus-trap** (`app.js:218-227`); tab senza tabpanel e frecce (`index.html:178-184`); burger senza `aria-expanded` (`index.html:47`). *Proposta*: completarli secondo i pattern ARIA.
30. **Font via `@import`** con 16 combinazioni di peso, senza `preconnect` (`styles.css:10`, `index.html:3-20`). *Proposta*: spostare il caricamento in un `<link>` nell'`<head>` con `preconnect` e solo i pesi usati.
31. **Meta assenti** in `index.html`: description, Open Graph, canonical, favicon, `theme-color`. `scorebug.html` senza `viewport` né `noindex`. *Proposta*: aggiungerli.
