import { createApp } from 'vue';
import './styles/style.css';
import App from './App.vue';
import router from './router';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

createApp(App).use(router).mount('#app');
