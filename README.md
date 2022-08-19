# Progetto di Piattaforme Digitali per la Gestione del Territorio
## Susanna Peretti
## Matricola: 306186
## Introduzione

Il progetto **Interest Seeker** rappresenta una Restful API con l'obiettivo di fornire informazioni e posizione su "luoghi di interesse".
L'idea parte da un Open Data distruibuito dal sito **dati.gov.it** e fornito dall' Università di Bologna.
UniboMappe fornisce un elenco georeferenziato di luoghi come biblioteche, musei e uffici collocati nelle zone limitrofe al capoluogo. Il progetto è stato sviluppato su Glitch.

Link Open Data: <link> https://www.dati.gov.it/view-dataset/dataset?id=e07b87fc-f627-414e-bfb9-421c5fd5aaaa

Link Web Site: <link> https://interest-seeker.glitch.me

Link Glitch Code: <link> https://glitch.com/edit/#!/interest-seeker

## Descrizione

Interest Seeker è un'applicazione Web in JavaScript realizzata con il framework NodeJS.
Le funzionalità del progetto sono:

- aggiungere una location al database
- visualizzare una mappa con le posizioni
- fornire una lista completa di informazioni dei luoghi

## Progetto
- **server.js**: server che risponde alle HTTP Requests
- **map.json**: file json che opera da database
- **views/**: directory contentente i file .html
- **public/css/**: directory contenente i file .css
- **Assets di Glitch**: contiene l'immagine utilizzata in background

## Dipendenze
- **Express.js**: framework open-source Node.js per la programmazione di applicazioni web e mobile, consente di creare potenti API di routing e di impostare middleware per rispondere alle richieste HTTP.
- **fs**: modulo nativo che consete di eseguire diversi tipi di operazioni su file e directory
- **ejs**: Embedded Javascrypt Templating è un linguaggio di creazione di modelli che consente di generare markup HTML con Javascrypt
- **body-parser**: modulo che analizza i dati codificati JSON, buffer, stringa e URL inviati tramite HTTP POST request
- **csv-stringify**: stringifier che converte i record in un testo CSV
- **csv-parse**: è un parser che converte l'input di testo CSV in array o oggetti

## Struttura del file map.json
| type  | name                             | address                      | city    | lat       | lon       | url                                                                                                          | notes |
| ----- | -------------------------------- | ---------------------------- | ------- | --------- | --------- | ------------------------------------------------------------------------------------------------------------ | ----- |
| museo | Collezione di Anatomia Comparata | Via Selmi, 3 - 40126 Bologna | Bologna | 44.496113 | 11.354331 | https://sma.unibo.it/it/il-sistema-museale/collezione-di-anatomia-comparata/collezione-di-anatomia-comparata |       |

## HTML e CSS
Per il progetto sono state realizzate 3 diverse pagine .html con relativi file css
- index.html -> homepage dell'applicazione consente l'accesso ad una breve descrizione, link della repository Git Hub e due bottoni per l'accesso alle funzionalità
- map.html -> al loading della pagina la funzione asincrona di setUpLocation() carica le locations contenute nel database all'interno della mappa, così da poter visualizzare posizione e informazioni relative
- op.html -> al loading della pagina la funzione asincrona viewLocations fornisce le informazioni relative a tutte le location. Inoltre è presente il form per l'inserimento dei dati richiesti e aggiungere una location al database

## Endpoint di Operazioni CRUD

### GET per richiamare la view

- app.get("/")
- app.get('/map')
- app.get('/op')

### GET per ottenere il parser del file map.json
app.get('/db/locations')

### POST per aggiungere una location al database, inserendo i dati opportuni (Sito Web e Note non sono obbligatori)
app.post('/addLocation')

<sup>La validazione dell'inserimento avviene sul nome del luogo, se esso è già presente nell'elenco l'operazione di POST fallirà</sup>

### DELETE per rimuovere la location il cui nome corrisponde a quello inserito come parametro name
app.delete('/removeLocation/:name')

### PUT per modificare la location il cui nome corrisponde al .name del body della richiesta
app.put('/editLocation/')
