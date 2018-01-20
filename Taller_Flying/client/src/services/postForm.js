import Api from '@/services/Api'

export default {

  postForm (nombre, celular) {
    return Api().post('postForm?nombres=' + nombre + '&celular=' + celular)
  }
}
