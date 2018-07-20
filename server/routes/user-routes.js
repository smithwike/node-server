const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
var crud = require('./../db/crud');
const saltRound = 15;
const secretKey = "my_secret_key"
const error = {
    message: '',
    status: 401
}

var ensureToken = (req, res, next)=>{
const bearerHeader = req.get('Authorization');
//console.log(bearerHeader);
if(typeof bearerHeader !== 'undefined'){
  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];
  req.token = bearerToken;
  next();
} else{

 error.message = "You are not allowed to access this content";
 error.status=403;
 res.status(403).send(error);
}


};


router.get('/', ensureToken, (req, res, next) => {
	try {

         var decoded = jwt.verify(req.token, secretKey);
         //query database
			 crud.getUser(decoded.email)
            .then((result) => {
            	    delete(result.password);
                    res.send(result);
            })
            .catch((e) => {
                    //console.log(e);
                    error.message = 'User not found';
                    error.status = 404;                                   
                    next(error); 
                   
            });
		    
      } catch(err) {
            error.message = "You are not allowed to access this content";
			error.status=403;
			next(error);
      }			
   
});

router.get('/orders', ensureToken, (req, res, next) => {
	try {

         var decoded = jwt.verify(req.token, secretKey);
         //query database
			 crud.getOrders(decoded._id)
            .then((result) => {
                    res.send(result);
            })
            .catch((e) => {
                    //console.log(e);
                    error.message = 'User not found';
                    error.status = 404;                                   
                    next(error); 
                   
            });
		    
      } catch(err) {
            error.message = "You are not allowed to access this content";
			error.status=403;
			next(error);
      }			
   
});

router.post('/order', ensureToken, (req, res, next) => {
	try {

         var decoded = jwt.verify(req.token, secretKey);
         //query database
             console.log(req.body);
			 crud.addOrder(decoded._id, req.body)
            .then((result) => {
            	    //delete(result.password);
                    if(result == 1){
                    	res.send({message:'Your order has been added'});
                    }
                    else{
                    	 error.message = 'Error Adding Item';
                         error.status = 500;                                   
                         next(error); 
                    }
            })
            .catch((e) => {
                    //console.log(e);
                    error.message = 'Internal server error';
                    error.status = 500;                                   
                    next(error); 
                   
            });
		    
      } catch(err) {
      	    //console.log(err);
            error.message = "You are not allowed to modify this content";
			error.status=403;
			next(error);
      }			
   
});


module.exports = router;