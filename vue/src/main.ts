import { createApp } from 'vue';
import './styles/style.css';
import App from './App.vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import router, { initializeRouter } from './router';

const startApp = async () => {
    await initializeRouter(); // Wait for router to fetch valid categories
    const app = createApp(App);
    app.use(router);
    app.mount('#app');
  };
  
  startApp(); 
