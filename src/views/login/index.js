export const route = {
  path: '/login',
  component: {
    
  },
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
