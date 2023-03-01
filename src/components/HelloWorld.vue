<template lang="pug">

main
 .container.blocks(:key="reRender")
    .row
      div.blocks__header
        button.btn-reset.btn.block__edit-btn(
          @click="moveMode = moveMode === false ? true : false"
        ) Move mode
    .row
      .draggable.box(
        v-if="moveMode"
        v-for="(block, blockIndex) in blockState"
        draggable="true"
        :class="{over: dragEnterBlockIndex === blockIndex, moveActive: moveMode}"
        @dragstart="dragstart($event, blockIndex)"
        @dragend="dragend($event)"
        @dragover.prevent="dragover($event)"
        @dragenter.prevent="dragenter($event, blockIndex)"
        @drop="drop(blockIndex)"
      )
        BlocksWrap(
          :block="block"
          :blockIndex="blockIndex"
        )
          .content PRO

      .draggable.box(
        v-if="!moveMode"
        v-for="(block, blockIndex) in blockState"
      )
        BlocksWrap(
          :block="block"
          :blockIndex="blockIndex"
        )
          .content PRO

      .btn-wrap
        button.btn-reset.btn(
          @click="addBlock(0)"
        ) Add Content Block
        button.btn-reset.btn(
          @click="addBlock(1)"
        ) Add Cards Block
        button.btn-reset.btn(
          @click="addBlock(2)"
        ) Add Films Block

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BlocksWrap from './BlocksWrap.vue';

export default {
  name: 'HelloWorld',
  components: { BlocksWrap },
  data() {
    return {
      dragBlockIndex: '',
      dragEnterBlockIndex: '',
      reRender: 0,
      moveMode: false,
      defaultBlocks: [
        {
          id: 0,
          header: 'Content',
          text: 'Some text.',
        },
        {
          id: 1,
          header: 'Cards',
          text: 'Some text.',
          cards: [
            {
              cardHeader: 'Card header 1',
              cardText: 'Card text 1',
              cardImg: 'https://i.ibb.co/Pgwz1yx/1655205127-1-gas-kvas-com-p-nosorog-foto-zhivotnogo-1.jpg',
            },
            {
              cardHeader: 'Card header 2',
              cardText: 'Card text 2',
              cardImg: 'https://zookakadu.ru/wp-content/uploads/c/d/5/cd5a47ec4ca47ec711a9e83ab1b53ae3.jpeg',
            },
            {
              cardHeader: 'Card header 3',
              cardText: 'Card text 3',
              cardImg: 'https://placepic.ru/wp-content/uploads/2019/06/s1200-6-6.jpg',
            },
            {
              cardHeader: 'Card header 4',
              cardText: 'Card text 4',
              cardImg: 'https://celes.club/uploads/posts/2021-11/1637324642_43-celes-club-p-nosorogi-zhivotnie-krasivo-foto-51.jpg',
            },
          ],
        },
        {
          id: 2,
          header: 'Films',
          text: 'Some text.',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      blockState: 'blockInfo',
    }),
  },
  methods: {
    ...mapActions(['updateBlocks']),
    // добавить новый блок
    addBlock(blockIndex) {
      this.blockState.push(this.defaultBlocks[blockIndex]);
      this.updateBlocks(this.blockState);
    },
    // пользователь начинает перетаскивание элемента
    dragstart(e, blockIndex) {
      e.target.style.opacity = 0.5;
      e.dataTransfer.effectAllowed = 'move';
      this.dragBlockIndex = blockIndex;
      return blockIndex;
    },
    // перетаскиваемый элемент достигает конечного элемента
    dragenter(e, i) {
      this.dragEnterBlockIndex = i;
    },
    // курсор мыши наведен на элемент при перетаскивании
    dragover(e) {
      e.dataTransfer.dropEffect = 'move';
    },
    // происходит drop элемента
    drop(blockIndex) {
      const blocks = this.blockState;
      // eslint-disable-next-line max-len
      [blocks[this.dragBlockIndex], blocks[blockIndex]] = [blocks[blockIndex], blocks[this.dragBlockIndex]];
      this.dragEnterBlockIndex = '';
      this.updateBlocks(blocks);
      this.reRender += 1;
    },
    // пользователь отпускает курсор мыши в процессе перетаскивания
    dragend(e) {
      e.target.style.opacity = 1;
    },
  },
};
</script>

<style scoped lang="sass">

  .container
    margin: 0 10px
    margin-bottom: 10px

  .blocks__header
    margin-bottom: 10px

  .btn-wrap
    display: flex

  .btn
    display: flex
    width: fit-content

  .btn:not(:last-child)
    margin-right: 5px

  .box
    display: flex
    // border: 1px solid #aaa
    // border-radius: .5em
    margin-bottom: 10px
    // padding: 10px
    background-color: #ddd
  .box.moveActive
    cursor: move
    border-color: transparent
    outline: 2px solid #ccc
  .box.over
    border-color: transparent
    outline: 2px solid green

  .box > div
    width: 100%

  [draggable]
    user-select: none

</style>
