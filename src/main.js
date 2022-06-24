import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes';
import './style.scss'


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import moment from "moment";
import store from './store/index';

// instance
const FatouApp = createApp(App);



FatouApp.config.globalProperties.$filters = {
    formatExperienceDate(dateString) {
      return moment(dateString, "YYYYMMDD").format('MMMM YYYY')
    },
    formateDate(dateString) {
      return moment(dateString).format('MMMM Do, YYYY')
    },
    formateTime(dateString) {
        return moment(dateString).format('LT');
    }
    
  }
  
FatouApp.use(VueSweetalert2);
FatouApp.use(store);
FatouApp.use(router);
FatouApp.mount('#app');
