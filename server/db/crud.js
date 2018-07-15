//var client = require('./db-connect');
const connectionString = process.env.DATABASE_URL||'postgres://localhost:5432/books'
const {Client} = require('pg');


var getAll = ()=>{

	return new Promise((resolve, reject)=>{
		const client = new Client(connectionString);
		client.connect()
		.then((result)=>{
			const sql = 'SELECT * FROM testtable;';
			client.query(sql)
			.then((result)=>{
		                      //console.log(result.rows);
		                      resolve(result.rows);
		                      client.end();
		                  })
			.catch(e => reject(e));



		}) .catch(e => reject(e));


	});

};


var addItem = (item)=>{
     
	return new Promise((resolve, reject)=>{
		const client = new Client(connectionString);
		client.connect()
		.then((result)=>{
			const sql = 'INSERT INTO testtable (text, complete) VALUES ($1, $2)'
	        const params = [ item.text, item.complete ];
	        client.query(sql, params)
			   .then((result)=>{
		                      //console.log(result.rows);
		                      resolve(result.rowCount);
		                      client.end();
		                  })
			   .catch(e => reject(e));
   


		}) .catch(e => reject(e));


	});

};

var deleteItem = (id)=>{
     
	return new Promise((resolve, reject)=>{
		const client = new Client(connectionString);
		client.connect()
		.then((result)=>{
			const sql = 'DELETE FROM testtable WHERE id = $1;'
	        const params = [id];
	        client.query(sql, params)
			   .then((result)=>{
		                      //console.log(result.rows);
		                      resolve(result.rowCount);
		                      client.end();
		                  })
			   .catch(e => reject(e));
   


		}) .catch(e => reject(e));


	});

};

var updateItem = (req)=>{
     
	return new Promise((resolve, reject)=>{
		const client = new Client(connectionString);
		client.connect()
		.then((result)=>{
			const sql = 'UPDATE testtable SET text = $1, complete = $2 WHERE id = $3';
	        const params = [req.body.text, req.body.complete, req.params.id];
	        client.query(sql, params)
			   .then((result)=>{
		                      //console.log(result.rows);
		                      resolve(result.rowCount);
		                      client.end();
		                  })
			   .catch(e => reject(e));
   


		}) .catch(e => reject(e));


	});

};


module.exports={getAll, addItem, deleteItem, updateItem};