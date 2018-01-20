import Api from '@/services/Api'

export default {
  getForm () {
    return Api().get('getForm')
  }
}
