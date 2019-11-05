<template>
<div>
  <h1>About</h1>
</div>
</template>
<style scoped>
h1 {
  text-align: center;
  position: absolute;
  top: 45%;
  width: 100%;
}
</style>
<script>
export default {
	data: () => ({
		message: 'About Page',
	}),
	metaInfo: {
    title: 'Meteor + Vue (About 3)',
    meta: [
      {property: 'og:image', content: 'https://www.shiseidohk.com/newshiseidomakeup/insyncallways/assets/images/share/share_img_fb.jpg?v=5'}
    ]
  },
}
</script>