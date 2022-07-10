# Relazione
## Susanna Peretti
## Matricola: 306186

## Introduzione
Il progetto Interest Seeker rappresenta una Restful API con l'obiettivo di fornire informazioni e posizione su "luoghi di interesse".
L'idea parte da un Open Data distruibuito dal sito **dati.gov.it** e fornito dall' Università di Bologna.
UniboMappe fornisce un elenco georeferenziato di luoghi come biblioteche, musei e uffici collocati nelle zone limitrofe al capoluogo.

Link Open Data: (https://www.dati.gov.it/view-dataset/dataset?id=e07b87fc-f627-414e-bfb9-421c5fd5aaaa)

## Descrizione
Interest Seeker è un'applicazione Web in JavaScript realizzata con il framework NodeJS. 
Le funzionalità del progetto sono:
- aggiungere una location al database
- visualizzare una mappa con le posizioni
- fornire una lista completa di informazioni dei luoghi

## Dipendenze
- Express.js: framework open-source Node.js per la programmazione di applicazioni web e mobile, consente di creare potenti API di routing e di impostare middleware per rispondere alle richieste HTTP.
- fs: modulo nativo che consete di eseguire diversi tipi di operazioni su file e directory
- ejs: Embedded Javascrypt Templating è un linguaggio di creazione di modelli che consente di generare markup HTML con Javascrypt
- body-parser: modulo che analizza i dati codificati JSON, buffer, stringa e URL inviati tramite HTTP POST request
- csv-stringify: stringifier che converte i record in un testo CSV
- csv-parse: è un parser che converte l'input di testo CSV in array o oggetti

## Struttura del file map.json
| type  | name  | address  | city  | lat  | lon  | url  | notes  |
|museo  | Collezione di Anatomia Comparata  | Via Selmi, 3 - 40126 Bologna  | Bologna  | 44.496113  | 11.354331  | https://sma.unibo.it/it/il-sistema-museale/collezione-di-anatomia-comparata/collezione-di-anatomia-comparata  |  |

## Endpoint di Operazioni CRUD
GET: per richiamare la view
app.get("/")       index.html
app.get('/map')    map.html
app.get('/op')     op.html

GET: per ottenere il parser del file map.json
app.get('/db/locations')

POST: aggiunge una location al database, inserendo i dati opportuni (Sito Web e Note non sono obbligatori)
app.post('/addLocation')
La validazione dell'inserimento avviene sul nome del luogo, se esso è già presente nell'elenco l'operazione di POST fallirà

DELETE: rimuove la location il cui nome corrisponde a quello inserito come parametro name
app.delete('/removeLocation/:name')

PUT: modifica la location il cui nome corrisponde al .name del body della richiesta
app.put('/editLocation/')