<template>
	<div :class="[{'fixed': isFixed}, 'right-menu']">
    <div>
      <div class="right-tabs">
        <div class="right-tabs-title">
          <span @click="rightMenuToggle(-1, '')">
            <i class="iconfont icon-collapse open"></i>
            <i class="iconfont icon-fill108 close"></i>
          </span>

          <span @click="rightMenuToggle(1, 'setting')" :class="{'on': rightMenu.setting}">
            <i class="iconfont icon-settings"></i>
          </span>
          <span @click="rightMenuToggle(1, 'history')" :class="{'on': rightMenu.history}">
            <i class="iconfont icon-time"></i>
          </span>
          <span @click="rightMenuToggle(1, 'collection')" :class="{'on': rightMenu.collection}">
            <i class="iconfont icon-favor"></i>
          </span>
          <span @click="rightMenuToggle(1, 'feedback')" :class="{'on': rightMenu.feedback}">
            <i class="iconfont icon-write"></i>
          </span>
        </div>
        <div class="right-tabs-content">
          <dl class="setting" v-if="rightMenu.setting">
            <dt>系统设置</dt>
            <dd>
              默认收起左导航
              <el-switch
                v-model="config[2]"
                active-color="#00b4f3"
                inactive-color="#C0CCDA">
              </el-switch>
            </dd>
            <dd>
              默认展开右导航
              <el-switch
                v-model="config[3]"
                active-color="#00b4f3"
                inactive-color="#C0CCDA">
              </el-switch>
            </dd>
            <dd>
              默认跳过首页
              <el-switch
                v-model="config[4]"
                active-color="#00b4f3"
                inactive-color="#C0CCDA">
              </el-switch>
            </dd>
            <dd>
              显示通知
              <el-switch
                v-model="config[5]"
                active-color="#00b4f3"
                inactive-color="#C0CCDA">
              </el-switch>
            </dd>
            <dd>
              显示未读数
              <el-switch
                v-model="config[6]"
                active-color="#00b4f3"
                inactive-color="#C0CCDA">
              </el-switch>
            </dd>
            <dd>
              可编辑拖动
              <el-switch
                v-model="config[7]"
                active-color="#00b4f3"
                inactive-color="#C0CCDA">
              </el-switch>
            </dd>
          </dl>

          <dl class="history" v-if="rightMenu.history">
            <dt>浏览记录</dt>
            <dd><a href="#">销量分析系统</a></dd>
            <dd><a href="#">全国车型销量预测系统</a></dd>
            <dd><a href="#">全国细分市场销量预测</a></dd>
            <dd><a href="#">市场预测专项研究</a></dd>
          </dl>

           <dl class="collection" v-if="rightMenu.collection">
            <dt>收藏记录</dt>
            <dd><a href="#">销量分析系统</a></dd>
            <dd><a href="#">全国车型销量预测系统</a></dd>
            <dd><a href="#">全国细分市场销量预测</a></dd>
            <dd><a href="#">市场预测专项研究</a></dd>
          </dl>

          <dl class="feedback"  v-if="rightMenu.feedback">
            <dt>反馈</dt>
            <dd>
              <el-form label-position="top" label-width="80px" :model="feedbackForm">
                <el-form-item label="标题">
                  <el-input v-model="feedbackForm.title"></el-input>
                </el-form-item>
                <el-form-item label="详情">
                  <el-input type="textarea" :rows="4" v-model="feedbackForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini">提交</el-button>
                </el-form-item>
              </el-form>
            </dd>
          </dl>
        </div>
      </div>

      <!--<span class="go-header" @click="goHeader">-->
        <!--<i class="iconfont icon-upload"></i><br>-->
        <!--TOP-->
      <!--</span>-->
    </div>
	</div>
</template>

<script type="text/ecmascript-6">
  import mixin from '@index/config/mixin.js'
  import bus from '@/config/eventBus.js'
  export default {
    name: '',
    mixins: [mixin],
    props: {
      isFixed: {
        type: Boolean,
        default: false
      },
    },
    watch: {
      config: function() {
        localStorage.setItem('config', JSON.stringify(this.config));
        bus.$emit('updateConfig', this.config);
      }
    },
    data() {
    	return {
        activeName:'',
        initActiveName:'',
        feedbackForm: {
          title: '',
          desc: '',
        },
        rightMenu: {
          setting: false,
          history: false,
          collection: false,
          feedback: false,
        }
    	}
    },
    mounted() {
      this.rightMenu.setting = true
    },
    methods:{
      rightMenuToggle(num, el) {
        let menuStatus = ''
        if (num < 0 && menuStatus == '') menuStatus = 'setting';
        if (num > 0) menuStatus = el;
        for(let key in this.rightMenu){
          menuStatus == key ? this.rightMenu[key] = true : this.rightMenu[key] = false;
        }
        this.$emit("changeRightPanelStatus", num);
      },
      goHeader(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    }
  }
</script>

<style lang="scss" type="text/scss" scoped>
</style>
