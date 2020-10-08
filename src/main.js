/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {
  Button,
  Table,
  Icon,
  Input,
  Modal,
  Radio,
  Form,
  Upload,
  Tree,
  Timeline,
  Tooltip,
  Tabs,
  Checkbox,
  Select,
  InputNumber,
  Dropdown,
  DatePicker,
  Card,
  Steps,
  Spin,
  Row,
  Col,
  Layout,
  Popover,
  Divider,
  Cascader,
  Popconfirm,
  TreeSelect,
  Collapse
} from 'ant-design-vue';
//import 'ant-design-vue/dist/antd.css';
Vue.component(Button.name, Button);
Vue.use(Icon);
Vue.use(Input);
Vue.use(Table);
Vue.use(Modal);
Vue.use(Radio);
Vue.use(Form);
Vue.use(Upload);
Vue.use(Tree);
Vue.use(Timeline);
Vue.use(Tooltip);
Vue.use(Tabs);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(InputNumber);
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.use(Card);
Vue.use(Steps);
Vue.use(Spin);
Vue.use(Row);
Vue.use(Col);
Vue.use(Layout);
Vue.use(Popover);
Vue.use(Divider);
Vue.use(Cascader);
Vue.use(Popconfirm);
Vue.use(TreeSelect);
Vue.use(Collapse);
console.log(Button.name, 'sadasd')

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#appx");
