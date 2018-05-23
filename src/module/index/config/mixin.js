export default {
  data(){
    return{
      username: this.$store.state.user.username,
      token: this.$store.state.user.token,
    }
  },
  metaInfo: {
    title: '威尔森智能决策平台',
    meta: [{
      name: 'author',
      content: '威尔森信息科技有限公司-IT技术研发中心'
    }, {
      name: 'description',
      content: '威尔森信息科技有限公司是中国汽车行业领先的量化决策咨询伙伴，建立并拥有中国汽车行业大数据体系以及一支逾二百人的专业研究团队，其中包括全球领先的汽车行业数据建模咨询团队，助力中国汽车行业建立以“数据”为基础的量化决策体系。'
    }, {
      name: 'keywords',
      content: '威尔森，汽车建模，汽车数据，量化决策，信息科技'
    }]
  },
  failure(response) {
    this.$notify.error({
      title: '错误信息',
      message: '[code:' + (response.result_code || response.code || '400')+ ']' + (response.result_msg || response.msg || '数据有误')
    });
    switch (response.code) {
      case 'ACCESS_TOKEN_FAILD':
        this.$router.push({path: '/login'})
        break;
      case 'NO_PERMISSION':
        this.$router.go(-1)
        break;
      default:
    }
  },
}
