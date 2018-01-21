angular.module('ratel')
  .component('inputSelect', {
    templateUrl: 'app/components/input-select.html',
    require: {parentform: '^form'},
    bindings: {
      name: '@',
      label: '@',
      options: '=',
      placeholder: '@',
      tooltip: '@',
      required: '@',
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

      ctrl.showError = function () {
        return ctrl.form[ctrl.name].$invalid && (ctrl.form[ctrl.name].$dirty || ctrl.form.$submitted)
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
