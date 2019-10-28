<template>
  <v-container>
    <v-layout align-center justify-center row wrap>
      <v-flex xs12 class="top">
        <h1>Share the love</h1>
        <h1>& get a coffee!</h1>
      </v-flex>
      <v-flex xs12 class="animation">
        <v-badge right color="#ff4f01">
          <v-btn
            absolute
            top
            right
            class="notification"
            @click="showHideMessage"
            width="16"
            height="16"
            color="#ff4f01"
            ref="notification"
          >i</v-btn>
          <transition name="fadeMessage">
            <span
              class="share-message"
              v-show="isMessageShown"
              ref="shareMessage"
            >something very big and very very good</span>
          </transition>
        </v-badge>
        <div class="cup">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="200.000000pt"
            height="200.000000pt"
            viewBox="0 0 200.000000 200.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,200.000000) scale(0.100000,-0.100000)"
              fill="#000000"
              stroke="none"
            >
              <path
                d="M547 1703 c-3 -5 -13 -36 -22 -70 -15 -54 -21 -62 -44 -65 -25 -3
-26 -5 -29 -75 l-3 -73 30 0 c24 0 32 -5 36 -22 2 -13 36 -243 75 -513 39
-269 73 -502 76 -517 l6 -28 328 0 328 0 6 28 c3 15 37 248 76 517 39 270 72
500 75 512 3 13 14 23 28 25 20 3 22 8 22 73 0 65 -2 70 -22 73 -17 3 -25 14
-33 45 -6 23 -15 53 -19 67 l-8 25 -451 3 c-248 1 -453 -1 -455 -5z m873 -35
c0 -2 7 -24 15 -50 l14 -48 -449 0 -448 0 9 38 c6 20 12 43 14 50 3 9 97 12
425 12 231 0 420 -1 420 -2z m80 -173 l0 -35 -505 0 -505 0 0 35 0 35 505 0
505 0 0 -35z m-60 -97 c-1 -13 -33 -246 -73 -518 l-72 -495 -295 0 -295 0 -72
490 c-39 270 -72 502 -72 518 l-1 27 440 0 440 0 0 -22z"
              />
            </g>
          </svg>
        </div>
        <div class="count" id="value"></div>
        <!-- <div class="count">%</div> -->
        
      </v-flex>

      <v-flex xs12 class="invited">
        <p class="text-xs-center">
          <span id="numberOfRefers"></span> /
          <span id="level"></span> people invited!
        </p>
      </v-flex>

      <v-flex xs12 class="bottom-message">
        <p>
          Share Carreer2go with your friends and get a free coffee when they complete the sign-up with your referal
          link!
        </p>
      </v-flex>

      <v-flex xs12 class="text-xs-center">
        <v-btn class="btn mt-3" @click="clickOnTheButton">SHARE THE LINK</v-btn>
      </v-flex>

      <v-flex xs12 class="text-xs-center bottom">
        <transition name="fade">
          <a class="copied-text" v-show="!isLinkCopied" @click="clickOnTheLink">
            {{referenceLink}}
            <v-icon left small>fas fa-copy</v-icon>
          </a>
        </transition>
        <transition name="fade">
          <span v-show="isLinkCopied" class="copied-text">Link was copied to the clipboard</span>
        </transition>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data: function() {
    return {
      isLinkCopied: false,
      isMessageShown: false
    };
  },
  created() {
    // disable message when click on the outside field of message
    let self = this;
    window.addEventListener("click", self.hidePopup);
  },
  computed: {
    referenceLink: function() {
      return `${location.origin}/${
        this.$router.resolve({
          path: "/form",
          query: { ref: this.$store.state.user.referralCode }
        }).href
      }`;
    }
  },
  mounted() {
    var numberOfRefers = 1;
    var level = 3;
    document.getElementById("level").innerHTML = level;
    document.getElementById("numberOfRefers").innerHTML = numberOfRefers;
    const percentCurrent = ((numberOfRefers * 100) / level).toFixed(0);
    this.animateValue("value", 0, percentCurrent, 1500);
  },
  destroyed() {
    let self = this;
    window.removeEventListener("click", self.hidePopup);
  },
  methods: {
    hidePopup(e){
      if (!this.$refs.shareMessage.contains(e.target) &&
        !this.$refs.notification.$el.contains(e.target)
      ) {
        this.isMessageShown = false;
      }
    },
    animateValue(id, start, end, duration) {
      var range = end - start;
      var current = start;
      var increment = end > start ? 1 : -1;
      var stepTime = Math.abs(Math.floor(duration / range));
      var obj = document.getElementById(id);
      var timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current + '%';
        if (current == end) {
          clearInterval(timer);
        }
      }, stepTime);
    },
    showHideMessage() {
      this.isMessageShown = !this.isMessageShown;
    },
    clickOnTheLink() {
      this.showHideShortMessage();
      this.copy();
    },
    clickOnTheButton() {
      this.copy();
      this.showShareWindow();
    },
    copy() {
      this.copyToClipboard(this.referenceLink);
    },
    copyToClipboard(val) {
      const el = document.createElement("textarea");
      el.value = val;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    },
    showHideShortMessage() {
      this.isLinkCopied = !this.isLinkCopied;

      setTimeout(() => {
        this.isLinkCopied = !this.isLinkCopied;
      }, 2000);
    },
    showShareWindow() {
      if (navigator.share) {
        navigator
          .share({
            title: "WebShare API Demo",
            url: this.referenceLink
          })
          .then(() => {
            console.log("Thanks for sharing!");
          })
          .catch(console.error);
      } 
    }
  }
};
</script>

<style lang="scss" scoped>

.container {
  height: calc(100vh - 56px - 50px);
  //padding: 16px 16px 0;
  //height: 100vh;
}

.layout {
  //height: 80vh;
  height: 100%;
}

.top {
  text-align: center;
  // margin-top: 5% !important;
  font-size: 0.7em;
}

.animation {
  //height: 47vh;
  //margin-top: -25px;
  text-align: center;
  position: relative;

  .v-badge {
    position: absolute;

    .v-btn.notification {
      top: 36px;
      right: -66px;
      font-size: 10px !important;
      line-height: 10px;
      height: 16px;
      min-width: unset;
      width: 16px;
      padding: 1px 2px 0 0;
      border-radius: 10px;
      font-style: italic;
      color: white;
      text-align: center;
      z-index: 3;
    }

    .share-message {
      position: absolute;
      top: 15px;
      right: -45px;
      background-color: #ff4f01;
      padding: 10px 20px;
      border-radius: 10px;
      min-width: 150px;
      color: white;

      &::after {
        content: "";
        opacity: 1;
        position: absolute;
        right: -6px;
        top: 20px;
        border-radius: unset;
        border-color: transparent transparent transparent #ff4f01;
        border-style: solid;
        border-width: 7px 0 7px 7px;
      }
    }
  }

  .fadeMessage-enter,
  .fadeMessage-leave-to {
    opacity: 0;
  }

  .fadeMessage-enter-to,
  .fadeMessage-leave {
    opacity: 1;
  }

  .fadeMessage-enter-active {
    transition: opacity 0.5s ease;
  }

  .fadeMessage-leave-active {
    transition: opacity 0.2s;
  }

  .cup {
    position: relative;
    //height: 47vh;
  }

  .count {
    position: absolute;
    bottom: 25%;
    left: 50%;
    transform: translateX(-50%);
    display: inline;
    align-items: center;
    font-size: 30px;
    text-align: left;
    justify-content: center;
  }
}

.invited {
  font-weight: bold;
  //margin-top: -70px;

  p{
    margin-bottom: 0;
  }
}

.bottom-message {
  //margin: -20px 1.3rem 0 1.3rem;
  text-align: center;
  font-size: 0.86rem;
  font-style: italic;

  p {
    margin: 0;
  }
}

.btn {
  background-color: #2ad46e !important;
  width: 60%;
  color: white;
  border-radius: 20px;
  //height: 50px;
  font-weight: bold;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave-active {
  transition: opacity 0s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.copied-text {
  color: #7d91ad;

  .v-icon {
    color: #7d91ad;
  }

  .v-icon--left {
    margin-right: unset;
  }
}

.v-btn__content.notification {
  padding-right: 1px;
}

.bottom {
  //min-height: 8vh;
  //margin-bottom: 50px;
}


@media (device-height : 568px) 
   and (device-width : 320px) 
   and (-webkit-min-device-pixel-ratio: 2),
   only screen and (max-device-width: 330px)
   {
     .animation{
       margin-top: -30px;
     }
     .invited{
       margin-top: -50px;
     }
     .bottom-message {
       margin-top: -10px;
     }
   }

// @media only screen and (max-device-width: 330px){
//      .animation{
//        margin-top: -30px;
//      }
//      .invited{
//        margin-top: -50px;
//      }
//      .bottom-message {
//        margin-top: -10px;
//      }
//    }
</style>

