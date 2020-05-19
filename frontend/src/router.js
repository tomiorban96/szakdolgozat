import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: 'localhost',
  routes: [{
    path: '/',
    name: 'home',
    component: () => import('./components/catalog/Catalog.vue'),
  }]
});