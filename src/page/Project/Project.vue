<template>
  <div>
    <div v-for="(item,index) in projectList">
      <divider >{{ item.projectName }}</divider>
      <span class="del" @click="()=>handleDel(item.id)">删除</span>
       <card :header="{title: '项目简况' }">
        <div slot="content" class="card-padding">
          <div>
            <span>项目创建时间</span>
            <span>{{renderDate(item.createdTime)}}</span>
          </div>
          <div>
            <span>项目开始时间</span>
            <span>{{item.startTime && renderDate(item.startTime)}}</span>
          </div>
          <div>
            <span>预计项目结束时间</span>
            <span>{{item.endTime && renderDate(item.endTime)}}</span>
          </div>
          <div>
            <span>项目真实结束时间</span>
            <span>{{item.trueEndTime && renderDate(item.trueEndTime)}}</span>
          </div>
          <div>
            <span>项目负责人</span>
            <span>{{item.projectManage && item.projectManage}}</span>
          </div>
        </div>
        <div slot="footer">
          <span class="clickMore" @click="()=>clickMore(item.id)">点击查看更多</span>
          <span class="clickMore" @click="()=>closeProject(item.id)" v-if="!item.trueEndTime">结束项目</span>
        </div>
      </card>
    </div>
    <div v-transfer-dom>
      <x-dialog :show="claseDialog">
        <p class="dialog-title">选择结束时间</p>
        <div class="dialog-content">
            <datetime title="项目结束时间" v-model="trueEndTime" value-text-align="left" ref="trueEndTime"></datetime>
        </div>
        <div @click="claseDialog=false" style="text-align:end" class="dialogFoot">
          <span class="vux-close">关闭</span>
        </div>
        <div @click="handleClose" style="text-align:end" class="dialogFoot">
          <span class="vux-close">确定</span>
        </div>
      </x-dialog>
    </div>
    <div v-transfer-dom>
        <x-dialog :show="moreDialog">
          <p class="dialog-title">项目详情</p>
          <div class="dialog-content">
              <span>项目人员如下</span>
              <x-table full-bordered style="background-color:#fff;" v-if="userList.length>0">
                <thead>
                  <tr>
                    <th>姓名</th>
                    <th>职位</th>
                    <th>总时长</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in userList">
                    <td>
                      {{item.userName}}
                    </td>
                    <td>
                    {{item.positionName}}
                    </td>
                    <td>
                      {{`${item.allTime}天`}}
                    </td>
                  </tr>
                </tbody>
              </x-table>
              <span v-else style="display:block;text-align:center">暂无</span>
          </div>
          <div @click="moreDialog=false" style="text-align:end">
            <span class="vux-close">关闭</span>
          </div>
        </x-dialog>
    </div>
  </div>
</template>

<script>
import { getAllProject,delProject,getAllUserByPId,closeProject } from '@/api/index.js'
import {Divider,Card,XButton,XDialog,TransferDomDirective as TransferDom,XSwitch,XTable,Datetime } from 'vux';
export default {
  directives: {
   TransferDom
   },
  components:{
    Divider,
    Card,
    XButton,
    XDialog,
    XSwitch,
    XTable,
    Datetime
  },
  name: 'Project',
  data () {
    return {
      claseDialog:false,
      projectList:[],
      moreDialog:false,
      userList:[],
      selectProjectID:"",
      trueEndTime:new Date().format('yyyy-MM-dd')
    }
  },
  methods:{
    // 结束项目
    closeProject(id) {
      this.claseDialog=true
      this.selectProjectID=id
    },
    // 结束项目
    handleClose() {
      const that=this
      let params={
        id:this.selectProjectID,
        trueEndTime:this.trueEndTime
      }
      console.log('params',params)
      closeProject(params).then((res)=>{
        let code = res.code
        if(code==200){
          that.claseDialog=false
          that.$vux.alert.show({
              title: '提示',
              content: res.msg
          })
          that.getAllProjectFN();
        }

      })
    },
    // 格式化时间
    renderDate(value){
      return new Date(value).format("yyyy-MM-dd")
    },
    // 查看更多
    clickMore(id) {
      let params = {
        id:id
      }
      getAllUserByPId(params).then((res)=>{
        this.userList = res.data
        this.moreDialog = true

      })
      console.log("121212",id)
    },
    // 获取项目列表
    getAllProjectFN() {
      getAllProject({}).then((res)=>{
        let code = res.code
        if(code==200) {
          this.projectList = res.data
        }
      })
    },
    // 删除
    handleDel(id) {
      const that=this
      this.$vux.confirm.show({
        title: '删除',
        content: '确定要删除吗?删除将删除项目下全部信息',
        onConfirm() {
          let params={
            id:id
          }
          delProject(params).then((res)=>{
            that.$vux.alert.show({
                title: '提示',
                content: '操作成功'
            })
            that.getAllProjectFN()
          })
        }
      })
    }
  },
  created(){
    this.getAllProjectFN()
  },
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
.dialogFoot {
  display: inline-block;
  cursor: pointer;
}
</style>
