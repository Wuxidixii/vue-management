import Vue from 'vue'
import App from './App.vue'
import { Button, Container, Header, Main, Aside, Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
