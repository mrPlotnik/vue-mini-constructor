<template lang="pug">
div

  //- Content
  div(v-if="block.id === 0")

    .block__top
      button.btn-reset.btn.block__edit-btn(
        :class="{isActive: isEdit}"
        @click="editMode()"
      ) {{ isEditBtnText }}

    .block

      .block__header-wrap
        h2(v-show="!isEdit") {{ block.header }}
        input.block__header-input(
          type="text"
          v-model="currentHeader"
          v-show="isEdit"
        )

      .block__text-wrap
        .block__text-wrap
          p.block__text(
            v-show="!isEdit"
          ) {{ block.text }}
          input.block__text-input(
            type="text"
            v-model="currentText"
            v-show="isEdit"
          )

    .block__footer
      button.btn-reset.btn.block__delete-btn(
        @click="deleteBlock(index)"
      ) Delete block

  //- Cards
  div(v-if="block.id === 1")
    .wrap
      h2 {{ block.title }}
      button.btn-reset.btn(
        @click="deleteBlock(index)"
      ) Delete

    .input-wrap
      p(
        v-show="!isEdit"
      ) {{ block.text }}

      input.input(
        type="text"
        v-model="currentText"
        v-show="isEdit"
      )

      button.btn-reset.btn(
        @click="editText()"
      ) {{ textEditButton }}

  //- Films
  div(v-if="block.id === 2")
    .wrap
      h2 {{ block.title }}
      button.btn-reset.btn(
        @click="deleteBlock(index)"
      ) Delete

    .input-wrap
      p(
        v-show="!isEdit"
      ) {{ block.text }}

      input.input(
        type="text"
        v-model="currentText"
        v-show="isEdit"
      )

      button.btn-reset.btn(
        @click="editText()"
      ) {{ textEditButton }}

</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'BlockContent',
  props: ['block', 'index'],
  data() {
    return {
      isEdit: false,
      isEditBtnText: 'Edit',
      isEditBtnColor: '#29e129',
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
    editMode() {
      if (!this.isEdit) {
        this.isEdit = true;
        this.isEditBtnText = 'Apply';
      } else {
        this.saveText();
        this.saveHeader();
        this.isEdit = false;
        this.isEditBtnText = 'Edit';
      }
    },
    saveText() {
      this.blockState[this.index].text = this.currentText;
      this.updateBlocks(this.blockState);
    },
    saveHeader() {
      this.blockState[this.index].header = this.currentHeader;
      this.updateBlocks(this.blockState);
    },

    deleteBlock(index) {
      console.log(index);
      const blocksArr = this.blockState;
      blocksArr.splice(index, 1);

      // Записываем в localStorage
      localStorage.setItem('blocks', JSON.stringify(blocksArr));
      // экшн вызовет мутацию и перезапишет state (данными из состояния этого компонента)
      this.updateBlocks(blocksArr);
    },
  },
};

</script>

<style lang="sass">
  .block__top
    display: flex
    justify-content: flex-end

  .block__edit-btn
    margin-bottom: 5px
    padding: 3px 5px
    border: 1px solid #000
    border-radius: 5px
    background-color: #e37676
  .isActive
    background-color: #7cd57c

  .block
    margin-bottom: 5px
    padding: 10px
    background: #cbcbcb
    .draggable p
      padding: 5px
      background: #aaa

  .block__header-wrap
    display: flex
    justify-content: space-between
    margin-bottom: 15px
    h2
      font-weight: 600
      font-size: 20px
      line-height: inherit

  .block__header-input
    display: flex
    width: 100%
    margin-right: 10px
    border: none
    border-bottom: 1px solid #000
    font-weight: 600
    font-size: 20px
    line-height: inherit
    background-color: transparent

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

  .block__footer
    display: flex
    justify-content: flex-end

  .block__delete-btn
    padding: 2px 5px
    border: 1px solid #555
    border-radius: 5px

</style>
