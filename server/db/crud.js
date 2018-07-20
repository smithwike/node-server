/*PDATE totals 
   SET total = total + 1
WHERE name = 'bill';
If you want to make sure the current value is indeed 203 (and not accidently increase it again) you can also add another condition:

UPDATE totals 
   SET total = total + 1
WHERE name = 'bill'
  AND total = 203;*/

//var client = require('./db-connect');
const connectionString = process.env.DATABASE_URL||'postgres://localhost:5432/books'
const {Client} = require('pg');
const usersTable = 'users';
const orderTable = 'orders';


var getAll = ()=>{

	return new Promise((resolve, reject)=>{
		const client = new Client(connectionString);
		client.connect()
		.then((result)=>{
			const sql = `SELECT * FROM ${usersTable}`;
			
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
			const sql = `INSERT INTO ${usersTable} (email, password, age) VALUES ($1, $2, $3)`;
			const params = [ item.email, item.password, -1];
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


/*var isItemExists = (item)=>{

	return new Promise((resolve, reject)=>{
		const client = new Client(connectionString);
		client.connect()
		.then((result)=>{
			const sql = 'SELECT * FROM testtable WHERE text = $1;';
			const params = [item];
			client.query(sql,params)
			.then((result)=>{
		                      if(result.rowCount>=0){

		                      	resolve(true);

		                      }else{
		                      	resolve(false);
		                      }

		                      client.end();
		                  })
			.catch(e => reject(e));



		}) .catch(e => reject(e));


	});

};*/

var getItem = (item)=>{

	return new Promise((resolve, reject)=>{
		const client = new Client(connectionString);
		client.connect()
		.then((result)=>{
			const sql = 'SELECT * FROM testtable WHERE text = $1;';
			const params = [item];
			client.query(sql,params)
			.then((result)=>{
				if(result.rowCount>=0){

					resolve(resut.rows);

				}else{
					resolve({});
				}

				client.end();
			})
			.catch(e => reject(e));



		}) .catch(e => reject(e));


	});

};

var getUser = (email)=>{

	return new Promise((resolve, reject)=>{
		const client = new Client(connectionString);
		client.connect()
		.then((result)=>{
			const sql = `SELECT * FROM ${usersTable} WHERE email = $1;`;
			const params = [email];
			client.query(sql,params)
			.then((result)=>{
				if(result.rowCount>0){
					resolve(result.rows[0]);

				}else{
					reject({error:'invalid user'});
				}

				client.end();
			})
			.catch(e => reject(e));



		}) .catch(e => reject(e));


	});

};

var getOrders = (id)=>{

	return new Promise((resolve, reject)=>{
		const client = new Client(connectionString);
		client.connect()
		.then((result)=>{
			const sql = `SELECT * FROM ${orderTable} WHERE user_id = $1;`;
			const params = [id];
			client.query(sql,params)
			.then((result)=>{
					resolve(result.rows);
				    client.end();
			})
			.catch(e => reject(e));



		}) .catch(e => reject(e));


	});

};

var addOrder = (id, order)=>{

	return new Promise((resolve, reject)=>{
		const client = new Client(connectionString);
		client.connect()
		.then((result)=>{
			const sql = `INSERT INTO ${orderTable} (user_id, item, price) SELECT _id,  $1, $2 FROM users WHERE _id = $3`;
			const params = [ order.item, order.price, id];
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

module.exports={getAll, addItem, deleteItem, updateItem, getItem, getUser, addOrder, getOrders};