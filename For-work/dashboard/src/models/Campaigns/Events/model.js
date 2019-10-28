//This file shoes how the data needs to look when sent to the backend for events.
const eventsModel = {
  preferences : {
    target: {
      languages: [],
      industry : []
    },
    duration: {
      startDay: "",
      startMonth: "",
      startTime: "",
      endTime: "",
      lastReg : "",
      time : ""
    },
    location : {
      city: [],
      address1: "",
      address2: "",
      address3: "",
    }
  },
  contentInformation: {
    context : [{
        title: "",
        text: ""
      },
      {
        title: "",
        text: []
      },
      {
        title: "",
        text: []
      },
      {
        title: "",
        text: []
      },
      {
        title: "",
        text: []
      },
      {
        title: "",
        text: []
      }
    ],
    price: "",
    hostedBy : "",
    externalLink : "",
    images: {
      logo: '', // change this... issue #156
      background: '' // if background null -> use the first
    },
  },
  type: 'event',
  enabled: true,
  name: "",
}


export default eventsModel
