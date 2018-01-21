<template>

  <v-container text-xs-center>

    <!-- Titulo -->
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark color='primary'>
          <v-card-text class='px-0'>FLYING</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- Nombres -->
    <v-layout mt-4>
      <v-flex xs3 offset-xs1 >
        <v-subheader>Nombres completos</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field v-model='nombres'></v-text-field>
      </v-flex>
    </v-layout>

      
    <!-- Numero de celular -->
    <v-layout>
      <v-flex xs3 offset-xs1>
        <v-subheader>Número celular </v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-text-field v-model='celular'></v-text-field>
      </v-flex>
    </v-layout>

    <!-- Ciudad de partida -->
    <v-layout>
      <v-flex xs3 offset-xs1>
        <v-subheader>Ciudad de partida</v-subheader>
      </v-flex>
      <v-flex xs7>
        <v-select
          v-model='origenSeleccionado'
          label='Seleccionar origen'
          v-bind:items='paises'
          item-value='text'
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
          v-model='destinoSeleccionado'
          label='Seleccionar destino'
          v-bind:items='paises'
          item-value='text'
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
          :close-on-content-click='false'
          transition='scale-transition'
          offset-y
          full-width
          :nudge-right='40'
          max-width='290px'
          min-width='290px'
        >
          <v-text-field
            slot='activator'
            label='Fecha de partida'
            v-model='fechaPartida'
            prepend-icon='event'
            readonly
          ></v-text-field>
          <v-date-picker v-model='fechaPartida' no-title scrollable actions>
            <template slot-scope='{ save, cancel }'>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color='primary' @click='cancel'>Cancel</v-btn>
                <v-btn flat color='primary' @click='save'>OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>
      </v-flex>

      <v-flex xs5>
        <v-menu
          lazy
          :close-on-content-click='false'
          transition='scale-transition'
          offset-y
          full-width
          :nudge-right='40'
          max-width='290px'
          min-width='290px'
        >
          <v-text-field
            slot='activator'
            label='Fecha de retorno'
            v-model='fechaRetorno'
            prepend-icon='event'
            readonly
          ></v-text-field>
          <v-date-picker v-model='fechaRetorno' no-title scrollable actions>
            <template slot-scope='{ save, cancel }'>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat color='primary' @click='cancel'>Cancel</v-btn>
                <v-btn flat color='primary' @click='save'>OK</v-btn>
              </v-card-actions>
            </template>
          </v-date-picker>
        </v-menu>
      </v-flex>
    </v-layout>

    <!-- Escala -->
    <v-layout>
      <v-flex xs10 offset-xs1 pl-4 pt-4>
        <v-checkbox v-bind:label='`Escala`' v-model='escala'></v-checkbox>
      </v-flex>
    </v-layout>    

    <v-card-text>
      <div>
        <v-btn color='primary' v-on:click='guardarRegistro'>GUARDAR</v-btn>
        <v-btn  color='primary' v-on:click='modifyForm' :disabled='disabled'>MODIFICAR</v-btn>
      </div>
    </v-card-text>

    <v-data-table
      v-bind:headers='headers'
      :items='items'
      :search='search'
      v-model='selected'
      item-key='nombre'
      hide-actions
      class='elevation-1'
    >
      <template slot='items' slot-scope='props' placeholder='asfasdf'>
         <td>
          <v-checkbox
            primary
            hide-details
            v-model='props.selected'
            v-on:change='enableModification'
          ></v-checkbox>
        </td>
        <td>{{ props.item.nombre }}</td>
        <td class='text-xs-right'>{{ props.item.celular }}</td>
        <td class='text-xs-right'>{{ props.item.fechaPartida }}</td>
        <td class='text-xs-right'>{{ props.item.fechaRetorno }}</td>
        <td class='text-xs-right'>{{ props.item.ciudadPartida }}</td>
        <td class='text-xs-right'>{{ props.item.ciudadLlegada }}</td>
        <td class='text-xs-right'>{{ props.item.escala }}</td>
      </template>
      <template slot='no-data'>
          No existen registros de vuelos deseados.
      </template>
    </v-data-table>
    {{this.selected}}
  </v-container>
</template>

<script>
import getCities from '@/services/getCities'
import postForm from '@/services/postForm'
import getForm from '@/services/getForm'
import putForm from '@/services/putForm'
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
          text: '',
          align: 'left',
          sortable: false,
          value: ''
        },
        {
          text: 'Nombre completo',
          align: 'left',
          sortable: false,
          value: 'nombre'
        },
        {
          text: 'Celular',
          value: 'celular',
          sortable: false
        },
        {
          text: 'Fecha de partida',
          value: 'fechaPartida',
          sortable: false
        },
        {
          text: 'Fecha de retorno',
          value: 'fechaRetorno',
          sortable: false
        },
        {
          text: 'Ciudad de partida',
          value: 'ciudadPartida',
          sortable: false
        },
        {
          text: 'Ciudad de llegada',
          value: 'ciudadLlegada',
          sortable: false
        },
        {
          text: 'Escala',
          value: 'escala',
          sortable: false
        }
      ],
      items: [],
      search: '',
      selected: [],
      nombres: '',
      celular: '',
      fechaPartida: null,
      fechaRetorno: null,
      escala: false,
      disabled: true
    }
  },
  created: async function () {
    // Se cargan los registros guardados
    this.updateForm()

    // Se cargan las ciudades
    var response = await getCities.getCities()
    for (var i = 0; i < response.data.length; i++) {
      if (response.data[i] !== '') {
        this.paises.push(response.data[i])
      }
    }
    this.paises.sort()
  },
  methods: {
    async guardarRegistro () {
      if (this.disabled === true) {
        var escala = 'No'
        if (this.escala) {
          escala = 'Sí'
        }
        var response = await postForm.postForm({
          nombre: this.nombres,
          celular: this.celular,
          fechaPartida: this.fechaPartida,
          fechaRetorno: this.fechaRetorno,
          ciudadPartida: this.origenSeleccionado,
          ciudadLlegada: this.destinoSeleccionado,
          escala: escala
        })

        if (response != null) {
          this.nombres = ''
          this.celular = ''
          this.fechaPartida = null
          this.fechaRetorno = null
          this.origenSeleccionado = ''
          this.destinoSeleccionado = ''
          this.opcionSeleccionada = ''
          this.updateForm()
        }
      } else {
        var respons = await putForm.putForm(this.selected[0], {
          nombre: this.nombres,
          celular: this.celular,
          fechaPartida: this.fechaPartida,
          fechaRetorno: this.fechaRetorno,
          ciudadPartida: this.origenSeleccionado,
          ciudadLlegada: this.destinoSeleccionado,
          escala: escala
        })

        if (respons != null) {
          this.nombres = ''
          this.celular = ''
          this.fechaPartida = null
          this.fechaRetorno = null
          this.origenSeleccionado = ''
          this.destinoSeleccionado = ''
          this.opcionSeleccionada = ''
          this.selected = []
          this.enableModification()
          this.updateForm()
        }
      }
    },
    async updateForm () {
      this.items = []
      var response = await getForm.getForm()
      console.log(response.data)
      for (var i = 0; i < response.data.length; i++) {
        this.items.push({
          nombre: response.data[i].nombre,
          celular: response.data[i].celular,
          fechaPartida: response.data[i].fechaPartida,
          fechaRetorno: response.data[i].fechaRetorno,
          ciudadPartida: response.data[i].ciudadPartida,
          ciudadLlegada: response.data[i].ciudadLlegada,
          escala: response.data[i].escala
        })
      }
    },
    async modifyForm () {
      var registro = this.selected[0]
      this.nombres = registro['nombre']
      this.celular = registro['celular']
      this.fechaPartida = registro['fechaPartida']
      this.fechaRetorno = registro['fechaRetorno']
      this.origenSeleccionado = registro['ciudadPartida']
      this.destinoSeleccionado = registro['ciudadLlegada']
      this.escala = registro['escala']
    },
    enableModification () {
      if (this.selected.length === 1) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
