import service from './logService.js'

export default function () {
  var template = require('./log.html')

  var Log = {
    template: template,
    data: function () {
      return {
        title: 'Log Manager',
        searchQuery: '',
        gridColumns: ['id', 'date', 'miles', 'event', 'note'],
        gridData: [],
        active: false,
        adding: false,
        model: {
          id: '',
          date: '',
          event: '',
          miles: '',
          note: ''
        },
        meta: {
          date: {
            name: 'date',
            label: 'Date',
            mask: '##/##/####',
            validate: 'required'
          },
          miles: {
            name: 'miles',
            label: 'Miles'
          },
          event: {
            name: 'event',
            label: 'Event',
            validate: 'required'
          },
          note: {
            name: 'note',
            label: 'Note'
          }
        }
      }
    },
    methods: {
      edit: function (item) {
        this.model.id = item.id
        this.model.date = item.date
        this.model.miles = item.miles
        this.model.note = item.note
        this.model.event = item.event
      },
      add: function () {

      },
      remove: function (item) {

      },
      clear: function () {
        this.model.id = ''
        this.model.date = ''
        this.model.miles = ''
        this.model.note = ''
        this.model.event = ''
      },
      cancel: function () {
        this.adding = false
        this.active = false
        this.clear()
      },
      loadgrid: function () {
        service.getAll()
          .then(response => {
            this.gridData = response.data.map(logitem => {
              return logitem
            })
          })
          .catch(e => {
            console.log(e)
          })
      },
      submit: function () {
        var vm = this
        this.$validator.validateAll().then((result) => {
          if (result) {
            service.save(this.model)
              .then(function () {
                vm.loadgrid()
                vm.active = false
                vm.adding = false
                vm.clear()
              })
          } else {

          }
        })
      }
    },
    created: function () {
      this.loadgrid()
    }

  }
  return Log
}
