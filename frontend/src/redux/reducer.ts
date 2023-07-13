interface Todo {
  title:String;
  status:Boolean
}

const initialState:Todo = {
  title:"",
  status:false
}

export const reducer = (state=initialState) => {
   return state
}