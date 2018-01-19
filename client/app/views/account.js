angular.module('ratel')
  .component('account', {
    restrict: 'E',
    transclude: true,
    replace: true,
    templateUrl: 'app/views/account.html',
    controller: function ($scope) {
      const ctrl = this
    }
  })
