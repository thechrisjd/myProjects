const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const chai = require('chai');
const expect = chai.expect;
const helper = require("../../src/helper")
const User = require('../../src/app/user/model')

describe('Database Tests', function () {
  //Before starting the test, create a sandboxed database connection
  //Once a connection is established invoke done()
  before(function (done) {
    mongoose.connect('mongodb+srv://dev-user:Z4YSAvN5Q25rzyN@cocupmongo-vpxvj.mongodb.net/development?retryWrites=true', {
      useNewUrlParser: true
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
      // console.log('We are connected to test database!');
      done();
    });
  });

  describe('User collection', function () {

    const testStudentData = {
      type: 'student',
      email: new Date().getTime() + '@test.com',
      password: '12345678',
      studentInfo: {
        profile: {
          firstName: 'Edmond',
          lastName: 'Petres',
          dateOfBirth: new Date(),
          location: 'location',
          profilePicUrl: 'picurl',
          telephone: 50607080,
          linkedinProfileUrl: "url",
          portfolioUrl: 'portfoliourl'
        },
        tags: {
          university: 'DTU',
          fieldOfStudy: 'Computer Science',
          studyProgress: 'Professional Bachelor',
          skills: []
        }
      }
    }

    const companyData = {
      type: 'company',
      email: 'peter@cocup.app',
      password: '098765',
      companyInfo: {
        name: {
          common: 'CoCup',
          legal: 'CoCup IVS.'
        },
        CVR: 123456789,
        location: 'Copenhagen',
        contactPerson: {
          fullName: 'Peter Busk',
          email: 'peter@cocup.app'
        }
      }
    }

    it('Should save new student to test database', async function () {
      const testStudent = new User(testStudentData);
      return await testStudent.save()
    });

    it('Should retrieve user data', function (done) {
      //focus on the retrieval - done function
      User.findOne({
          type: "student",
          email: testStudentData.email
        },
        function (err, retrievedStudent) {
          if (err) {
            throw err;
          }
          if (retrievedStudent.email !== testStudentData.email) {
            throw new Error("Data mismatch!");
          }
          done();
        });
    });

    it("Should verify the integrity of existing data", function (done) {
      //focus on the data verification at 2nd if nest
      User.findOne({
          type: 'student',
          email: testStudentData.email
        },
        function (err, retrievedStudent) {
          if (err) {
            throw err;
          }
          if (!helper.isEqual(testStudentData.studentInfo, retrievedStudent.studentInfo)) {
            console.log(retrievedStudent.studentInfo, testStudentData.studentInfo)
            throw new Error("Data mismatch!");
          }
          done();
        });
    });

    it("Should delete the test data entry", function (done) {
      User.findOneAndDelete({
          type: 'student',
          email: testStudentData.email
        },
        function (err, data) {
          if (err) {
            throw err;
          }
          done();
        });
    });
  });
});


// it('Dont save incorrect format to database', function (done) {
//   //Attempt to save with wrong info. An error should trigger
//   var wrongSave = Name({
//     notName: 'Not Mike'
//   });
//   wrongSave.save(err => {
//     if (err) {
//       return done();
//     }
//     throw new Error('Should generate error!');
//   });
// });
// it('Should retrieve data from test database', function (done) {
//   //Look up the 'Mike' object previously saved.
//   Name.find({
//     name: 'Mike'
//   }, (err, name) => {
//     if (err) {
//       throw err;
//     }
//     if (name.length === 0) {
//       throw new Error('No data!');
//     }
//     done();
//   });
// });


//After all tests are finished drop database and close connection
after(function (done) {
  mongoose.connection.db.dropDatabase(function () {
    mongoose.connection.close(done);
  });
});