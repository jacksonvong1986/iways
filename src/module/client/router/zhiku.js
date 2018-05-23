import Home from '../page/home/index.vue'

//车型规划
import block from '../page/zhiku/cyc/chexing/block.vue'
import price from '../page/zhiku/cyc/chexing/selfmadeVa.vue'
import model from '../page/zhiku/cyc/chexing/selfmadeVb.vue'
import list from '../page/zhiku/cyc/chexing/selfmadeVc.vue'
import preview from '../page/zhiku/cyc/chexing/selfmadeVd.vue'
import userNeed from '../page/zhiku/cyc/chexing/improvesetVa.vue'
import complain from '../page/zhiku/cyc/chexing/improvesetVb.vue'
import compete from '../page/zhiku/cyc/chexing/compete.vue'
import tendency from '../page/zhiku/cyc/chexing/tendency.vue'



//销量目标
import salesSetting from '../page/zhiku/cyc/sales/setting.vue'
import countrySit from '../page/zhiku/cyc/sales/countrySituation.vue'
import countrySetTargetVa from '../page/zhiku/cyc/sales/countrySetTargetVa.vue'
import countrySetTargetVb from '../page/zhiku/cyc/sales/countrySetTargetVb.vue'
import countrySetTargetVc from '../page/zhiku/cyc/sales/countrySetTargetVc.vue'
import countrySetTargetVd from '../page/zhiku/cyc/sales/countrySetTargetVd.vue'
import countrySetTargetVe from '../page/zhiku/cyc/sales/countrySetTargetVe.vue'
import countryTargetList from '../page/zhiku/cyc/sales/countryTargetList.vue'
import countryTargetDetail from '../page/zhiku/cyc/sales/countryTargetDetail.vue'
import countryAlarm from '../page/zhiku/cyc/sales/countryAlarm.vue'
import countryAlarmDetail from '../page/zhiku/cyc/sales/countryAlarmDetail.vue'
import areaSit from '../page/zhiku/cyc/sales/areaSituation.vue'
import areaSetTargetVa from '../page/zhiku/cyc/sales/areaSetTargetVa.vue'
import areaSetTargetVb from '../page/zhiku/cyc/sales/areaSetTargetVb.vue'
import areaSetTargetVc from '../page/zhiku/cyc/sales/areaSetTargetVc.vue'
import areaSetTargetVd from '../page/zhiku/cyc/sales/areaSetTargetVd.vue'
import areaSetTargetVe from '../page/zhiku/cyc/sales/areaSetTargetVe.vue'
import areaTargetList from '../page/zhiku/cyc/sales/areaTargetList.vue'
import areaTargetDetail from '../page/zhiku/cyc/sales/areaTargetDetail.vue'
import areaAlarm from '../page/zhiku/cyc/sales/areaAlarm.vue'
import areaAlarmDetail from '../page/zhiku/cyc/sales/areaAlarmDetail.vue'
import provinceSit from '../page/zhiku/cyc/sales/provinceSituation.vue'
import provinceTarList from '../page/zhiku/cyc/sales/provinceTargetList.vue'
import provinceTarDet from '../page/zhiku/cyc/sales/provinceTargetDetail.vue'
import provinceAla from '../page/zhiku/cyc/sales/provinceAlarm.vue'
import provinceAlaDet from '../page/zhiku/cyc/sales/provinceAlarmDetail.vue'

// 渠道
import shangquan from '../page/zhiku/cyc/qudao/shangquan.vue'

// 售后
import ShIndex from '../page/zhiku/cyc/shouhou/index.vue'
import ShDetail from '../page/zhiku/cyc/shouhou/detail.vue'
import pjjgcx from '../page/zhiku/cyc/shouhou/pjjgcx.vue'
import pjjgbj from '../page/zhiku/cyc/shouhou/pjjgbj.vue'
import pjjgyzcjgbj from '../page/zhiku/cyc/shouhou/pjjgyzcjgbj.vue'
import pjjgpllbj from '../page/zhiku/cyc/shouhou/pjjgpllbj.vue'
import pjjgplzbj from '../page/zhiku/cyc/shouhou/pjjgplzbj.vue'
import pjjgcyfx from '../page/zhiku/cyc/shouhou/pjjgcyfx.vue'
import gsjgcx from '../page/zhiku/cyc/shouhou/gsjgcx.vue'
import gsjgbj from '../page/zhiku/cyc/shouhou/gsjgbj.vue'
import yccbcx from '../page/zhiku/cyc/shouhou/yccbcx.vue'
import yccbbj from '../page/zhiku/cyc/shouhou/yccbbj.vue'
import sjxz from '../page/zhiku/cyc/shouhou/sjxz.vue'
import bgxz from '../page/zhiku/cyc/shouhou/bgxz.vue'

import nerhyxz from '../page/zhiku/xny/hangye/load.vue'


// iframe连接
import chexingguihua from '../page/zhiku/cyc/iframe/chexingguihua.vue'
import jiageguanli from '../page/zhiku/cyc/iframe/jiageguanli.vue'
import policy from '../page/zhiku/cyc/iframe/hangyezhengce.vue'


export default [
  {path: '/zhiku/sc', component: Home},

  // {path: '/zhiku/cx', redirect: '/zhiku/cx/smzqghkb'},
  {path: '/zhice/cx', component: block},
  {path: '/zhice/cx/optimize/selfmade', component: price},
  {path: '/zhice/cx/optimize/selfmade/setva', component: price},
  {path: '/zhice/cx/optimize/selfmade/setvb', component: model},
  {path: '/zhice/cx/optimize/selfmade/setvc', component: list},
  {path: '/zhice/cx/optimize/selfmade/setvd', component: preview},
  {path: '/zhice/cx/optimize/improveset', component: userNeed},
  {path: '/zhice/cx/optimize/improveset/setva', component: userNeed},
  {path: '/zhice/cx/optimize/improveset/setvb', component: complain},
  {path: '/zhice/cx/optimize/improveset/setvc', component: compete},
  {path: '/zhice/cx/optimize/improveset/setvd', component: tendency},

  {path: '/zhiku/chexingguihua', component: chexingguihua},
  {path: '/zhiku/jiageguanli', component: jiageguanli},
  {path: '/zhiku/policy', redirect: '/zhiku/policy/home'},
  {path: '/zhiku/policy/home', component: policy},
  {path: '/zhiku/policy/policies', component: policy},
  {path: '/zhiku/policy/search', component: policy},
  {path: '/zhiku/policy/reports', component: policy},

  {path: '/zhiku/xl'},
  {path: '/zhiku/xl/country', redirect: '/zhiku/xl/country/setting'},
  {path: '/zhiku/xl/country/setting', component: salesSetting},
  {path: '/zhiku/xl/country/situation', component: countrySit},
  {path: '/zhiku/xl/country/target', component: countrySetTargetVa},
  {path: '/zhiku/xl/country/target/setva', component: countrySetTargetVa},
  {path: '/zhiku/xl/country/target/setvb', component: countrySetTargetVb},
  {path: '/zhiku/xl/country/target/setvc', component: countrySetTargetVc},
  {path: '/zhiku/xl/country/target/setvd', component: countrySetTargetVd},
  {path: '/zhiku/xl/country/target/setve', component: countrySetTargetVe},
  {path: '/zhiku/xl/country/target/list', component: countryTargetList},
  {path: '/zhiku/xl/country/target/detail',  component: countryTargetDetail},
  {path: '/zhiku/xl/country/alarm', component: countryAlarm, meta:{keepAlive:true}},
  {path: '/zhiku/xl/country/alarm/detail',   component: countryAlarmDetail, meta:{keepAlive:true}},
  {path: '/zhiku/xl/area', redirect: '/zhiku/xl/area/setting'},
  {path: '/zhiku/xl/area/situation', component: areaSit},
  {path: '/zhiku/xl/area/target', component: areaSetTargetVa},
  {path: '/zhiku/xl/area/target/setva', component: areaSetTargetVa},
  {path: '/zhiku/xl/area/target/setvb', component: areaSetTargetVb},
  {path: '/zhiku/xl/area/target/setvc', component: areaSetTargetVc},
  {path: '/zhiku/xl/area/target/setvd', component: areaSetTargetVd},
  {path: '/zhiku/xl/area/target/setve', component: areaSetTargetVe},
  {path: '/zhiku/xl/area/target/list', component: areaTargetList},
  {path: '/zhiku/xl/area/target/detail',  component: areaTargetDetail},
  {path: '/zhiku/xl/area/alarm', component: areaAlarm, meta:{keepAlive:true}},
  {path: '/zhiku/xl/area/alarm/detail',   component: areaAlarmDetail, meta:{keepAlive:true}},
  {path: '/zhiku/xl/province', redirect: '/zhiku/xl/province/setting'},
  {path: '/zhiku/xl/province/situation', component: provinceSit},
  {path: '/zhiku/xl/province/target', component: provinceTarList},
  {path: '/zhiku/xl/province/target/list', component: provinceTarList},
  {path: '/zhiku/xl/province/target/detail', component: provinceTarDet},
  {path: '/zhiku/xl/province/alarm', component: provinceAla, meta:{keepAlive:true}},
  {path: '/zhiku/xl/province/alarm/detail', component: provinceAlaDet, meta:{keepAlive:true}},


  {path: '/zhiku/jg', component: Home},
  {path: '/zhiku/qd', component: shangquan},

  {path: '/zhiku/sh', component: ShIndex, meta:{keepAlive:true}},
  {path: '/zhiku/sh/detail', component: ShDetail, meta:{keepAlive:true}},
  {path: '/zhiku/sh/pjbj', component: Home, meta:{keepAlive:true}},
  {path: '/zhiku/sh/pjjgcx', component: pjjgcx, meta:{keepAlive:true}},
  {path: '/zhiku/sh/pjjgbj', component: pjjgbj, meta:{keepAlive:true}},
  {path: '/zhiku/sh/pjjgyzcjgbj', component: pjjgyzcjgbj, meta:{keepAlive:true}},
  {path: '/zhiku/sh/pjjgpllbj', component: pjjgpllbj, meta:{keepAlive:true}},
  {path: '/zhiku/sh/pjjgplzbj', component: pjjgplzbj, meta:{keepAlive:true}},
  {path: '/zhiku/sh/pjjgcyfx', component: pjjgcyfx, meta:{keepAlive:true}},
  {path: '/zhiku/sh/ycbj', component: Home, meta:{keepAlive:true}},
  {path: '/zhiku/sh/gsjgcx', component: gsjgcx, meta:{keepAlive:true}},
  {path: '/zhiku/sh/gsjgbj', component: gsjgbj, meta:{keepAlive:true}},
  {path: '/zhiku/sh/yccbcx', component: yccbcx, meta:{keepAlive:true}},
  {path: '/zhiku/sh/yccbbj', component: yccbbj, meta:{keepAlive:true}},
  {path: '/zhiku/sh/xz', component: Home, meta:{keepAlive:true}},
  {path: '/zhiku/sh/xz/sj', component: sjxz, meta:{keepAlive:true}},
  {path: '/zhiku/sh/xz/bg', component: bgxz, meta:{keepAlive:true}},

  {path: '/zhiku/hy', component: Home},
  {path: '/zhiku/xfzdc', component: Home},
  {path: '/zhiku/ner_xl', component: Home},
  {path: '/zhiku/ner_jg', component: Home},
  {path: '/zhiku/ner_sh', component: Home},
  {path: '/zhiku/ner_hy', component: nerhyxz},
]
