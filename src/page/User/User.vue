<template>
  <div>
    <div v-for="(item,index) in userList">
      <divider >{{ item.userName }}</divider>
      <span class="del" @click="()=>handleDel(item.id)">删除用户</span>
      <span class="del" @click="()=>ressetPassword(item.id)">重置用户密码</span>
       <card :header="{title: '用户简况' }">
        <div slot="content" class="card-padding">
          <div>
            <span>用户账号</span>
            <span>{{item.userCode}}</span>
          </div>
          <div>
            <span>用户职位</span>
            <span>{{renderPositionName(item.userPositionCode) }}</span>
          </div>
        </div>
        <!-- <div slot="footer">
          <span class="clickMore" @click="clickMore">点击查看更多</span>
        </div> -->
      </card>
    </div>
  </div>
</template>

<script>
import {Divider,Card,XButton,XDialog,TransferDomDirective as TransferDom,XSwitch } from 'vux';
import {getAllUserList,getAllPosition,resetPassword,delUser} from '@/api/index';
export default {
  directives: {
   TransferDom
   },
  components:{
    Divider,
    Card,
    XButton,
    XDialog,
    XSwitch
  },
  name: 'User',
  data () {
    return {
      userList:[],
      positionList:[]
    }
  },
  methods:{
    // 重置密码
    ressetPassword(id) {
      console.log("id",id)
      let params ={
        id:id
      }
      resetPassword(params).then((res)=>{
        this.$vux.confirm.show({
          title: '成功',
          content: '重置成功'
        })
      })
    },
    // 删除
    handleDel(id) {
      const that =this
      let params ={
        id:id
      }
      this.$vux.confirm.show({
        title: '删除',
        content: '确定要删除吗?删除将删除用户下全部信息',
        onConfirm() {
          delUser(params).then((res)=>{
            that.$vux.confirm.show({
              title: '成功',
              content: '删除成功'
            })
            that.getAllUserListFN()
          })
        }
      })
    },
    // 获取全部用户
    getAllUserListFN(){
      getAllUserList({}).then((res)=>{
        this.userList = res.data
      })
    },
    // 获取全部职位
    getPositionList() {
      getAllPosition({}).then((res)=>{
        this.positionList=res.data
      })
    },
    // 根据职位code获取职位名称
    renderPositionName(code) {
      var submitStr=""
      this.positionList.map((item,index)=>{
        if(item.key==code) {
          submitStr = item.value
        }
      })
      return submitStr
    }
  },
  created(){
    this.getPositionList();
    this.getAllUserListFN();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.clickMore {
  padding: 15px;
  color: #4285f4;
  cursor: pointer;
}
.card-padding {
  padding: 15px;
}
.vux-close {
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 20px;
}
.dialog-content {
  padding: 10px;
  text-align: left;
}
.dialog-title {
  line-height: 30px;
  color: #666;
}
.weui-dialog{
    border-radius: 8px;
    padding-bottom: 8px;
}
.del {
  display: inline-block;
  color: red;
  margin-left: 5px;
  cursor: pointer;
}
</style>
