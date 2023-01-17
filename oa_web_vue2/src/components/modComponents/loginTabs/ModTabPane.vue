<template>
  <!-- tab的名称 -->
  <div class="mod_tab_pane" v-show="isActiveToShowContent">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ModTabPane',
  props: {
    label: {
      type: String //标签名
    },
    name: {
      type: String // 每个下方内容区都有自己的name名字
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {

    };
  },
  computed: {
    // 控制根据高亮的tab显示对应标签页内容
    isActiveToShowContent() {
      // this.$parent.value 就是 ModTabs组件的v-model的值
      let activeName = this.$parent.value; // 当前高亮的tab
      let currentName = this.name; // this.name的值有很多个，就是标签页的标签名
      // 谁等于，就显示谁
      return activeName === currentName;

    }
  },
  methods: {}
}

</script>

<style lang='less' scoped>
.mod_tab_pane {
  padding: 12px 0;
}

.tab-content-item {
  padding: 12px;
}
</style>
