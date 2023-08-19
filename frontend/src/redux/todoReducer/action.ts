import { NewTodo } from '../../components/TodoInput';
import { baseUrl } from '../../url';
import { ADD_TODO_SUCCESS, DELETE_TODOS, DELETE_TODOS_FAILURE, GET_TODO_SUCCESS, TODO_FAILURE, TODO_REQUEST, TOGGLE_TODOS_SUCCESS, UPDATE_TODOS_FAILURE, UPDATE_TODOS_STATUS_SUCCESS, UPDATE_TODOS_SUCCESS } from './actionTypes';
import axios from "axios"


export const getTodos = (token:string,q="",page=1,limit=5) => (dispatch:any) => {
   dispatch({type:TODO_REQUEST})
   if(q){
      axios.get(`${baseUrl}/todos?q=${q}`,{
         headers: {
            'Authorization': `Bearer ${token}` 
          }
         }).then((res)=>{
      //  console.log(res)
      //  dispatch({type:GET_TODO_SUCCESS,payload:res.data})
       dispatch({type:GET_TODO_SUCCESS,payload: { todos: res.data.todos, total: res.data.total }})
      }).catch((err)=>{
       // console.log(err)
       dispatch({type:TODO_FAILURE})
      })
   
   }else{
   axios.get(`${baseUrl}/todos?page=${page}&limit=${limit}`,{
      headers: {
         'Authorization': `Bearer ${token}` 
       }
      }).then((res)=>{
   //  console.log(res)
    dispatch({type:GET_TODO_SUCCESS,payload: { todos: res.data.todos, total: res.data.total }})
   }).catch((err)=>{
    // console.log(err)
    dispatch({type:TODO_FAILURE})
   })
}
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

 export const deleteTodo = (id:string,token:string) => (dispatch:any) => {
   dispatch({type:TODO_REQUEST})
   return  axios.delete(`${baseUrl}/todos/delete/${id}`,{
      headers: {
         'Authorization': `Bearer ${token}` 
       }
   }).then((res)=>{
      console.log(res)
      dispatch({type:DELETE_TODOS,payload : res.data.msg})
   }).catch((err)=>{
      console.log(err)
      dispatch({type:DELETE_TODOS_FAILURE,payload:err.response.data.errormsg})
   })
 }


 export const updateTodo = (id: string, title: string, newStatus : boolean, token: string) => async (dispatch: any) => {
    let updatedData = title || newStatus
    let todoObj;
    if(typeof(updatedData)==='string'){
        todoObj = {title}
    }else{
      todoObj = {status:newStatus}
    }
   
     dispatch({ type: TODO_REQUEST });

     await axios.patch(`${baseUrl}/todos/update/${id}`, todoObj, {
       headers: {
         'Authorization': `Bearer ${token}`
       }
     }).then((res)=>{
     
        dispatch({ type: UPDATE_TODOS_SUCCESS, payload: res.data.msg });

     }).catch((err)=>{
    
        dispatch({ type: UPDATE_TODOS_FAILURE ,payload:err.response.data.errormsg});

     })
 
   }

export const handleUpdateStatus = (id:string,newStatus:boolean,token:string) =>  (dispatch:any) => {
   dispatch({ type: TODO_REQUEST });
    axios.patch(`${baseUrl}/todos/update/${id}`, { status:newStatus }, {
     headers: {
       'Authorization': `Bearer ${token}`
     }
   }).then((res)=>{
      // console.log(res)
      dispatch({ type: TOGGLE_TODOS_SUCCESS, payload: id});

   }).catch((err)=>{
      // console.log(err)
      dispatch({ type: TODO_FAILURE });

   })
}