// main slide model for Event type campaigns
export const defaultMainSlide = {
  type: 'main',
  params: {
    textTop: '',
    textBottom: '',
    header: '',
    text: '',
    button: {
      text: '',
      link: ''
    },
    images: {
      logo: 'https://cocup-images.s3.eu-central-1.amazonaws.com/1553093140732',
      background: '' // if background null -> use the first
    }
  }
}

export const slideTemplates = [
  // {
  //   name: "Example",
  //   description: "Description here",
  //   imagePreview: "https://picsum.photos/300/300",
  //   template: {
  //     type: "your-type",
  //     params: {
  //       key: "value",
  //       key2: "value2",
  //     }
  //   }
  // },
  {
    name: "Info",
    description: "Give some information about a guide campaign",
    imagePreview: "",
    template: {
      type: 'info',
      params: {
        header: ''
      }
    },
  }
]