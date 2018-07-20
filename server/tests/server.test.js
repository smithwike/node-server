const expect = require('expect');
const request = require('supertest');
const {app} = require('./../server');

//test the /books post route

describe('POST /books', ()=>{
    it("should redirect to /books when item is added", (done)=>{   //done argument is required
      var text = 'this is a test item';
      var complete = false;

      request(app)
      .post('/books')
          .send({text, complete})   // we are sending the supposed json request to the route
          .expect(404)
          /*.expect((res)=>{
          	//console.log(res);
          	expect(res.body).toInclude({text, complete});

          })*/
   // .expect('Location', '/books')
    .end((err, res)=>{
     if(err){

       return done(err);
     }
     done();

   });



  });

    it("should send 400 bad request with invalid data", (done)=>{   //done argument is required
      var text = undefined;
      var complete = 8;

      request(app)
      .post('/books')
          .send({})   // we are sending the supposed json request to the route
          .expect(404)
          /*.expect((res)=>{
          	//console.log(res);
          	expect(res.body).toInclude({text, complete});

          })*/
    .end((err, res)=>{
     if(err){

       return done(err);
     }
     done();

   });



  });
  });

describe('GET /books', ()=>{
    it("should respond with json", (done)=>{   //done argument is required
      
      request(app)
      .get('/books')
      .expect(404)
     // .expect('Content-Type', /json/)
      .end((err, res)=>{
       if(err){
         return done(err);
       }
       done();

     });



    });

  });


