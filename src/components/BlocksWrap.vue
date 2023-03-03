<template lang="pug">
div

  div(v-if="block.id === 0")
    ContentBlock(
      :block="block"
      :blockIndex="blockIndex"
    )
  div(v-if="block.id === 1")
    CardsBlock(
      :block="block"
      :blockIndex="blockIndex"
    )

  div(v-if="block.id === 2")
    MovieBlock(
      :block="block"
      :blockIndex="blockIndex"
    )
</template>

<script>
import ContentBlock from '@/components/ContentBlock.vue';
import CardsBlock from '@/components/CardsBlock.vue';
import MovieBlock from '@/components/MovieBlock.vue';

export default {
  name: 'BlocksWrap',
  props: ['block', 'blockIndex'],
  components: { ContentBlock, CardsBlock, MovieBlock },
};

</script>
