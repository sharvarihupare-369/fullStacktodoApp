import { NewTodo } from '../../components/TodoInput';
import { baseUrl } from '../../url';
import { ADD_TODO_SUCCESS, DELETE_TODOS, DELETE_TODOS_FAILURE, GET_TODO_SUCCESS, TODO_FAILURE, TODO_REQUEST } from './actionTypes';
import axios from "axios"


export const getTodos = (token:String) => (dispatch:any) => {
   dispatch({type:TODO_REQUEST})
   axios.get(`${baseUrl}/todos/`,{
      headers: {
         'Authorization': `Bearer ${token}` 
       }
      }).then((res)=>{
    // console.log(res)
    dispatch({type:GET_TODO_SUCCESS,payload:res.data})
   }).catch((err)=>{
    // console.log(err)
    dispatch({type:TODO_FAILURE})
   })

}


export const postTodos = (newTodo:NewTodo,token:String) => (dispatch:any) => {
    dispatch({type:TODO_REQUEST})
    return axios.post(`${baseUrl}/todos/addtodo`,newTodo,{
      headers: {
         'Authorization': `Bearer ${token}` 
       }
    }).then((res)=>{
   //   console.log(res)
     dispatch({type:ADD_TODO_SUCCESS,payload:res.data})
    }).catch((err)=>{
   //   console.log(err)
     dispatch({type:TODO_FAILURE})
    })
 
 }

 export const deleteTodo = (id:number,token:string) => (dispatch:any) => {
   dispatch({type:TODO_REQUEST})
    axios.delete(`${baseUrl}/todos/delete/${id}`,{
      headers: {
         'Authorization': `Bearer ${token}` 
       }
   }).then((res)=>{
      // console.log(res)
      dispatch({type:DELETE_TODOS,payload : res.data.msg})
   }).catch((err)=>{
      console.log(err)
      dispatch({type:DELETE_TODOS_FAILURE,payload:err.response.data.errormsg})
   })
 }