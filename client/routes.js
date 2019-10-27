// Import the router
import { RouterFactory, nativeScrollBehavior } from 'meteor/akryum:vue-router2'

// Create router instance
const routerFactory = new RouterFactory({
    mode: 'history',
    scrollBehavior: nativeScrollBehavior
});

// Components
import App from '/client/ui/App/App.vue';
import Test from '/client/ui/Test.vue';
import ErrorPage from '/client/ui/ErrorPage.vue';

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
            children: [
                { path: 'post/:id' }
            ]
        },
        {
            path: '*',
            component: ErrorPage // 404 page not found
        }
    ]);
});

export default routerFactory;