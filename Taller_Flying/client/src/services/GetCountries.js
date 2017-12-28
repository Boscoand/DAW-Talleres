import Api from '@/services/Api'

export default {
  countries (credentials) {
    return Api().get('prueba')
  }
}
