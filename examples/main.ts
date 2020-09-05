import { createApp } from 'vue';
import App from './App.vue';

// create instance of App
const app = createApp(App);

// import(ls-ui-styles): style file
import '../styles/index.less';

// import(confirm-component): provide to global
import Confirm from '{packages}/confirm';
app.config.globalProperties.$confirm = Confirm;

// mount App to element#app inside of body
app.mount('#app');
