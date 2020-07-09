<template>
  <div>
    <div class="hidden-sm-and-up post" v-if="feedItemData">
      <div class="meta-info">
        <div class="item-logo" v-if="feedItemData.contentInformation.images.logo">
          <img :src="feedItemData.contentInformation.images.logo" />
        </div>
        <div class="item-type icon">{{getCategoryName(feedItemData.preferences.target.industry)}}</div>
        <div class="item-location icon">{{feedItemData.preferences.location.address1}}, {{feedItemData.preferences.location.city[0]}}</div>
        <div class="item-date icon">{{getTimeString(feedItemData.preferences.duration.applicationStartDate)}}</div>
      </div>
      <div class="content-info">
        <div class="item-title">{{ feedItemData.contentInformation.jobTitle }}</div>
        <div class="item-owner">By {{ feedItemData.contentInformation.companyDescription.name }}</div>
        <div class="skills">
          <span
            class="skill-chip"
            v-for="skill in feedItemData.preferences.target.skills"
            v-bind:key="skill"
          >{{skill}}</span>
        </div>
      </div>
    </div>
    <div class="hidden-xs-only post" v-if="feedItemData">
      <div class="meta-info">
        <div class="item-logo" v-if="feedItemData.contentInformation.images.logo">
          <img :src="feedItemData.contentInformation.images.logo" />
        </div>
        <div class="item-type icon">{{feedItemData.preferences.target.jobType[0]}}</div>
        <div class="item-location icon">{{feedItemData.preferences.location.address1}}</div>
      </div>
      <div class="content-info">
        <div class="item-title">{{ feedItemData.contentInformation.jobTitle }}</div>
        <div class="item-owner">By {{ feedItemData.contentInformation.companyDescription.name }}</div>
        <div class="skills">
          <!-- <span
            class="skill-chip"
            v-if="feedItemData.content.skills[0]"
          >{{feedItemData.content.skills[0]}}</span>
          <span
            class="skill-chip"
            v-if="feedItemData.content.skills[1]"
          >{{feedItemData.content.skills[1]}}</span>
          <span class="skill-chip" v-if="feedItemData.content.skills[2]">
            <span
              v-if="feedItemData.content.skills.length > 3"
            >+ {{feedItemData.content.skills.length - 2}} more</span>
            <span v-else>{{feedItemData.content.skills[2]}}</span>
          </span>-->
          <span
            class="skill-chip"
            v-for="skill in feedItemData.preferences.target.skills"
            v-bind:key="skill"
          >{{skill}}</span>
        </div>
        <div class="icon item-date">{{getTimeString(feedItemData.preferences.duration.applicationStartDate)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import FilterCompanys from './FeedFilter'
import IconInfoBox from "./FeedElementInfoSlot";
import FeedItemMixin from "../../mixins/FeedElementMixins";

export default {
  props: ["feedItemData"],
  mixins: [FeedItemMixin],
  components: {
    IconInfoBox
    // FilterCompanys
  },
  data: () => {
    return {};
  },
  methods: {
    getIconNameByItemType: jobType => {
      switch (jobType) {
        case "job":
          return "business_center";
          break;
        case "job":
          return "business_center";
          break;
        default:
          return "business";
          break;
      }
    },
    getCategoryName(incomingName) {
      if (incomingName === "fuldtidsstilling") {
        return "Full-time";
      }

      return incomingName;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/cocup-ui.scss";

  .post{
    background-color: white;
    border-radius: 6px;
    color: $text-color;
    display: flex;
    position: relative;
    box-shadow: 0px 2px 4px 1px rgb(180, 179, 180);

    .meta-info {
      border-right: 1px solid rgba(112, 112, 112, 0.2);

      .item-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        box-shadow: 0px 2px 3px 2px rgb(233, 231, 233);
        padding: 0 2px;
      }

      .item-type {
        background: url("../../assets/toolbar/JobsActive.svg") left center
          no-repeat;
        background-size: 18px 13px;
      }
      .item-location {
        background: url("../../assets/icons/location.svg") left center
          no-repeat;
        background-size: 16px 14px;
      }
    }

    .content-info {
      padding-left: 18px;

      .item-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 12px;
        line-height: 20px;
      }
      .item-owner {
        font-size: 11px;
        margin-bottom: 20px;
      }
      .skills {
        .skill-chip {
          padding: 1px 4px;
          margin-right: 5px;
          background-color: #ebebeb;
          border-radius: 8px;
          display: inline-block;
          font-size: 9px;
          color: gray;
        }
      }
    }

    &.hidden-sm-and-up {
      height: 160px;
      width: 100%;
      margin: 0 auto 15px auto;
      padding: 8px 16px;

      .meta-info {
        min-width: 90px;
        max-width: 90px;

        .item-logo {
          width: 56px;
          height: 56px;
          margin: 5px 0 15px 5px;

          img{
            width: 56px;
            height: 56px;
          }
        }

        .icon{
          font-size: 8px;
          padding: 4px 0 0 20px;
        }
        .item-type {
        }
        .item-location {
        }
        .item-date{
          background: url("../../assets/toolbar/EventsActive.svg") left 4px no-repeat;
          background-size: 18px 12px;
        }
      }

      .content-info{
        .item-title{
          text-overflow: ellipsis;
          overflow: hidden;
          max-height: 40px;
          //white-space: nowrap;
        }
        .skills{
          height: 44px;
          overflow: hidden;
        }
      }
    }

    &.hidden-xs-only {
      height: 200px;
      width: 544px;
      padding: 16px 24px;
      margin-bottom: 25px;

      .meta-info {
        padding-right: 18px;
        .item-logo {
          width: 88px;
          height: 88px;
          margin-bottom: 25px;

          img{
            width: 88px;
            height: 88px;
          }
        }
        .icon{
          font-size: 10px;
          padding: 4px 0 0 20px;
        }
        .item-type {
          width: 88px;
        }
        .item-location {
          width: 88px;
        }
      }
      .item-date {
        position: absolute;
        bottom: 15px;
        left: 24px;
        background: url("../../assets/toolbar/EventsActive.svg") left 6px no-repeat;
        background-size: 18px 12px;
        font-size: 10px;
        padding: 4px 0 0 20px;
      }
    }
  }
</style>

<style lang="scss">
// .skill-chip {
//   background-color: #ebebeb;
//   padding: 2px 6px;
//   margin: 3px;
//   border-radius: 8px;
//   display: inline-block;
//   font-size: 12px;
//   color: gray;
// }

// .skill-chip.large-chips {
//   font-size: 13px;
// }
</style>
