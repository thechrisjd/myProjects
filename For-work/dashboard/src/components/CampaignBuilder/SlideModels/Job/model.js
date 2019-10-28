// main slide model for Job type campaigns
export const defaultMainSlide = {
  type: 'main',
  params: {
    subType: '',
    jobTitle: '',
    companyName: '',
    header: '',
    deadline: {
      text: 'Apply Before',
      date: new Date()
    },
    button: {
      text: '',
      link: ''
    },
    images: {
      logo: '', // change this... issue #156
      background: '' // if background null -> use the first
    },
    contentInformation : {
      jobeType: [],
      industry: [],
  		companyName: '',
  		jobTitle: '',
  		externalJobUrl: '',
      requiredSkills : [],
      secondarySkills : [],
  		skills: [],
      language: [],
  		shortDescriptionText: '',
  		fullDescriptionText: '',
      applicationStartDate: new Date(),
      applicationEndDate: Date,
      images: {
        logo: '', // change this... issue #156
        background: '' // if background null -> use the first
      },
      button: {
        text: '',
        link: ''
      }
    }
  }
}

export const slideTemplates = [
  {
    name: "We are",
    description: "Describe your company",
    imagePreview: "",
    template: {
      type: 'we-are',
      params: {
        description: '',
        videoUrl: ''
      }
    },
  },
  {
    name: "You are",
    description: "Describe your target group",
    imagePreview: "https://i1.wp.com/tecnoxspace.com/wp-content/uploads/2017/06/wood-gallery-placeholder-5.jpg?resize=600%2C600&ssl=1",
    template: {
      type: 'you-are',
      params: {
        description: '',
        videoUrl: ''
      }
    },
  },
  {
    name: "We offer",
    description: "How will your employees benefit by working with you",
    imagePreview: "https://i1.wp.com/tecnoxspace.com/wp-content/uploads/2017/06/wood-gallery-placeholder-5.jpg?resize=600%2C600&ssl=1",
    template: {
      type: 'we-offer',
      params: {
        description: '',
        videoUrl: ''
      }
    },
  },
  {
    name: "Your Tasks",
    description: "https://i1.wp.com/tecnoxspace.com/wp-content/uploads/2017/06/wood-gallery-placeholder-5.jpg?resize=600%2C600&ssl=1",
    imagePreview: "",
    template: {
      type: 'your-tasks',
      params: {
        description: '',
        videoUrl: ''
      }
    }
  },
  {
    name: "Contact",
    description: "Contact Info",
    imagePreview: "https://i1.wp.com/tecnoxspace.com/wp-content/uploads/2017/06/wood-gallery-placeholder-5.jpg?resize=600%2C600&ssl=1",
    template: {
      type: 'contact',
      params: {
        link:"",
        email:"",
        telephone:""
      }
    }
  }
]
