angular.module('ratel')
  .service('LinkService', ['$q', '$http', '$log', function ($q, $http) {
    function fetch () {
      var url = `api/links`

      return $http.get(url)
        .then(function (result) {
          return result.data
        })
    }

    function tags () {
      var url = `api/tags`

      return $http.get(url)
        .then(function (result) {
          return result.data
        })
    }

    return {
      fetch: fetch,
      tags: tags
    }
  }])
