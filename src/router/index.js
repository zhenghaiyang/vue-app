import HelloWorld from '@/components/HelloWorld'
import Mangage from '@/components/Mangage'
import Login from '@/Login.vue';
import User from '@/page/User/User';
import Project from '@/page/Project/Project';
import ProjectImport from '@/page/ProjectImport/ProjectImport';
import AddProject from '@/page/Project/AddProject';
import AddUser from '@/page/User/AddUser';
import RessetPassword from '@/page/RessetPassword';

const routes=[
      {path: '/login', component: Login },
      {path: '/', redirect: "/login" },//重定向
      {path: '/manage', name:"工作台" ,component: Mangage, meta:{requireMenue:true},
        children:[
          {path:"/manage/home",name:"欢迎",component: HelloWorld,meta:{requireMenue:true}},
          {path:"/user",name:"用户管理",component: User,meta:{requireMenue:true}},
          {path:"/project",name:"项目管理",component: Project,meta:{requireMenue:true}},
          {path:"/addProject",name:"创建项目",component: AddProject,meta:{requireMenue:false}},
          {path:"/projectImport",name:"项目录入",component: ProjectImport,meta:{requireMenue:false}},
          {path:"/addUser",name:"添加用户",component: AddUser,meta:{requireMenue:false}},
          {path:"/resetPassword",name:"修改密码",component: RessetPassword,meta:{requireMenue:false}}
        ]
      },
      

];

export default routes;
