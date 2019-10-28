<template>
  <div>
    <v-dialog
      v-if="$store.ismobile"
      v-model="value.active"
      hide-overlay
      content-class="mobile-companies-dialog"
    >
      <v-card v-if="value.active" class="info-dialog-content">
        <v-btn class="arrow-back" icon @click="closeDialog">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <div v-if="value.item" class="post">
          <img :src="value.item.bgImage" :alt="value.item.title" class="bg-image" />
          <div class="item-logo">
            <img :src="value.item.logo" />
          </div>
          <div class="item-title">{{value.item.title}}</div>
          <div class="item-stage">
            Stage:
            <span>{{value.item.stage}}</span>
          </div>

          <v-divider></v-divider>

          <v-layout class="item-info" column>
            <div class="location">
              <div class="top-line">Location</div>
              <div class="bottom-line">{{value.item.location}}</div>
            </div>
            <div class="website">
              <div class="top-line">Website</div>
              <div class="bottom-line">{{value.item.website}}</div>
            </div>
            <div class="employees">
              <div class="top-line">Employees</div>
              <div class="bottom-line">{{value.item.numberOfEmployers}}</div>
            </div>
            <div class="industry">
              <div class="top-line">Industry</div>
              <div
                class="bottom-line"
                v-if="!Array.isArray(value.item.industry)"
              >{{value.item.industry}}</div>
              <div class="bottom-line" v-else>{{value.item.industry.join(', ')}}</div>
            </div>
          </v-layout>

          <v-divider></v-divider>

          <div class="content">
            <div v-if="value.item.content.about">
              <div class="paragraph-title">About us</div>
              <div class="paragraph-text">{{value.item.content.about}}</div>
            </div>
            <img
              v-if="value.item.companyImage"
              v-bind:src="value.item.companyImage"
              alt="company-image"
            />
            <div v-if="value.item.content.difference">
              <div class="paragraph-title">Make a difference</div>
              <div
                class="paragraph-text"
                v-if="!Array.isArray(value.item.content.difference)"
              >{{value.item.content.difference}}</div>
              <div class="paragraph-text" v-else>
                <p v-for="item in value.item.content.difference" v-bind:key="item">{{item}}</p>
              </div>
            </div>

            <v-divider></v-divider>

            <div class="message" v-if="value.item.content.contact">
              <div class="paragraph-title">Get in touch</div>
              <div
                class="paragraph-text"
                v-if="value.item.content.contact.message"
              >"{{value.item.content.contact.message}}"</div>
              <img
                class="avatar"
                v-if="value.item.content.contact.avatar"
                v-bind:src="value.item.content.contact.avatar"
              />
              <v-flex class="website" v-if="value.item.website">
                <v-btn
                  depressed
                  :href="value.item.website"
                  class="info-button website"
                  target="_blank"
                >Visit website</v-btn>
              </v-flex>
              <v-flex class="telephone" v-if="value.item.content.contact.phone">
                <v-btn
                  depressed
                  :href="`tel:${value.item.content.contact.phone}`"
                  class="info-button telephone"
                >Call {{value.item.content.contact.name}}</v-btn>
              </v-flex>
              <v-flex class="email" v-if="value.item.content.contact.email">
                <v-btn
                  depressed
                  :href="`mailto:${value.item.content.contact.email}`"
                  class="info-button email"
                >Write to {{value.item.content.contact.name}}</v-btn>
              </v-flex>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-if="!$store.ismobile"
      v-model="value.active"
      class="info-event-dialog-wrapper"
      max-width="800"
    >
      <v-card v-if="value.active" class="info-dialog-content">
        <a class="close-button fas fa-times" @click="closeDialog"></a>

        <div v-if="value.item" class="post">
          <img :src="value.item.bgImage" :alt="value.item.title" class="bg-image" />
          <div class="item-logo">
            <img :src="value.item.logo" />
          </div>
          <div class="item-title">{{value.item.title}}</div>
          <div class="item-stage">
            Stage:
            <span>{{value.item.stage}}</span>
          </div>

          <v-divider></v-divider>

          <v-layout class="item-info" row justify-space-around>
            <div class="location">
              <div class="top-line">Location</div>
              <div class="bottom-line">{{value.item.location}}</div>
            </div>
            <div class="website">
              <div class="top-line">Website</div>
              <div class="bottom-line">{{value.item.website}}</div>
            </div>
            <div class="employees">
              <div class="top-line">Employees</div>
              <div class="bottom-line">{{value.item.numberOfEmployers}}</div>
            </div>
            <div class="industry">
              <div class="top-line">Industry</div>
              <div
                class="bottom-line"
                v-if="!Array.isArray(value.item.industry)"
              >{{value.item.industry}}</div>
              <div class="bottom-line" v-else>{{value.item.industry.join(', ')}}</div>
            </div>
          </v-layout>

          <v-divider></v-divider>

          <div class="content">
            <div v-if="value.item.content.about">
              <div class="paragraph-title">About us</div>
              <div class="paragraph-text">{{value.item.content.about}}</div>
            </div>
            <img
              v-if="value.item.companyImage"
              v-bind:src="value.item.companyImage"
              alt="company=image"
            />
            <div v-if="value.item.content.difference">
              <div class="paragraph-title">Make a difference</div>
              <div
                class="paragraph-text"
                v-if="!Array.isArray(value.item.content.difference)"
              >{{value.item.content.difference}}</div>
              <div class="paragraph-text" v-else>
                <p v-for="item in value.item.content.difference" v-bind:key="item">{{item}}</p>
              </div>
            </div>

            <v-divider></v-divider>

            <div class="message" v-if="value.item.content.contact">
              <div class="paragraph-title">Get in touch</div>
              <div
                class="paragraph-text"
                v-if="value.item.content.contact.message"
              >"{{value.item.content.contact.message}}"</div>
              <img
                class="avatar"
                v-if="value.item.content.contact.avatar"
                v-bind:src="value.item.content.contact.avatar"
              />
              <v-flex class="website" v-if="value.item.website">
                <v-btn
                  depressed
                  :href="value.item.website"
                  class="info-button website"
                  target="_blank"
                >Visit website</v-btn>
              </v-flex>
              <v-flex class="telephone" v-if="value.item.content.contact.phone">
                <v-btn
                  depressed
                  :href="`tel:${value.item.content.contact.phone}`"
                  class="info-button telephone"
                >Call {{value.item.content.contact.phone}}</v-btn>
              </v-flex>
              <v-flex class="email" v-if="value.item.content.contact.email">
                <v-btn
                  depressed
                  :href="`mailto:${value.item.content.contact.email}`"
                  class="info-button email"
                >Write to {{value.item.content.contact.name}}</v-btn>
              </v-flex>
            </div>

            <v-divider></v-divider>

            <div>
              <div class="paragraph-title">Positions available</div>

              <swiper :options="swiperOption" class="jobs">
                <swiper-slide v-for="job in value.item.jobs" :key="job.title" class="job">
                  <img v-bind:src="value.item.logo" alt="logo" />
                  <div class="description">
                    <div class="jobs-title">{{job.title}}</div>
                    <div class="jobs-type">{{job.type}}</div>
                    <div class="jobs-location">{{job.location}}</div>
                  </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Mark from "mark.js";
import FeedItemMixins from "../../../mixins/FeedElementMixins";
import SaveButton from "../FeedElementDialogSaveButton";
import { daysOfTheWeek } from "../config";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  props: ["value"],
  components: {
    SaveButton,
    daysOfTheWeek,
    swiper,
    swiperSlide
  },
  mixins: [FeedItemMixins],
  watch: {
    "value.active": function() {
      if (this.value.active === true) {
        // dialog opened
        console.log({ value: this.value.item });
      }
    }
  },
  data: () => {
    return {
      item: {
        isFavourite: true
      },
      daysOfTheWeek,
      swiperOption: {
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
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
@import "../../../assets/cocup-ui.scss";

.post {
  max-height: 80vh;
  padding-bottom: 40px;
  overflow-y: scroll;
  box-shadow: none;
  text-align: center;

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
  .bg-image {
    width: 100%;
    height: 392px;
  }
  .item-logo {
    margin-top: -72px;
    color: #474747;

    img {
      height: 144px;
      width: 144px;
      border-radius: 5px;
      box-shadow: 0px 2px 4px 1px rgb(180, 179, 180);
      background-color: #ffffff;
    }
  }
  .item-title {
    font-size: 20px;
    font-weight: 600;
  }
  .item-stage {
    font-size: 12px;
    font-weight: bold;

    span {
      font-weight: 500;
    }
  }
  .item-info {
    font-size: 12px;
    font-weight: 500;
    text-align: start;

    .location {
      background: url("../../../assets/icons/location-transparent.svg") -8px -22px no-repeat;
      background-size: 45px 82px;
      padding-left: 25px;
    }
    .website {
      background: url("../../../assets/icons/globe-transparent.svg") -23px -36px
        no-repeat;
      background-size: 76px 133px;
      padding-left: 30px;
    }
    .employees {
      background: url("../../../assets/icons/people-transparent.svg") 0 -14px no-repeat;
      background-size: 34px 72px;
      padding-left: 36px;
    }
    .industry {
      background: url("../../../assets/icons/industry-transparent.svg") -4px 0 no-repeat;
      background-size: 29px 41px;
      padding-left: 28px;

      .bottom-line {
        text-transform: capitalize;
      }
    }
    .top-line {
      font-weight: bold;
    }
  }
  .content {
    padding: 0 40px;
    text-align: left;

    .paragraph-title {
      font-size: 16px;
      font-weight: 600;
      text-align: left;
    }
    .paragraph-text {
      font-size: 13px;
      font-weight: 400;
      line-height: 16px;
    }

    ul.paragraph-text {
      list-style: none;
      padding-left: 0;
    }

    img {
      width: 100%;
      height: 400px;
      margin: 20px 0;

      &.avatar {
        width: 125px;
        height: 125px;
        margin: 0;
        border-radius: 70px;
      }
    }

    .message {
      text-align: center;

      .info-button {
        width: 184px;
        background-color: #00d8a5 !important;
        color: $text-color-light;
        font-size: 12px;
        border-radius: 20px;
        padding-left: 30px;
        text-transform: none;

        &.website {
          background: url("../../../assets/icons/globe.svg") 0px -19px no-repeat;
          background-size: 57px 94px;
        }
        &.email {
          background: url("../../../assets/icons/email.svg") 16px -2px no-repeat;
          background-size: 19px 46px;
        }
        &.telephone {
          background: url("../../../assets/icons/phone.svg") -7px -26px
            no-repeat;
          background-size: 67px 99px;
        }
      }
    }

    .jobs {
      padding: 2px 0 0 2px;
      overflow: hidden;

      .job {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        box-shadow: 0px 2px 4px 1px rgb(180, 179, 180);
        border-radius: 10px;
        min-height: 96px;
        margin: 0 20px 10px 0;

        img {
          width: 64px !important;
          height: 64px !important;
          border-radius: 5px;
          box-shadow: 0px 2px 4px 1px rgb(180, 179, 180);
          background-color: #ffffff;
          margin: 0 0 0 10px;
        }

        .description {
          display: block;
          margin: 0 15px;

          .jobs-title {
            font-size: 14px;
            font-weight: 600px;
            line-height: 18px;
            height: 40px;
            overflow: hidden;
          }
          .jobs-type {
            font-size: 11px;
            font-weight: bold;
            opacity: 0.6;
          }
          .jobs-location {
            font-size: 11px;
          }
        }
      }
    }
  }
}

.v-dialog__content {
  align-items: start;
  margin-top: 65px;
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
}

.v-divider {
  margin: 20px 0;
}

// .info-event-dialog-wrapper {
//   border-radius: 25px;
//   height: 80vh;
// }

.mobile .v-dialog__content {
  align-items: start;
  margin-top: 0;
}
.mobile-companies-dialog {
  width: 100%;

  .info-dialog-content {
    position: relative;

    .arrow-back {
      position: fixed;
      top: 0;
      left: 0;
      color: $color-gray-background;
      font-size: 40px;
      z-index: 2;
    }
    .post {
      max-height: unset;

      .bg-image {
        width: 100%;
        height: 112px;
      }

      .item-logo {
        margin-top: -20px;

        img {
          height: 120px;
          width: 120px;
        }
      }
      .item-info {
        margin-left: 30%;

        .location,
        .website,
        .employees,
        .industry {
          padding-left: 38px;
          margin-bottom: 10px;
        }
      }
      .content {
        padding: 0 20px;

        .paragraph-title {
          font-size: 20px;
          font-weight: bold;
        }
        .paragraph-text {
          text-align: justify;
        }
      }
      img {
        height: 246px;

        &.avatar{
          height: 125px;
          width: 125px;
        }
      }
    }
  }
}

</style>


<style lang="scss">
.mobile-companies-dialog.v-dialog {
  margin: 0 !important;
}
.mobile-companies-dialog.v-dialog:not(.v-dialog--fullscreen) {
  max-height: calc(100% - 56px) !important;
}

.v-dialog.info-event-dialog-wrapper {
  margin-top: 100px !important;
}
</style>
