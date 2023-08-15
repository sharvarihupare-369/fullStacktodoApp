
import { DELETE_TODOS, DELETE_TODOS_FAILURE, GET_TODO_SUCCESS, TODO_FAILURE, TODO_REQUEST } from "./actionTypes";

const initialState = {
    data : [],
    isLoading : false,
    isError : false,
    errorMsg : '',
    deletedMsg : ""
}

type Action = {
    type : string;
    payload : string;
}

export const reducer = (state = initialState, {type, payload}:Action) => {
    switch(type){
        case TODO_REQUEST : {
            return {
                ...state,
                isLoading : true
            }
        }

        case GET_TODO_SUCCESS : {
          return {
              ...state,
              isLoading : false,
              data : payload
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
            iError : false,
            
        }
      }

      default : {
          return state;
      }
  }
}
