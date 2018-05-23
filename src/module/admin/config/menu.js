export default
[
  {
    id: '1', title: '首页', url: '/home'
  },
  {
    id: '2',
    title: '系统管理',
    url: '/system',
    sub:[
      {
        id:'20',
        title: '账户管理',
        url: '/system/account',
        sub: [
          {id: '22', title: '分组管理', url: '/system/account/group'},
          {id: '23', title: '角色管理', url: '/system/account/role'},
          {id: '24', title: '用户管理', url: '/system/account/user'},
        ]
      },
      {
        id:'25',
        title: '核心管理',
        url: '/system/auth',
        sub: [
          {id: '26', title: '模块管理', url: '/system/auth/module'},
          {id: '27', title: '权限管理', url: '/system/auth/privilege'},
        ]
      },
    ]
  },
  {
    id: '3',
    title: '文章系统',
    url: '/article',
    sub:[
      {
        id:'28',
        title: '文章管理',
        url: '/article',
        sub:[
          {id: '29', title: '文章列表', url: '/article/index'},
          {id: '30', title: '列表管理', url: '/article/list'},
        ]
      }
    ]
  },
  {
    id: '4',
    title: '消息系统',
    url: '/message',
    sub:[
      {
        id:'31',
        title: '消息管理',
        url: '/message',
        sub:[
          {id: '32', title: '消息列表', url: '/message/index'},
          {id: '33', title: '列表管理', url: '/message/list'},
        ]
      }
    ]
  },
  {
    id: '5',
    title: '反馈系统',
    url: '/feedback',
    sub:[
      {
        id:'34',
        title: '反馈管理',
        url: '/feedback',
        sub:[
          {id: '35', title: '反馈列表', url: '/feedback/index'},
          {id: '36', title: '列表管理', url: '/feedback/list'},
        ]
      }
    ]
  }
]
