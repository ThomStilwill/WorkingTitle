angular.module('ratel')
  .component('tooltip', {
    transclude: true,
    templateUrl: 'app/components/tooltip.html',
    bindings: {
      content: '@'
    },
    controller: function () {
    }
  }
  )
