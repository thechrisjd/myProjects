// main slide model for Event type campaigns
export const defaultMainSlide = {
  type: 'main',
  params: {
    header: '',
    date: new Date(),
    location: ['', '', ''],
    button: {
      text: '',
      link: ''
    },
    images: {
      logo: 'https://cocup-images.s3.eu-central-1.amazonaws.com/1552587861108',
      logoBackgroundColor: 'white',
      background: '' // if background null -> use the first
    },
    target: {
      languages: [],
      categories: []
    },
    contentInformation: [{
        title1: "",
        text1: ""
      },
      {
        title2: "",
        text2: []
      },
      {
        title3: "",
        text3: []
      },
      {
        title4: "",
        text4: []
      },
      {
        title5: "",
        text5: []
      },
      {
        title6: "",
        text6: []
      }
    ],
    "test": '',
    "enabled": true,
    "type": "",
    "name": "",
    "price": "",

  }
}

// export const slideTemplates = [
//   {
//     name: "Example",
//     description: "Description here",
//     imagePreview: "https://picsum.photos/300/300",
//     template: {
//       type: "your-type",
//       params: {
//         key: "value",
//         key2: "value2",
//       }
//     }
//   },
//     {
//     preferences: {
//       target: {
//         languages: ["English"],
//         categories: ["IT", "Software development"]
//       },
//       duration: {
//         startDay: 25,
//         startMonth: "Oct",
//         startTime: "9:00am",
//         endTime: "15:00pm"
//       },
//       contentInformation: [{
//           title: "What is this course about?",
//           text: "Design thinking can sprout organic growth and sustainable innovation. Given its capability for deep user immersion via uncovering unarticulated needs and perspectives while having the leeway to explore multiple ideas in an innovative setting were failing fast for a more robust success is not a taboo but encouraged."
//         },
//         {
//           title: "Benefits of Design Thinking",
//           text: ["Better Products", "Decrease Costs", "Happier Customers", "Speed to Market", "Visibility Across Enterprise", "Increase Revenues"]
//         }, {
//           title: "Module 1: Gathering Insights",
//           text: ["Understand design thinking framework through case studies", "Identifying users pain points", "Learn how to gather data and contextualize them into a meaningful architecture"]
//         },
//         {
//           title: "Module 2: Ideation",
//           text: ["Reframing and Ideation - Go wide and wild problem-solving technique", "Know how to foresee the needs based on user personas"]
//         },
//         {
//           title: "Module 3: Implementation",
//           text: ["Prototyping and testing - fail fast, keep moving technique",
//             "Know how to stitch the design to the insights gathered",
//             "Learn how to iterate swiftly",
//             "Learn how to manage frustration when failing fast process",
//             "Open-Discussion: Your current role and how design thinking benefits you"
//           ]
//         },
//         {
//           title: "Who needs to attend?",
//           text: ["Entrepreneurs: Solo Rider",
//             "Founder teams: CXOs",
//             "Designers: UX/UI Designers, Product Managers",
//             "Builders: Engineers/Devs",
//             "Freelancers: Self-employed one-business Boss",
//             "Consultants: Self-employed mentors/Coaches",
//             "User Interface designers who wish to expand their career towards Design Thinking Umbrella (focus on UX Design)"
//           ]
//         }
//       ]
//     },
//     test: '1',
//     enabled: true,
//     type: "event",
//     location: "Storkoebenhavn",
//     name: "Women in Tech",
//     price: "Free",
//     images: "https://cocup-images.s3.eu-central-1.amazonaws.com/1557053531900"
//   },
//   {
//     name: "Info",
//     description: "Give some information about an event campaign",
//     imagePreview: "https://cocup-images.s3.eu-central-1.amazonaws.com/1554759438202",
//     template: {
//       type: 'info',
//       params: {
//         header: ''
//       }
//     },
//   }
// ]
