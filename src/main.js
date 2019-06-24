// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'

fastClick.attach(document.body);

Vue.config.productionTip = false

import {
  Alert,
  Input,
  Button,
  Table,
  TableColumn,
  Row,
  Col,
  MessageBox,
  Message,
} from 'element-ui';

Vue.use(Alert);
Vue.use(Input);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Row);
Vue.use(Col);

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
