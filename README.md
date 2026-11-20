# Piattaforma Didattica SERR 2026 — Rete dei Cinque Borghi

Applicazione web educativa **single-file statica** (`index.html`), adattabile a **LIM in aula, proiettori touch, tablet, smartphone e PC**, dedicata alla **Settimana Europea per la Riduzione dei Rifiuti (SERR) 2026 · 21–29 novembre 2026**.

- **Slogan:** *"Progetta meglio, acquista consapevole, riduci gli sprechi"*
- **Destinatari:** Studenti di Scuola Primaria e Secondaria di I grado (livelli e borghi filtrabili)
- **Territorio e 5 Temi SERR 2026:**
  - **Mezzovalle:** *L'Impronta Nascosta* (valore del cibo, acqua virtuale, sprechi evitati)
  - **Villacolle:** *Dal Campo alla Tavola* (filiera corta, stagionalità, imballaggi essenziali, km zero)
  - **Cefalana:** *Riparazione, Acqua & Ecodesign* (diritto alla riparazione, tutela idrica storica, materiali permanenti)
  - **Dragano:** *Bosco Pulito & Biodiversità* (compostaggio scolastico, suolo e sentieri zero tracce)
  - **Campolieto (*Il Paese del Grano e della Quiete*):** *RAEE, Digitale Sostenibile & Energia* (prevenzione RAEE, sobrietà energetica, coding e IA etica)

---

## 1. Architettura della Piattaforma

### Menu e Navigazione
1. **Topbar a 3 zone (sempre visibile):** Titolo piattaforma, collegamenti rapidi (`Mappa`, `Catalogo`, `Quiz`, `Giochi`, `Territorio`) e pulsante `Stampa scheda`.
2. **Toolbar Didattica, Schermo & Accessibilità (fissa sotto topbar):**
   - **Livello:** `Primaria` / `Secondaria I grado` / `Entrambi`
   - **Borgo:** `Tutti` / `Mezzovalle` / `Villacolle` / `Cefalana` / `Dragano` / `Campolieto`
   - **Schermo:** `Auto` / `LIM / Lavagna` + pulsante `Schermo intero` (`requestFullscreen`)
   - **Accessibilità:** Ciclo dimensione font (`Normale` -> `LIM` -> `XL`), `Alto contrasto`, `Lettura BES`, `Leggi sezione` (Sintesi Vocale Web Speech API `it-IT`), `Riduci animazioni`.
3. **8 Aree Tematiche a Schede (`section-tabs`):**
   - `01. Tema & Mappa` (`#sec-tema`): Hero, **Mappa Interattiva dei 5 Borghi** con hotspot circolari minimali semi-trasparenti sullo sfondo, 3 pilastri SERR, piramide 5R SVG e scelta libera dal catalogo (senza scaletta rigida giornaliera).
   - `02. Studenti, Calcolatori & IA` (`#sec-studenti`): Schede differenziate Primaria/Secondaria, **Calcolatore Impronta Idrica e Chilometri Alimentari** con grafico a barre e **Diario del Piatto**, **Chatbot RicoBot a contesto chiuso** (anti-PII), guida **Uso Responsabile dell'IA**, glossario interattivo e patto di classe.
   - `03. Catalogo (80 Attività & 20 Compiti)` (`#sec-catalogo`): 4 sotto-schede (`80 Attività Didattiche`: 16 Mezzovalle + 16 Villacolle + 12 Cefalana + 12 Dragano + 12 Campolieto + 12 Percorsi Condivisi sulle 12 discipline; `17 Format Innovativi`; `20 Compiti di Realtà`; `6 Percorsi Interdisciplinari`). Ogni attività, compito e UdA offre descrizione completa e **scheda di lavoro modificabile** (campi Classe/Ordine di scuola personalizzabili ed export `.doc`, `.html` compilabile offline, `.txt`, stampa A4).
   - `04. Quiz (120 Domande)` (`#sec-quiz`): 120 domande filtrabili per ordine di scuola e per borgo, modalità **Sfida a 2 Squadre** sulla LIM, **Difficoltà crescente** e **Tabellone Risultati**.
   - `05. Gli 8 Giochi & Passaporto` (`#sec-giochi`): Tutti i giochi sono **sbloccati fin dall'inizio**:
     1. *Classifica le 5R*
     2. *Catena delle Scelte (6 tappe)*
     3. *Carrello e Merenda Consapevole*
     4. *Vero o Mito? Greenwashing*
     5. *La Corsa dei Chilometri* (Villacolle)
     6. *Il Piatto da 1000 Litri* (Mezzovalle)
     7. *Stagionalità in 60 Secondi*
     8. *Missione Raccolta Differenziata — Coding a Blocchi 16:9* (8 livelli tutti sbloccati fin dall'inizio su griglia 10×8, blocchi trascinabili, 5 frazioni di rifiuti C/P/V/O/E e bidoni colorati, cicli annidati, `Finché non finisci`, `Se / Altrimenti`, corsie direzionali, ZTL, `Funzione A` e debugger passo-passo)
     - **Passaporto Ecologico (`#panel-game-9`)**: pseudonimo, classe e ordine di scuola, avatar, XP, missioni, 9 badge, classifica 5 colonne e **download attestato `.svg`**.
   - `06. Territorio, Famiglie & Comune` (`#sec-territorio`): Schede dei 5 borghi tematici, tabelle compilabili e stampabili, **Angolo Famiglie** (con download `.txt`), **Modulo Proposte Civiche per il Comune** e tabella calendari/centri di raccolta per i 5 Comuni.
   - `07. Lavori, Galleria & Risorse` (`#sec-galleria`): Caricamento lavori (solo pseudonimo + consenso familiare), coda di approvazione, incorporamento video **YouTube** (`youtube-nocookie.com`) e tabella risorse/documentari/musei virtuali.
   - `08. Evento Finale & Link` (`#sec-evento`): Programma manifestazione conclusiva, **codice QR dimostrativo e votazione pubblica live**, link istituzionali essenziali da verificare.

### Privacy e Sicurezza
- **Zero `localStorage` e zero `sessionStorage`**: nessun dato viene salvato sul browser condiviso/LIM tra una sessione e l'altra.
- **Privacy minori:** nessun dato anagrafico reale richiesto; solo pseudonimi, classe e ordine di scuola, consenso esplicito sul caricamento elaborati e blocco automatico di email/telefoni/indirizzi nel chatbot.

---

## 2. Pubblicazione su Vercel (Statica, Zero Server)

Il repository include `vercel.json` nella root con `cleanUrls: true` e header base di sicurezza (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`).

1. Carica i file del progetto (`index.html`, `vercel.json`, `README.md`, `src/assets/images/*`) su **GitHub**, **GitLab** o **Bitbucket**.
2. Accedi a [vercel.com](https://vercel.com), seleziona **Add New -> Project** e importa il repository.
3. Imposta **Framework Preset: Other** (lascia vuoto Build Command e imposta **Output Directory: `.`**) e avvia il **Deploy**.

---

## 3. Verifiche Prima della Pubblicazione

- [ ] **Calendari e Centri di Raccolta dei 5 Comuni:** nella scheda **06. Territorio** compilare giorni e indirizzi reali dai portali comunali di Villacolle, Mezzovalle, Dragano, Cefalana e Campolieto.
- [ ] **Stime Impronta Idrica (`CALC_FOODS` / Gioco 6 / Quiz):** verificare eventuali aggiornamenti dei valori indicativi del *Water Footprint Network* con i referenti di Scienze/Matematica.
- [ ] **Link istituzionali nella scheda 08 (`ewwr.eu`, `mase.gov.it`, `legambiente.it`):** verificare che i collegamenti siano attivi prima della SERR 2026.
