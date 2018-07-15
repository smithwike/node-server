//this module creates a table if not exists

const connectionString = process.env.DATABASE_URL||'postgres://localhost:5432/books'
const {Client} = require('pg');

//create table

const client = new Client(connectionString);
client.connect()
.then(()=>{
   console.log('connection complete');

  return client.query('CREATE TABLE IF NOT EXISTS anothertable(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');

})
.then((result)=>{
	console.log(result);
	client.end();
})
.catch(e => console.log('connection error'));



