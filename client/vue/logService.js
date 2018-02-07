export default {
  getAll: function () {
    var url = 'api/log'
    return axios.get(url)
  },
  save: function (model) {
    if (model.id === '') {
      var url = 'api/log'
      return axios.post(url, model)
    } else {
      var url = 'api/log/' + model.id
      return axios.put(url, model)

    }
  }
}
