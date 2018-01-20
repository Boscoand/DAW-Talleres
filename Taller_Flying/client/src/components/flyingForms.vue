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


      <v-card color="grey lighten-4" flat>
        <v-card-text>
          <v-container fluid>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Nombres completos</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                v-model="nombres"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>

      <v-card color="grey lighten-4" flat>
        <v-card-text>
          <v-container fluid>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Número celular </v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                v-model="celular"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>

      <!-- <v-layout row wrap>
        <v-flex xs11 sm5>
          <v-menu
            lazy
            :close-on-content-click="false"
            v-model="menu"
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
              v-model="date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="date" no-title scrollable actions>
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

      <v-layout row wrap>
        <v-flex xs11 sm5>
          <v-menu
            lazy
            :close-on-content-click="false"
            v-model="menu"
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
              v-model="date"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="date" no-title scrollable actions>
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
      </v-layout> -->

      <v-card flat>
      <v-card-text>
        <v-container fluid>
          <v-layout row wrap>
            <v-flex xs6>
              <v-subheader>Ciudad de partida</v-subheader>
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
              <v-subheader>Ciudad de llegada</v-subheader>
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
import getCities from '@/services/getCities'
import postForm from '@/services/postForm'
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
      items: [],
      nombres: '',
      celular: ''
    }
  },
  created: async function () {
    var response = await getCities.getCities()
    for (var i = 0; i < response.data.length; i++) {
      this.paises.push(response.data[i])
    }
    this.paises.sort()
  },
  methods: {
    async obtenerRutas () {
      var response = await postForm.postForm(this.nombres, this.celular)
      console.log(response)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
