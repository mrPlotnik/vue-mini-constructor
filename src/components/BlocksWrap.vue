<template lang="pug">
.blocks

  //- Content
  .block(v-if="block.id === 0")
    ContentBlock(
      :block="block"
      :blockIndex="blockIndex"
    )

  //- Cards
  .block(v-if="block.id === 1")
    CardsBlock(
      :block="block"
      :blockIndex="blockIndex"
    )
  //- Films
  .block(v-if="block.id === 2")
    MovieBlock(
      :block="block"
      :blockIndex="blockIndex"
    )
</template>

<script>
import ContentBlock from '@/components/ContentBlock.vue';
import CardsBlock from '@/components/CardsBlock.vue';
import MovieBlock from './MovieBlock.vue';

export default {
  name: 'BlocksWrap',
  props: ['block', 'blockIndex'],
  components: { ContentBlock, CardsBlock, MovieBlock },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};

</script>

<style lang="sass">
</style>
