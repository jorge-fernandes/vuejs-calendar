import Vue from 'vue'
import './style.scss'

import store from './store'

import moment from 'moment-timezone'
moment.tz.setDefault('UTC')
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

import App from './components/App.vue'

let events = [
	  { description: 'Mock event 1', date: moment() },
	  { description: 'Mock event 2', date: moment().add(-2, 'days') },
	  { description: 'Mock event 3', date: moment().add(2, 'days') },
	]
let initialState = Object.assign({}, store.state, { events })
store.replaceState(initialState)

new Vue({
  el: '#app',
  data: {
  	moment
  },
  components: {
  	App
  },
  store
});
