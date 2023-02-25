<template lang="pug">

div
  div.hello
    .container

      .droppable(
        v-for="(block, index) in blockState"
        :key="block.order"
        @drop="onDrop($event, block.id)"
        @dragover.prevent
        @dragenter.prevent
      )
        .row
          h2 {{ block.title }}
          button.btn-reset.btn(
            @click="deleteBlock(index)"
          ) Delete

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

export default {
  name: 'HelloWorld',
  data() {
    return {
      defaultBlocks: [
        {
          id: 0,
          title: 'Content',
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
    onDragStart(e, item) {
      e.dataTransfer.dropEffect = 'move';
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('itemId', item.id.toString());
    },
    onDrop(e, categoryId) {
      const itemId = parseInt(e.dataTransfer.getData('itemId'), 10);

      this.items = this.items.map((x) => {
        if (x.id === itemId) {
          // eslint-disable-next-line no-param-reassign
          x.categoryId = categoryId;
        }
        return x;
      });
    },
    addBlock(id) {
      const blocksArr = this.blockState;
      const index = this.defaultBlocks.findIndex((x) => x.id === id);
      blocksArr.push({ ...this.defaultBlocks[index] });

      // Записываем в localStorage
      localStorage.setItem('blocks', JSON.stringify(blocksArr));
      // экшн вызовет мутацию и перезапишет state
      this.updateBlocks(blocksArr);
    },
    deleteBlock(index) {
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
  .row
    display: flex
    justify-content: space-between

  .droppable
    padding: 10px
    background: #ddd
    h2
      width: 100%
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
</style>
