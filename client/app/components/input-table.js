angular.module('ratel')
  .component('inputTable', {
    templateUrl: 'app/components/input-table.html',
    bindings: {
      name: '@',
      label: '@',
      tooltip: '@',
      filterKey: '<',
      columns: '=',
      value: '=',
      sortkey: '=',
      editmethod: '&'
    },
    controller: function ($window, LogService) {
      const ctrl = this
      ctrl.sortOrders = {}

      ctrl.$onInit = function () {
        ctrl.columns.forEach(function (key) {
          ctrl.sortOrders[key] = 1
        })
      }

      ctrl.filteredData = function () {
        var sortKey = ctrl.sortKey
        var filterKey = ctrl.filterKey && ctrl.filterKey.toLowerCase()
        var order = ctrl.sortOrders[sortKey] || 1
        var data = ctrl.value
        if (filterKey) {
          data = data.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return data
      }

      ctrl.sortBy = function (key) {
        ctrl.sortKey = key
        ctrl.sortOrders[key] = this.sortOrders[key] * -1
      }

      ctrl.edit = function (item) {
        ctrl.editmethod({item: item})
      }

      ctrl.remove = function (item) {
        ctrl.removeMethod(item)
      }

      ctrl.select = function (id) {
        ctrl.selected = id
      }
    }
  })
