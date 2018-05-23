export default {
  data() {
    return {
      year_month: '2018/03',
      manage_dimension: '全国',
      manage_type: '零售量',
      uri_map: [
        '', 'country', 'area', 'province'
      ]
    }
	},
  computed: {
    manage_type_id() {
      return this.dimension.manage_type_id || ''
    },
    dimension_name() {
      return this.dimension.manage_name || ''
    },
    dimension_id() {
      return this.dimension.object_id || ''
    },
    dimension() {
      var dimensions = this.$store.state.user.dimension || []
      var path = this.$route.path
      var dimension = dimensions.find(item => {
        let uri= this.uri_map[item.manage_type_id] || ''
        return path.indexOf(uri) != -1
      }) || {}
      return dimension
    }
  },
  mounted() {
    this.GET_DATA_TIME()
  },
  methods: {
    to_zero(num){
      num = num.toString().replace(/\,/g, '')*1
      num = num>100000000?100000000:num
      if(!num || num <0 || isNaN(num)){
        num = 0
      }
      return Math.round(Number(num))
    },
    GET_DATA_TIME(cb=()=>{}) {
      this.$request.get(this.$interface.GET_DATA_TIME, {
        header: {token: this.token},
      }, (response) => {
        let data = response.data[0] || []
        this.year_month = data.end_time || this.year_month
      }, (response) => {
      })
    },
    expireWithUUID(response, cb) {
      if (response.result_code == "200" && response.result_msg == "OK: 目标草稿已过期或不存在") {
        sessionStorage.removeItem('iways_uuid')
        typeof cb == 'function' ? cb() : ''
      }
    }
  }
}
