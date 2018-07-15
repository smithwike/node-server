//this module inserts data into a table 

const connectionString = process.env.DATABASE_URL||'postgres://localhost:5432/books'
const {Client} = require('pg');

//insert into table

const client = new Client(connectionString);
client.connect()
.then(()=>{
	console.log('connection complete');

	const sql = 'INSERT INTO testtable (text, complete) VALUES ($1, $2)'
	const params = [ 'Today is great again', false ];
	return client.query(sql, params)

})
.then((result)=>{
	console.log(result);
	client.end();
})
.catch(e => console.log(`database error: ${e}`));



