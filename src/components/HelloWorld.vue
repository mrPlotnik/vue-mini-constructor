<template lang="pug">

div(class="hello")
  h1 {{ msg }}
  p For a guide and recipes on how to configure / customize this project,<br>

</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<style scoped lang="scss">

</style>
