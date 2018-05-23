import Tabs  from './tabs.vue';
import TabsItem  from './tabs-item.vue';

const TabsBody = {}

TabsBody.install = function(Vue, pluginOptions = {}) {
  Vue.component(Tabs.name, Tabs);
  Vue.component(TabsItem.name, TabsItem);

}
export default TabsBody

