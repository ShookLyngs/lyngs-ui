import { createApp } from 'vue';
import App from './App.vue';

// create instance of App
const app = createApp(App);

// import(confirm-component): provide to global
import Confirm from '{packages}/confirm';
app.use(Confirm);

// mount App to element#app inside of body
app.mount('#app');
