<template lang="pug">
.btn-wrap
  div
    button.btn-reset.btn.btn--delete(
      v-if="editMode"
      @click="del()"
    ) Delete block
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BlockTopBtns',
  props: ['blockIndex'],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      editMode: 'editMode',
    }),
  },
  methods: {
    ...mapActions(['deleteBlock']),
    del() {
      this.deleteBlock(this.blockIndex);
    },
  },
};
</script>

<style scoped lang="sass">
.btn-wrap
  display: flex
</style>
