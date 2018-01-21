import Api from '@/services/Api'

export default {

  putForm (olddata, newdata) {
    return Api().put('putForm', [olddata, newdata])
  }
}
