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
import { mapActions, mapGetters } from 'vuex';
import BlockTopBtns from '@/components/btns/BlockTopBtns.vue';

export default {
  name: 'ContentBlock',
  props: ['block', 'blockIndex'],
  components: { BlockTopBtns },
  data() {
    return {
      thisBlock: [],
      editMode: false,
      editModeBtnText: 'Edit',
      currentText: '',
      currentBlockHeader: '',
    };
  },
  computed: {
    ...mapGetters({
      blocksState: 'blockInfo',
    }),
  },
  methods: {
    ...mapActions(['updateBlock']),
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
    saveBlockHeader() {
      if (this.thisBlock.header === '') {
        this.thisBlock.header = this.currentBlockHeader;
      }
    },
    saveText() {
      if (this.thisBlock.text === '') {
        this.thisBlock.text = this.currentBlockHeader;
      }
    },
    updateData() {
      this.thisBlock = this.blocksState[this.blockIndex];
      this.currentBlockHeader = this.thisBlock.header;
    },
  },
  created() {
    this.updateData();
  },
};
</script>

<styles scoped lang="sass">
  #content
    position: relative
    padding: 10px 0
</styles>
