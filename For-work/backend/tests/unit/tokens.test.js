const mongoose = require('mongoose')
const chai = require('chai')
const chaiMoment = require('chai-moment')
const expect = chai.expect;
const should = chai.should();
const tokenController = require('../../src/app/token/controller')

chai.use(chaiMoment)

describe('Token controller', async function () {
  before(function (done) {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);

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
  
  const companyId = '5c5ae4cc1d9536b4d52c8cf8'
  const studentId = '5c5d7d87f59d612fa02cbf8b'
  let validToken;
  let redeemedToken;
  
  it('should generate a new token', async function () {
    const token = await tokenController.generateToken(companyId, studentId)
    expect(token.isValid).to.be.true
    validToken = token
  });

  it('should get all tokens for a user', async function () {
    const tokens = await tokenController.findAllTokensForStudent(studentId)
    expect(tokens.length).to.be.greaterThan(0)
  })

  it('should redeem a valid token', async function ()  {
    const dateToday = new Date().getDate()
    redeemedToken = await tokenController.redeemToken(validToken._id)

    expect(redeemedToken.isValid).to.be.false
    expect(redeemedToken.brewingDate.getDate()).to.be.eql(dateToday)
  })

  it('should not redeeem an invalid token', async function () {
    try {
      await tokenController.redeemToken(redeemedToken._id)
    } catch (error) {
      expect(error).to.be.equal(new Error('Invalid token.'))
    }
  })

  it('should not generate a token if the student or company does not exist', async () => {
    const fakeCompanyId = '5c5ae4cc1d9536b4d5200000'
    const fakeStudentId = '5c5ae4cc1d9536b4d5200000'

    try {
      const newToken = await tokenController.generateToken(fakeCompanyId, fakeStudentId)
      should.not.exist(newToken)
    } catch (error) {
      should.exist(error)
    }
  })
  
})