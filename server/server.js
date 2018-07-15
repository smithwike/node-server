const express = require('express');
const bodyParser = require('body-parser')
//var {client} = require('./db/db-connect');
var crud = require('./db/crud');

//load the configurations in .env file

//require('dotenv').config();

const port = process.env.PORT || 5005;
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.post('/books', (req, res)=>{
  
  crud.addItem(req.body).then((result)=>{
		     
		     if(result == 1){

		     	res.redirect('/books');
		     }else{
		     	res.status(400).send('bad request');
		     }
	        })
	        .catch((e)=>{
	        	console.log(e);
		        res.status(400).send('bad request');
	        });
 
});
  //url should look like  /book/delete/3  where 3 is book id
app.delete('/book/delete/:id', (req, res)=>{
  
  crud.deleteItem(req.params.id).then((result)=>{
		     
		     if(result == 1){
		     	console.log('item delete success');
		     	res.redirect('/books');
		     }else{
		     	res.status(400).send('bad request');
		     }
	        })
	        .catch((e)=>{
	        	console.log(e);
		        res.status(400).send('bad request');
	        });
  
});

app.put('/book/edit/:id', (req, res)=>{

  crud.updateItem(req).then((result)=>{
		    
		     if(result == 1){
		     	console.log('item delete success');
		     	res.redirect('/books');
		     }else{
		     	res.status(400).send('bad request');
		     }
	        })
	        .catch((e)=>{
	        	console.log(e);
		        res.status(400).send('bad request');
	        });
});



app.get('/books', (req, res)=>{
   
 crud.getAll().then((result)=>{
		     
		      res.send(result);
	        })
	        .catch((e)=>{
	        	console.log(e);
		        res.send('error');
	        });

});

app.listen(port, ()=>{
   console.log(`Listening on port ${port}.`)
});


module.exports = {app};