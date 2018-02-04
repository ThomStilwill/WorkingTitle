module.exports = function () {
  var template = require('./log.html')

  var Log = {
    template: template,
    data: function () {
      return {
        title: 'Log Manager',
        searchQuery: '',
        gridColumns: ['id', 'date', 'miles', 'event', 'note'],
        gridData: [],
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
        this.id = item.id
        this.date = item.date
        this.miles = item.miles
        this.note = item.note
        this.event = item.event

        console.log('edit: ', item)
      },
      remove: function (item) {
        console.log('delete: ', item)
      },
      submit: function () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            console.log('Submitted!')
          } else {
            console.log('Invalid!')
          }
        })
      }
    },
    created: function () {
      axios.get('api/log')
        .then(response => {
          this.gridData = response.data.map(logitem => {
            return logitem
          })
        })
        .catch(e => {
          console.log(e)
        })
    }

  }
  return Log
}
