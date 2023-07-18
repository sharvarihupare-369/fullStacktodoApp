import { baseUrl } from '../../url';
import { ADD_TODO_SUCCESS, GET_TODO_SUCCESS, TODO_FAILURE, TODO_REQUEST } from './actionTypes';
import axios from "axios"


export const getTodos = () => (dispatch:any) => {
   dispatch({type:TODO_REQUEST})
   axios.get(`${baseUrl}/todos/`).then((res)=>{
    // console.log(res)
    dispatch({type:GET_TODO_SUCCESS,payload:res.data})
   }).catch((err)=>{
    // console.log(err)
    dispatch({type:TODO_FAILURE})
   })

}


export const postTodos = (newTodo:any) => (dispatch:any) => {
    dispatch({type:TODO_REQUEST})
    return axios.post(`${baseUrl}/todos/addtodo`,newTodo).then((res)=>{
    //  console.log(res)
     dispatch({type:ADD_TODO_SUCCESS,payload:res.data})
    }).catch((err)=>{
     // console.log(err)
     dispatch({type:TODO_FAILURE})
    })
 
 }