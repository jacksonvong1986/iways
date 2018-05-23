import shouhou from './menu/shouhou'
import xiaoliang from './menu/xiaoliang'
import chexing from './menu/chexing'

export default [{
  id: '1000',
  title: '概览主页',
  icon: 'icon-fangzi1',
  url: '/home'
}, {
  id: '1001',
  title: '智策',
  subTitle: '智策',
  status: true,
  sub: [{
    id: '1',
    title: '市场预测',
    icon: 'icon-quanshiquyuduibifenxi',
    url: '/zhice/sc'
  }, {
    id: '2',
    title: '车型规划',
    icon: 'icon-cheliang',
    url: '/zhice/cx'
  }, {
    id: '3',
    title: '渠道建设',
    icon: 'icon-tag',
    url: '/zhice/qd'
  }, {
    id: '4',
    title: '销售管理',
    icon: 'icon-recharge',
    url: '/zhice/xl'
  },]
}, {
  id: '1002',
  title: '智库 ',
  subTitle: '智库',
  status: true,
  group_id: ['1033'],
  sub: [{
    title: '乘用车市场 ',
    icon: 'icon-cheliang',
    group_id: ['1033'],
    sub: [{
      id: '6',
      title: '市场预测',
      icon: 'icon-quanshiquyuduibifenxi',
      url: '/zhiku/sc'
    }, {
      id: '7',
      title: '车型规划',
      icon: 'icon-cheliang',
      url: 'http://car.waysdata.com/product/SelectModelController!main.do?urlPath=product/configComparison.do&locale=zh_CN',
      sub: chexing
    }, {
      id: '8',
      title: '销量目标管理',
      icon: 'icon-pingjiafenxi',
      url: '/zhiku/xl',
      sub: xiaoliang
    }, {
      id: '9',
      title: '价格管理',
      icon: 'icon-sponsor',
      url: 'http://car.waysdata.com/price/priceSearch?locale=zh_CN'
    }, {
      id: '10',
      title: '渠道管理',
      icon: 'icon-map',
      url: '/zhiku/qd'
    }, {
      id: '11',
      title: '售后服务',
      icon: 'icon-shouhou',
      url: '/zhiku/sh',
      sub: shouhou,
      group_id: ['1033']
    }, {
      id: '12',
      title: '行业动态',
      icon: 'icon-searchlist',
      url: '/zhiku/hy'
    }, {
      id: '13',
      title: '消费者洞察',
      icon: 'icon-friendfamous',
      url: '/zhiku/xfzdc'
    },]
  }, {
    title: '新能源市场',
    icon: 'icon-sun',
    sub: [{
      id: '14',
      title: '销量管理',
      icon: 'icon-pingjiafenxi',
      url: '/zhiku/ner_xl'
    }, {
      id: '15',
      title: '价格管理',
      icon: 'icon-sponsor',
      url: '/zhiku/ner_jg'
    }, {
      id: '16',
      title: '售后服务',
      icon: 'icon-shouhou',
      url: '/zhiku/ner_sh'
    }, {
      id: '17',
      title: '行业动态',
      icon: 'icon-searchlist',
      url: '/zhiku/ner_hy'
    },]
  },]
},]
