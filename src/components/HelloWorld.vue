<template lang="pug">

div
  div.hello
    .container
      .row

        .droppable(
          v-for="category in categories"
          :key="category.id"
          @drop="onDrop($event, category.id)"
          @dragover.prevent
          @dragenter.prevent
        )
          h2 {{ category.title }}
          .draggable(
            v-for="item in items.filter((x) => x.categoryId === category.id)"
            @dragstart="onDragStart($event, item)"
            draggable="true"
          )
            p {{ item.title }}<br>

</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      items: [
        {
          id: 0,
          title: 'audi',
          categoryId: 0,
        },
        {
          id: 1,
          title: 'BMW',
          categoryId: 0,
        },
        {
          id: 2,
          title: 'Cat',
          categoryId: 1,
        },
        {
          id: 3,
          title: 'Dog',
          categoryId: 1,
        },
      ],
      categories: [
        {
          id: 0,
          title: 'Cars',
        },
        {
          id: 1,
          title: 'Animals',
        },
      ],
    };
  },
  computed: {},
  methods: {
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
  },
};
</script>

<style lang="sass">
  .droppable
    padding: 10px
    background: #ddd
    h2
      margin-bottom: 15px
      background: aqua
    .draggable:not(:last-child)
      margin-bottom: 5px
      padding-bottom: 0
    .draggable p
      padding: 5px
      background: #aaa
  .droppable:not(:last-child)
    margin-bottom: 5px
</style>
