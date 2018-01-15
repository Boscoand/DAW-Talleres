import Api from '@/services/Api'

export default {
  obtenerRutas (origen, destino, escala) {
    return Api().get('getAllRoutes?origen=' + origen + '&destino=' + destino + '&escala=' + escala)
  }
}
