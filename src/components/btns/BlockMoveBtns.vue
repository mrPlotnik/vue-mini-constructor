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
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      state: 'allBlocks',
    }),
  },
  methods: {
    ...mapActions(['updateMoveBlocks']),
    moveBlockUp(i) {
      const bs = this.state.map((block) => ({ ...block }));
      if (i !== 0) {
        [bs[i], bs[i - 1]] = [bs[i - 1], bs[i]];
        this.updateMoveBlocks(bs);
      }
    },
    moveBlockDown(i) {
      const bs = this.state.map((block) => ({ ...block }));
      const len = bs.length;
      if (i !== len - 1) {
        [bs[i], bs[i + 1]] = [bs[i + 1], bs[i]];
        this.updateMoveBlocks(bs);
      }
    },
  },
};
</script>

<style scoped lang="sass">
.block__move-btns
  margin-right: 5px
</style>
