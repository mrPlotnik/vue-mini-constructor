<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations(['updateBlocks']),
  },
  created() {
    // Проверяем наличие данных в localStorage
    const blocks = JSON.parse(localStorage.getItem('blocks'));
    // Если данные есть, вызываем мутацию
    if (blocks) {
      this.updateBlocks(blocks);
    }
  },
};
</script>
<style scoped lang="sass">

</style>
