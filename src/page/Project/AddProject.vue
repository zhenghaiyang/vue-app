<template>
  <div>
    <group title="创建项目" label-width="7em" label-margin-right="2em" label-align="justify">
      <x-input title="项目名称" v-model.trim="addForm.projectName" ref="projectName" required></x-input>
      <datetime title="项目开始时间" v-model="addForm.projectStartTime" required value-text-align="left" ref="projectStartTime"></datetime>
      <datetime title="项目结束时间" v-model="addForm.projectEndtTime" required value-text-align="left" ref="projectEndtTime"></datetime>
      <selector title="项目负责人" :options="userManage" v-model="addForm.projectManage" placeholder="必填的"></selector>
    </group>
    <div style="padding:15px;">
        <x-button plain @click.native="_submit" type="primary"  text="确定"></x-button>
        <x-button plain @click.native="_resetForm"  text="取消"></x-button>
    </div>
  </div>
</template>

<script>
import {Group, XInput, Datetime, XButton,Selector} from 'vux';
import {addProject,getAllUserList} from '@/api/index';
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
      addForm:{
        projectName:"",
        projectStartTime:"",
        projectEndtTime:"",
        projectManage:""
      },
      userManage:[]
    }
  },
  methods:{
    // 提交
    _submit() {
      if(!this.addForm.projectName || !this.addForm.projectStartTime || !this.addForm.projectEndtTime) {
        this.$vux.alert.show({
            title: '警告',
            content: '项目名称或项目开始时间或项目结束时间为空!'
        })
        return
      }else{
        if(new Date(this.addForm.projectStartTime).valueOf() > new Date(this.addForm.projectEndtTime).valueOf()) {
          this.$vux.alert.show({
              title: '警告',
              content: '项目开始不能大于项目结束日期!'
          })
          return
        }
        let params ={
          projectName:this.addForm.projectName,
          createdTime:new Date().format('yyyy-MM-dd'),
          startTime:this.addForm.projectStartTime,
          endTime:this.addForm.projectEndtTime,
          projectManage:this.addForm.projectManage
        }
        addProject(params).then((res)=>{
          this.$vux.alert.show({
              title: '提示',
              content: '操作成功'
          })
          this.addForm={
            projectName:"",
            projectStartTime:"",
            projectEndtTime:""
          }
        })
        console.log("asdad",params)
      }
    },
    // 取消
    _resetForm() {
      this.$refs.projectName.reset()
      // this.projectStartTime=""
      this.$router.replace('/project')
      // this.$refs.projectStartTime.reset()
    }
  },
  created(){
    getAllUserList({}).then((res)=>{
      if(res.data) {
        res.data.map((item,index)=>{
          if(item.userPositionCode=="3") {
            this.userManage.push({
              key:item.id,
              value:item.userName
            })
          }
        })
      }
    })
  }
}
</script>

<style scoped lang="less">


</style>
