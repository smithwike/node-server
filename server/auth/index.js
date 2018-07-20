const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
var crud = require('./../db/crud');
const saltRound = 15;
const secretKey = "my_secret_key"
const err = {
    message: '',
    status: 401
}
router.get('/', (req, res) => {

    res.json({
        message: 'lock'
    });
});

var ensureToken = (req, res, next)=>{


};
var validateUser = (user) => {

    const validEmail = typeof user.email == 'string' && validator.isEmail(user.email);
    const validPassword = typeof user.password == 'string' && user.password.trim() != '' &&
        user.password.trim().length >= 6;

    return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {

    if (validateUser(req.body)) {
        //confirm email is not already in use
        crud.getUser(req.body.email)
            .then((result) => {

                res.status(400).send({
                    error: 'email in use'
                });


            })
            .catch((e) => {
                //hash the user's password for storage

                bcrypt.hash(req.body.password, saltRound)
                    .then((hash) => {
                        //start storage process
                        crud.addItem({
                                email: req.body.email,
                                password: hash
                            })
                            .then((result) => {
                                if (result == 1) {

                                    res.send({
                                        message: 'account created'
                                    });
                                } else {
                                    err.message = 'Internal Server Error';
                                    err.status = 500;
                                    next(err);
                                }

                            }).catch((err) => {
                                err.message = 'Internal Server Error';
                                    err.status = 500;
                                    next(err);
                            });
                    });

            });




    } else {
        err.message = 'Invalid username or password';
        err.status = 401;                                   
        next(err);
    }
});


router.post('/login', (req, res, next) => {

    if (validateUser(req.body)) {
        //confirm email exists in database

        crud.getUser(req.body.email)
            .then((result) => {

                if (result && bcrypt.compareSync(req.body.password, result.password)) {
                    delete(result.password)
                    const token = jwt.sign(result, secretKey);
                    result.token = token;
                    res.header('Authorization', `Bearer ${token}`);
                    res.send(result);
                } else {

                    err.message = 'Invalid username or password';
                    err.status = 401;                                   
                    next(err);
                    
                }
            })
            .catch((e) => {
                    //console.log(e);
                    err.message = 'Invalid username or password';
                    err.status = 401;                                   
                    next(err); 
                   
            });
    //hash the sent password for storage


} else {
    console.log('validation error');
    err.message = 'Invalid username or password';
    err.status = 401;                                   
    next(err); 
}
});



module.exports = router;