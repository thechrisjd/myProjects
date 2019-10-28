<template>
  <v-toolbar prominent>
    <v-toolbar-title>
      <v-btn flat to="/" text class="desktop-logo"> 
        <img src="../../assets/logo/Logo+Logotype_one line.svg" alt="logo" />
      </v-btn>
    </v-toolbar-title>    
    <search-field label="Search for a job..." class="search-job"></search-field>
    <div class="flex-grow-1"></div>
    <!-- <filter-post-types></filter-post-types> -->
    <v-toolbar-items class="toolbar-buttons">
      <v-btn class="jobs" flat to="/">
        Jobs
      </v-btn>
      <v-btn class="companies" flat to="/companies">
        Companies
      </v-btn>
      <v-btn class="events" flat to="/events">
        Events
      </v-btn>
      <v-btn class="coffee-tickets" flat to="/coffee">
        Coffee tickets
      </v-btn>
      <v-btn class="notification">
        Notifications
      </v-btn>
      <v-btn class="profile">
        <profile-avatar></profile-avatar>
        <p class="profile-avatar">Profile</p>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import ProfileAvatar from "../Profile/ProfileAvatar";
import SearchField from "./SearchField";
//import FilterPostTypes from "../Feed/FilterPostTypes";

export default {
  components: {
    ProfileAvatar,
    SearchField,
    //FilterPostTypes
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>

@import "../../assets/cocup-ui.scss";
.v-toolbar {
  position: fixed;
  top: 0;
  z-index: 3;
  background-color: #fff;  

  :after{
    display: none;
    content: url("../../assets/toolbar/JobsActive.svg") 
            url("../../assets/toolbar/EventsActive.svg")
            url("../../assets/toolbar/CompaniesActive.svg")  
            url("../../assets/toolbar/CoffeeTicketsActive.svg")  
            url("../../assets/toolbar/NotificationActive.svg")    

  }

  .v-toolbar__title {
      flex-shrink: 0;
      img{
        max-height: 100px;
        padding: 5px 0 0;
      }
  }

  .v-toolbar__items {  
    .v-btn{
      border-radius: unset;
      border-bottom: 2px solid transparent;
      &:hover{
        border-bottom: 2px solid #939393;
        filter: brightness(0.7);
      }
    }

    .jobs{
      background: url("../../assets/toolbar/Jobs.svg") center 7px no-repeat;
      background-size: 58% 58%;
      padding-top: 30px;
      transition: none !important;
      &:hover{
        background: url("../../assets/toolbar/JobsActive.svg") center 7px no-repeat;
        background-size: 58% 58%;
      }
    }

    .companies{
      background: url("../../assets/toolbar/Companies.svg") center 8px no-repeat;
      background-size: 55% 55%;
      padding-top: 30px;
      transition: none !important;
      &:hover{
        background: url("../../assets/toolbar/CompaniesActive.svg") center 8px no-repeat;
        background-size: 55% 55%;
      }
    }

    .events{
      background: url("../../assets/toolbar/Events.svg") center 12px no-repeat;
      background-size: 50% 50%;
      padding-top: 30px;
      transition: none !important;
      &:hover{
        background: url("../../assets/toolbar/EventsActive.svg") center 12px no-repeat;
        background-size: 50% 50%;
      }
    }

    .coffee-tickets{
      background: url("../../assets/toolbar/CoffeeTickets.svg") center 8px no-repeat;
      background-size: 50% 52%;
      padding-top: 30px;
      transition: none !important;
      &:hover{
        background: url("../../assets/toolbar/CoffeeTicketsActive.svg") center 8px no-repeat;
        background-size: 50% 52%;
      }
    }

    .notification{
      background: url("../../assets/toolbar/Notification.svg") center 11px no-repeat;
      background-size: 50% 50%;
      padding-top: 30px;
      transition: none !important;
      &:hover{
        background: url("../../assets/toolbar/NotificationActive.svg") center 11px no-repeat;
        background-size: 50% 50%;
      }
    }
    .profile{
      padding-top: 8px;
      background-color: unset;

      p.profile-avatar{
        margin-top: -7px;
      }
    }    
  }

  .v-btn:not(.v-btn--depressed):not(.v-btn--flat) {
    will-change: unset;
    -webkit-box-shadow: unset;
    box-shadow: unset;
  }
}
.theme--light.v-btn {
  color: rgba(0, 0, 0, 0.2) !important;
}

.flex-grow-1 {
  flex-grow: 1 !important;
}
</style>

<style lang="scss">
.desktop-logo{
  &.v-btn--active:before, .v-btn:hover:before, .v-btn:focus:before{
    background-color: unset;
  }
  .v-ripple__container{
    background-color: unset;
  }
}

.v-autocomplete.v-input.search-job {
  max-width: 300px;
  min-width: 150px;
  padding-top: 8px;
  z-index: 1;

  label{
    left: 35px !important;
    font-size: 13px;
  }

  &.v-text-field input {
    padding: 5px 16px;
    font-size: 13px;
  }

  .v-icon.v-icon.v-icon--link{
    display: none;
  }

  .v-input__control .v-input__slot {
    z-index: 1;
    background-color: #f1f1f1;
    border-radius: 3px;

    &:before,
    &:after{
      border-style: none;
    }

    .v-select__slot{
      padding-left: 20px;
      background: url('../../assets/toolbar/Search.svg') 10px 5px no-repeat;
    }
  }
}

.toolbar-buttons {  
  .v-btn__content{
    font-size: 12px;
    color: #939393;
  }

  .v-btn{
    text-transform: unset;
  }

  .v-btn__content{
    flex-direction: column;  
  }

  .v-toolbar__content {
    padding: 0 !important;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
</style>