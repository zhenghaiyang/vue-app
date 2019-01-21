<template>
  <div>
    <group title="创建用户" label-width="6em" label-margin-right="2em" label-align="justify">
      <x-input title="用户账号" v-model.trim="addForm.userCode" ref="userCode" required></x-input>
      <x-input title="用户姓名" v-model.trim="addForm.userName" ref="userName" required></x-input>
      <selector title="选择职位" :options="positionList" v-model="addForm.userPositionCode" placeholder="必填的" ref="userPositionCode"></selector>
    </group>
    <div style="padding:15px;">
        <x-button plain @click.native="_submit" type="primary"  text="确定"></x-button>
        <x-button plain @click.native="_resetForm"  text="取消"></x-button>
    </div>
  </div>
</template>

<script>
import {Group, XInput, Datetime, XButton,Selector} from 'vux'
import {getAllPosition,addUser} from '@/api/index'
export default {
  components:{
    Group,
    XInput,
    Datetime,
    XButton,
    Selector
  },
  data() {
    return {
      positionList:[],
      addForm:{
        userName:"",
        userPositionCode:"",
        userCode:""
      }
    }
  },
  methods:{
    // 获取全部职位
    getAllPositionFN() {
      getAllPosition({}).then((res)=>{
        this.positionList = res.data
      }).finally(()=>{

      })
    },
    // 提交
    _submit() {
      if(!this.addForm.userName || !this.addForm.userPositionCode || !this.addForm.userCode) {
        this.$vux.alert.show({
            title: '警告',
            content: '用户名称和用户职位不能为空'
        })
        return
      }else{
        addUser(this.addForm).then((res)=>{
          this.$vux.alert.show({
              title: '添加成功',
              content: '操作成功'
          })
          this.addForm={
                  userName:"",
                  userPositionCode:"",
                  userCode:""
                }
        })
        console.log(this.addForm)
      }
    },
    // 取消
    _resetForm() {
      // this.$refs.projectName.reset()
      // this.$refs.selectPosition.reset()
      // this.$refs.userCode.reset()
      this.addForm={
              userName:"",
              userPositionCode:"",
              userCode:""
            }
      // this.$router.replace('/project')
      // this.$refs.projectStartTime.reset()
    }
  },
  created(){
    this.getAllPositionFN()
  }
}
</script>

<style scoped lang="less">


</style>
