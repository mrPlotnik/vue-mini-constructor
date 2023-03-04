<template lang="pug">
.btn-wrap
  button.btn-reset.btn.btn--edit.block__edit-btn(
    @click="editModeF()"
  ) {{ editModeBtnText }}

  div
    button.btn-reset.btn.btn--delete(
      @click="deleteBlock()"
      v-if="editMode"
    ) Delete block
</template>

<script>
export default {
  name: 'BlockTopBtns',
  data() {
    return {
      editMode: false,
      editModeBtnText: 'Edit',
    };
  },
  methods: {
    editModeF() {
      if (!this.editMode) {
        this.editModeBtnText = 'Apply';
        this.editMode = true;
        this.$emit('editMode');
      } else {
        this.editModeBtnText = 'Edit';
        this.editMode = false;
        this.$emit('editMode');
      }
    },
  },
};
</script>

<style scoped lang="sass">
.btn-wrap
  display: flex
</style>
