<template>

	<div class="shouhou-view panel">
    <h1>
      文件管理
      <span>
          <el-button size="medium" type="primary" @click="$router.push('/shouhou/download?spm=m-99-103')">查看所有操作记录</el-button>
          <el-button plainsize="medium" @click="$router.back(-1)">返回</el-button>
      </span>
    </h1>
    <ul>
      <li class="fileupload">
        <h2>下载信息</h2>
        <span class="infobox hasborder">
          <b>{{ reportInfo.download_users }}</b> <br/>
          下载帐户数
        </span>
        <span class="infobox">
          <b>{{ reportInfo.download_count }}</b> <br/>
        总下载次数
        </span>
      </li>
      <li class="fileinfo">
        <el-dialog
          title="文件信息"
          :visible.sync="fileInfoDialogVb"
          width="50%"
          center>
          <el-form :model="formFileInfo" ref="ruleForm" :rules="rules" class="shouhou-view_dialogvb" label-width="80px">
            <el-form-item label="文件标题" prop="title">
              <el-input v-model="formFileInfo.title"></el-input>
            </el-form-item>
            <el-form-item label="所属" v-if="0">
              <el-cascader
                :options="belongs"
                v-model="formFileInfo.belongs">
              </el-cascader>
            </el-form-item>
            <el-form-item label="文件类别" prop="type_id">
              <el-select v-model="formFileInfo.type_id" placeholder="请选择文件类别">
                <el-option v-for="(item,key) in categories" :key="key" :label="item.type_name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否收费" prop="charge_type">
              <el-radio-group v-model="formFileInfo.charge_type">
                <el-radio v-for="(label, value) in charge_types" :key="value" :label="Number(value)">{{label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="success" size="small" @click="save('ruleForm')">提交</el-button>
              <el-button size="small" @click="fileInfoDialogVb=false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <h2>
          文件信息
          <span class="cont-right" @click="fileInfoDialogVb = true">
            <i class="iconfont icon-settings"></i>
            管理
          </span>
        </h2>
        <img :src="reportInfo.cover" alt="">
        <dl>
          <dt>{{ reportInfo.filename }}</dt>
          <dd v-if="reportInfo.manf"><font>所属：</font>{{reportInfo.manf}}-{{reportInfo.brand}}-{{reportInfo.model}}-{{reportInfo.version}}-{{reportInfo.styles}}</dd>
          <dd><font>文件ID：</font>{{ reportInfo.id }}</dd>
          <dd><font>文件类别：</font>{{ reportInfo.type_name }}</dd>
          <dd><font>文件大小：</font>{{ reportInfo.size | number_format(2) }}M</dd>
          <dd><font>文件格式：</font>{{ reportInfo.extension }}</dd>
          <dd><font>是否收费：</font><el-tag size="small">{{ charge_types[reportInfo.charge_type] }}</el-tag></dd>
        </dl>
      </li>
      <li class="filestatus">
        <el-form :inline="true" :model="formInfo" ref="formInfo" labelPosition="top" class="">
          <div style="position: relative">
            <el-form-item>
              <el-radio-group v-model="formInfo.state" @change="changeRadio(formInfo.state)">
                <el-radio label="1">所有客户可见</el-radio>
                <!-- <el-radio label="2" >指定客户可见</el-radio> -->
                <el-radio label="3">隐藏</el-radio>
                <el-radio label="4">删除</el-radio>
              </el-radio-group>
            </el-form-item>
            <span v-if="selectedCustomer" class="triangle"></span>
            <div v-if="selectedCustomer" class="selected-customer">
              <h3>
                已选客户：
                <em>奥迪 <i>x</i></em>
                <em>奥迪 <i>x</i></em>
                <em>奥迪 <i>x</i></em>
                <em>奥迪 <i>x</i></em>
                <em>奥迪 <i>x</i></em>
                <a href="javascript:void(0)">重置</a>
              </h3>
              <h4>
                <font class="on">A</font>
                <font>B</font>
                <font>C</font>
              </h4>
              <div>
                <dl>
                  <dt>A</dt>
                  <dd>
                    <span>奥迪</span>
                    <span>阿斯顿马丁</span>
                  </dd>
                </dl>
                <dl>
                  <dt>B</dt>
                  <dd>
                    <span class="on">奔驰</span>
                    <span>宝马</span>
                  </dd>
                </dl>
                <dl>
                  <dt>B</dt>
                  <dd>
                    <span>奔驰</span>
                    <span>宝马</span>
                  </dd>
                </dl>
                <dl>
                  <dt>B</dt>
                  <dd>
                    <span>奔驰</span>
                    <span>宝马</span>
                  </dd>
                </dl>
                <dl>
                  <dt>B</dt>
                  <dd>
                    <span>奔驰</span>
                    <span>宝马</span>
                  </dd>
                </dl>
                <dl>
                  <dt>B</dt>
                  <dd>
                    <span>奔驰</span>
                    <span>宝马</span>
                  </dd>
                </dl>
                <dl>
                  <dt>B</dt>
                  <dd>
                    <span>奔驰</span>
                    <span>宝马</span>
                  </dd>
                </dl>
                <dl>
                  <dt>B</dt>
                  <dd>
                    <span>奔驰</span>
                    <span>宝马</span>
                  </dd>
                </dl>
                <dl>
                  <dt>B</dt>
                  <dd>
                    <span>奔驰</span>
                    <span>宝马</span>
                  </dd>
                </dl>
                <dl>
                  <dt>B</dt>
                  <dd>
                    <span>奔驰</span>
                    <span>宝马</span>
                  </dd>
                </dl>
                <dl>
                  <dt>B</dt>
                  <dd>
                    <span>奔驰</span>
                    <span>宝马</span>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </el-form>
      </li>
    </ul>
    <el-button type="primary" @click="submitForm('formInfo')">提交</el-button>
	</div>

</template>

<script type="text/ecmascript-6">
  import mixin from '@admin/config/mixin'
  import shouhou_mixin from '@admin/config/shouhou.mixin'
	export default {
		name: '',
    mixins: [mixin, shouhou_mixin],
		data() {
			return {
        reportInfo: {},
        formInfo:{
          id: '',
          state: '1',
        },
        categories: [],
        formFileInfo:{
          title: '',
          belongs: [],
          id: '',
          type_id: 1,
          charge_type: 1,
        },
        rules: {
          type_id: [
            { required: true, message: '请选择文件类别', trigger: 'blur' },
          ],
          charge_type: [
            { required: true, message: '请选择文件类别', trigger: 'blur' },
          ],
          title: [
            { required: true, message: '请输入文件标题', trigger: 'blur' },
            { min: 3, max: 60, message: '长度在 3 到 60 个字符', trigger: 'blur' }
          ],
        },
        selectedCustomer:false,
        fileInfoDialogVa:false,
        fileInfoDialogVb:false,

        //临时
        belongs:[{
          value: 'benchi',
          label: '奔驰',
          children: [{
            value: 'aclass',
            label: '奔驰A级'
          }, {
            value: 'bclass',
            label: '奔驰B级'
          }, {
            value: 'cclass',
            label: '奔驰C级'
          }]
        },{
          value: 'aodi',
          label: '奥迪',
          children: [{
            value: 'Q50',
            label: '奥迪Q50'
          }, {
            value: 'Q60',
            label: '奥迪Q60'
          }, {
            value: 'Q70',
            label: '奥迪Q70'
          }]
        }]
			}
		},
    mounted(){
      this.get_report_types();
      this.edit();
    },
    methods:{
      changeRadio(val){
        this.selectedCustomer = val == 2 ? true : false;
      },
      openNotification() {
        this.$notify({
          title: '操作记录',
          dangerouslyUseHTMLString: true,
          offset: 40,
          position: 'bottom-right',
          message: `
          <p>发布人: 惠康 [产品研发与交付中心-后市场业务 主管]</p>
          <cite>发布日期：2018-3-28 12：38：49</cite>
          `
        });
      },
      get_report_types() {
        this.$request.get(this.$interface.REPORT_TYPES, {
          header: {token: this.token}
        }, (response) => {
          var data = response.data[0].list
          this.categories = data
        })
      },
      edit() {
        this.$request.get(this.$interface.MANAGE_REPORT, {
          header: {token: this.token},
          id: this.$route.query.id
        }, (response) => {
          var data = response.data[0]
          this.reportInfo = data

          for (let key in this.formFileInfo) {
            if (data.hasOwnProperty(key)) {
              this.formFileInfo[key] = isNaN(data[key]) ? data[key] : Number(data[key])
            }
          }
          for (let key in this.formInfo) {
            if (data.hasOwnProperty(key)) {
              this.formInfo[key] = isNaN(data[key]) ? data[key] : Number(data[key])
            }
          }
        }, this.failure)
      },
      save(formName) {
        var that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = Object.assign({}, {
              header: {token: this.token},
            }, this.formFileInfo)
            this.$request.put(this.$interface.MANAGE_REPORT, params, (response) => {
              this.$message({
                type: 'success',
                message: response.result_msg
              })
            }, this.failure)
          } else {
            return false;
          }
        });
      },
      submitForm(formName) {
        var that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = Object.assign({}, {
              header: {token: this.token},
            }, this.formInfo)
            this.$request.put(this.$interface.MANAGE_REPORT, params, (response) => {
              this.$message({
                type: 'success',
                message: response.result_msg
              })
            }, this.failure)
          } else {
            return false;
          }
        });
      }
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~@admin/assets/scss/common";
  @import "~@admin/assets/scss/style";
</style>
