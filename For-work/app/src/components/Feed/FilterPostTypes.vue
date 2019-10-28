<template>
  <div>
    <v-container class="hidden-sm-and-up">
      <v-layout
        align-end
        justify-end
        row
        fill-height
        class="mb-1"
        v-for="item in postTypesData"
        v-bind:key="item.key"
      >
        <v-flex xs1 class="mr-3">
          <v-icon>{{item.icon}}</v-icon>
        </v-flex>
        <v-flex xs9 class="subheading font-weight-light">{{item.text}}</v-flex>
        <v-flex xs2>
          <v-checkbox v-model="postTypes" :value="item.key" color="grey"></v-checkbox>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container class="hidden-xs-only">
      <v-layout row fill-height class="post-menu" justify-center >
        <!-- align-end
        column
        
        
        v-for="item in postTypesData"
        v-bind:key="item.key"
        v-bind:class="{ active: postTypes.includes(`${item.key}`)}"
        >-->
        <!-- <v-flex class="icon mr-1">
          <v-icon>{{item.icon}}</v-icon>
        </v-flex>-->
        <v-flex class="checkboxes">
          <label
            v-for="item in postTypesData"
            v-bind:key="item.key"
            v-bind:class="{ active: postTypes.includes(`${item.key}`)}"
          >
            <img :src="getImgUrl(item.img)" alt="item.text"/>
            <p>{{item.text}}</p>
            <input
              type="checkbox"
              v-model="postTypes"
              v-bind:value="item.key"
              color="grey"
              class="hidden"
            />
          </label>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import EventBus from "../../eventBus";

export default {
  data() {
    return {
      postTypes: []
    };
  },
  watch: {
    // postTypes: function(val, old) {
    //   if (val.length > 1) {
    //     this.postTypes = val.filter(x => !old.includes(x));
    //   }
    //   EventBus.$emit("FILTER_CHANGED", this.postTypes);
    // }
    postTypes: function() {
      EventBus.$emit("FILTER_CHANGED", this.postTypes);
    }
  },
  methods: {
    getImgUrl(pic) {
        return require('../../assets/'+ pic);
    }
  },
  computed: {
    postTypesData: function() {
      return [
        // {
        //   key: "job",
        //   text: "Jobs",
        //   icon: "fas fa-briefcase"
        // },
        // {
        //   key: "event",
        //   text: "Events",
        //   icon: "far fa-calendar-alt"
        // },
        // {
        //   key: "company",
        //   text: "Companies",
        //   icon: "fas fa-building"
        // }
        {
          key: "job",
          text: "Jobs",
          img: "toolbar/Jobs.svg"
        },
        {
          key: "company",
          text: "Companies",
          img: "toolbar/Companies.svg"
        },
        {
          key: "event",
          text: "Events",
          img: "toolbar/Events.svg"
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.layout.post-menu {
  flex: unset;

  // &.active,
  // &:hover {
  //   filter: brightness(0.7);
  // }

  .checkboxes{
    display: flex;
    flex-direction: row;

    label{
      height: 70px;
      font-size: 10px;

      img {
        height: 35px;
      }
    }
  }

  .hidden{
    display: none;
  }
}

.v-input.v-input--selection-controls {
  margin-top: 0;

  &.v-input--checkbox {
    max-height: 29px;
  }
}

.container.hidden-xs-only {
  display: flex;
  padding: 0;
}
</style>

<style lang="scss">
.container.hidden-xs-only {
  .flex.icon {
    flex: unset;
  }

  .v-input.hidden .v-input--selection-controls__input {
    display: none;
  }

  .v-input--selection-controls.v-input .v-label {
    display: block !important;
  }

  .layout.post-menu {
    .v-icon {
      color: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>