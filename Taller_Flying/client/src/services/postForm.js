import Api from '@/services/Api'

export default {

  postForm (data) {
    return Api().post('postForm', data)
  }
}
