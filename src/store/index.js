import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import moment from 'moment-timezone'
moment.tz.setDefault('UTC')

export default new Vuex.Store({
  	state: {
  		currentYear: parseInt(moment().format('Y')),
  		currentMonth: parseInt(moment().format('M'))
  	},
  	mutations: {
  		setCurrentMonth(state, payload) {
  			state.currentMonth = payload
  		},
  		setCurrentYear(state, payload) {
  			state.currentYear = payload
  		}
  	}
})