<template lang="pug">
#app
  router-view
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations(['loadBlocks']),
  },
  created() {
    // Проверяем наличие данных в localStorage
    const blocks = JSON.parse(localStorage.getItem('blocks'));
    // Если данные есть, вызываем мутацию
    if (blocks) {
      this.loadBlocks(blocks);
    }
  },
};
</script>
<style scoped lang="sass">

</style>
