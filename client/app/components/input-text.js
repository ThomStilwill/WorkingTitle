angular.module('ratel')
  .component('inputText', {
    templateUrl: 'app/components/input-text.html',
    require: {parentform: '^form', model: 'ngModel'},
    bindings: {
      name: '@',
      label: '@',
      placeholder: '@',
      tooltip: '@',
      required: '@',
      minLength: '@',
      pattern: '@',
      onChange: '&',
      submitted: '<',
      form: '<'
    },
    controller: function ($scope, $window) {
      const ctrl = this

      ctrl.change = function () {
        ctrl.model.$setViewValue(ctrl.internalValue)
        ctrl.onChange({
          name: ctrl.name,
          value: ctrl.internalValue
        })
      }

      ctrl.showError = function () {
        return ctrl.form[ctrl.name].$invalid && (ctrl.form[ctrl.name].$dirty || ctrl.form.$submitted)
      }

      ctrl.$onInit = function () {
        ctrl.elementId = $window.angular.copy(ctrl.name)
        ctrl.form = ctrl.parentform

        ctrl.model.$render = () => {
          ctrl.internalValue = ctrl.model.$modelValue
          ctrl.model.$setViewValue(ctrl.internalValue)
        }
      }

      ctrl.$onChanges = function (changes) {
        if (changes.model) {
          console.log(changes)
          ctrl.internalValue = $window.angular.copy(ctrl.model)
        }
      }
    }
  })
