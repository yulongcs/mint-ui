import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import VankeLife from '@/views/vankeLife/index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/vankelife',
      Nmae: 'VankeLife',
      component: VankeLife,
    },
  ],
});
