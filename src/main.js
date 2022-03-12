import Vue from 'vue'
import App from './App.vue'
import { Button, Container, Header, Main, Aside } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
