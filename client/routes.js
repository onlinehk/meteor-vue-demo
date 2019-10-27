// Import the router
import { RouterFactory, nativeScrollBehavior } from 'meteor/akryum:vue-router2'

// Create router instance
const routerFactory = new RouterFactory({
    mode: 'history',
    scrollBehavior: nativeScrollBehavior
});

// Components
import MainNav from '/client/ui/MainNav.vue';
import App from '/client/ui/App/App.vue';
import Test from '/client/ui/Test/Test.vue';
import TestPage1 from '/client/ui/Test/TestPage1.vue';
import TestPage2 from '/client/ui/Test/TestPage2.vue';
import ErrorNav from '/client/ui/ErrorNav.vue';
import ErrorPage from '/client/ui/ErrorPage.vue';

RouterFactory.configure(router => {
    router.addRoutes([
        {
            path: '/',
            name: 'App',
            components: {
                nav: MainNav,
                default: App
            }
        },
        {
            path: '/test',
            name: 'Test',
            components: {
                nav: MainNav,
                default: Test
            },
            children: [
                { path: 'post/:id' },
                { path: 'page/1', component: TestPage1 },
                { path: 'page/2', component: TestPage2 },
            ]
        },
        {
            path: '/error',
            name: 'Error',
            components: {
                nav: ErrorNav,
                default: ErrorPage
            }
        },
        {
            path: '*',
            component: ErrorPage // 404 page not found
        }
    ]);
});

export default routerFactory;