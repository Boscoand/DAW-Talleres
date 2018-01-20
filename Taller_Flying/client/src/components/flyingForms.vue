<template>

  <v-container text-xs-center>

    <!-- Titulo -->
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text class="px-0">FLYING</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Nombres -->
    <v-layout mt-4>
      <v-flex xs3 offset-xs1 >
        <v-subheader>Nombres completos</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field v-model="nombres"></v-text-field>
      </v-flex>
    </v-layout>

      
    <!-- Numero de celular -->
    <v-layout>
      <v-flex xs3 offset-xs1>
        <v-subheader>Número celular </v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field v-model="celular"></v-text-field>
      </v-flex>
    </v-layout>

    <!-- Ciudad de partida -->
    <v-layout>
      <v-flex xs3 offset-xs1>
        <v-subheader>Ciudad de partida</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-select
          v-model="origenSeleccionado"
          label="Seleccionar origen"
          v-bind:items="paises"
          single-line
          bottom
        ></v-select>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs3 offset-xs1>
        <v-subheader>Ciudad de llegada</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-select
          v-model="destinoSeleccionado"
          label="Seleccionar destino"
          v-bind:items="paises"
          single-line
          bottom
        ></v-select>
      </v-flex>
    </v-layout>
      
    <!-- Fechas  -->
    <v-layout>
      <v-flex xs5 offset-xs1>
        <v-menu
          lazy
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            label="Fecha de partida"
            v-model="fechaPartida"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="fechaPartida" no-title scrollable actions>
            <template slot-scope="{ save, cancel }">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                <v-btn flat color="primary" @click="save">OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>
      </v-flex>

      <v-flex xs5>
        <v-menu
          lazy
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          max-width="290px"
          min-width="290px"
        >
          <v-text-field
            slot="activator"
            label="Fecha de retorno"
            v-model="fechaRetorno"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="fechaRetorno" no-title scrollable actions>
            <template slot-scope="{ save, cancel }">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                <v-btn flat color="primary" @click="save">OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>

    <!-- Escala -->
    <v-card-text>
      <v-container>
        <v-layout>
          <v-flex xs11 offset-xs1>
            <v-radio-group v-model="opcionSeleccionada" row>
              <v-radio
                v-for="(opcion, i) in opciones"
                :key="i"
                :value="opcion"
                :label="opcion"
              ></v-radio>
            </v-radio-group>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

    <v-card-text>
      <div>
        <v-btn color="primary" v-on:click="obtenerRutas">BUSCAR</v-btn>
      </div>
    </v-card-text>

    <v-data-table
      v-bind:headers="headers"
      :items="items"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props" placeholder="asfasdf">
        <td>{{ props.item.aerolinea }}</td>
        <td class="text-xs-right">{{ props.item.origen }}</td>
        <td class="text-xs-right">{{ props.item.destino }}</td>
        <td class="text-xs-right">{{ props.item.paradas }}</td>
      </template>
      <template slot="no-data">
          Para los paises seleccionados no existen rutas disponibles.
      </template>
    </v-data-table>

  </v-container>
</template>

<script>
import getCities from '@/services/getCities'
import postForm from '@/services/postForm'
export default {
  data () {
    return {
      paises: [],
      opciones: ['Vuelo directo', 'Vuelo con escalas'],
      opcionSeleccionada: '',
      origenSeleccionado: '',
      destinoSeleccionado: '',
      headers: [
        {
          text: 'Aerolinea',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Origen',
          value: 'origen',
          sortable: false
        },
        {
          text: 'Destino',
          value: 'destino',
          sortable: false
        },
        {
          text: 'Paradas',
          value: 'paradas',
          sortable: false
        }
      ],
      items: [],
      nombres: '',
      celular: '',
      fechaPartida: null,
      fechaRetorno: null
    }
  },
  created: async function () {
    var response = await getCities.getCities()
    for (var i = 0; i < response.data.length; i++) {
      if (response.data[i] === '') {
        console.log('espacios')
      } else {
        this.paises.push(response.data[i])
      }
    }
    this.paises.sort()
  },
  methods: {
    async obtenerRutas () {
      console.log(this.nombres)
      console.log(this.celular)
      var response = await postForm.postForm({
        nombre: this.nombres,
        celular: this.celular
      })
      console.log(response)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
