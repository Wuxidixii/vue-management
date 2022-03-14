<template>
  <div class="tabs">
    <el-tag
      size="small"
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark ' : 'plain '"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      >{{ tag.label }}</el-tag
    >
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "CommonTag",
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations({
      close: "closeTag",
    }),
    changeMenu(tag) {
      this.$router.push({
        name: tag.name,
      });
    },
    handleClose(tag, index) {
      const length = this.tags.length - 1;
      this.close(tag);
      // 不是当前路由 删除后 高亮位置不变
      if (tag.name !== this.$route.name) return;
      // 当前路由高亮在最右边 删除后高亮位置左移
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        // 当前路由高亮在中间 删除后高亮位置右移
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 5px 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>>