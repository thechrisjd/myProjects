# cocup-campaign - npm project

To release a new version of this increase the version in the package.json and run `npm publish`.

## Versions

- `1.3.2` - add force update method to component
- `1.3.3` - add fade transition to preview mode
- `1.4.0` - New event slide; Add c-button component; Remove md-theme;
- `1.5.0` - Update company slides with new property names;
- `1.6.0` - Created job positions and text slides;
- `1.7.0` - Created event, guide and job slides;
- `1.7.1` - Fixed dependency issue;
- `1.7.2` - Fix Company campaign images (logo & background)
- `1.7.3` - Style is changed
- `1.7.4` - Fixed background images for all campaigns
- `1.7.5` - Update info slide.params for event,job and guide campaigns
- `1.7.6` - Fix the style issues
- `1.7.7` - Fix the style issues
- `1.8.0` - Make video slide reactive to youtubeUrl changes
- `1.8.1` - Interactions are not recorded in preview mode (using state)
- `1.8.2` - Job campaign: add subtypes (internship, student job, job)
- `1.8.3` - Added video header
- `1.8.4` - Deleted VueFilterDateFormat functions
- `1.8.6` - Fix issue with eventBus
- `1.9.0` - Implement new job campaigns (We are, You are, We offer)
- `1.9.1` - Fix eventBus import error
- `1.10.0` - Improve logo layout and support background color picking
- `1.11.0` - Add new job slides
- `1.11.1` - Fix job slide design glitches
- `1.12.1` - Remove address field from Company Profile; Update job slides; Bunch of bug fixes.
- `1.12.2` - Make job description headline grow with text
- `1.13.0` - Implement HTML Editor
- `1.13.1` - Change youtube video size for dashboard
- `1.13.2` - Fix Event Info slide + add HTML editor
- `1.13.3` - Change youtube video size for dashboard
- `1.13.4` - Add ImageText slide to company slides
- `1.13.5` - Add Notification page
- `1.13.6` - Delete Company Name from Company slides
- `1.14.0` - Deploy latest version off app (launch ready)
- `1.14.1` - Add your tasks and contact slide to job slides
- `1.14.2` - Change style of contact slide in job slides
- `1.14.3` - Change style of contact slide in job slides
- `1.15.0` - Add new job slides (Your tasks, Contact)
- `1.15.1` - Not show job logo avatar if logo is not set
- `1.15.2` - Adjust logo in container; Fix html content bug
- `1.15.3` - Improve image-text slide layout
- `1.15.4` - Connect buttons with the campaign id

## Campaign API Documentation

When we change the slides API, we will update this file to document the parameters used in the campaign slides. The goal is to describe it briefly but in enough details so that someone who is not familiar with the app can extend it and understand how to manually create campaigns.

### Company campaigns

```js

{
      type: "image-text",
      params: {
        images: ["/img/templates/cocup/were-hiring-thin.jpg"],
        text: "Text for image"
      }
}
```


### Job campaigns

> Last updated: 19 Apr 2019 - v1.8.6

Slide types and positions for job campaigns are fixed.

```js

jobCampaign.slides = [
  {
    "type": "main",
    "params": {
      "jobTitle": String,
      "companyName": String,
      "header": String,
      "deadline": {
        "text": String,
        "date": Date
      },
      "button": {
        "text": String,
        "link": String
      },
      "images": {
        "logo": String,
        "background": String
      },
      "name": String
    }
  },
  {
    type: 'we-are',
    params: {
      videoUrl: String, // can only be one: video or description
      description: String // HTML text
    }
  },
  {
    type: 'you-are',
    params: {
      videoUrl: String, // can only be one: video or description
      description: String // HTML text
    }
  },
  {
    type: 'we-offer',
    params: {
      videoUrl: String, // can only be one: video or description
      description: String // HTML text
    },
    {
    type: 'your-tasks',
    params: {
      videoUrl: String, // can only be one: video or description
      description: String // HTML text
    },
    {
    type: 'contact',
    params: {
      link: '',
      telephone:'',
      email: ''
    }
  }
]

```

### Event campaigns

Coming soon...