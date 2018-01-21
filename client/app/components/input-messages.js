angular.module('ratel')
  .component('inputMessages', {
    templateUrl: 'app/components/input-messages.html',
    bindings: {
      name: '<',
      form: '<',
      label: '@',
      showError: '&'
    },
    controller: function () {
    }
  })
