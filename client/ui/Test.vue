<template>
<div class="test">
  <h1>{{ message }}</h1>
  <input v-model="message" />
</div>
</template>

<style lang="css" scoped>
.test {
	margin: 0 30px;
}
</style>

<script>
export default {
  data: () => ({
    message: 'hello world',
  }),
}
</script>
