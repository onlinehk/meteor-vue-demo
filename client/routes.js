// Import the router
import { RouterFactory, nativeScrollBehavior } from 'meteor/akryum:vue-router2'

// Create router instance
const routerFactory = new RouterFactory({
    mode: 'history',
    scrollBehavior: nativeScrollBehavior
});

// Components
import MainNav from '/imports/ui/MainNav.vue';
import App from '/imports/ui/App/App.vue';
import Test from '/imports/ui/Test/Test.vue';
import TestPage1 from '/imports/ui/Test/TestPage1.vue';
import TestPage2 from '/imports/ui/Test/TestPage2.vue';
import About from '/imports/ui/AboutPage.vue';
import ErrorNav from '/imports/ui/ErrorNav.vue';
import ErrorPage from '/imports/ui/ErrorPage.vue';

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
            path: '/about',
            name: 'About',
            components: {
                nav: MainNav,
                default: About
            }
        },
        {
            path: '*',
            // component: ErrorPage // 404 page not found
            components: {
                nav: ErrorNav,
                default: ErrorPage
            }
        }
    ]);
});

export default routerFactory;