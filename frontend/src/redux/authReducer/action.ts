import axios from "axios"
import { baseUrl } from "../../url"
import { AUTH_REGISTER_SUCCESS, AUTH_REQ, AUTH_REQ_FAILURE, AUTH_REQ_SUCCESS } from "./actionTypes"


export const signup = (payload:any) => (dispatch:any) =>  {
      dispatch({type:AUTH_REQ})
       axios.post(`${baseUrl}/users/register`,payload).then((res)=>{
        //  console.log(res.data.msg)
         dispatch({type:AUTH_REGISTER_SUCCESS,payload:res.data.msg})
       }).catch((err)=>{
        // console.log(err)
        dispatch({type:AUTH_REQ_FAILURE,payload:err.response.data.msg})
       })
}

export const login = (payload:any) => (dispatch:any) => {
  dispatch({type:AUTH_REQ})
  axios.post(`${baseUrl}/users/login`,payload).then((res)=>{
    console.log(res.data)
    dispatch({type:AUTH_REQ_SUCCESS,payload:res.data.token})
  }).catch((err)=>{
  //  console.log(err.response.data)
   dispatch({type:AUTH_REQ_FAILURE,payload:err.response.data})
  })
}