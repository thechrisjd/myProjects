<template>
    <v-btn round small color="white" @click="toggleFavorite" >
        <v-icon left small :color="isFavorite ? 'red darken-1' : 'grey' " >fa fa-bookmark</v-icon>
        Save
    </v-btn>
</template>

<script>
//import FeedElement from './FeedElement'
//import FeedElementDialog from './FeedElementDialog'

export default {

    props: ['campaignId'],
    components:{},
    data: function(){
        return{   
        }
    },
    computed: {
        
        isFavorite(){
            const favorites = this.$store.state.studentInfo.favorites
            console.log(favorites)
            return favorites.includes(this.campaignId)
        }
    },
    methods: {
        toggleFavorite() {
            
            //const favorites = this.$store.state.studentInfo.favorites
            // if the campaign is not in favorites
            if(!this.isFavorite){
                return this.$store.commit('setFavorite', this.campaignId)
                
             }else{ // if it exists in favorites
                return this.$store.commit('removeFavorite', this.campaignId)
            } 
        },
        
    }
}
</script>

