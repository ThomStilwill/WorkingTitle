const config = {
  events: 'blur'
  // delay: 100
}

Vue.use(VeeValidate, config)
Vue.use(VueTheMask)

var valexpr = {
  zip: '^\\d{5}(?:[-]\\d{4})?$'
}

const messages = {
  en: {
    messages: {
      required: (name) => `${name} is required.`,
      max: (name, value) => `${name} can't be more that ${value} characters.`
    }
  }
}

VeeValidate.Validator.localize(messages)

const custommessages = {
  custom: {
    zip: {
      regex: (name) => `${name} can be 5 or 9 digits.`,
      required: (name) => `${name} missing.`
    }
  }
}

VeeValidate.Validator.localize('en', custommessages)

Vue.component('input-dropdown', {
  inject: ['$validator'],
  props: ['value', 'meta'],
  template: '#dropdown-template',
  methods: {
    updateValue: function (value) {
      if (value === '') {
        value = null
      }
      this.$emit('input', value)
    }
  }
})

Vue.component('input-text', {
  inject: ['$validator'],
  props: ['value', 'meta'],
  template: '#text-template',
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    }
  }

})

function getLabel (name) {
  var meta = util.seek(util.where({name: name}), data.meta)
  return meta.label
}

const nameRule = {
  getMessage (field, params, data) {
    var label = getLabel(field)
    return `Too silly for ${label}`
  },
  validate (value) {
    return new Promise(resolve => {
      resolve({
        valid: value === 'blue' ? false : !!value
      })
    })
  }

}

VeeValidate.Validator.extend('sillyname', nameRule)

// function getStates () {
//   return [{key: 'CT', display: 'Connecticut'},
//     {key: 'NY', display: 'New York'},
//     {key: 'MA', display: 'Massechusets'},
//     {key: 'RI', display: 'Rhode Island'}]
// }

var data = {
  title: 'Vue Sandbox',
  model: {
    username: 'bob',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: ''
  },
  meta: {
    username: { name: 'username',
      label: 'User Name',
      validate: 'required|sillyname|max:10'
    },
    email: { name: 'email',
      label: 'Email Address',
      validate: 'required|email'
    },
    street: { name: 'street',
      label: 'Street Address',
      validate: 'required'
    },
    city: { name: 'city',
      label: 'City'
    },
    state: { name: 'State',
      label: 'State',
      validate: 'required',
      options: []
    },
    zip: { name: 'zip',
      label: 'Zip',
      mask: '#####-####',
      validate: 'required|regex:' + valexpr.zip
    }
  }
}

var vm = new Vue({
  el: '#app1',
  data: data,
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
          return {key: state.abbr, display: state.name}
        })
      })
      .catch(e => {
        this.errors.push(e)
      })
  }

})

// vm.$watch('model.username.value', function (newValue, oldValue) {
//   console.log(newValue, '/', oldValue)
// })
