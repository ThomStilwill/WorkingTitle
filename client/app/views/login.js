angular.module('ratel')
  .component('login', {
    templateUrl: 'app/views/login.html',
    controller: function ($scope) {
      const ctrl = this

      ctrl.$onInit = function () {
        ctrl.states = [
          {key: 'CT', value: 'Connecticut'},
          {key: 'MA', value: 'Massechusetts'},
          {key: 'NY', value: 'New York'},
          {key: 'OR', value: 'Oregon'},
          {key: 'WA', value: 'Washington'}
        ]
      }

      ctrl.submit = function (form) {
        if (form.$invalid) {
          console.log('invalid: ', form.$error)
          return
        }
        console.log(form)
      }
    }
  })
