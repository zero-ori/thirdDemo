export const route = {
  path: '/register',
  component: {
    render(h) {
      return h('router-view');
    },
  },
  children: [
    {
      path: 'list',
      name: 'register.list',
      component: () => import(/* webpackChunkName: "register" */ './List.vue'),
      meta: {
        matchNav: 'register.list',
      },
    },
  ],
};
