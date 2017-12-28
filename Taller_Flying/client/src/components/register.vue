<template>
  <!-- <div> -->
    <!-- <h1>Register</h1>

    <input 
      type="email" 
      name="email"
      placeholder="email"
      v-model="email" />
    <br>
    <input 
      type="password" 
      name="password"
      placeholder="password"
      v-model="password" />
    <br>
    <button @click="register">Register</button> -->

    <!-- <h2>Origen :</h2> -->
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs3>
          <v-subheader>Origen  :</v-subheader>
        </v-flex>
        <v-flex xs3>
          <v-select
            v-bind:items="origen"
            v-model="origen_select"
            label="Select"
            single-line
            bottom
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs3>
          <v-subheader>Destino :</v-subheader>
        </v-flex>
        <v-flex xs3>
          <v-select
            v-bind:items="destino"
            v-model="dest_select"
            label="Select"
            single-line
            bottom
          ></v-select>
        </v-flex>
      </v-layout>
      
      <v-layout row wrap>
        <v-flex xs6>
          <v-btn color="primary" v-on:click="register">BUSCAR</v-btn>
        </v-flex>
      </v-layout>

    </v-container>
    <!-- <h2>Destino :</h2> -->

  <!-- </div> -->
</template>

<script>
// import AuthenticationService from '@/services/AuthenticationService'
import GetCountries from '@/services/GetCountries'
export default {
  data () {
    return {
      email: 'asd',
      password: 'asdas',
      origen: [],
      destino: [],
      origen_select: null,
      dest_select: null
    }
  },
  methods: {
    async register () {
      // var response = await AuthenticationService.register({
      //   email: this.email,
      //   password: this.password
      // })
      // this.origin.push(response.data)
      var response = await GetCountries.countries()
      this.origen.push(response.data.message)
      console.log(this.origen)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
