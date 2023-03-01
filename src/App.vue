<template>
  <div class="container">
    <div id="app">
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
      <router-view/>
    </div>
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
