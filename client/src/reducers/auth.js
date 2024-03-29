import {AUTH,LOGOUT} from '../constants/actionTypes'

//notes is a reducer
const authReducer =  (state = {authData:null}, action) => {
    switch (action.type) {
      case AUTH:
          localStorage.setItem('profile',JSON.stringify({...action?.data}));
          console.log(action?.data, "data")
          return {...state, authData:action?.data};
      case LOGOUT:
            localStorage.clear();
            return {...state, authData:null};
      default:
          return state
    }
  };

  export default authReducer;