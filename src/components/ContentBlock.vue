<template lang="pug">
#content.block
  .container.container-style
    BlockTop(
        :header="block.header"
        :blockIndex="blockIndex"
      )

    .block__body
      p(v-if="!editMode") {{ block.text }}
      textarea.textarea.block__text-input(
        v-if="editMode"
        v-model="currentText"
      )
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BlockTop from '@/components/BlockTop.vue';

export default {
  name: 'ContentBlock',
  props: ['block', 'blockIndex'],
  components: { BlockTop },
  data() {
    return {
      currentText: '',
    };
  },
  computed: {
    ...mapGetters({
      editMode: 'editMode',
    }),
  },
  methods: {
    ...mapActions(['updateBlockText']),
    saveBlockText() {
      if (this.currentText !== '') {
        this.updateBlockText({
          blockId: this.blockIndex,
          text: this.currentText,
        });
      }
    },
  },
  created() {
    this.currentText = this.block.text;
  },
  watch: {
    editMode(bool) {
      if (!bool) {
        this.saveBlockText();
      }
    },
  },
};
</script>

<styles scoped lang="sass">
</styles>
