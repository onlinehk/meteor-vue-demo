<template>
	<div class="app-layout">
		<!-- <app-menu></app-menu> -->
		<div class="navbar">
			<div class="item"><router-link to="/">Home</router-link></div>
			<div class="item"><router-link to="/test">Test</router-link></div>
			<div class="clearfix"></div>
		</div>
		<div class="navbarPadding"></div>
		<router-view></router-view>
	</div>
</template>

<script>
// import AppMenu from '/imports/ui/AppMenu.vue';
// export default {
//   components: {
//     // AppMenu
//   }
// }
</script>