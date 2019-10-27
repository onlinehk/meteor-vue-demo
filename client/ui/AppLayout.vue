<template>
	<div class="app-layout">
		<!-- <app-menu></app-menu> -->
		<div class="navbar">
			<div class="item"><router-link to="/" exact>Home</router-link></div>
			<div class="item"><router-link to="/test">Test</router-link></div>
			<div class="clearfix"></div>
		</div>
		<transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
// import AppMenu from '/imports/ui/AppMenu.vue';
// export default {
// 	components: {
//     // AppMenu
// 	},
// }
</script>

<style>
.animated {
    animation-duration: 0.3s !important;
}
</style>