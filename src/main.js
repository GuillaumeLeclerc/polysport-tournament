/* vim: set softtabstop=2 shiftwidth=2 expandtab : */
var Vue = require('vue');
var App = require('./app.vue')
var VueRouter = require('vue-router');

import Notifications from './components/notifications.vue'
import TournamentList from './components/tournamentList.vue'
import TournamentDetails from './components/tournamentDetails.vue'

Vue.config.debug = true;
Vue.use(VueRouter);
Vue.component('app', App);

var Notifs = Vue.extend(Notifications);

// The router needs a root component to render.
// For demo purposes, we will just use an empty one
// because we are using the HTML as the app template.
var App = Vue.extend({})

// Create a router instance.
// You can pass in additional options here, but let's
// keep it simple for now.
var router = new VueRouter()

// Define some routes.
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
router.map({
    '/notifications': {
        name: 'notifications',
        component: Notifs
    },
    '/tournaments': {
      name: 'tournamentList',
      component: Vue.extend(TournamentList),
    },
    '/tournament/:id': {
      name: 'tournamentDetails',
      component: Vue.extend({
        template: '<comp :id="$route.params.id"></comp>',
        components: {
          comp: TournamentDetails
        }
      }),
    }
})

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, 'body')
