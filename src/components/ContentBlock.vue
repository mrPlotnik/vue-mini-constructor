<template lang="pug">
#content
  .container.container-style
    .block__top

      .block__header
        h2.block__top-header(v-if="!editMode" ) {{ block.header }}
        input.input.block__top-header-input(
          v-if="editMode"
          type="text"
          v-model="thisBlock.header"
        )

      .block__top-btns
        slot(v-if="!editMode")
        BlockTopBtns(@editMode="editModeF()")

    .block__body
      p(v-if="!editMode") {{ block.text }}
      textarea.textarea.block__text-input(
        v-if="editMode"
        v-model="thisBlock.text"
      )

</template>

<script>
import saveBlockHeader from '@/mixins/saveBlockHeader';
import BlockTopBtns from '@/components/btns/BlockTopBtns.vue';

export default {
  name: 'ContentBlock',
  props: ['block', 'blockIndex'],
  components: { BlockTopBtns },
  mixins: [saveBlockHeader],
  data() {
    return {
      currentText: '',
    };
  },
  methods: {
    editModeF() {
      if (!this.editMode) {
        this.editMode = true;
      } else {
        this.saveBlockHeader();
        this.saveText();
        this.updateBlock({ blockId: this.thisBlock, block: this.block });
        this.editMode = false;
      }
    },
    saveText() {
      if (this.thisBlock.text === '') {
        this.thisBlock.text = this.currentBlockHeader;
      }
    },
  },
  created() {
    this.updateMainData();
  },
};
</script>

<styles scoped lang="sass">
  #content
    position: relative
    padding: 10px 0
</styles>
