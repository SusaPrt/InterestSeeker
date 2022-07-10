//forms declaration 
const express = require("express");
const app = express();
const stringify = require('csv-stringify').stringify
const parse = require('csv-parse').parse
const fs = require('fs');

//json file reading and parsing 
const dataReader = fs.readFileSync('map.json');
const parser = JSON.parse(dataReader);

//static file in public for css
app.use(express.static('public'))

//json file broker
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

//homepage endpoint
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

//map endpoint
app.get('/map',(req,res)=>{
  res.sendFile(__dirname + '/views/map.html');
});

//adding page endpoint
app.get('/op',(req,res)=>{
  res.sendFile(__dirname + '/views/op.html');
});

//endpoint for data fetch
app.get('/db/locations', (req, res)=> {
  res.json(parser);
})

app.post('/addLocation', (req, res) => {
  const location = req.body;
  let help = req.body.name.toLowerCase();
  console.log(help);
  
  let check = false;
  if(location != undefined) {
    for(let i=0; i < parser.length; i++) {
      if(help == parser[i].name.toLowerCase())
        check = true;
    }
  } 
  if(check)
    res.status('400').send("Can't add this location! Try again!");
  else {
    parser.push(location);
    fs.writeFileSync("map.json", JSON.stringify(parser));
    res.status(200).send('Location added!');
  }
})

app.delete('/removeLocation/:name', (req, res) => {
  const help = req.params.name.toLowerCase();
  console.log(help);
  if(help != undefined) {
    for(let i=0; i < parser.length; i++) {
      if(parser[i].name.toLowerCase() == help)
        var index = i;
      if(index != null) {
        parser.splice(index,1);
        fs.writeFileSync('map.json', JSON.stringify(parser));
        res.send('Location deleted!');
      }
    }
  }
})

app.put('/editLocation/', (req, res) => {
  let check = false;
  let type = req.body.type;
  let name = req.body.name;
  let address = req.body.address;
  let city = req.body.city;
  let lat = req.body.lat;
  let lon = req.body.lon;
  let url = req.body.url;
  let notes = req.body.notes;
  
  for(let i=0; i < parser.length; i++) {
    if(parser[i].name == name) {
      parser[i].type = type;
      parser[i].address = address;
      parser[i].city = city;
      parser[i].lat = lat;
      parser[i].lon = lon;
      parser[i].url = url;
      parser[i].notes = notes;
      fs.writeFileSync('map.json', JSON.stringify(parser));
      res.status(200).send('Location updated!');
    } else
      res.status(404).send('Error');
  }
})

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});