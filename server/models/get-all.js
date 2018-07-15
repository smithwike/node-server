//this module gets data from table
 module.exports.getAll = new Promise((resolve, reject)=>{

	const connectionString = process.env.DATABASE_URL||'postgres://localhost:5432/books';
	const {Client} = require('pg');


	const client = new Client(connectionString);
	client.connect()
	.then(()=>{
		console.log('connection complete');

		const sql = 'SELECT * FROM testtable;';
	return client.query(sql) ; //it returns an array of the rows, with the column as the key and the column value as the value

})
	.then((result)=>{
		console.log(result.rows);
		client.end();
		allbooks = result.rows
		resolve(result.rows);
	})
	.catch((e)=>{
		reject(e);
	});

}); 


// return allbooks;





