import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../page/home';
import Blog from '../page/blog';
import Detail from '../page/detail';
import Layout from '../components/layout.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'blog',
        name: 'Blog',
        component: Blog
      },
      {
        path: 'detail/:id',
        name: 'Detail',
        props: true,
        component: Detail
      },
    ]
  },
]

const router = new VueRouter({routes});

export default router;