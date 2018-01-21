angular.module('ratel')
  .component('inputLabel', {
    transclude: true,
    templateUrl: 'app/components/input-label.html',
    bindings: {
      name: '@',
      label: '@',
      tooltip: '@'
    },
    controller: function ($element) {
    }
  }
  )
