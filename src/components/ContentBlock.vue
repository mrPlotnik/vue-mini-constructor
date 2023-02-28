<template lang="pug">
div
  .block__top
    button.btn-reset.btn.block__edit-btn(
      :class="{isActive: editMode}"
      @click="editModeF()"
    ) {{ editModeBtnText }}

    button.btn-reset.btn.block__delete-btn(
      @click="deleteBlock(blockIndex)"
    ) Delete block

  .block__body

    .block__header-wrap

      h2(v-if="!editMode" ) {{ block.header }}

      input.block__header-input(
        v-if="editMode"
        type="text"
        @blur="editMode = false"
        @keyup.enter="saveHeader()"
        v-model="currentHeader"
      )

    .block__text-wrap

      p.block__text(v-if="!editMode") {{ block.text }}

      textarea.block__text-input(
        v-if="editMode"

        @blur="editMode = false"
        @keyup.enter="saveText()"
        v-model="currentText"
      )
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CardsBlock',
  props: ['block', 'blockIndex'],
  data() {
    return {
      editMode: false,
      editModeBtnText: 'Edit',
      currentText: '',
      currentHeader: '',
    };
  },
  computed: {
    ...mapGetters({
      blockState: 'blockInfo',
    }),
  },
  methods: {
    ...mapActions(['updateBlocks']),
    editModeF() {
      if (!this.editMode) {
        this.editModeBtnText = 'Apply';
        this.editMode = true;
      } else {
        this.saveText();
        this.saveHeader();
        this.editModeBtnText = 'Edit';
        this.editMode = false;
      }
    },
    saveHeader() {
      this.blockState[this.blockIndex].header = this.currentHeader;
      this.updateBlocks(this.blockState);
      this.editMode = false;
    },
    saveText() {
      this.blockState[this.blockIndex].text = this.currentText;
      this.updateBlocks(this.blockState);
      this.editMode = false;
    },
    deleteBlock(blockIndex) {
      console.log(blockIndex);
      const blocksArr = this.blockState;
      blocksArr.splice(blockIndex, 1);
      this.updateBlocks(blocksArr);
    },
  },
  created() {
    this.currentHeader = this.blockState[this.blockIndex].header;
    this.currentText = this.blockState[this.blockIndex].text;
  },
};
</script>

<styles scoped lang="sass">
  .block
    display: flex
    flex-direction: column
    flex-wrap: wrap

  .block__top
    display: flex
    justify-content: flex-end
    margin-bottom: 5px
    h2
      width: 100%
      justify-content: flex-start

  .block__body
    display: flex

  .block__edit-btn
    padding: 3px 5px
    border: 1px solid #000
    border-radius: 5px
    background-color: #ffec84
  .block__edit-btn.isActive
    background-color: #7cd57c

  .block__delete-btn
    padding: 2px 5px
    border: 1px solid #555
    border-radius: 5px
    background-color: #e37676

  .block__header-wrap
    display: flex
    justify-content: space-between
    margin-bottom: 15px
  h2
    font-weight: 600
    font-size: 20px
    line-height: inherit

  // .block__header-input
  //   display: flex
  //   width: 100%
  //   margin-right: 10px
  //   border: none
  //   border-bottom: 1px solid #000
  //   font-weight: 600
  //   font-size: 20px
  //   line-height: inherit
  //   background-color: transparent

  .block__header-edit-btn
    padding: 2px 5px
    border: 1px solid #555

  .block__text-wrap
    display: flex
    justify-content: space-between
    width: 100%

  .block__text
    line-height: inherit

  .block__text-input
    display: flex
    width: 100%
    margin-right: 10px
    border: none
    border-bottom: 1px solid #000
    line-height: inherit
    background-color: transparent

  .block__text-wrap
    display: flex
    justify-content: space-between

  .block__text-edit-btn
    padding: 2px 5px
    border: 1px solid #555
</styles>
