const skillController = require('./controller')

const skills = 
['skill 1', 'skill2']

const main = async () => {
  const added = await skillController.addSkills(skills)
  console.log('Added skills', added)
}

main()