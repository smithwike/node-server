const express = require('express');
const bodyParser = require('body-parser')
//var {client} = require('./db/db-connect');
var crud = require('./db/crud');
var auth = require('./auth');
var user = require('./routes/user-routes');
//load the configurations in .env file

//require('dotenv').config();

const port = process.env.PORT || 5005;
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.use('/auth', auth);
app.use('/user', user);

app.post('/users', (req, res)=>{

crud.addItem(req.body).then((result)=>{

	if(result == 1){

		res.redirect('/users');
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
			console.log('item update success');
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

app.get('/books/:id', (req, res)=>{

	crud.getItem(req).then((result)=>{

			console.log('item found');
			res.send(result);
	})
	.catch((e)=>{
		console.log(e);
		res.status(400).send('bad request');
	});
});



app.get('/users', (req, res)=>{

	crud.getAll().then((result)=>{

		res.send(result);
	})
	.catch((e)=>{
		console.log(e);
		res.send('error');
	});

});

//error handler

app.use((err, req, res, next)=>{

//send the error json
 //console.log(err);
   res.status(err.status || 500);
   res.json({
   message: err.message,
   error: req.app.get('env') === 'development' ? err :{}

     });
  });


app.listen(port, ()=>{
	console.log(`Listening on port ${port}.`)
});


module.exports = {app};