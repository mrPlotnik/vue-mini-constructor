<template lang="pug">
.block__move-btns
  button.btn-reset.btn.btn--edit(
    @click="moveBlockUp(blockIndex)"
  ) ↑
  button.btn-reset.btn.btn--edit(
    @click="moveBlockDown(blockIndex)"
  ) ↓
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'MoveBlockBtns',
  props: ['block', 'blockIndex'],
  computed: {
    ...mapGetters({
      blocksState: 'blockInfo',
    }),
  },
  methods: {
    ...mapActions(['updateBlocks']),
    moveBlockUp(i) {
      const bs = this.blocksState;

      if (i !== 0) {
        const qwe = bs.slice(0);
        [qwe[i], qwe[i - 1]] = [qwe[i - 1], qwe[i]];
        this.updateBlocks(qwe);
      }
    },
    moveBlockDown(i) {
      const bs = this.blocksState;
      const len = bs.length;

      if (i !== len - 1) {
        const qwe = bs.slice(0);
        [qwe[i], qwe[i + 1]] = [qwe[i + 1], qwe[i]];
        this.updateBlocks(qwe);
      }
    },
  },
};
</script>

<style scoped lang="sass">
.block__move-btns
  margin-right: 5px
</style>
