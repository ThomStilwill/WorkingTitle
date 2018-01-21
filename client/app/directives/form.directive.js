angular.module('ratel')
  .directive('form', function ParentForm () {
    return {
      restrict: 'E',
      require: 'form',
      link: function (scope, element, attrs, form) {
        var where = util.where

        function traverse (predicate, obj, depth) {
          if (Object(obj) !== obj) {
            return null
          }

          if (!depth) {
            depth = 0
          }

          if (depth > 16) {
            return null
          }

          if (predicate(obj)) {
            return obj
          }

          for (var i in obj) {
            if (obj.hasOwnProperty(i) && i.indexOf('$$') < 0) {
              var result = traverse(predicate, obj[i], depth + 1)
              if (result) {
                return result
              }
            }
          }
        }

        scope.showFormError = function showError (data) {
          var foundError = traverse(where({
            $invalid: true,
            $dirty: true
          }), form.$error)

          if (foundError) {
            if (foundError.$touched === 'undefined') {
              foundError = false
            }
          }

          return form.$invalid && (foundError || form.$submitted)
        }
      }
    }
  })
