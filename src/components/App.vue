<template>
	<div>
		<div id="header">
			<div>
				<h1>Vue.js Calendar</h1>
			</div>
			<div>
				<current-month></current-month>
			</div>
		</div>
		<div id="day-bar">
			<div>Mon</div>
			<div>Tue</div>
			<div>Wed</div>
			<div>Thu</div>
			<div>Fri</div>
			<div>Sat</div>
			<div>Sun</div>
		</div>
		<div id="calendar">
			<div v-for="week in weeks" class="calendar-week">
				<calendar-day v-for="day in week" :day="day"></calendar-day>
			</div>
		</div>
		<event-form></event-form>
	</div>
</div>
</template>
<script>
	import CalendarDay from './CalendarDay.vue'
	import CurrentMonth from './CurrentMonth.vue'
	import EventForm from './EventForm.vue'

	export default {
		computed: {
			month() {
				return this.$store.state.currentMonth
			},
			year() {
				return this.$store.state.currentYear
			},
			days() {
				const SUNDAY = 0;
				const MONDAY = 1;
				let days = []
				let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D')

				while (currentDay.month() + 1 === this.month) {
					days.push(this.$moment(currentDay))
					currentDay = this.$moment(currentDay.add(1, 'days'))
				} 

				currentDay = this.$moment(days[0])

				while(currentDay.day() !== MONDAY) {
					currentDay = this.$moment(currentDay.subtract(1, 'days'))
					days.unshift(this.$moment(currentDay))
				}

				currentDay = this.$moment(days[days.length -1])

				while(currentDay.day() !== SUNDAY) {
					currentDay = this.$moment(currentDay.add(1, 'days'))
					days.push(this.$moment(currentDay))
				}

				return days
			},
			weeks() {
				let weeks = []
				
				for(let i = 0; i < this.days.length; i += 7) {
					weeks.push(this.days.slice(i, i+7))
				}

				return weeks
			}
		},
		components: {
			CalendarDay,
			CurrentMonth,
			EventForm
		}
	}
</script>