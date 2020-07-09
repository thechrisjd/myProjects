const faker = require('faker')
const User = require('../src/app/user/model')


//main attributes
// let email = faker.internet.email()
// let password = faker.internet.password()
// let type = faker.random.arrayElement(['student', 'company'])


//student info
let fakeStudentData = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  type: 'student',
  studentInfo: {

    type: {
      profile: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.past(),
        location: faker.address.streetName(),
        profilePictureUrl: faker.image.imageUrl(),
        telephone: faker.phone.phoneNumber(),
        linkedinProfileUrl: faker.internet.url(),
        portfolioUrl: faker.internet.url()
      },
      tags: {
        university: faker.random.arrayElement(['DTU']),
        fieldOfStudy: faker.random.arrayElement(['Computer Science', 'Chemical Engineering', 'Data Science', 'Advanced Mathematics']),
        studyProgress: faker.random.arrayElement(['Professional Bachelor', 'Bachelor', 'Masters Degree', 'PhD', 'Graduated']),
        skills: {
          title: faker.hacker.adjective(),
          type: faker.random.arrayElement(['Interest', 'Soft Skill', 'Hard Skill']),
          level: faker.random.number({
            min: 1,
            max: 10
          })
        }
      }
    }
  }
}

//company info
let fakeCompanyData = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  type: 'company',
  companyInfo: {
    type: {
      profile: {
        name: {
          companyName: faker.company.companyName(),
          legalCompanyName: faker.company.companySuffix()
        },
        contactPerson: {
          fullName: faker.name.findName(),
          email: faker.internet.email(),
        },
        CVR: faker.random.number()
      }
    }
  }
}

const fakeStudentUser = new User(fakeStudentData)
const fakeCompanyUser = new User(fakeCompanyData)

console.log(fakeStudentUser)
console.log(fakeCompanyUser)

//student info
//profile
// let firstName = faker.name.firstName()
// let lastName = faker.name.lastName()
// let dateOfBirth = faker.date.past()
// let location = faker.address.streetName()
// let profilePictureUrl = faker.image.imageUrl()
// let telephone = faker.phone.phoneNumber()
// let linkedinProfileUrl = faker.internet.url()
// let portfolioUrl = faker.internet.url()

//tags
// let university = faker.random.arrayElement(['DTU'])
// let fieldOfStudy = faker.random.arrayElement(['Computer Science', 'Chemical Engineering', 'Data Science', 'Advanced Mathematics'])
// let studyProgress = faker.random.arrayElement(['Professional Bachelor', 'Bachelor', 'Masters Degree', 'PhD', 'Graduated'])
// let skills = faker.random.arrayElement(['Interest', 'Soft Skill', 'Hard Skill'])
// let level = faker.random.number({
//   min: 1,
//   max: 10
// })

//companyInfo
//profile
// let companyName = faker.company.companyName()
// let contactPerson = faker.name.findName()
// let contactPersonEmail = faker.internet.email()
// let CVR = faker.random.number.length(8)


//console.log(email, password)

// user: {
//   type: 'Student'
// }