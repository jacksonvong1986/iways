import JQuery from 'jquery'
import { mapActions } from 'vuex'
import { USER_REFRESH_TOKEN } from '@/store/user'
import moment from 'moment'

export default {
	data() {
    return {
      image_path: 'http://dss.ways.cn/images29',
      color_group: {
        pink: '#fb6c72',
        orange: '#fc9e6b',
        blue: '#319bcd',
        green: '#91bb3d',
        gray: '#80858b',
        red: '#f04048',
        yellow:'#f0ad4e',
        cyan:'#39bdc4'
    	},
      username: this.$store.state.user.username,
      token: this.$store.state.user.token,
      menus: [],
      menus_table: [],
      manf_id: 25,
      manf_id_selected: 25,
      ds_id: 4,
      ds_id_selected: 4,
      this_year_month: '',
      this_year_month_selected: '',
      warning_year_month_week: '',

      dataSource: [],
      manfInfo: [],
      manfs:[],

      editable: true,
      isDragging: false,
      delayedDragging:false,
      scroll_selected: 0,

      config2: false, //默认展开
      rightPanelOpen: false, //默认关闭
      jumpIndexPage: false, //默认显示首页
      showNotify: true, //默认显示通知
      showUnread: true, //默认显示未读数
      editable: false, //默认不可编辑拖动
      config: [],

      attempt_times: 3,
    }
	},
  mounted() {
    this.menus = []
    let menus_temp = this.extendDeep(this.$store.state.user.menus)
    for (let key in menus_temp) {
      this.menus.push(menus_temp[key])
    }
    this.menus_table = this.$helper.arr2table(this.menus || [])
  },
  computed: {
    this_year: function() {
        return this.this_year_month ? this.this_year_month.substr(0,4) : '';
    },
    this_month: function() {
        return this.this_year_month ? this.this_year_month.substr(-2).replace(/\b(0+)/gi,"") : '';
    },
    // year_month: function() {
    // 	if (this.this_year_month) {
    //       var year_month_arr = this.this_year_month.split('');
    //       year_month_arr.splice(4, 0, '/');
    //       return year_month_arr.join('');
    //   }
    // },
    warning_year: function() {
        return this.warning_year_month_week.substr(0,4);
    },
    warning_month: function() {
        return this.warning_year_month_week.substr(4,2).replace(/\b(0+)/gi,"");
    },
    warning_week: function() {
        return this.warning_year_month_week.substr(-1);
    },
    begin_year_month: function(){
      var dataSource = this.data_source_map();
      return !!dataSource[this.ds_id] ? dataSource[this.ds_id]['begin_ym'] + "" : "";
    },
    end_year_month: function(){
      var dataSource = this.data_source_map();
      return !!dataSource[this.ds_id] ? dataSource[this.ds_id]['end_ym'] + "" : "";
    },
    warning_month_week: function() {
      return this.warning_year_month_week.substr(4,2).replace(/\b(0+)/gi,"")
        + '月W' + this.warning_year_month_week.substr(-1) + '周';
    },
    warning_end_year_month_week: function() {
      var dataSource = this.data_source_map();
      return !!dataSource[this.ds_id] ? dataSource[this.ds_id]['warning_end'] + "" : "";
    },
    ds_name: function() {
      var data_source = this.data_source_map();
      if (data_source.hasOwnProperty(this.ds_id)) {
          return data_source[this.ds_id]['name'] || '';
      }
    },
    // manf_name: {
    //   get: function () {
    //     var data = this.get_manfs_map();
    //     if (data.hasOwnProperty(this.manf_id)) {
    //       return data[this.manf_id]['manf_name'] || '';
    //     }
    //     return ''
    //   },
    // },
    panelOptions () {
      return  {
        draggable: '.bi-panel',
        animation: 10,
        group: 'panel',
        disabled: !this.editable,
        filter: '.bi-panel-body',
        preventOnFilter: true,
        chosenClass: 'sortable-chosen',
        dragClass:'sortable-drag',
        ghostClass: 'sortable-ghost'
      };
    },
    itemOptions () {
      let options = [];
      for (let i = 0 ; i < 3 ; i++) {
        options.push({
          animation: 200,
          group: 'item' + i,
          disabled: !this.editable,
          filter: i == 2 ? '.scene-table' : '.bi-cell',
          preventOnFilter: true,
          chosenClass: 'sortable-chosen',
          dragClass:'sortable-drag',
          ghostClass: 'sortable-ghost'
        });
      }
      return options;
    },
    cellOptions () {
      let options = [];
      for (let i = 0 ; i < 4 ; i++) {
        options.push({
          animation: 500,
          group: 'cell' + i,
          disabled: !this.editable,
          filter: i == 4 ? '.scene-table' : 'b,em,i,font,p,cite',
          preventOnFilter: true,
          chosenClass: 'sortable-chosen',
          dragClass:'sortable-drag',
          ghostClass: 'sortable-ghost'
        });
      }
      return options;
    },
  },
  filters: {
    multiply: function (number, multiplier) {
        if (multiplier != 1) {
            number = number * multiplier;
        }
        return number;
    },
    divide: function (number, divisor) {
        if (divisor != 1) {
            number = number / divisor;
        }
        return number;
    },
    number_format: function (number, decimals = 0, separator = ',') {
        if (!number || number == "" || isNaN(number)) {
            number = 0;
        }
        // if (number === -1) {
        //   return '暂无数据'
        // }
        number = Number(number).toFixed(decimals);
        if (separator != "") {
            var reg=/\d{1,3}(?=(\d{3})+$)/g;
            number = (number + '').replace(reg, '$&' + separator);
        }
        return number;
    },
    date_format(date, pattern = 'YYYY/MM/DD') {
        if (!date) return date
        return moment(date).format(pattern)
    }
  },
  methods: {
    ...mapActions([USER_REFRESH_TOKEN]),
    clearValidate(formName) {
      if (this.$refs[formName]) {
        this.$refs[formName].clearValidate()
      }
    },
    multiply: function (number, multiplier) {
        if (multiplier != 1) {
            number = number * multiplier;
        }
        return number;
    },
    divide: function (number, divisor) {
        if (divisor != 1) {
            number = number / divisor;
        }
        return number;
    },
    number_format: function (number, decimals = 0, separator = ',') {
      if (!number || number == "" || isNaN(number)) {
          number = 0;
      }
      if (number === -1) {
        return '暂无数据'
      }
      number = parseInt(number).toFixed(decimals);
      if (separator != "") {
          var reg=/\d{1,3}(?=(\d{3})+$)/g;
          number = (number + '').replace(reg, '$&' + separator);
      }
      return number;
    },
    get_manfs_map: function(data = this.manfs, pk = 'manf_id') {
        var dataMap = {};
        for (var x in data) {
            dataMap[data[x][pk]] = data[x];
        }
        return dataMap;
    },
    data_source_map: function(data = this.dataSource, pk = 'ds_id') {
        var dataMap = {};
        for (var x in data) {
            for (var y in data[x]) {
                if (data[x][y][pk]) {
                    dataMap[data[x][y][pk]] = data[x][y];
                }
            }
        }
        return dataMap;
    },
    getToken(callback) {
      if (!this.token) {
        // this.$router.push({path: '/login'})
        window.location.href = '/login'
      } else {
        typeof callback == 'function' ? callback() : ''
      }
    },
    failure(response) {
      var code = response.code || response.result_msg
      switch (code) {
        case 'Bad Request: Token is invalid':
        case 'ACCESS_TOKEN_FAILD':
          this.$request.get(this.$interface.REFRESH, {
            'refresh_token': this.$store.state.user.refresh_token
          }, (response) => {
              this.USER_REFRESH_TOKEN(response.data.token)
              this.$router.go(0)
          }, this.failure);
          break;
        case 'REFRESH_TOKEN_EXPIRED':
          this.$router.push({path: '/login'})
          break;
        case 'NO_PERMISSION':
          this.$router.go(-1)
          break;
        default:
          this.$notify.error({
            title: '错误信息',
            message: '[code:' + (response.result_code || response.code || '400')+ ']' + (response.result_msg || response.msg || '数据有误')
          });
          break;
      }
    },
    onOver() {
      var that = this;
      JQuery('.hot-spots')
        .on('mouseover', function(event) {
          if (!that.editable) return;
          var tag = event.target;
          while (tag.tagName.toUpperCase() != 'ABBR') {
            tag = tag.parentNode;
          }
          var parentNode = tag.parentNode;
          var cls = parentNode.getAttribute('class') || '';
          parentNode.setAttribute('class', cls + ' over-on');
        }).on('mouseout', function(event) {
          if (!that.editable) return;
          var tag = event.target;
          while (tag.tagName.toUpperCase() != 'ABBR') {
            tag = tag.parentNode;
          }
          var parentNode = tag.parentNode;
          var cls = parentNode.getAttribute('class') || '';
          parentNode.setAttribute('class', cls.replace(' over-on', ''));
        })
    },
    onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
    onStart ({oldIndex, newIndex}) {
      this.isDragging = true;
    },
    onEnd ({oldIndex, newIndex}) {
      var draggedIndex = this.panels[oldIndex].index;
      var relatedIndex = this.panels[newIndex].index;
      if (relatedIndex == this.scroll_selected) {
        this.scroll_selected = draggedIndex;
      } else if (draggedIndex == this.scroll_selected) {
        this.scroll_selected = relatedIndex;
      }
      this.isDragging = false;
    },
    extendDeep(parent, child) {
      child = child || {};
      for(var i in parent) {
        if(parent.hasOwnProperty(i)) {
          if(typeof parent[i] === "object") {
            child[i] = (Object.prototype.toString.call(parent[i]) === "[object Array]") ? [] : {};
            this.extendDeep(parent[i], child[i]);
          } else {
            child[i] = parent[i];
          }
        }
      }
      return child;
    }
  },
  created: function () {
    var config = JSON.parse(localStorage.getItem('config')) || [
      false,
      false,
      this.config2,
      this.rightPanelOpen,
      this.jumpIndexPage,
      this.showNotify,
      this.showUnread,
      this.editable
    ]
    this.config = config;
    this.config2 = config[2] === true ? true : false
    this.rightPanelOpen = config[3] === true ? true : false
    this.showNotify = config[5] === true ? true : false
    this.showUnread = config[6] === true ? true : false
    this.editable = config[7] === true ? true : false
    // console.log('混合对象的钩子被调用')
  }
}
