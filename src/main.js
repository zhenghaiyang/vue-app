// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import routes from './router/index.js';
import App from './App'
import VCharts from 'v-charts'
import { ConfirmPlugin,LoadingPlugin,AlertPlugin,ToastPlugin } from 'vux'


Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(VCharts)
Vue.use(VueRouter)
// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  mode: 'history',//'history', //has
  scrollBehavior: () => ({y: 0}), // 滚动条滚动的行为
  routes
})


FastClick.attach(document.body)
Vue.config.productionTip = false
Date.prototype.format = function(format) {
    format = format || 'yyyy-MM-dd';
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
    RegExp.$1.length==1 ? o[k] :
    ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
