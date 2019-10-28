<template>
    <v-card>
        <v-container class="gray-background">
            <v-layout row>
                <v-flex md6>
                    <v-text-field label="Number of job opportunities" box v-model="params.jobPositions" required></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex md6>
                    <v-text-field label="Text on button" v-model="params.button.text" box required></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex md12>
                    <v-text-field label="Link" v-model="params.button.link" box required></v-text-field>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
export default {
  props: ['params']
}
</script>
