<template>
  <div class="auth panel">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <h1>权限分配<span><el-button @click="goBack()">返回</el-button></span></h1>
      <div class="search">
        <span>
          选择组<br>
          <el-form-item prop="group_ids">
            <el-cascader
              :options="groupOptions"
              :props="propsSelected"
              v-model="ruleForm.group_ids"
              @change="changeGroup"
              :change-on-select="true"
            ></el-cascader>
          </el-form-item>
        </span>
        <span v-if="role_id||user_id">
          选择角色<br>
          <el-form-item prop="role_id">
            <el-select v-model="ruleForm.role_id" @change="changeRole">
              <el-option v-for="item in roles" :key="item.role_id" :label="item.role_name" :value="item.role_id"></el-option>
            </el-select>
          </el-form-item>
        </span>
        <span v-if="user_id">
          选择帐号<br>
          <el-form-item prop="user_id">
            <el-select v-model="ruleForm.user_id" placeholder="全部">
              <el-option v-for="item in users" :key="item.user_id" :label="item.username" :value="item.user_id"></el-option>
            </el-select>
          </el-form-item>
        </span>
      </div>
      <div class="allot">
        <el-card class="box-card box-cont-pd0">
          <div slot="header" class="clearfix">
            <span>后台权限分配</span>
            <el-button style="float: right; padding: 4px;" type="text" icon="iconfont icon-move"></el-button>
          </div>
          <el-tabs v-if="nodes.length" type="border-card" v-model="activeName" style="min-height: 300px;">
            <el-tab-pane v-for="(node, key) in nodes" :key="key" :label="node.title" :name="node.title">
              <ul v-for="(node2, key2) in node._sub_">
                <li v-if="checkedNodes[2]&&checkedNodes[3]">
                  <el-checkbox :indeterminate="(checkedNodes[3][node2.path]&&checkedNodes[3][node2.path].length>0&&checkedNodes[3][node2.path].length<node2._sub_.length)" v-model="checkedNodes[2][node.path]" :label="node2.path" :checked="node2.checked" @change="handleCheckAllChange2(checkedNodes[2][node.path], node2.path, node2._sub_)">{{ node2.title }}</el-checkbox>
                </li>
                <li v-if="checkedNodes[3]&&checkedNodes[4]">
                  <dl v-for="(node3, key3) in node2._sub_">
                    <dt>
                      <el-checkbox :indeterminate="(checkedNodes[4]&&checkedNodes[4][node3.path]&&checkedNodes[4][node3.path].length>0&&checkedNodes[4][node3.path].length<node3._sub_.length)" v-model="checkedNodes[3][node2.path]" :label="node3.path" :checked="node3.checked" @change="handleCheckAllChange3(checkedNodes[3][node2.path], node3.path, node3._sub_)">{{ node3.title }}</el-checkbox>
                    </dt>
                    <dd v-if="node3._sub_">
                        <el-checkbox v-for="node4 in node3._sub_" v-model="checkedNodes[4][node3.path]" :label="node4.path" :key="node4.path" :checked="node4.checked" @change="handleCheckAllChange4(checkedNodes[4][node3.path], node4.path, [], node3.path)">{{ node4.title }}</el-checkbox>
                    </dd>
                  </dl>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix" >
            <span>功能面板</span>
            <el-button style="float: right; padding: 4px;" type="text" icon="iconfont icon-move"></el-button>
          </div>
          <ul>
            <li>
              <el-checkbox @change="handleCheckAllChange2()" class="node-name">首页</el-checkbox>
            </li>
          </ul>
        </el-card>
        <el-card class="box-card" style="display: none;">
          <div slot="header" class="clearfix">
            <span>数据资源</span>
            <el-button style="float: right; padding: 4px;" type="text" icon="iconfont icon-move"></el-button>
          </div>
          <div class="allot-cont">
            <p style="margin: 0 0 10px 0">
              已选择的数据资源：
              <el-button type="primary" icon="el-icon-plus" style="float: right; " size="small" @click="getResource()" plain>配置数据资源</el-button>
              <el-dialog
                title="请配置数据资源"
                :visible.sync="dialogVisibleVa"
                :modal-append-to-body = "true"
                width="1150px"
                :append-to-body = "true">
                <div class="popup-cont_allot">
                  <div class="box">
                    <font>请选择数据类型：</font>
                    <el-checkbox-group style="display: inline-block" v-model="type_ids">
                      <el-checkbox v-for="(text, key) in resource_types" :label="text" :key="key" border></el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div class="box">
                    <font>设置时间维度：</font>
                    <el-date-picker
                      v-model="daterange"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </div>
                  <div class="box">
                    <el-row :gutter="10">
                      <el-col :span="16">
                        <el-tabs type="border-card" class="box-tabs">
                          <el-tab-pane label="厂商维度">
                            <dl class="popover-main_va">
                              <dt>
                                <em v-for="(group, first_letter) in manfsGroupByLetter" :class="{'on':first_letter==letter_selected['manfsBoxForIndex']}" @click="selectLetter('manfsBoxForIndex', first_letter)">{{ first_letter }}</em>
                                <span>
                                  <cite>搜索</cite>
                                  <input type="text">
                                  <i class="iconfont icon-sousuo"></i>
                                </span>
                              </dt>
                              <dd id="manfsBoxForIndex">
                                <el-checkbox-group size="mini" :max="10" v-model="selected_manf_ids">
                                  <dl v-for="(group, first_letter) in manfsGroupByLetter">
                                    <dt :data-key="first_letter">{{ first_letter }}</dt>
                                    <dd>
                                  <span v-for="(manf, key) in group" class="checkbox-item" >
                                    <el-checkbox :label="manf.id" :key="manf.id" :class="{on: matchName(manfName, manf.manf_name) && lookManfId==manf.id}">{{ manf.manf_name }}</el-checkbox>
                                  </span>
                                    </dd>
                                  </dl>
                                </el-checkbox-group>
                              </dd>
                            </dl>
                          </el-tab-pane>
                          <el-tab-pane label="品牌维度">
                            <div class="popover-main_vb" v-if="selected_manf_ids.length > 0">
                              <dl v-for="(manf, key) in brands_grouped">
                                <dt>{{ manf.manf_name }}</dt>
                                <dd>
                                  <el-checkbox-group v-model="selected_brand_ids">
                                    <el-checkbox-button v-for="(brand, key) in manf.brand" :label="brand.id" :key="brand.id" >{{ brand.brand_name }}</el-checkbox-button>
                                  </el-checkbox-group>
                                </dd>
                              </dl>
                            </div>
                            <div class="popover-main_va" v-else>
                              <dt>
                                <em :class="{'on':first_letter==letter_selected['brandsBoxForSearch']}" v-for="(group, first_letter) in brands_grouped" @click="selectLetter('brandsBoxForSearch', first_letter)" style="margin-right: 10px;">{{ first_letter }}</em>
                              </dt>
                              <dd id="brandsBoxForSearch">
                                <el-checkbox-group size="mini" :max="10" v-model="selected_brand_ids">
                                  <dl v-for="(group, first_letter) in brands_grouped">
                                    <dt :data-key="first_letter">{{ first_letter }}</dt>
                                    <dd>
                                  <span class="radio-item" v-for="(brand, key) in group">
                                    <el-checkbox :label="brand.id" :key="brand.id" >{{ brand.brand_name }}</el-checkbox>
                                  </span>
                                    </dd>
                                  </dl>
                                </el-checkbox-group>
                              </dd>
                            </div>
                          </el-tab-pane>
                          <el-tab-pane label="车型维度">
                            <div class="popover-main_vb">
                              <dl v-for="(brand, key) in models_grouped">
                                <dt>{{ brand.brand_name }}</dt>
                                <dd>
                                  <span v-for="(model, key) in brand.model" :class="{'on':selected_model_ids.includes(model._id)}" :title="model.model_name" @click="checkModel(model._id)">{{ model.model_name }}</span>
                                </dd>
                              </dl>
                            </div>
                          </el-tab-pane>
                        </el-tabs>
                      </el-col>
                      <el-col :span="8">
                        <div class="selected-box">
                          <dl>
                            <dt>厂商维度：</dt>
                            <dd>
                              <span v-for="(item, index) in selected_manfs" :manfId="item.id">{{ item.name }}<i @click="clearSubItem('manf', item.id);">x</i></span>
                            </dd>
                          </dl>
                          <dl>
                            <dt>品牌维度：</dt>
                            <dd>
                              <span v-for="(item, index) in selected_brands" :brandId="item.id">{{ item.name }}<i @click="clearSubItem('brand', item.id);">x</i></span>
                            </dd>
                          </dl>
                          <dl>
                            <dt>车型维度：</dt>
                            <dd>
                              <span v-for="(item, index) in selected_models" :brandId="item.id">{{ item.name }}<i @click="clearSubItem('model', item.id);">x</i></span>
                            </dd>
                          </dl>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="popup-btn">
                    <el-button type="success" size="small" @click="submitData()">保存数据</el-button>
                    <el-button type="" size="small">取消编辑</el-button>
                  </div>
                </div>
              </el-dialog>
            </p>
            <div>
              <el-table
                ref="multipleTable"
                :data="resources"
                tooltip-effect="dark"
                style="width: 100%"
              >
                <el-table-column
                  type="selection">
                </el-table-column>
                <el-table-column
                  prop="res_id"
                  width="80px"
                  label="资源ID">
                </el-table-column>
                <el-table-column
                  prop="type"
                  width="80px"
                  label="数据类型">
                  <template slot-scope="scope">{{ resource_types[scope.row.type] }}</template>
                </el-table-column>
                <el-table-column
                  label="厂商维度">
                  <template slot-scope="scope">{{ scope.row.manfs }}</template>
                </el-table-column>
                <el-table-column
                  label="品牌维度"
                  show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.brands }}</template>
                </el-table-column>
                <el-table-column
                  label="车型维度"
                  show-overflow-tooltip>
                  <template slot-scope="scope">{{ scope.row.models }}</template>
                </el-table-column>
                <el-table-column
                  label="时间维度">
                  <template slot-scope="scope">{{ scope.row.start_date }}/{{ scope.row.end_date }}</template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="120">
                  <template slot-scope="scope">
                    <el-button @click="getResource(scope.row.res_id)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-card>
        <el-card class="box-card box-cont-pd0">
          <div slot="header" class="clearfix">
            <span>区域分配</span>
            <span style="margin-left: 30px;">
              <el-radio-group v-model="range">
                <el-radio :label="1">全国</el-radio>
                <el-radio :label="2">区域</el-radio>
                <el-radio :label="3">省份</el-radio>
              </el-radio-group>
            </span>
            <el-button style="float: right; padding: 4px;" type="text" icon="iconfont icon-move"></el-button>
          </div>
          <el-tabs v-if="regions.length&&range>1" type="border-card" v-model="activeBrandName">
            <el-tab-pane v-for="(node, key) in regions" :key="key" :label="node.region_name" :name="node.region_name">
              <ul v-for="(node2, key2) in node._sub_" class="region">
                <li v-if="checkedRegions[2]&&checkedRegions[3]">
                  <el-checkbox :indeterminate="(checkedRegions[3][node2.path]&&checkedRegions[3][node2.path].length>0&&checkedRegions[3][node2.path].length<node2._sub_.length)" v-model="checkedRegions[2][node.path]" :label="node2.path" :checked="node2.checked" @change="handleCheckAllChange2(checkedRegions[2][node.path], node2.path, node2._sub_, true, 'regions')">{{ node2.region_name }}</el-checkbox>
                </li>
                <li v-if="checkedRegions[3]&&checkedRegions[4]">
                  <dl v-for="(node3, key3) in node2._sub_">
                    <dt>
                      <el-checkbox :indeterminate="(checkedRegions[4]&&checkedRegions[4][node3.path]&&checkedRegions[4][node3.path].length>0&&checkedRegions[4][node3.path].length<node3._sub_.length)" v-model="checkedRegions[3][node2.path]" :label="node3.path" :checked="node3.checked" @change="handleCheckAllChange3(checkedRegions[3][node2.path], node3.path, node3._sub_, true, 'regions')">{{ node3.region_name }}</el-checkbox>
                    </dt>
                    <dd v-if="node3._sub_">
                      <el-checkbox v-for="(node4, key4) in node3._sub_" v-model="checkedRegions[4][node3.path]" :label="node4.path" :key="node4.path" :checked="node4.checked" @change="handleCheckAllChange4(checkedRegions[4][node3.path], node4.path, [], node3.path, 'regions')">{{ node4.province_name }}</el-checkbox>
                    </dd>
                    <dd v-else></dd>
                  </dl>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <el-button type="primary" size="medium" @click="save('ruleForm')">更新权限</el-button>
      </div>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import JQuery from 'jquery'
  import mixin from '@admin/config/mixin'
  export default {
    name: 'Allot',
    mixins: [mixin],
    data() {
      return {
        //element 参数 可删除
        checkedNodes: [],
        dialogVisibleVa:false,
        activeName: '系统管理',
        ruleForm: {
          nodes: [],
          regions: [],
          group_ids: [],
          role_id: '',
          user_id: '',
        },
        rules:{
        },
        group_id: Number(this.$route.query.group_id) || '',
        role_id: Number(this.$route.query.role_id) || '',
        user_id: Number(this.$route.query.user_id) || '',
        groups: [],
        roles: [],
        users: [],
        nodes: [],
        resources: [],
        nodes_map: {},
        groupOptions:[],
        propsSelected: {
          value: 'group_id',
          label: 'group_name',
          children: '_sub_',
        },
        resource_types: {
          1: '销量',
          2: '价格',
          3: '终端支持',
          4: '产品',
          5: '渠道',
        },
        res_id: '',
        type_ids: [],
        daterange: '',
        baseInfo: {},
        manfs_map: {},
        manfs: [],
        brands: [],
        models: [],
        selected_manf_ids: [],
        selected_brand_ids: [],
        selected_model_ids: [],
        selected_manfs: [],
        selected_brands: [],
        selected_models: [],
        letter_selected: {
          manfsBoxForIndex: 'A',
        },
        maxItem: 10,
        manfName:'',
        lookErrorClass:false,
        lookManfIds: [],
        lookManfId:'',
        vo: {},

        regions: {},
        activeBrandName: '新别克',
        checkedRegions: [],
        range: 1,
      }
    },
    mounted() {
      this.getToken(() => {
        this.getBaseData()
        this.getNodeData()
        // this.getResourceData()
        this.getRegionData()
      })
    },
    watch: {
      checkedNodes: function () {
        this.initNodes()
      },
      checkedRegions: function () {
        this.initNodes('regions')
      }
    },
    computed: {
      manfsGroupByLetter: function () {
          var data = {};
          for (let manf of this.manfs) {
              manf['first_letter'] = manf['first_letter'] || '';
              if (!data.hasOwnProperty(manf['first_letter'])) {
                  data[manf['first_letter']] = [];
              }
              data[manf['first_letter']].push(manf);
          }
          return data;
      },
      brands_map: function() {
        var brands  = {};
        for (var letter in this.baseInfo.brand) {
          var group = this.baseInfo.brand[letter];
          for (var x in group) {
            var brand = group[x];
            brands[brand.id] = brand;
          }
        }
        return brands;
      },
      brands_grouped: function() {
        var brands_grouped = []
        , manfs_map = this.manfs_map
        if (this.selected_manf_ids.length > 0) {
          this.selected_manf_ids.map((manf_id) => {
            if (manfs_map.hasOwnProperty(manf_id)) {
              var brand = manfs_map[manf_id];
              brands_grouped.push(brand);
            }
          })
        } else {
          brands_grouped = this.baseInfo.brand || [];
        }
        return brands_grouped;
      },
      models_grouped: function() {
        var brands_map = this.brands_map
        , models_grouped = [];
        if (this.selected_brand_ids.length > 0) {
          this.selected_brand_ids.map((brand_id) => {
            if (brands_map.hasOwnProperty(brand_id)) {
                var model = brands_map[brand_id];
                models_grouped.push(model);
            }
          })
        }
        return models_grouped;
      },
    },
    methods:{
      getNode(data, id, key = 'path', son = '_sub_', node = []) {
        var that = this
        data.map(item => {
          if (!!item[key] && node.length==0) {
            if (item[key] == id) {
              node.push(item)
            } else if (item.hasOwnProperty(son)) {
              that.getNode(item[son], id, key, son, node)
            }
          }
        })
        return node
      },
      initNodes(type = 'nodes') {
        var name = 'checked' + this.ucfirst(type)
        var nodes = this[name]
        var checkedNodes = []
        for (var level in nodes) {
          for (var key in nodes[level]) {
            var paths = nodes[level][key] || []
            paths.map(path => {
              var paths = path.split('-')
              var node = paths[paths.length - 1]
              if (!checkedNodes.includes(node)) {
                checkedNodes.push(node)
              }
            })
          }
        }
        this.ruleForm[type] = checkedNodes.filter(n => n != "")
      },
      handleCheckAllChange2(checkedNodes, id, children = [], upCheck = true, type='nodes') {
        var name = 'checked' + this.ucfirst(type)
        var pid = id.substr(0, id.lastIndexOf('-')) || id
        var ppid = pid.substr(0, pid.lastIndexOf('-'))
        var pnode = this.getNode(this[type], pid)[0]
        var plength = pnode.hasOwnProperty('_sub_') ? pnode._sub_.length : 0

        // 向下选择
        if (!!this[name][3] && children.length > 0) {
          var that = this
          this[name][3][id] = checkedNodes.includes(id) ? children.map(item=>{return item.path}) : []
          children.map(item=>{
            that.handleCheckAllChange3(that[name][3][id], item.path, item._sub_||[], false, type)
          })
        }

        // 向上选择
        if (pid && !!this[name][1][ppid] && upCheck) {
          let checkedCount = checkedNodes.length
          if (checkedCount === length) {
            this[name][1][ppid].push(pid)
          } else {
            if (!!this[name][1][ppid]) {
              var index = this[name][1][ppid].findIndex(id => id == pid)
              index == -1 || this[name][1][ppid].splice(index, 1)
            }
          }
        }

        this[name].push({})
        this[name].pop()
      },
      handleCheckAllChange3(checkedNodes, id, children = [], upCheck = true, type='nodes') {
        var name = 'checked' + this.ucfirst(type)
        var pid = id.substr(0, id.lastIndexOf('-')) || id
        var ppid = pid.substr(0, pid.lastIndexOf('-'))
        var pnode = this.getNode(this[type], pid)[0]
        var plength = pnode.hasOwnProperty('_sub_') ? pnode._sub_.length : 0

        // 向下选择
        if (!!this[name][4] && children.length > 0) {
          this[name][4][id] = checkedNodes.includes(id) ? children.map(item=>{return item.path}) : []
        }

        // 向上选择
        if (pid && !!this[name][2][ppid] && upCheck) {
          let checkedCount = checkedNodes.length
          if (checkedCount === plength) {
            this[name][2][ppid].push(pid)
          } else {
            var index = this[name][2][ppid].findIndex(id => id == pid)
            index == -1 || this[name][2][ppid].splice(index, 1)
          }

          // 继续向上选择
          this.handleCheckAllChange2(this[name][2][ppid] || [], pid, [], '', type)
        }

        this[name].push({})
        this[name].pop()
      },
      handleCheckAllChange4(checkedNodes, id, children = [], pid = '', type='nodes') {
        var name = 'checked' + this.ucfirst(type)
        var pnode = this.getNode(this[type], pid)[0]
        var ppid = pid.substr(0, pid.lastIndexOf('-'))
        , plength = pnode.hasOwnProperty('_sub_') ? pnode._sub_.length : 0
        
        // 向下选择
        if (!!this[name] && !!this[name][5]) {
          // this[name][5][id] = checkedNodes.includes(id) ? children.map(item=>{return item.path}) : [];
        }

        // 向上选择
        if (pid && !!this[name] && !!this[name][3][ppid]) {
          let checkedCount = checkedNodes.length
          if (checkedCount === plength) {
            this[name][3][ppid].push(pid)
          } else {
            if (!!this[name][3][ppid]) {
              var index = this[name][3][ppid].findIndex(id => id == pid)
              index == -1 || this[name][3][ppid].splice(index, 1)
            }
          }

          // 继续向上选择
          this.handleCheckAllChange3(this[name][3][ppid] || [], pid, [], '', type)
        }

        this[name].push({})
        this[name].pop()
      },
      getBaseData() {
        this.$request.get(this.$interface.ALLOT_APPLY, {
          group_id: this.group_id,
          role_id: this.role_id,
          user_id: this.user_id,
          token: this.token,
          spm: this.spm,
        }, (response) => {
          this.groupOptions = response.data.groups
          this.roles = response.data.roles
          this.users = response.data.users
          for (var x in this.ruleForm) {
            if (response.data.hasOwnProperty(x)) {
              this.ruleForm[x] = response.data[x]
            }
          }
        }, this.failure)
      },
      getNodeData() {
        this.$request.get(this.$interface.ALLOT_APPLY, {
          group_id: this.group_id,
          role_id: this.role_id,
          user_id: this.user_id,  
          action: 'getNode',
          token: this.token,
          spm: this.spm,
        }, (response) => {
          this.nodes = response.data
          this.activeName = this.nodes[0].title
          this.nodes_map = {}
          this.$helper.arr2table(this.nodes, 'id', 'pid', '_sub_').map(item => {
            this.nodes_map[item.path] = item.url
          })
          this.checkedNodes = this.$helper.recurse(this.nodes, 'path', '_sub_')
          this.$nextTick(() => {
            this.initNodes()
          })
        }, this.failure)
      },
      changeGroup() {
        var group_ids = this.ruleForm.group_ids
        var group_id = group_ids.length > 0 ? group_ids[group_ids.length - 1] : ''

        if (!!this.role_id || !!this.user_id) {
          this.$request.get(this.$interface.ROLE_ROLES, {
            group_id: group_id,
            spm: this.spm,
            token: this.token,
          }, (response) => {
            if (response.data.length > 0) {
              this.roles = response.data
              this.ruleForm.role_id = this.roles[0].role_id
              this.changeRole()
            } else {
              this.roles = []
              this.users = []
              this.ruleForm.role_id = ''
              this.ruleForm.user_id = ''
            }
          }, this.failure)
        } else {
          this.group_id = group_id
          this.$router.push({query: {group_id: this.group_id, spm: this.spm}})
          this.checkedNodes = []
          this.getNodeData()
        }
      },
      changeRole() {
        var group_ids = this.ruleForm.group_ids
        var group_id = group_ids.length > 0 ? group_ids[group_ids.length - 1] : ''
        var role_id = this.ruleForm.role_id

        if (!!this.user_id) {
          this.$request.get(this.$interface.USER_USERS, {
            group_id: group_id,
            role_id: role_id,
            spm: this.spm,
            token: this.token,
          }, (response) => {
            if (response.data.length > 0) {
              this.users = response.data
              this.ruleForm.user_id = this.users[0].user_id
              this.changeUser()
            } else {
              this.users = []
              this.ruleForm.user_id = ''
            }
          }, this.failure)
        } else {
          this.role_id = this.ruleForm.role_id
          this.$router.push({query: {role_id: this.role_id, spm: this.spm}})
          this.checkedNodes = []
          this.getNodeData()
        }
      },
      changeUser() {
        this.user_id = this.ruleForm.user_id
        this.$router.push({query: {user_id: this.user_id, spm: this.spm}})
        this.checkedNodes = []
        this.getNodeData()
      },
      goBack() {
        if (!!this.group_id) {
          this.$router.push({path: '/group/index', query: {spm: this.spm}})
        } else if (!!this.role_id) {
          this.$router.push({path: '/role/index', query: {spm: this.spm}})
        } else if (!!this.user_id) {
          this.$router.push({path: '/user/index', query: {spm: this.spm}})
        } else {
          this.$router.go(-1)
        }
      },
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = {
              action: 'save',
              token: this.token,
              spm: this.spm,
              group_ids: this.ruleForm.group_ids,
              role_id: this.ruleForm.role_id,
              user_id: this.ruleForm.user_id,
            }
            params['group_id'] = params['group_ids'][params['group_ids'].length-1]
            delete params['group_ids']
            var url = this.$interface.ALLOT_APPLY
            let index = url.indexOf('?');
            url = (index == -1 ? url : url.substr(0, index)) + '?' + this.$helper.queryEncoded(params)

            // 做一些很特殊的验证
            let regions = '0'
            if (this.range == 1) {
            } else if (this.range == 2) {
              let region = this.ruleForm.regions.filter( item => {
                return item.indexOf('@') == -1
              })
              if (region.length != 1) {
                this.$message({
                  type: 'error',
                  message: '请选择一个区域'
                })
                return
              }
              regions = region[0].split('@')[0]
            } else if (this.range == 3) {
              let region = this.ruleForm.regions.filter( item => {
                return item.indexOf('@') != -1
              })
              if (region.length != 1) {
                this.$message({
                  type: 'error',
                  message: '请选择一个省份'
                })
                return
              }
              regions = region[0]
            }
            // 到此为止
            this.$request.post(url, {
              nodes: this.ruleForm.nodes,
              regions: regions,
              range: this.range
            }, (response) => {
              this.dialogVisible = false
              this.$message({
                type: 'success',
                message: response.msg
              })
            }, (response) => {
              this.$message({
                type: 'error',
                message: response.msg
              })
            }, this.failure)
          }
        })
      },
      // 资源配置
      getResourceData() {
        this.$request.get(this.$interface.ALLOT_APPLY, {
          group_id: this.group_id,
          role_id: this.role_id,
          user_id: this.user_id,
          action: 'getResource',
          token: this.token,
          spm: this.spm,
        }, (response) => {
          for (var x in response.data) {
            this.resources.push(response.data[x])
          }
        }, this.failure)
      },
      getResource(res_id) {
        this.res_id = res_id
        this.$request.get(this.$interface.ALLOT_RESOURCE, {
          group_id: this.group_id,
          role_id: this.role_id,
          user_id: this.user_id,
          res_id: res_id,
          token: this.token,
          spm: this.spm,
        }, (response) => {
          this.vo = response.data
          var manfs = JSON.parse(this.vo['manfs'])
          , brands = JSON.parse(this.vo['brands'])
          , models = JSON.parse(this.vo['models'])
          this.selected_manfs = []
          this.selected_brands = []
          this.selected_models = []
          this.getManfs(() => {
            for (var manf_id in manfs) {
              var manf_name = manfs[manf_id]
              this.selected_manfs.push({id:manf_id, name:manf_name})
              this.selected_manf_ids.push(Number(manf_id))
            }
            this['selected_brand_ids'] = brands.map((brand) => {
              this.selected_brands.push({id:brand.brand_id, name:brand.brand_name})
              return Number(brand.brand_id)
            })
            this['selected_model_ids'] = models.map((model) => {
              this.selected_models.push({id:model.sub_model_id, name:model.sub_model_name})
              return Number(model.sub_model_id)
            })
            this.dialogVisibleVa = true
          })
        }, this.failure)
      },
      selectLetter: function(boxId, letter, animate = true) {
        this.letter_selected[boxId] = letter
        var parent = document.querySelector('#' + boxId)
        if (!parent)return
        var target = parent.querySelector('[data-key="' + letter + '"]')
        , scrollTop = target.offsetTop - parent.offsetTop - 10;
        setTimeout(() => {
          if (animate) {
            JQuery('#' + boxId).animate({scrollTop: scrollTop}, 300, 'swing')
          } else {
            JQuery('#' + boxId).scrollTop(scrollTop)
          }
        }, 10)
      },
      lookManf (boxId) {
        var keyword = this.manfName.trim()
        , letter = ''
        this.lookErrorClass = true
        if (!!keyword) {
          for (let index in this.manfs) {
            var manf = this.manfs[index]
            if (this.matchName(keyword, manf.manf_name) && !this.lookManfIds.includes(manf.id)) {
              letter = manf.first_letter
              this.lookManfId = manf.id
              this.lookManfIds.push(manf.id)
              break
            }
            if (index == this.manfs.length - 1) {
              this.lookManfId = ''
              this.lookManfIds = []
            }
          }
          if (!!letter) {
            this.selectLetter(boxId, letter)
            this.lookErrorClass = false
          }
        }
      },
      matchName(keyword, string) {
        if (!!keyword) {
          var regExp = RegExp(""+keyword+"")
          return regExp.test(string)
        }
        return false
      },
      checkModel(model_id) {
        var index = this.selected_model_ids.findIndex((id)=>{return id == model_id})
        if ( index >= 0) {
          this.selected_model_ids.splice(index, 1)
        } else {
          this.selected_model_ids.push(model_id)
        }
      },
      submitData() {
        this.$request.get(this.$interface.ALLOT_RESOURCE, {
          type: this.type_ids,
          manfs: this.selected_manf_ids || [],
          brands: this.selected_brand_ids || [],
          models: this.selected_model_ids || [],
          start_date: this.daterange[0],
          end_date: this.daterange[1],
          res_id: this.res_id,
          group_id: this.group_id,
          role_id: this.role_id,
          user_id: this.user_id,
          action: 'save',
          token: this.token,
          spm: this.spm,
        }, (response) => {
        })
      },
      getManfs(cb) {
        this.$request.get(this.$interface.GET_NEWS_BASE_INFO, {
          token: this.token
        }, (response) => {
          this.baseInfo = response.data[0]
          var manfs_map  = {}
          , manfs = []
          for (var letter in this.baseInfo.manf_brand) {
              var group = this.baseInfo.manf_brand[letter];
              for (var x in group) {
                  var manf = group[x];
                  manfs_map[manf.id] = manf
                  manfs.push(manf)
              }
          }
          this.manfs_map = manfs_map
          this.manfs = manfs
          typeof cb == 'function' && cb()
        }, this.failure);
      },
      getRegionData() {
        this.$request.get(this.$interface.GET_REGION, {
          token: this.token,
          group_id: this.group_id,
          role_id: this.role_id,
          user_id: this.user_id,
        }, (response) => {
          this.regions = response.data.list || {}
          this.range = response.data.range || '1'
          this.checkedRegions = this.$helper.recurse(this.regions, 'path', '_sub_')
          this.$nextTick(() => {
            this.initNodes('regions')
          })
        }, this.failure)
      },
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~@admin/assets/scss/common";
  @import "~@admin/assets/scss/style";
</style>
