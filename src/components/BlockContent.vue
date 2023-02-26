<template lang="pug">
div

  //- Content
  div(v-if="block.id === 0")
    .wrap
      h2 {{ block.title }}
      button.btn-reset.btn(
        @click="deleteBlock(block.index)"
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

  //- Cards
  div(v-if="block.id === 1")
    .wrap
      h2 {{ block.title }}
      button.btn-reset.btn(
        @click="deleteBlock(block.index)"
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
        @click="deleteBlock(block.index)"
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
      currentText: '',
      textEditButton: 'Edit',
    };
  },
  computed: {
    ...mapGetters({
      blockState: 'blockInfo',
    }),
  },
  methods: {
    ...mapActions(['updateBlocks']),
    deleteBlock(index) {
      const blocksArr = this.blockState;
      blocksArr.splice(index, 1);

      // Записываем в localStorage
      localStorage.setItem('blocks', JSON.stringify(blocksArr));
      // экшн вызовет мутацию и перезапишет state (данными из состояния этого компонента)
      this.updateBlocks(blocksArr);
    },
    editText() {
      if (this.isEdit === false) {
        this.textEditButton = 'Apply';
        this.isEdit = true;
      } else {
        this.textEditButton = 'Edit';
        const blocksArr = this.blockState;
        blocksArr[this.index].text = this.currentText;
        this.updateBlocks(blocksArr);
        this.isEdit = false;
      }
    },
  },
};

</script>

<style lang="sass">
  .wrap
    display: flex
    justify-content: space-between
</style>
