<script>
import ModTabNav from './ModTabNav.vue';
export default {
  components: { ModTabNav },
  name: 'ModTabs',
  props: {
    // 父组件用v-model传参，子组件必须需要用value去接收参数，方可接到v-model="activeName"绑定的activeName的值
    value: null, // 接收到的值就是选中高亮的哪一项
    // 传递一个函数，tab切换的函数钩子。若返回 false 或者返回 Promise 且被 reject，则阻止切换
    beforeLeave: {
      type: Function,
      default: () => {
        return true; // 默认是可以切换tab的
      }
    },
    width: null
  },
  data() {
    return {
      tabItemArr: [], //用于传递tabNav组件中的数据
      activeName: this.value //选中高亮的tab标签页选项卡
    };
  },
  mounted() {
    /**
     * 计算tab页的组件内容信息,将需要的信息存在tabItemArr数组中
     * 并传递给tabNav组件，tabNav组件根据tabItemArr的信息去用v-for渲染
     */
    console.log("组件初始化完成");
    this.calcTabItemInstances();
  },
  methods: {
    calcTabItemInstances() {
      // 重点方法
      // 获取使用ModTabs组件中间的内容
      if (this.$slots.default) { // 如果ModTabs组件中间插槽有内容
        // 搜集 ModTabs 组件中间的插槽内容数组
        let slotTabItemArr = this.$slots.default;
        // console.log("slotTabItemArr", slotTabItemArr);

        this.tabItemArr = slotTabItemArr.map((item) => {
          return item.componentInstance; // 只保留componentInstance组件实例，可以理解为组件的this
        })
        // console.log('this.tabItemArr', this.tabItemArr)
      } else {
        this.tabItemArr = [];// 没传递就置为空
      }
    },
    handleTabClick(tabItem) {
      this.$emit("tabClick", tabItem); // 点击tab后通知父组件，告诉它是哪个tab点击了
      let newTabName = tabItem.name; // 获取最新tab的名字
      this.setCurrentName(newTabName); //执行tab名称更新的方法
    },

    async setCurrentName(newTabName) {
      let prevTabName = this.activeName; // 要更新了，要把当下选中的tab变为旧的
      let res = await this.beforeLeave(newTabName, prevTabName); // 等待res的结果，有结果后在执行下面的代码
      if (res) {
        this.$emit("input", newTabName); // 更父组件的v-model绑定的值
        this.activeName = newTabName; // 也更新一下自身
      }

    }
  },
  render(h) {
    // 准备参数，方便把参数传递给TabNav组件
    const navData = {
      props: {
        tabItemArr: this.tabItemArr, // tab导航页相关的信息
        activeName: this.activeName, // 当前选中高亮的tab
        onTabClick: this.handleTabClick, // 点击tab的回调
        width: this.width // tab标签的宽度
      }
    }
    return (
      <div class="tab-box">
        <mod-tab-nav {...navData}></mod-tab-nav>
        <div class="tab-content-item-box">{this.$slots.default}</div>
      </div>
    );
    /**
    * 注意：<div class="tab-content-item-box">{this.$slots.default}</div>写法，正常会把所有的都渲染出来
    * 所以我们在myTabContent组件中再加一个判断(v-show="isActiveToShowContent")，看看当前高亮的名字是否和组件的名字一致，
    * 一致才渲染.这样的话，同一时刻，根据myTabContent组件的name属性，只会对应渲染一个
    * */
  }
}

</script>

<style lang='less' scoped>

</style>
