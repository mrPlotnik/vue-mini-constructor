<template lang="pug">

.hello
  .container.pro.droppable(:key="reRender")

    .draggable.box(
      v-for="(block, index) in blockState"
      draggable="true"
      @dragstart="dragstart($event, index)"
      @dragend="dragend($event)"
      @dragover.prevent="dragover($event, block)"
      @dragenter="dragenter($event, block)"
      @dragleave="dragleave($event, block)"
      @drop="drop(index)"
    )
      BlockContent(
        :block="block"
        :index="index"
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
import BlockContent from './BlockContent.vue';

export default {
  name: 'HelloWorld',
  components: { BlockContent },
  data() {
    return {
      dragBlockIndex: '',
      reRender: 0,
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
    addBlock(index) {
      this.blockState.push(this.defaultBlocks[index]);
      this.updateBlocks(this.blockState);
    },
    // пользователь начинает перетаскивание элемента
    dragstart(e, index) {
      e.target.style.opacity = 0.5;
      e.dataTransfer.effectAllowed = 'move';
      this.dragBlockIndex = index;
      return index;
    },
    // перетаскиваемый элемент достигает конечного элемента
    dragenter(e) {
      e.target.classList.add('over');
    },
    // курсор мыши наведен на элемент при перетаскивании
    dragover(e) {
      e.dataTransfer.dropEffect = 'move';
    },
    // курсор мыши покидает пределы перетаскиваемого элемента
    dragleave(e) {
      e.target.classList.remove('over');
    },
    // происходит drop элемента
    drop(index) {
      const blocks = this.blockState;
      [blocks[this.dragBlockIndex], blocks[index]] = [blocks[index], blocks[this.dragBlockIndex]];

      // экшн вызовет мутацию и перезапишет state
      this.updateBlocks(blocks);
      this.reRender += 1;

      // }
    },
    // пользователь отпускает курсор мыши в процессе перетаскивания
    dragend(e) {
      e.target.style.opacity = 1;
    },
  },
};
</script>

<style lang="sass">

  .droppable:not(:last-child)
    margin-bottom: 5px

  .btn-wrap
    display: flex

  .btn
    display: flex
    width: fit-content

  .btn:not(:last-child)
    margin-right: 5px

  .box
    display: flex
    // border: 3px solid #666
    border-radius: .5em
    margin-bottom: 10px
    padding: 10px
    cursor: move
    // background: #9b9b9b
  .box > div
    width: 100%

  .box.over
    border: 3px dotted #666

  [draggable]
    user-select: none
</style>
