export const route = {
  path: '/login',
  component: () => import(/* webpackChunkName: "login" */ './List.vue'),
  children: [
    {
      path: 'list',
      name: 'login.list',
      component: () => import(/* webpackChunkName: "login" */ './List.vue'),
      meta: {
        matchNav: 'login.list',
      },
    },
  ],
};
