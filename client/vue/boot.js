var Deja = require('./deja.js')

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
  {path: '/foo', component: Foo}
]

const router = new VueRouter({routes})

// router.push({name: 'foo'})

new Vue({
  router: router
}).$mount('#vueapp')
