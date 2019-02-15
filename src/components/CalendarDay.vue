<template>
	<div :class="classObject" @click="captureClick">{{ day.format('D') }}</div>
</template>
<script>
	export default {
		props: [
			'day'
		],
		computed: {
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