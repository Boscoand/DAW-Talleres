<template>
  <!-- <div class="hello"> -->
    <v-container text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card dark color="primary">
            <v-card-text class="px-0">FLYING</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-card flat>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs6>
              <v-subheader>Origen</v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-select
                v-model="origenSeleccionado"
                label="Seleccionar origen"
                v-bind:items="paises"
                single-line
                bottom
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card flat>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <!-- Destino -->
            <v-flex xs6>
              <v-subheader>Destino</v-subheader>
            </v-flex>
            <v-flex xs6>
              <v-select
                v-model="destinoSeleccionado"
                label="Seleccionar destino"
                v-bind:items="paises"
                single-line
                bottom
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-text>
        <v-container>
          <v-layout>
            <v-flex xs12>
              <!-- Escala -->
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
    </v-card>

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
  <!-- </div> -->
</template>

<script>
import obtenerPaises from '@/services/obtenerPaises'
import obtenerRutas from '@/services/obtenerRutas'
export default {
  data () {
    return {
      paises: [],
      opciones: ['Vuelo directo', 'Vuelo con escalas'],
      opcionSeleccionada: '',
      origenSeleccionado: null,
      destinoSeleccionado: null,
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
      items: []
    }
  },
  created: async function () {
    var response = await obtenerPaises.obtenerPaises()
    for (var i = 0; i < response.data.length; i++) {
      this.paises.push(response.data[i])
    }
    this.paises.sort()
  },
  methods: {
    async obtenerRutas () {
      // Ĺimpiar tabla de rutas
      this.items = []
      // Obtener sin usuario desea vuelo con escala
      var escala = 0
      if (this.opcionSeleccionada === 'Vuelo con escalas') {
        escala = 1
      }
      // Se hace la petición al servidor
      var response = await obtenerRutas.obtenerRutas(this.origenSeleccionado, this.destinoSeleccionado, escala)
      // Se anaden los datos devueltos por el servidor a la interfaz
      for (var i = 0; i < response.data.length; i++) {
        this.items.push({
          aerolinea: response.data[i].aerolinea[0].name,
          origen: response.data[i].aeropuertoOrigen[0].city + ', ' + response.data[i].aeropuertoOrigen[0].country,
          destino: response.data[i].aeropuertoDestino[0].city + ', ' + response.data[i].aeropuertoDestino[0].country,
          paradas: response.data[i].stops
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
