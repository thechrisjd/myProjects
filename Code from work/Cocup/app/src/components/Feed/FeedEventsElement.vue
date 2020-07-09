<template>
  <div>
    <div class="hidden-sm-and-up post" v-if="feedEventsItemData">
      <div class="item-logo" v-if="feedEventsItemData.contentInformation.images.logo">
        <img :src="feedEventsItemData.contentInformation.images.logo" />
      </div>
      <div class="content-info">
        <div class="item-title">{{ feedEventsItemData.name }}</div>
        <div class="date-location">
          <div>
            <div class="start-day">{{feedEventsItemData.preferences.duration.startDay}}</div>
            <div class="start-month">{{feedEventsItemData.preferences.duration.startMonth}}</div>
          </div>
          <div class="item-owner">{{ feedEventsItemData.preferences.location.address1}}</div>
        </div>
        <div class="start-time">
          {{` ${getDayOfTheWeek}
          ${feedEventsItemData.preferences.duration.startTime} -
          ${feedEventsItemData.preferences.duration.endTime}`}}
          <span
            class="price"
          >{{ feedEventsItemData.contentInformation.price }}</span>
        </div>
      </div>
    </div>
    <div class="hidden-xs-only post" v-if="feedEventsItemData">
      <div class="item-logo" v-if="feedEventsItemData.contentInformation.images.logo">
        <img :src="feedEventsItemData.contentInformation.images.logo" />
      </div>
      <div class="content-info">
        <div class="item-title">{{ feedEventsItemData.name }}</div>
        <div class="date-location">
          <div>
            <div class="start-day">{{feedEventsItemData.preferences.duration.startDay}}</div>
            <div class="start-month">{{feedEventsItemData.preferences.duration.startMonth}}</div>
          </div>
          <div class="item-owner">{{ feedEventsItemData.preferences.location.address1 }}, {{ feedEventsItemData.preferences.location.city[0] }}</div>
        </div>
        <div class="start-time">
          {{` ${getDayOfTheWeek}
          ${feedEventsItemData.preferences.duration.startTime} -
          ${feedEventsItemData.preferences.duration.endTime}`}}
        </div>
        <div class="price">{{ feedEventsItemData.contentInformation.price }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import IconInfoBox from "./FeedElementInfoSlot";
import FeedItemMixin from "../../mixins/FeedElementMixins";
import { daysOfTheWeek } from "./config";

export default {
  props: ["feedEventsItemData"],
  mixins: [FeedItemMixin],
  components: {
    daysOfTheWeek
  },
  data: () => {
    return {
      daysOfTheWeek
    };
  },
  computed: {
    getDayOfTheWeek: function() {
      let self = this;
      let date = new Date(
        `${self.feedEventsItemData.preferences.duration.startMonth} ${self.feedEventsItemData.preferences.duration.startDay}`
      );
      let eventDay = this.daysOfTheWeek[date.getDay()];
      return eventDay;
    }
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

.post {
  background-color: white;
  border-radius: 6px;
  color: $text-color;
  margin-bottom: 20px;
  display: flex;
  position: relative;
  box-shadow: 0px 2px 4px 1px rgb(180, 179, 180);
  color: $text-color;
  margin-bottom: 20px;

  .item-logo img {
    width: 240px;
    height: 152px;
    border-radius: 6px;
  }

  .content-info {
    width: 100%;
    padding: 16px 0 0 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .item-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 12px;
      line-height: 20px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .date-location {
      display: flex;
      justify-content: space-between;
      .start-day {
        font-size: 22px;
        font-weight: 600;
        letter-spacing: 1px;
      }
      .start-month {
        font-size: 14px;
        color: #e85849;
        text-transform: uppercase;
        letter-spacing: -1px;
        margin-top: -10px;
        font-weight: 600;
        margin-right: 5em;
      }
      .item-owner {
        font-size: 12px;
        margin-top: 10px;
        margin-right: 80px;
        padding-left: 20px;
        background: url(../../assets/icons/location.svg) left -5px no-repeat;
        background-size: 13px 27px;
      }
    }
    .start-time {
      font-size: 12px;
      margin: 5px 0 10px 0;
    }
    .price {
      font-size: 12px;
      margin-bottom: 5px;
    }
  }

  &.hidden-xs-only {
    height: 152px;

    .meta-info {
      padding-right: 18px;
    }
  }

  &.hidden-sm-and-up.post {
    height: 96px;

    .meta-info {
      padding-right: 18px;
    }
    .item-logo img {
      width: 112px;
      height: 96px;
      border-radius: 6px;
    }
    .content-info {
      padding: 4px 0 0 10px;

      .item-title {
        font-size: 11px;
        font-weight: bold;
        margin-bottom: 5px;
        line-height: 14px;
      }
      .date-location {
        .start-day {
          font-size: 13px;
        }
        .start-month {
          font-size: 8px;
          letter-spacing: -1px;
          margin-top: -5px;
        }
        .item-owner {
          font-size: 10px;
          margin-top: 5px;
          margin-right: 15px;
          padding-left: 15px;
          background: url(../../assets/icons/location.svg) left -1px no-repeat;
          background-size: 13px 17px;
        }
      }

      .start-time {
        font-size: 10px;
        margin: 5px 15px 5px 0;

        .price {
          margin-left: 10px;
          font-size: 10px;
        }
      }
    }
  }
}
</style>
