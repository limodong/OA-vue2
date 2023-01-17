<template>
  <div class="tab-nav">
    <div class="tab-nav-item-box" :style="{ 'width': width }">
      <div ref="tabNav" :class="['tab-nav-item', tabItem.name === activeName ? 'highLight' : '',
      tabItem.disable ? 'isForbiddenItem' : '']" v-for="(tabItem, index) in tabItemArr" :index="index"
        @click="changeActiveTab(tabItem, index)">{{ tabItem.label }}</div>
      <div class="tabs-bar" :style="{ 'width': tabsBarWidth }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModTabNav',
  props: {
    width: {
      type: String,
      default: "100%"
    },
    // tabNav内容区的数组数据，非常重要
    tabItemArr: {
      type: Array,
      default: [],
    },
    // 选中的tab页，激活当前的tab名字
    activeName: {
      type: String,
      default: ""
    },
    // 接收点击选项卡函数，在点击选项卡的时候触发
    onTabClick: {
      type: Function
    }
  },
  data() {
    return {
      tabsBarWidth: null,
      count: 0
    };
  },
  updated() {
    this.getTabsBarWidth();
  },
  methods: {
    getTabsBarWidth() {
      ++this.count;
      // console.log(this.count);
      if (this.$refs.tabNav && this.tabsBarWidth == null) {
        let width = this.$refs.tabNav[0].clientWidth;
        this.tabsBarWidth = width + "px";
        // console.log(`执行了${this.count}次`);
      }
    },
    changeActiveTab(tabItem) {
      // 如果点的是自己就不执行
      if (tabItem.name === this.activeName) return;
      // 如果包含禁用项disabled属性（即处于禁用状态），也不让执行（搭配.isForbiddenItem类名）
      if (tabItem.disable) return;
      // 进行tab切换
      this.onTabClick(tabItem);
    }
  }
}

</script>

<style lang='less' scoped>
.tab-nav {
  display: flex;
  justify-content: center;

  .tabs-bar {
    position: absolute;
    bottom: 0;
    height: 2px;
    background-color: var(--theme-color);
  }
}

.tab-nav-item-box {
  position: relative;
  display: flex;
  // width: 100%;
  // border-bottom: 1px solid #e9e9e9;

  .tab-nav-item {
    flex: 1;
    text-align: center;
    // 垂直居中
    height: 40px;
    line-height: 40px;
    // 字体样式位置设置一下
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    // margin: 0 12px;
    cursor: pointer;
  }

  // 非禁用时鼠标悬浮样式，注意这里not的使用
  .tab-nav-item:not(.isForbiddenItem):hover {
    color: #409eff;
  }

  // 高亮项样式
  .highLight {
    color: #409eff;
    // border-bottom: 2px solid #409eff;
  }

  // 禁用项样式
  .isForbiddenItem {
    cursor: not-allowed;
    color: #aaa;
  }
}
</style>
