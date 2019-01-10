<template>
  <div>
    <group title="创建项目" label-width="7em" label-margin-right="2em" label-align="justify">
      <x-input title="项目名称" v-model.trim="addForm.projectName" ref="projectName" required></x-input>
      <datetime title="项目开始时间" v-model="addForm.projectStartTime" required value-text-align="left" ref="projectStartTime"></datetime>
    </group>
    <div style="padding:15px;">
        <x-button plain @click.native="_submit" type="primary"  text="确定"></x-button>
        <x-button plain @click.native="_resetForm"  text="取消"></x-button>
    </div>
  </div>
</template>

<script>
import {Group, XInput, Datetime, XButton} from 'vux';
import {addProject} from '@/api/index';
export default {
  components:{
    Group,
    XInput,
    Datetime,
    XButton
  },
  data() {
    return {
      addForm:{
        projectName:"",
        projectStartTime:"",
      }
    }
  },
  methods:{
    // 提交
    _submit() {
      if(!this.addForm.projectName || !this.addForm.projectStartTime) {
        this.$vux.alert.show({
            title: '警告',
            content: '项目名称或项目开始时间为空!'
        })
        return
      }else{
        let params ={
          projectName:this.addForm.projectName,
          createdTime:new Date().format('yyyy-MM-dd'),
          startTime:this.addForm.projectStartTime
        }
        addProject(params).then((res)=>{
          this.$vux.alert.show({
              title: '提示',
              content: '操作成功'
          })
          this.addForm={
            projectName:"",
            projectStartTime:"",
          }
        })
        console.log("asdad",params)
      }
    },
    // 取消
    _resetForm() {
      this.$refs.projectName.reset()
      this.projectStartTime=""
      this.$router.replace('/project')
      // this.$refs.projectStartTime.reset()
    }
  }
}
</script>

<style scoped lang="less">


</style>
