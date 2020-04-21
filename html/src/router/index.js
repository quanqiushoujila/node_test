import LoadableComponent from './LoadableComponent'
export default [
  {
    path: '/login',
    label: '登录页',
    component: LoadableComponent(import('@/view/login'))
  },
  {
    path: '/register',
    label: '登录页',
    component: LoadableComponent(import('@/view/register'))
  },
  {
    path: '/list',
    label: '列表页',
    component: LoadableComponent(import('@/view/list'))
  },
]