angular.module('ratel')
.component('menu',{
    restrict: 'E',
    transclude: true,
    replace: true,
    templateUrl: 'app/views/menu.html',
    controller: function($scope,MenuService){
        const ctrl = this;

        MenuService.fetch()
            .then(function(menus){
                ctrl.menus = menus
            })
    }
})