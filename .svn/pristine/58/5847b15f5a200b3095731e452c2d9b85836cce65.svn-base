<template>

	<div class="home">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="panel">
          <h2 class="title">统计</h2>
          <ul class="count">
            <li>
              <p>今日帐户登录量</p>
              <div class="info-box">
                <i class="iconfont icon-fenxixian"></i>
                <span>
                  <b class="font-blue">180</b>人次<br>
                  <cite>今日系统登录量</cite>
                </span>
              </div>
            </li>
            <li>
              <p>累计帐户登录量</p>
              <div class="info-box">
                <i class="iconfont icon-fangkefenxi" style="font-size: 38px;"></i>
                <span>
                  <b class="font-blue">1280</b>人次<br>
                  <cite>累计系统登录量</cite>
                </span>
              </div>
            </li>
            <li>
              <p>系统访问总量</p>
              <div class="info-box">
                <i class="iconfont icon-liulanqi-IE"></i>
                <span>
                  <b class="font-blue">3580</b>人次<br>
                  <cite>累计访问录量</cite>
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div class="panel">
          <h2 class="title">待办事项清单</h2>
          <div class="list">
            <dl>
              <dt>
                <a href="">长安汽车帐户即将过期</a>
                <span>
                  长安汽车账户使用即将过期请及时通知续费。
                  <br><font>2018年2月21日</font>
                </span>
              </dt>
              <dd>
                帐户管理 人：张超
                <br><i class="iconfont icon-dianhua1"></i> <font>13392996655</font>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="">长安汽车帐户即将过期</a>
                <span>
                 丰田汽车试用账户使用即将过期请及时通知续费。
                  <br><font>2018年2月21日</font>
                </span>
              </dt>
              <dd>
                帐户管理 人：李舒
                <br><i class="iconfont icon-dianhua1"></i> <font>13392996655</font>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="">宝马汽车帐户即将过期</a>
                <span>
                  宝马汽车账户使用即将过期请及时通知续费。
                  <br><font>2018年2月21日</font>
                </span>
              </dt>
              <dd>
                帐户管理 人：田安
                <br><i class="iconfont icon-dianhua1"></i> <font>13392996655</font>
              </dd>
            </dl>
          </div>
        </div>

        <div class="panel">
          <h2 class="title">最新帐户反馈</h2>
          <div class="list">
            <dl>
              <dt>
                <a href="">意见与修改</a>
                <span>
                  功能摆放不合理，能否调整一下布局。
                  <br><font>2018年2月21日</font>
                </span>
              </dt>
              <dd>
                帐户管理 人：张超
                <br><i class="iconfont icon-dianhua1"></i> <font>13392996655</font>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="">用户体验不好</a>
                <span>
                 界面体验不好，能否调整和优化丰田汽车试用账户使用即将过期请及时通知续费
                  <br><font>2018年1月11日</font>
                </span>
              </dt>
              <dd>
                帐户管理 人：李舒
                <br><i class="iconfont icon-dianhua1"></i> <font>13392996655</font>
              </dd>
            </dl>
            <dl>
              <dt>
                <a href="">数据更新过慢</a>
                <span>
                  数据更新过慢，长安汽车账户使用即将过期请及时通知续费。
                  <br><font>2018年1月21日</font>
                </span>
              </dt>
              <dd>
                帐户管理 人：田安
                <br><i class="iconfont icon-dianhua1"></i> <font>13392996655</font>
              </dd>
            </dl>
          </div>
        </div>

        <div class="panel">
          <h2 class="title">最近使用的帐户</h2>
          <div class="user">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="日期"
              >
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
              >
              </el-table-column>
              <el-table-column
                prop="belong"
                label="所属角色"
              >
              </el-table-column>
              <el-table-column
                prop="group"
                label="所属组"
              >
              </el-table-column>
              <el-table-column
                label="操作"
              >
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="panel">
          <h2 class="title">最近分配的帐户</h2>
          <div class="right">
            <dl v-for="item in 4">
              <dt><a href=""><img src="/static/images/linshi/user5.png" alt=""></a></dt>
              <dd>
                <h4>
                  <a href="">Zxiaohao</a>
                  <span>长安汽车</span>
                </h4>
                <p>
                  <em>20分钟前</em>
                  <br>他查看了销量目标管理场景模块
                </p>
              </dd>
            </dl>
          </div>
        </div>
      </el-col>
    </el-row>
	</div>

</template>

<script type="text/ecmascript-6">
	export default {
		name: '',
		data() {
			return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          belong: '经理',
          group: '长安汽车',
        }, {
          date: '2016-05-02',
          name: '王小虎',
          belong: '主管',
          group: '本田汽车',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          belong: '总经理',
          group: '通用汽车',
        }, {
          date: '2016-05-01',
          name: '王小虎',
          belong: '总监',
          group: '马自达汽车',
        }]
			}
		},
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
	}
</script>

<style lang="scss" type="text/scss" scoped>
@import "~@admin/assets/scss/common";
@import "~@admin/assets/scss/style";
</style>
