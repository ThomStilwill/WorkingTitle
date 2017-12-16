angular.module('ratel', ['ui.router'])
.controller('basecontroller',['$scope',function($scope){
    $scope.title='Stilwill.net'
    $scope.version = '0.0.1'
    $scope.year = (new Date()).getFullYear()
    $scope.theme = "theme-light"
}]);
