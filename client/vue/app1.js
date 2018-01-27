Vue.component('input-dropdown', {
  props: ['value', 'meta'],
  template: '#dropdown-template',
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    }
  }
})

Vue.component('input-text', {
  props: ['value', 'meta'],
  template: '#text-template',
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    }
  }

})

function getStates () {
  return [{key: 'CT', display: 'Connecticut'},
    {key: 'NY', display: 'New York'},
    {key: 'MA', display: 'Massechusets'},
    {key: 'RI', display: 'Rhode Island'}]
}

var data = {
  title: 'Vue Sandbox',
  model: {
    username: 'bob',
    street: '',
    city: '',
    state: '',
    zip: ''
  },
  meta: {
    username: { name: 'username',
      label: 'User Name'
    },
    street: { name: 'street',
      label: 'Street Address'
    },
    city: { name: 'city',
      label: 'City'
    },
    state: { name: 'State',
      label: 'State',
      options: getStates()
    },
    zip: { name: 'zip',
      label: 'Zip'
    }
  }
}

var vm = new Vue({
  el: '#app1',
  data: data
})

// vm.$watch('model.username.value', function (newValue, oldValue) {
//   console.log(newValue, '/', oldValue)
// })
