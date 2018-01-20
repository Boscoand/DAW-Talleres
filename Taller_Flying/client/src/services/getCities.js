import Api from '@/services/Api'

export default {
  getCities () {
    return Api().get('getCities')
  }
}
