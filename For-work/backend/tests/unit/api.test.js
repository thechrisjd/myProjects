// process.env.NODE_ENV = 'test';
// process.env.MONGO_URL = 'mongodb+srv://dev-user:Z4YSAvN5Q25rzyN@cocupmongo-vpxvj.mongodb.net/development?retryWrites=true'

// let mongoose = require("mongoose");
// let User = require('../../src/app/user/model');

// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../../app');
// let should = chai.should();

// chai.use(chaiHttp);

// describe('API Tests', function () {
//   //Before starting the test, create a sandboxed database connection
//   //Once a connection is established invoke done()
//   before(function (done) {
//     mongoose.connect('mongodb+srv://dev-user:Z4YSAvN5Q25rzyN@cocupmongo-vpxvj.mongodb.net/development?retryWrites=true', {
//       useNewUrlParser: true
//     });
//     const db = mongoose.connection;
//     db.on('error', console.error.bind(console, 'connection error'));
//     db.once('open', function () {
//       console.log('We are connected to test database!');
//       done();
//     });
//   });

//   // describe('User collection', function () {
//   //   it('Should save new student to test database', async function () {
//   //     const testStudent = new User(testStudentData);
//   //     return await testStudent.save()
//   //   });
//   // });

//   describe('/GET user/:id', () => {
//     it('it should GET one of the users', (done) => {
//       chai.request('localhost:3000')
//         .get('/user/5c5854f9379f8b3b15e7d2d5')
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object')
//           res.body.success.should.be.eql(true)
//           done();
//         });
//     });
//   });
// });

// //After all tests are finished drop database and close connection
// after(function (done) {
//   mongoose.connection.db.dropDatabase(function () {
//     mongoose.connection.close(done);
//   });
// });