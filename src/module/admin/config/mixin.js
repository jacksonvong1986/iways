import { mapActions } from 'vuex'
import { ADMIN_REFRESH_TOKEN } from '@/store/admin'
import moment from 'moment'
export default {
  data() {
      return {
          token: this.$store.state.admin.token,
          admin_id: this.$store.state.admin.user_id,
          menus: this.$store.state.admin.menus,
          menus_table: this.$helper.arr2table(this.$store.state.admin.menus),
          spm: this.$route.query.spm ? this.$route.query.spm.split('-').slice(0, 3).join('-') : '',
          status: {
              '0': '已禁用',
              '1': '使用中'
          },
          failTimes: 3,
      }
  },
  computed: {
      privileges() {
          var privileges = []
          var nodes = this.$helper.arr2table(this.menus_table)
          nodes.map(node => {
              if (!!node.url) {
                  if (node.url == '#') return
                  if (privileges.includes(node.url)) return
                  privileges.push(node.url)
              }
          })
          return privileges
      },
  },
  filters: {
    number_format(number, decimals = 0, separator = ',') {
      if (!number || number == "" || isNaN(number)) {
        number = 0;
      }
      if (number === -1) {
        return '暂无数据'
      }
      number = number.toFixed(decimals);
      if (separator != "") {
        var reg = /\d{1,3}(?=(\d{3})+$)/g;
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
      ...mapActions([ADMIN_REFRESH_TOKEN]),
      clearValidate(formName) {
          if (this.$refs[formName]) {
              this.$refs[formName].clearValidate()
          }
      },
      dataUpdate(data = {}) {
          var id = data['update'] || (() => {
              var checked_ids = this.checked_ids || []
              return checked_ids.map((id) => {
                  return Number(id)
              }).join(',')
          })(this)

          var field = data['field'],
              action = data['action'],
              value = data['value'],
              cb = data['cb'] || this.getList,
              params = Object.assign({}, {
                  field: field,
                  value: value,
                  id: id
              }, {
                  user_id: this.user_id,
                  token: this.token
              })

          if (id.length < 1) {
              return this.$message({
                  type: 'error',
                  message: '请选择需要操作的数据！'
              });
          }
          this.$confirm('确定要操作这些数据吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.$request.post(action, params, (response) => {
                  var that = this
                  this.$message({
                      type: 'success',
                      message: response.msg || '',
                      onClose() {
                          cb()
                      }
                  })
              })
          }, () => {
          })
      },
      getToken(callback) {
          if (!this.token) {
              this.$router.push({
                  path: '/login'
              })
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
                  'refresh_token': this.$store.state.admin.refresh_token
              }, (response) => {
                  this.ADMIN_REFRESH_TOKEN(response.data.token)
                  this.$router.go(0)
              }, this.failure);
              break;
          case 'REFRESH_TOKEN_EXPIRED':
              this.$router.push({
                  path: '/login'
              })
              break;
          case 'NO_PERMISSION':
              this.$router.go(-1)
              break;
          default:
              this.$notify.error({
                  title: '错误信息',
                  message: '[code:' + (response.result_code || response.code || '400') + ']' + (response.result_msg || response.msg || '数据有误')
              });
              break;
          }
      },
      ucfirst(str) {
        var str = str.toLowerCase();
        str = str.replace(/\b\w+\b/g, function(word){
          return word.substring(0,1).toUpperCase()+word.substring(1);
        });
        return str; 
      }
  },
  created() {
      // console.log('this.$store.state.nodes')
  }
}