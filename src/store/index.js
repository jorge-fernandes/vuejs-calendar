import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import moment from 'moment-timezone'
moment.tz.setDefault('UTC')

import Axios from 'axios'

export default new Vuex.Store({
  	state: {
  		currentYear: parseInt(moment().format('Y')),
  		currentMonth: parseInt(moment().format('M')),
  		eventFormPosX: 0,
  		eventFormPosY: 0,
  		eventFormActive: false,
      events: [
        { description: 'Mock event 1', date: moment() },
        { description: 'Mock event 2', date: moment().add(-2, 'days') },
        { description: 'Mock event 3', date: moment().add(2, 'days') },
      ],
      eventFormDate: null
  	},
  	mutations: {
  		setCurrentMonth(state, payload) {
  			state.currentMonth = payload
  		},
  		setCurrentYear(state, payload) {
  			state.currentYear = payload
  		},
  		eventFormPos(state, payload) {
  			state.eventFormPosY = payload.y
  			state.eventFormPosX = payload.x
  		},
  		eventFormActive(state, payload) {
  			state.eventFormActive = payload
  		},
      addEvent(state, payload) {
        state.events.push(payload)
      },
      eventFormDate(state, payload) {
        state.eventFormDate = payload
      }
  	},
    actions: {
      addEvent(context, payload) {
        return new Promise((resolve, reject) => {
                  let obj = {
          description: payload,
          date: context.state.eventFormDate
        } 
        Axios.post('/add_event', obj).then(response => {
          if(response.status === 200) {
            context.commit('addEvent', obj)
            resolve()
          } else {
            reject()
          }
        })
      })
      }
    }
})