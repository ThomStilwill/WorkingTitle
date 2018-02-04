var Deja = require('./deja.js')
var Log = require('./log.js')

const config = {
  events: 'blur'
}

Vue.use(VeeValidate, config)
Vue.use(VueTheMask)
Vue.use(VueRouter)

const messages = {
  en: {
    messages: {
      required: (name) => `${name} is required.`,
      max: (name, value) => `${name} can't be more that ${value} characters.`
    }
  }
}
VeeValidate.Validator.localize(messages)

Vue.component('grid', {
  template: '#grid-template',
  props: {
    data: Array,
    columns: Array,
    filterKey: String,
    editMethod: Function,
    removeMethod: Function
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
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
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    edit: function (item) {
      this.editMethod(item)
    },
    remove: function (item) {
      this.removeMethod(item)
    }
  }
})

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

const Foo = {
  template: '<h2>foo</h2>'
}

// const Deja = {
//   template: '<h2>deja</h2>'
// }

const routes = [
  {path: '/deja', component: Deja()},
  {path: '/foo', component: Foo},
  {path: '/log', component: Log()}
]

const router = new VueRouter({routes})

// router.push({name: 'foo'})

new Vue({
  el: '#vueapp',
  router: router
})
