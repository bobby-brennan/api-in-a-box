var App = require('express')();

var Mongoose = require('mongoose');
var Jammin = require('jammin');
var API = new Jammin.API(require('yargs').argv.db);

var names = [];

API.mongoose.on('open', function (ref) {
  console.log('listing');
  API.mongoose.db.listCollections().toArray(function(err, n) {
    names = n;
    console.log('n', names);
  });
})

var PetSchema = Mongoose.Schema({
  name: String,
  age: Number
});

var Pet = Mongoose.model('Pet', PetSchema);
API.addModel('Pet', Pet);
API.Pet.get('/pets/:name');
API.Pet.post('/pets');

App.use('/api', API.router);

App.get('/', function(req, res) {
  res.send('hi');
})

App.get('/names', function(req, res) {
  res.json(names);
})

App.listen(3000);
