angular.module('ratel')
  .service('LogService', ['$q', '$http', '$log', function ($q, $http) {
    function getAll () {
      var url = 'api/log'
      return $http.get(url)
        .then(function (response) {
          return response.data
        })
    }

    function remove (model) {
      var url = 'api/log/' + model.id
      return $http.delete(url)
    }

    function save (model) {
      var url

      if (model.id === '') {
        url = 'api/log'
        return $http.post(url, model)
      } else {
        url = 'api/log/' + model.id
        return $http.put(url, model)
      }
    }

    return {
      getAll: getAll,
      save: save,
      remove: remove
    }
  }])
