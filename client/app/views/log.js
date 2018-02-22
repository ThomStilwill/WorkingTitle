angular.module('ratel')
  .component('log', {
    require: ['form'],
    templateUrl: 'app/views/log.html',
    controller: function ($scope, $filter, LogService) {
      const ctrl = this

      ctrl.model = {}
      ctrl.editing = false

      ctrl.$onInit = function () {
        ctrl.title = 'Log'
        ctrl.columns = ['id', 'date', 'miles', 'event', 'note']
        ctrl.event = 'something'
        load()
      }

      ctrl.$postLink = function () {
        ctrl.form = $scope.logform
      }

      function load () {
        LogService.getAll()
          .then(function (data) {
            ctrl.logs = data
          })
      }

      function clear () {
        ctrl.model.id = ''
        ctrl.model.date = ''
        ctrl.model.miles = ''
        ctrl.model.event = ''
        ctrl.model.note = ''
        ctrl.editing = false
        ctrl.form.$setPristine()
      }

      ctrl.add = function () {
        clear()
        ctrl.editing = true
      }

      ctrl.edit = function (item) {
        ctrl.model.id = item.id
        ctrl.model.date = item.date
        ctrl.model.miles = item.miles
        ctrl.model.event = item.event
        ctrl.model.note = ctrl.note
        ctrl.form.$setPristine()
        ctrl.editing = true
      }

      ctrl.remove = function (item) {
        console.log(item)
        LogService.remove(item)
          .then(function () {
            load()
          })
      }

      ctrl.submit = function (form) {
        if (form.$invalid) {
          console.log('invalid: ', form.$error)
          return
        }
        console.log($filter('json')(ctrl))

        LogService.save(ctrl.model)
          .then(function () {
            clear()
            load()
          })
      }
    }
  })
