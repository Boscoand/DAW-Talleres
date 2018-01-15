import Api from '@/services/Api'

export default {
  obtenerPaises () {
    return Api().get('getCountries')
  }
}
