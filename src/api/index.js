import {getRequest,postRequest,mockLocalhostJson} from '@/lib/pAxios.js';


// 登录
export const login = (params)=>{
  return postRequest(`user/login`,params)
}

// 获取全部项目列表
export const getAllProject = (params)=>{
  return postRequest("project/all",params)
}
// 删除项目
export const delProject  = (params)=>{
  return postRequest("project/del",params)
}
// 添加项目
export const addProject  = (params)=>{
  return postRequest("project/add",params)
}
// 根据项目id获取项目下的全部人员
export const getAllUserByPId= (params)=>{
  return postRequest("project/getUpByPId",params)
}
// 用户录入项目
export const importProject= (params)=>{
  return postRequest("project/importProject",params)
}
// 获取时长list
export const getTimeList = (params)=>{
  return postRequest("project/getAlltime",params)
}
// 重置密码
export const resetPassword = (params)=>{
  return postRequest("user/resetPassword",params)
}
// 修改密码
export const userResetPassword = (params)=>{
  return postRequest("user/userResetPassword",params)
}

// 获取职位
export const getAllPosition = (params)=>{
  return postRequest("user/allPosition",params)
}

// 获取全部用户
 export const getAllUserList = (params)=>{
   return postRequest("user/all",params)
 }
// 添加用户
export const addUser = (params)=>{
  return postRequest("user/add",params);
}
// 删除用户
export const delUser = (params)=>{
  return postRequest("user/del",params);
}
// 统计个人上班加班天数
export const detalisByUser  = (params)=>{
  return postRequest("project/userDetils",params);
}
// 根据项目名称和时间范围查询
export const getAllProjectByParams = (params)=>{
  return postRequest("project/allByParams",params);
}
// 关闭项目
export const closeProject=(params)=>{
  return postRequest("project/closeProject",params);
}
// 导出项目
export const exportProjectDetail=(params)=>{
  return getRequest("export/exportTest",params)
}
