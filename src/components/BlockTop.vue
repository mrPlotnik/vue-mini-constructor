<template lang="pug">
div
  .block__top

    .block__header
      h2.block__top-header(v-if="!editMode" ) {{ header }}
      input.input.block__top-header-input(
        v-if="editMode"
        type="text"
        v-model="currentBlockHeader"
      )

    .block__top-btns
      BlockMoveBtns(
        v-if="editMode"
        :blockIndex="blockIndex"
      )
      BlockTopBtns(
        :blockIndex="blockIndex"
      )

</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BlockMoveBtns from '@/components/btns/BlockMoveBtns.vue';
import BlockTopBtns from '@/components/btns/BlockTopBtns.vue';

export default {
  name: 'BlockTop',
  props: ['blockIndex', 'header'],
  components: { BlockMoveBtns, BlockTopBtns },
  data() {
    return {
      currentBlockHeader: '',
    };
  },
  computed: {
    ...mapGetters({
      state: 'blockInfo',
      editMode: 'editMode',
    }),
  },
  methods: {
    ...mapActions(['updateBlockHeader']),
    saveBlockHeader() {
      if (this.currentBlockHeader !== '') {
        this.updateBlockHeader({
          blockId: this.blockIndex,
          header: this.currentBlockHeader,
        });
      }
    },
  },
  created() {
    this.currentBlockHeader = this.header;
  },
  watch: {
    editMode(bool) {
      if (!bool) {
        this.saveBlockHeader();
      }
    },
  },
};
</script>
