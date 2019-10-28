<template>
  <div>
    <v-dialog
      hide-overlay
      v-model="value.active"
      v-if="$store.ismobile"
      content-class="mobile-events"
    >
      <v-card v-if="value.active" class="info-dialog-content">
        <v-btn class="arrow-back" icon @click="closeDialog"  >
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <!-- <a class="close-button fas fa-times" @click="closeDialog"></a> -->
        <div class="post" v-if="value.item">
          <div class="item-logo" v-if="value.item.contentInformation.images.logo">
            <img :src="value.item.contentInformation.images.logo" />
            <div class="title-info">
              <div class="company-title">{{ value.item.name }}</div>
              <div class="company-name">Hosted by {{ value.item.name }}</div>
            </div>
            <div class="price">{{ value.item.price }}</div>
          </div>
          <div class="content">
            <div class="content-info">
              <div class="date">
                <div class="start-day">{{value.item.preferences.duration.startDay}}</div>
                <div class="start-month">{{value.item.preferences.duration.startMonth}}</div>
              </div>
              <div class="start-time">
                {{` ${getDayOfTheWeek}
                ${value.item.preferences.duration.startTime} -
                ${value.item.preferences.duration.endTime}`}}
              </div>
              <div class="location">{{ value.item.preferences.location.address1 }}</div>
            </div>
            <v-btn
            class="register" v-bind:href= "value.item.contentInformation.externalLink" target="_blank">
            Register
          </v-btn>
            <v-divider></v-divider>
            <div v-if="value.item.contentInformation">
              <div
                v-for="paragraph in value.item.contentInformation.context"
                v-bind:key="paragraph[0]"
              >
                <p class="paragraph-title">{{paragraph.title}}</p>
                <ul v-if="Array.isArray(paragraph.text)" class="paragraph-text">
                  <li v-for="text in paragraph.text" v-bind:key="text">{{text}}</li>
                </ul>
                <div class="paragraph-text" v-else>{{paragraph.text}}</div>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="value.active" v-if="!$store.ismobile" class="desktop" max-width="800">
      <v-card v-if="value.active" class="info-dialog-content">
        <a class="close-button fas fa-times" @click="closeDialog"></a>
        <div class="post" v-if="value.item">
          <div class="item-logo" v-if="value.item.contentInformation.images.logo">
            <img :src="value.item.contentInformation.images.logo" />
            <div class="title-info">
              <div class="company-title">{{ value.item.name }}</div>
              <div class="company-name">Hosted by {{ value.item.name }}</div>
            </div>
          </div>
          <div class="content">
            <div class="content-info">
              <div class="date">
                <div class="start-day">{{value.item.preferences.duration.startDay}}</div>
                <div class="start-month">{{value.item.preferences.duration.startMonth}}</div>
              </div>
              <div class="start-time">
                {{` ${getDayOfTheWeek}
                ${value.item.preferences.duration.startTime} -
                ${value.item.preferences.duration.endTime}`}}
              </div>
              <div class="location">  {{ value.item.preferences.location.address1 }}, {{ value.item.preferences.location.city[0] }}</div>
              <div class="price">{{ value.item.contentInformation.price }}</div>
            </div>
            <v-btn
            class="register" v-bind:href= "value.item.contentInformation.externalLink" target="_blank">
            Register
          </v-btn>
            <v-divider></v-divider>
            <div v-if="value.item.preferences.contentInformation">
              <div
                v-for="paragraph in value.item.contentInformation.context"
                v-bind:key="paragraph[0]"
              >
                <p class="paragraph-title">{{paragraph.title}}</p>
                <ul v-if="Array.isArray(paragraph.text)" class="paragraph-text">
                  <li v-for="text in paragraph.text" v-bind:key="text">{{text}}</li>
                </ul>
                <div class="paragraph-text" v-else>{{paragraph.text}}</div>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Mark from "mark.js";
import FeedItemMixins from "../../mixins/FeedElementMixins";
import SaveButton from "./FeedElementDialogSaveButton";
import { daysOfTheWeek } from "./config";

export default {
  props: ["value"],
  components: {
    SaveButton,
    daysOfTheWeek
  },
  mixins: [FeedItemMixins],
  watch: {
    "value.active": function() {
      if (this.value.active === true) {
        // dialog opened

        //console.log({ value: this.value.item });
        //const self = this;
        setTimeout(() => {
          //self.highlightKeywordsInHtml();
        }, 100);
      }
    }
  },
  data: () => {
    return {
      item: {
        isFavourite: true
      },
      daysOfTheWeek
    };
  },
  computed: {
    getDayOfTheWeek: function() {
      let self = this;
      let date = new Date(
        `${self.value.item.preferences.duration.startMonth} ${self.value.item.preferences.duration.startDay}`
      );
      let eventDay = this.daysOfTheWeek[date.getDay()];
      return eventDay;
    }
  },
  methods: {
    closeDialog: function() {
      this.$emit("input", {
        active: false,
        item: null
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/cocup-ui.scss";

.v-dialog__content {
  align-items: start;
  margin-top: 65px;
}

.v-dialog {
  position: relative;
}

.subheading {
  position: relative;
}

.post {
  max-height: 80vh;
  overflow-y: scroll;
  box-shadow: none;

  &::-webkit-scrollbar {
    width: 2px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    width: 2px;
    background-color: rgb(109, 106, 106);
  }
  &::-webkit-scrollbar-corner {
    width: 2px;
    background-color: transparent;
  }
}




.info-dialog-content {
  width: 100%;
  color: $text-color;

  a.close-button {
    font-size: 40px;
    font-weight: thin;
    color: #eeeeee;
    position: absolute;
    z-index: 2;
    left: 92%;
    top: 25px;
  }

  .item-logo {
    position: relative;

    img {
      max-height: 392px;
    }

    .title-info {
      position: absolute;
      bottom: 10px;
      padding: 0 20px;
      color: $text-color-light;

      .company-title {
        font-size: 20px;
        font-weight: 600;
      }
      .company-name {
        font-size: 12px;
      }
    }
  }

  .content {
    padding: 0 20px 10px;

    .content-info {
      color: $text-color;
      display: flex;
      flex-flow: row nowrap;
      align-items: flex-end;
      font-size: 12px;

      .date {
        display: flex;
        flex-direction: column;
        margin-right: 15px;

        .start-day {
          font-size: 22px;
          font-weight: 600;
          letter-spacing: 1px;
        }
        .start-month {
          font-size: 14px;
          line-height: 14px;
          color: #e85849;
          text-transform: uppercase;
          letter-spacing: -1px;
          margin-top: -10px;
          font-weight: 600;
        }
      }

      .price {
        font-weight: 500;
        padding-left: 16px;
        background: url(/img/money.bc43c4d1.svg) -10px -5px no-repeat;
        background-size: 33px 27px;
      }
      .location {
        margin: 0 20px;
        padding-left: 13px;
        background: url(../../assets/icons/location.svg) left -1px no-repeat;
      }
    }
    .register {
      &.v-btn {
        background-color: $color-2;
        margin: 10px 0 10px;
        border-radius: 5px;
        text-transform: capitalize;
      }
      color: $text-color-light;
      font-size: 16px;
      font-weight: 600;
    }
    .v-divider {
      margin: 20px 0 25px;
    }

    .paragraph-title {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 0;
    }
    .paragraph-text {
      font-size: 13px;
      margin-bottom: 16px;
    }

    ul.paragraph-text {
      list-style: none;
      padding-left: 0;
    }
  }
}

.mobile .v-dialog__content {
  align-items: start;
  margin-top: 0;
}

.mobile-events {
  margin: 0 !important;

  .info-dialog-content {
    position: relative;

    .arrow-back{
        position: absolute;
        top: 0;
        left: 0;
        color: $text-color-light;
        font-size: 40px;
        z-index:2;
      }
  }

  .post {
    height: 100%;
    max-height: unset;
  }

  .item-logo {
    img {
      max-height: 112px;
    }

    .title-info {
      .company-title {
        font-size: 12px;
        font-weight: 600;
      }
      .company-name {
        font-size: 8px;
        margin-top: -5px;
      }
    }

    .price {
      position: absolute;
      top: 40px;
      right: 10px;
      color: $text-color-light;
      font-size: 10px;
      font-weight: 600;
      padding-left: 16px;
      background: url('../../assets/icons/money-white.svg') -10px -5px no-repeat;
      background-size: 33px 27px;
    }
  }
}
</style>

<style lang="scss">
.mobile-events.v-dialog {
  margin: 0 !important;
}
.mobile-events.v-dialog:not(.v-dialog--fullscreen) {
  max-height: calc(100% - 56px) !important;
}
</style>
