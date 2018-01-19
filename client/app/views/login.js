angular.module('ratel')
  .component('login', {
    templateUrl: 'app/views/login.html',
    controller: function ($scope) {
      const ctrl = this

      ctrl.submit = function (form) {
        if (form.$invalid) {
          console.log('invalid: ', form.$error)
          return
        }
        console.log(form)
      }
    }
  })
