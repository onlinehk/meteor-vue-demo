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

import routerFactory from './routes';

// Main app
import AppLayout from '/imports/ui/AppLayout.vue';

Meteor.startup(() => {
  // Start the router
  const router = routerFactory.create();
  new Vue({
    router,
    render: h => h(AppLayout),
  }).$mount('app');
});
