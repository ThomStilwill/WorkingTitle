angular.module('ratel')
  .component('inputText', {
    templateUrl: 'app/components/input-text.html',
    require: {parentform: '^form'},
    bindings: {
      name: '@',
      label: '@',
      placeholder: '@',
      tooltip: '@',
      required: '@',
      minLength: '@',
      maxLength: '@',
      helpText: '@',
      value: '=',
      onChange: '&',
      submitted: '<',
      form: '<'
    },
    controller: function ($window) {
      const ctrl = this

      ctrl.change = function () {
        ctrl.value = ctrl.internalValue
        ctrl.onChange({
          name: ctrl.name,
          value: ctrl.internalValue
        })
      }

      ctrl.$onInit = function () {
        ctrl.elementId = $window.angular.copy(ctrl.name)
        ctrl.form = ctrl.parentform
      }

      ctrl.$onChanges = function (changes) {
        if (changes.value) {
          ctrl.internalValue = $window.angular.copy(ctrl.value)
        }
      }
    }
  })
