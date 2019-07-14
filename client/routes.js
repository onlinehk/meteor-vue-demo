// Import the router
import { RouterFactory, nativeScrollBehavior } from 'meteor/akryum:vue-router2'

// Create router instance
const routerFactory = new RouterFactory({
    mode: 'history',
    scrollBehavior: nativeScrollBehavior
});

// Components
import App from '/imports/ui/App.vue';
import Test from '/imports/ui/Test.vue';

RouterFactory.configure(router => {
    router.addRoutes([
        {
            path: '/',
            name: 'App',
            component: App,
        },
        {
            path: '/test',
            name: 'Test',
            component: Test,
        }
    ]);
});

export default routerFactory;