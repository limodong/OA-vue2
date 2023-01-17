import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/base.css'

Vue.config.productionTip = false
// 安装并使用插件
Vue.use(ElementUI);

const app = new Vue({
  router,
  store,
  render: h => h(App)
});
app.$mount('#app');
