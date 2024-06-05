const children = [
  {
    path: "/localStorage",
    name: "localStorage",
    meta: { title: "本地存储", weight: 1, show: true, roles: [] },
    component: () =>
      import(/* webpackChunkName: 'Home' */ "./index/index.vue")
  }
]

export default children
