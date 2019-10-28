// main slide model for COMPANY type campaigns
export const defaultMainSlide = {
  type: 'main',
  params: {
    description: '',
    employees: '',
    location: {
      address: '',
      city: ''
    },
    images: {
      logo: '',
      background: ''
    }
  }
}

export const slideTemplates = [{
    name: "Video",
    description: "Embed a YouTube video.",
    imagePreview: "/img/templates/ui/campaign-builder/template-previews/video.png",
    template: {
      type: "video",
      params: {
        header: "Short descripiton of the video...",
        youtubeUrl: "https://www.youtube.com/watch?v=xGJvueZGkfU"
      }
    }
  },
  {
    name: "Image",
    description: "Custom picture with optional button.",
    imagePreview: "/img/templates/ui/campaign-builder/template-previews/picture-new.png",
    template: {
      type: "image",
      params: {
        images: [""],
        button: {
          text: "See opportunities",
          link: '',
          backgroundColor: null,
        }
      }
    }
  },
  {
    name: "Image Text",
    description: "Custom picture with text.",
    imagePreview: "/img/templates/ui/campaign-builder/template-previews/picture-text.png",
    template: {
      type: "image-text",
      params: {
        images: "https://cocup-images.s3.eu-central-1.amazonaws.com/1557141215827",
        text: "Laborum aliqua quis eu do in ut dolore ad aute dolor."
      }
    }
  },
  {
    name: "Testimonial",
    description: "A quotation with author.",
    imagePreview: "/img/templates/ui/campaign-builder/template-previews/testimony-top.png",
    template: {
      type: "testimonial",
      options: {
        position: "horizontal",
      },
      params: {
        text: "In COCUP, we are not looking only for skills, but rather for people. We seek for personalities that will perfectly fit into the company's culture and will build profound relationships. That is the only way to keep a purpose for our vision to create the most holistic career app in the market. Come join us in this journey! ",
        author: {
          image: "/img/templates/cocup/peter-ceo.jpg",
          name: "Peter Busk",
          title: "CEO & Co-Founder"
        }
      }
    }
  },
  {
    name: "Social Media",
    description: "Links to various social media platforms.",
    imagePreview: "/img/templates/ui/campaign-builder/template-previews/social-media.png",
    template: {
      type: "social-media",
      params: {
        facebook: "https://www.facebook.com/cocupdk/",
        instagram: "",
        twitter: "",
        linkedin: ""
      }
    }
  }, {
    name: "Call to Action",
    description: "Contact information.",
    imagePreview: "/img/templates/ui/campaign-builder/template-previews/call-to-action.png",
    template: {
      type: "call-to-action",
      position: "top",
      params: {
        websiteUrl: "",
        phoneNumber: "",
        email: ""
      }
    }
  }, {
    name: "Text Slide",
    description: "Any kind of text slide",
    imagePreview: "/img/templates/ui/campaign-builder/template-previews/text.png",
    template: {
      type: 'text',
      params: {
        header: '',
        subHeader: '',
        paragraph: '',
        button: {
          link: '',
          text: 'Read More'
        }
      }
    }
  }, {
    name: "Job Positions",
    description: "Show the number of job opportunities",
    imagePreview: "/img/templates/ui/campaign-builder/template-previews/job-positions.png",
    template: {
      type: 'job-positions',
      params: {
        jobPositions: 5,
        button: {
          link: '',
          text: 'See more'
        }
      }
    },
  }
]