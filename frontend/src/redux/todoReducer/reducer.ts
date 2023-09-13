
import { ADD_TODO_SUCCESS, DELETE_TODOS, DELETE_TODOS_FAILURE, GET_TODO_SUCCESS, TODO_FAILURE, TODO_REQUEST, TOGGLE_TODOS_SUCCESS, UPDATE_TODOS_FAILURE, UPDATE_TODOS_SUCCESS } from "./actionTypes";

export interface Todo {
    _id: string;
    title: string;
    created_at: string;
    priority:number;
    status: boolean; 
    userId : string;
    name : string
  }
  export interface TodoItem {
    _id: string;
    title: string;
    status: boolean;
    created_at?: string;
 }
  interface TodoState {
    data: Todo[];
    isLoading: boolean;
    isError: boolean;
    errorMsg : string;
    deletedMsg : string; 
    updatedMsg : string;
    totalTodos : number
  }

const initialState : TodoState = {
    data : [],
    isLoading : false,
    isError : false,
    errorMsg : '',
    deletedMsg : "",
    updatedMsg:"",
    totalTodos:0,
}

type Payload = {
    todos : TodoItem[];
    total : number
}

type Action = {
    type : string;
    payload : string | Payload;
}



export const reducer = (state:TodoState = initialState, {type, payload}:Action) => {
    switch(type){
        case TODO_REQUEST : {
            return {
                ...state,
                isLoading : true
            }
        }
        // case ADD_TODO_SUCCESS: {
          
        //     return {
        //       ...state,
        //       isLoading: false,
        //       data: [payload,...state.data],
             
        //     };
         
        //   }
      

        case GET_TODO_SUCCESS : {
         const {todos,total} = payload as Payload
        
          return {  
              ...state,
              isLoading : false,
              data : todos,
              totalTodos : total
          }
      }

      

      case TODO_FAILURE : {
          return {
              ...state,
              isLoading : false,
              iError : true,
              errorMsg : payload
          }
      }

      case DELETE_TODOS : {
        return {
            ...state,
            isLoading : false,
            iError : false,
            deletedMsg : payload
        }
      }
      case DELETE_TODOS_FAILURE : {
        return {
            ...state,
            isLoading : false,
            iError : true,
            errorMsg : payload
            
        }
      }

      case TOGGLE_TODOS_SUCCESS : {
        return {
            ...state,
            isLoading : false,
            isError : false,
            data : state.data.map(todo => todo._id === payload ? {...todo, status: !todo.status} : todo )
        }
      }

      case UPDATE_TODOS_SUCCESS : {
        return {
            ...state,
            isLoading : false,
            isError : false,
            updatedMsg : payload
        }
      }
      case UPDATE_TODOS_FAILURE : {
        return {
            ...state,
            isLoading : false,
            iError : true,
            errorMsg : payload
            
        }
      }

      default : {
          return state;
      }
  }
}
