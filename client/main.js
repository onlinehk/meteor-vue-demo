// Libs
import { Meteor } from 'meteor/meteor';
import Vue from 'vue';

// import routes from 'vue-auto-routing';
// import { createRouterLayout } from 'vue-router-layout';
import './main.html';

import VueTracker from 'vue-meteor-tracker';
Vue.use(VueTracker);

import VueMeta from 'vue-meta';
Vue.use(VueMeta);

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import animated from 'animate.css';
Vue.use(animated);

import { globalMixin } from '/imports/js/main'
Vue.mixin(globalMixin);

import routerFactory from './routes';

// Main app
import AppLayout from '/client/ui/AppLayout.vue';

Meteor.startup(() => {
  // Start the router
  const router = routerFactory.create();
  new Vue({
    router,
    render: h => h(AppLayout),
  }).$mount('app');
});