import Vue from 'vue';
import mainStyle from '@/styles/main.sass';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  mainStyle,
  render: (h) => h(App),
}).$mount('#app');
