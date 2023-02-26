<template lang="pug">

.hello
  .container.pro.droppable(
    @drop="onDrop($event, mainBlock)"
    @dragover.prevent
    @dragenter.prevent
  )

    .qwe.draggable.box(
      v-for="(block, index) in blockState"
      :key="block.order"
      @dragstart="onDragStart($event, block.order)"
      draggable="true"
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
      orderCount: 0,
      mainBlock: 'PRO',
      defaultBlocks: [
        {
          id: 0,
          title: 'Content',
          text: 'Some text.',
        },
        {
          id: 1,
          title: 'Cards',
        },
        {
          id: 2,
          title: 'Films',
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
    onDragStart(e, orderCount) {
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.effectAllowed = 'move';
      console.log(orderCount.toString());
      e.dataTransfer.setData('order', orderCount.toString());
    },
    onDrop() {
      // const qwe = parseInt(e.dataTransfer.getData('order'), 10);
      // console.log(qwe);

      let dragSrcEl = null;

      function handleDragStart(e) {
        this.style.opacity = '0.4';

        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
      }

      function handleDragOver(e) {
        if (e.preventDefault) {
          e.preventDefault();
        }

        e.dataTransfer.dropEffect = 'move';

        return false;
      }

      function handleDragEnter() {
        this.classList.add('over');
      }

      function handleDragLeave() {
        this.classList.remove('over');
      }

      function handleDrop(e) {
        if (e.stopPropagation) {
          e.stopPropagation(); // stops the browser from redirecting.
        }

        if (dragSrcEl !== this) {
          dragSrcEl.innerHTML = this.innerHTML;
          this.innerHTML = e.dataTransfer.getData('text/html');
        }

        return false;
      }

      const items = document.querySelectorAll('.container .box');

      function handleDragEnd() {
        this.style.opacity = '1';

        items.forEach((item) => {
          item.classList.remove('over');
        });
      }

      items.forEach((item) => {
        item.addEventListener('dragstart', handleDragStart, false);
        item.addEventListener('dragenter', handleDragEnter, false);
        item.addEventListener('dragover', handleDragOver, false);
        item.addEventListener('dragleave', handleDragLeave, false);
        item.addEventListener('drop', handleDrop, false);
        item.addEventListener('dragend', handleDragEnd, false);
      });
    },

    addBlock(id) {
      const blocksArr = this.blockState;
      const index = this.defaultBlocks.findIndex((x) => x.id === id);
      blocksArr.push({
        ...this.defaultBlocks[index],
        order: this.orderCount,
      });
      this.orderCount += 1;

      // экшн вызовет мутацию и перезапишет state
      this.updateBlocks(blocksArr);
    },
  },
};
</script>

<style lang="sass">
  .pro
    padding: 10px
    background: #cbcbcb
  .qwe
    display: flex
    padding: 10px
    background: #9b9b9b
    margin-bottom: 10px
    h2
      width: 100%
      flex-shrink: 0
      margin-bottom: 15px
      margin-right: 15px
      background: aqua
    .draggable:not(:last-child)
      margin-bottom: 5px
      padding-bottom: 0
    .draggable p
      padding: 5px
      background: #aaa
  .droppable:not(:last-child)
    margin-bottom: 5px

  .btn-wrap
    display: flex

  .btn
    display: flex
    width: fit-content
    padding: 15px
    background-color: green
  .btn:not(:last-child)
    margin-right: 5px

  .box
    border: 3px solid #666
    border-radius: .5em
    padding: 10px
    cursor: move

  .box.over
    border: 3px dotted #666

  [draggable]
    user-select: none
</style>
