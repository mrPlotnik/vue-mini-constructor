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
  div(v-if="block.id === 2")
    .wrap
      h2 {{ block.title }}
      button.btn-reset.btn(
        @click="deleteBlock(index)"
      ) Delete

    .input-wrap
      p(
        v-show="!editMode"
      ) {{ block.text }}

      input.input(
        type="text"
        v-model="currentText"
        v-show="editMode"
      )

      button.btn-reset.btn(
        @click="editText()"
      ) {{ textEditButton }}

</template>

<script>
import ContentBlock from '@/components/ContentBlock.vue';
import CardsBlock from '@/components/CardsBlock.vue';

export default {
  name: 'BlocksWrap',
  props: ['block', 'blockIndex'],
  components: { ContentBlock, CardsBlock },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};

</script>

<style lang="sass">
</style>
