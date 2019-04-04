<template>
	<div :class="classObject" @click="captureClick">
		{{ day.format('D') }}
		<ul class="event-list">
			<li v-for="event in events">{{ event.description }} </li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: [
			'day'
		],
		computed: {
			events() {
				return this.$store.state.events.filter(event => event.date.isSame(this.day, 'day'))
			},
			classObject() {
				return {
					day: true,
					today: this.day.isSame(this.$moment(), 'day'),
					past: this.day.isBefore(this.$moment(), 'day')
				}
			}
		},
		methods: {
			captureClick(event) {
				this.$store.commit('eventFormActive', true)
				this.$store.commit('eventFormPos', {
					x: event.clientX,
					y: event.clientY
				})
			}
		}
	}
</script>