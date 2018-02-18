angular.module('ratel')
  .component('log', {
    templateUrl: 'app/views/log.html',
    controller: function ($scope, $filter, LogService) {
      const ctrl = this

      ctrl.$onInit = function () {
        ctrl.title = 'Log'

        LogService.getAll()
          .then(function (data) {
            ctrl.logs = data
          })
      }

      ctrl.submit = function (form) {
        if (form.$invalid) {
          console.log('invalid: ', form.$error)
          return
        }
        console.log($filter('json')(ctrl))
      }
    }
  })
