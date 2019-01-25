<template>
	<div>
		<div v-for="week in weeks">
			Week
			<div v-for="day in week">{{ day }}</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				month: 2,
				year: 2017
			}
		},
		computed: {
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
				
				for(let i = 0; i < this.days.length; i + 7) {
					weeks.push(this.days.splice(i, i+7))
				}

				return weeks
			}
		}
	}
</script>