import Router from 'vue-router';

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
    },
    require('./views/login').route,
    require('./views/register').route,
  ],
});

export { Router, router };
