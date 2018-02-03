module.exports = function () {
  var valexpr = {
    zip: '^\\d{5}(?:[-]\\d{4})?$'
  }

  const custommessages = {
    custom: {
      zip: {
        regex: (name) => `${name} can be 5 or 9 digits.`,
        required: (name) => `${name} missing.`
      }
    }
  }

  VeeValidate.Validator.localize('en', custommessages)

  function getLabel(name) {
    var meta = util.seek(util.where({
      name: name
    }), data.meta)
    return meta.label
  }

  const nameRule = {
    getMessage(field, params, data) {
      var label = getLabel(field)
      return `Too silly for ${label}`
    },
    validate(value) {
      return new Promise(resolve => {
        resolve({
          valid: value === 'blue' ? false : !!value
        })
      })
    }

  }

  VeeValidate.Validator.extend('sillyname', nameRule)

  var data = {
    title: 'Vue Sandbox',
    model: {
      username: 'bob',
      email: '',
      street: '',
      city: '',
      state: null,
      zip: ''
    },
    meta: {
      username: {
        name: 'username',
        label: 'User Name',
        placeholder: 'enter your user name',
        validate: 'required|sillyname|max:10'
      },
      email: {
        name: 'email',
        label: 'Email Address',
        validate: 'required|email'
      },
      street: {
        name: 'street',
        label: 'Street Address',
        validate: 'required'
      },
      city: {
        name: 'city',
        label: 'City'
      },
      state: {
        name: 'State',
        label: 'State',
        validate: 'required',
        options: []
      },
      zip: {
        name: 'zip',
        label: 'Zip',
        mask: '#####-####',
        validate: 'required|regex:' + valexpr.zip
      }
    }
  }

  var Deja = {
    template: '<h3>Deja</h3>', // require('./deja.html'),
    data: function() {
      return data
    },
    methods: {
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
      axios.get('api/states')
        .then(response => {
          this.meta.state.options = response.data.map(state => {
            return {
              key: state.abbr,
              display: state.name
            }
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }

  }
  return Deja
}
