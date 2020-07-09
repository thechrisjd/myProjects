<template>
<div>
  <div v-if="feedCompaniesItemData && $store.ismobile" class="companies-mobile post" 
      v-bind:style="{ backgroundImage: `url(${feedCompaniesItemData.bgImage})` }">
    <div class="item-logo">
      <img :src="feedCompaniesItemData.logo" />
    </div>
    <div class="item-info">
      <div class="location">{{feedCompaniesItemData.location}}</div>
      <div class="amount-employers">{{feedCompaniesItemData.numberOfEmployers}}+ employees</div>
    </div>
    <div class="item-title">{{feedCompaniesItemData.title}}</div>
    <div class="item-slogan">{{feedCompaniesItemData.slogan}}</div>
    <div class="item-available">{{feedCompaniesItemData.available}} jobs available</div> 
  </div>
  <div v-if="feedCompaniesItemData && !$store.ismobile" class="companies-desktop post" 
      v-bind:style="{ backgroundImage: `url(${feedCompaniesItemData.bgImage})` }">
    <div class="item-logo">
      <img :src="feedCompaniesItemData.logo" />
    </div>
    <div class="item-info">
      <div class="location">{{feedCompaniesItemData.location}}</div>
      <div class="amount-employers">{{feedCompaniesItemData.numberOfEmployers}}+ employees</div>
    </div>
    <div class="item-title">{{feedCompaniesItemData.title}}</div>
    <div class="item-slogan">{{feedCompaniesItemData.slogan}}</div>
    <div class="item-available">{{feedCompaniesItemData.available}} jobs available</div> 
  </div>
</div>
</template>

<script>
import IconInfoBox from "../FeedElementInfoSlot";
import FeedItemMixin from "../../../mixins/FeedElementMixins";
import { daysOfTheWeek } from "../config";

export default {
  props: ["feedCompaniesItemData"],
  mixins: [FeedItemMixin],
  components: {
    daysOfTheWeek
  },
  data: () => {
    return {
      daysOfTheWeek
    }    
  },
  computed: {
    getDayOfTheWeek: function() {
      let self = this;
      let date = new Date(`${self.feedCompaniesItemData.preferences.duration.startMonth} ${self.feedCompaniesItemData.preferences.duration.startDay}`);
      let eventDay = this.daysOfTheWeek[date.getDay()];
      return eventDay;
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/cocup-ui.scss";

  .post{
    background-size: 100% 104px;
    background-color: white;
    border-radius: 6px;
    color: $text-color;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 4px 1px rgb(180, 179, 180);
    align-items: center;
    position: relative;

    .item-logo {
      margin-top: 20px;
      background-color: #eeeeee; 
      box-shadow: 0px 2px 4px 1px rgb(180, 179, 180);
      border-radius: 6px;
      width: 104px;
      height: 104px;
    }
    .item-info {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      height: 40px;
      font-size: 11px;
      font-weight: 500;
      padding: 0 10px;
      margin-top: -5px;

      .location {
        background: url(../../../assets/icons/location.svg) 50% top no-repeat;
        background-size: 16px;
        padding-top: 25px;
      }
      .amount-employers {
        padding-top: 25px;        
        background: url(../../../assets/toolbar/People.svg) 50% top no-repeat;   
        background-size: 28px;     
      }
    }
    .item-title{
      font-size: 20px;
      font-weight: bold;
    }
    .item-slogan{
      width: 200px;
      text-align: center;
      font-size: 14px;
      color:#0119FF;
      font-weight: 600;
    }
    .item-available{
      position: absolute;
      bottom: 40px;
      font-size: 11px;
      font-weight: 600;
      color:#0119FF;
    }

  
  .links{
    position: absolute;
    bottom: 15px;
    display: flex;
    flex-flow: row nowrap;

    a{
      width:8px;
      height:8px;
      background-color: white;
      border: 1px solid $text-color;
      border-radius: 8px;
      margin-right: 5px;

      &.active,
      &:hover{
        background-color: $text-color;
      }
    }
  }
    
    &.companies-desktop {
      height: 344px;
      width: 344px;  
      margin-bottom: 25px;
    }

    &.companies-mobile {
      width: 100%;
      height: 344px;
      margin-bottom: 25px;
    }
  }  
</style>
