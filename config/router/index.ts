import { Vue } from 'vue-property-decorator';
import VueRouter, { RouteConfig } from 'vue-router';

import { WebPath } from '@/config';

// 此VueRouter是自己自定義引入暴露出來的，即是自定義的，以下的VueRouter同樣是這樣
// 解決兩次訪問相同路由地址報錯
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

//#region import component
//#region Container
const Container = () => import(/* webpackChunkName: "chunk_Container" */ '@/containers/container.vue');
//#endregion

//#region Home
const Home = async () => {
    return (await import(/* webpackChunkName: "chunk_Home" */ '@/views/home')).Home;
};
//#endregion

//#region Login
const Login = async () => {
    return (await import(/* webpackChunkName: "chunk_Login" */ '@/views/login')).Login;
};
//#endregion

//#region DetectList
const CourseManagement = async () => {
    return (await import(/* webpackChunkName: "chunk_Course" */ '@/views/management')).Course;
};
const LocationManagement = async () => {
    return (await import(/* webpackChunkName: "chunk_Location" */ '@/views/management')).Location;
};
const MemberManagement = async () => {
    return (await import(/* webpackChunkName: "chunk_Member" */ '@/views/management')).Member;
};
//#endregion

//#region Download
const CourseDownload = async () => {
    return (await import(/* webpackChunkName: "chunk_CourseDownload" */ '@/views/download')).Course;
};
const LocationDownload = async () => {
    return (await import(/* webpackChunkName: "chunk_LocationDownload" */ '@/views/download')).Location;
};
const MemberDownload = async () => {
    return (await import(/* webpackChunkName: "chunk_MemberDownload" */ '@/views/download')).Member;
};
//#endregion

//#region Change Password
const ChangePassword = async () => {
    return (await import(/* webpackChunkName: "chunk_ChangePassword" */ '@/views/users')).ChangePassword;
};
//#endregion

//#endregion import component

let title: string = require('@/vue.config').pages.title;

let routes: Array<RouteConfig> = [];

routes = [
    //#region Home
    {
        path: WebPath.Home,
        redirect: { name: 'Home' },
        component: Container,
        meta: { title: `${title}-Home` },
        children: [
            {
                path: WebPath.Home,
                name: 'Home',
                component: Home,
                meta: { title: `${title}-Home` },
            },

            //#region Course Download
            {
                path: WebPath.CourseDownload,
                name: 'Course Download',
                component: CourseDownload,
                meta: { title: `${title}-Course Download` },
            },
            //#endregion

            //#region Location Download
            {
                path: WebPath.LocationDownload,
                name: 'Location Download',
                component: LocationDownload,
                meta: { title: `${title}-Location Download` },
            },
            //#endregion

            //#region Member Download
            {
                path: WebPath.MemberDownload,
                name: 'Member Download',
                component: MemberDownload,
                meta: { title: `${title}-Member Download` },
            },
            //#endregion

            //#region Course
            {
                path: WebPath.Course,
                name: 'Course',
                redirect: { name: 'Home' },
                component: Home,
                meta: { title: `${title}-Course` },
            },
            {
                path: WebPath.CourseList,
                name: 'Course List',
                component: CourseManagement,
                meta: { title: `${title}-Course management` },
            },
            //#endregion

            //#region Location
            {
                path: WebPath.Location,
                name: 'Location',
                component: Home,
                meta: { title: `${title}-Location` },
            },
            {
                path: WebPath.LocationList,
                name: 'Location List',
                component: LocationManagement,
                meta: { title: `${title}-Location management` },
            },
            //#endregion

            //#region User
            {
                path: WebPath.User,
                name: 'User',
                component: Home,
                meta: { title: `${title}-User` },
            },
            {
                path: WebPath.UserList,
                name: 'User List',
                component: MemberManagement,
                meta: { title: `${title}-User management` },
            },
            //#endregion

            //#region ChangePassword
            {
                path: WebPath.ChangePassword,
                name: 'Change Password',
                component: ChangePassword,
                meta: { title: `${title}-Change Password` },
            },
            //#endregion
        ],
    },
    //#endregion

    //#region Login
    {
        path: WebPath.Login,
        component: Login,
        meta: { title: `${title}-Login` },
    },
    //#endregion

    {
        path: '*',
        redirect: { name: 'Home' },
    },
];

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach(async (to, from, next) => {
    next();
});

router.afterEach((to, from) => {
    window.document.title = to.meta.title;

    Vue.prototype.$store.routerReload$.next(to.path);
});

export default router;
