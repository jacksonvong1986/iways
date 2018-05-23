<template>
	<div class="shouhou-upload panel">
    <h1>
      上传文件
      <span>
          <el-button type="" size="medium" @click="$router.back(-1)">返回</el-button>
      </span>
    </h1>
    <el-form :inline="true" :model="ruleForm" ref="ruleForm" :rules="rules" labelPosition="top" class="">
      <ul class="search">
        <li>
          <el-form-item label="请选文件类型" prop="type_id">
            <el-select v-model="ruleForm.type_id" placeholder="请选文件类型">
              <el-option v-for="(file_type, type_id) in file_types" :key="type_id" :label="file_type" :value="type_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收费" prop="charge_type">
            <el-select v-model="ruleForm.charge_type" placeholder="收费">
              <el-option v-for="(label, value) in charge_types" :key="value" :label="label" :value="value"></el-option>
            </el-select>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="所属厂商">
            <el-popover
              ref="popover"
              placement="bottom-start"
              popper-class="padding0">
              <dl class="popover-va">
                <dt>
                  <em v-for="group in manfs_group" :data-key="group.py_first_letter" @click="selectLetter('manfsBox', group.py_first_letter)">{{ group.py_first_letter }}</em>
                </dt>
                <dd id="manfsBox">
                  <ul v-for="group in manfs_group">
                    <li v-for="manf in group.manf_brands" :data-key="group.py_first_letter" @click="selectManf(manf.manf_name, manf.brands)">{{ group.py_first_letter }} {{ manf.manf_name }}</li>
                  </ul>
                </dd>
              </dl>
            </el-popover>
            <el-input v-popover:popover placeholder="所属厂商" v-model="ruleForm.manf"></el-input>
          </el-form-item>
          <el-form-item label="所属品牌">
            <el-select v-model="ruleForm.brand" placeholder="所属品牌" @change="selectBrand()">
              <el-option v-for="(item, key) in select_brand" :key="key" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属车型">
            <el-select v-model="ruleForm.body_type" placeholder="所属车型" @change="selectBodyType()">
              <el-option v-for="(item, key) in select_body_type" :key="key" :label="item.body_type" :value="item.body_type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属型号">
            <el-select v-model="ruleForm.model" placeholder="所属型号" @change="selectModel()">
              <el-option v-for="(item, key) in select_model" :key="key" :label="item.model" :value="item.model"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属款型">
            <el-select v-model="ruleForm.version" placeholder="所属款型" style="width:380px">
              <el-option v-for="(item, key) in select_version" :key="key" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="请输入文件标题" prop="title" style="width: 50%">
            <el-input v-model="ruleForm.title" placeholder="请输入文件标题"></el-input>
          </el-form-item>
        </li>
        <li class="hasborder">
          <el-form-item style="width: 100%" prop="cover_uuid">
            <el-upload
              class=""
              style="width: 50%"
              :action="upload_url"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="coverList"
              list-type="picture">
              <el-button size="small" type="primary">点击上传封面图片</el-button>
              <div slot="tip" class="el-upload__tip">图片需小于1MB，仅限JPG、PNG、GIF格式</div>
            </el-upload>
          </el-form-item>
        </li>
        <li class="hasborder">
          <el-form-item style="width: 50%" prop="report_uuid">
            <el-upload
              class=""
              :action="upload_url"
              :headers="headers"
              :on-change="handleChange"
              :on-success="handleSuccessFile"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传文件</el-button>
              <div slot="tip" class="el-upload__tip">文件需小于1MB，仅限XLS/DOC/PPT/PDF格式</div>
            </el-upload>
          </el-form-item>
        </li>
        <li class="hasborder">
          <div>
           <el-form-item label="排序">
              <el-select v-model="classify" placeholder="" @change="changeOrdinal">
                <el-option label="置顶" value="0"></el-option>
                <el-option label="编号排序" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="classify==1" label="排序编号" style="width: 10%">
              <el-input v-model="ruleForm.ordinal" placeholder="排序编号"></el-input>
           </el-form-item>
          </div>
          <div style="position: relative">
            <el-form-item>
              <el-radio-group v-model="ruleForm.state" @change="changeRadio(ruleForm.state)">
               <el-radio label="1">所有客户可见</el-radio>
               <!-- <el-radio label="2">指定客户可见</el-radio> -->
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
        </li>
        <li>
          <el-form-item>
            <el-button type="primary" @click="save('ruleForm')">提交</el-button>
          </el-form-item>
        </li>
      </ul>
    </el-form>
	</div>

</template>

<script type="text/ecmascript-6">
  import mixin from '@admin/config/mixin'
  import shouhou_mixin from '@admin/config/shouhou.mixin'
  import JQuery from 'jquery'
	export default {
		name: '',
    mixins: [mixin, shouhou_mixin],
		data() {
			return {
			  ruleForm: {
          body_type: "",
          brand: "",
          charge_type: "",
          cover_uuid: "",
          cust_ids: [],
          id: "",
          manf: "",
          model: "",
          ordinal: "",
          report_uuid: "",
          state: 1,
          title: "",
          type_id: "",
          version: ""
        },
        classify: '1',
        coverList: [
        ],
        fileList: [
        ],
        selectedCustomer: false,


        file_types: {/*1: '数据', 2: '报告'*/},
        select_manf: [],
        select_brand: [],
        select_body_type: [],
        select_model: [],
        select_version: [],

        upload_url: (process.env.API_ROOT == '"/api"' ? '/api' : process.env.API_ROOT) + this.$interface.UPLOAD_FILE,
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
          cover_uuid: [
            { required: true, message: '请上传封面', trigger: 'blur' },
          ],
          report_uuid: [
            { required: true, message: '请上传报告', trigger: 'blur' },
          ],
        },
        manfs_group: [],
        letter_selected: {
          manfsBox: 'A',
        },
        bodytype_model_version: [],
			}
		},
    computed: {
      headers() {
        return {token: this.token}
      },
    },
    mounted() {
      this.init()
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleSuccess(response, file, fileList) {
        let data = response.data[0]
        this.ruleForm.cover_uuid = data.uuid
      },
      handleChange(file, fileList) {
        this.fileList = fileList.slice(-3);
      },
      changeRadio(val){
        this.selectedCustomer = val == 2 ? true : false;
      },
      handleSuccessFile(response, file, fileList) {
        let data = response.data[0]
        this.ruleForm.report_uuid = data.uuid
      },
      changeOrdinal() {
        if (this.classify != 1) {
          this.ruleForm.ordinal = -1
        }
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
      selectManf(manf_name, brands) {
        this.$refs.popover.showPopper=false
        this.ruleForm.manf = manf_name
        this.ruleForm.brand = ''

        let select_brand  = []
        brands.map(item => {
          select_brand.push({label: item.brand_name, value: item.brand_name})
        })
        this.select_brand = select_brand
      },
      selectBrand() {
        if (!this.ruleForm.manf && !this.ruleForm.brand) return
        this.GET_BODYTYPE_MODEL_VERSION()
      },
      selectBodyType() {
        if (!this.ruleForm.body_type) return
        let body_type = this.ruleForm.body_type
        this.select_model = this.select_body_type.find((item) => {
          return item.body_type == body_type
        }).modelVersions || []
      },
      selectModel() {
        if (!this.ruleForm.model) return
        let model = this.ruleForm.model
        this.select_version = this.select_model.find((item) => {
          return item.model == model
        }).versions || []
      },

      init() {
        this.GET_COMMON_MANFS_BRANDS()
        this.GET_REPORT_TYPES();
        console.log(this.upload_url)
      },
      GET_COMMON_MANFS_BRANDS() {
        this.$request.get(this.$interface.GET_COMMON_MANFS_BRANDS, {
          header: {token: this.token}
        }, (response) => {
          this.manfs_group = response.data;
        }, this.failure);
      },
      GET_BODYTYPE_MODEL_VERSION() {
        this.$request.get(this.$interface.GET_BODYTYPE_MODEL_VERSION, {
          header: {token: this.token},
          manf_names: this.ruleForm.manf || '',
          brand_names: this.ruleForm.brand || ''
        }, (response) => {
          this.select_body_type = response.data
        }, this.failure);
      },
      GET_REPORT_TYPES() {
        this.$request.get(this.$interface.REPORT_TYPES, {
          header: {token: this.token}
        }, (response) => {
          let data = response.data[0].list
          let file_types = {}
          for (let key in data) {
            let item = data[key]
            file_types[item.id] = item.type_name
          }
          this.file_types = file_types
        }, this.failure)
      },
      add() {
        this.clearValidate('ruleForm')
        this.$request.get(this.$interface.MANAGE_REPORT, {
          token: this.token,
          spm: this.spm,
        }, (response) => {
          console.log(response)
        }, this.failure)
      },
      save(formName) {
        var that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = Object.assign({}, {
              header: {token: this.token},
            }, this.ruleForm)
            this.$request.post(this.$interface.MANAGE_REPORT, params, (response) => {
              this.$message({
                type: 'success',
                message: '上传报表成功'
              })
              this.$router.push({path: '/shouhou/index', query: {spm: this.spm}})
            }, this.failure)
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
	}
</script>

<style lang="scss" type="text/scss" scoped>
  @import "~@admin/assets/scss/common";
  @import "~@admin/assets/scss/style";
</style>
