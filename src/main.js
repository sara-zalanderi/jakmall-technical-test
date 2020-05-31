import Vue from 'vue'
import {store} from './store/store'
import App from './App.vue'
import toCurrencyFormat from './plugins/toCurrencyFormat'

Vue.filter('toCurrencyFormat', toCurrencyFormat);

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
