/**
 * Created by Karo on 14.10.2017.
 */
const initialState = {
    userName: 'Example',
    error: ''
}


export default function(state = initialState,action) {

    var { type,username } = action;
    console.log(action);
    switch(type){
        case 'REGISTER_USER_SUCESSED':{
            localStorage.setItem('access_token',JSON.stringify(action.access_token.token));
            localStorage.setItem('isLoggedIn',true)
            return {
                ...state,
                userName:username,
                error:'',
                done:true
            }
        }
        case'REGISTER_USER_FAILED':{
            localStorage.setItem('access_token','');
            localStorage.setItem('isLoggedIn',false)
            return {
                ...state,
                userName:'',
                error:action.err,
                done:false
            }
        }
        case 'LOGIN_USER_SUCESSED':{
            localStorage.setItem('access_token',JSON.stringify(action.access_token));
            localStorage.setItem('isLoggedIn',true);

            return{
                ...state,
                userName:action.username.data,
                done:true,
                error:''

            }
        }
        case 'LOGIN_USER_FAILED':{
            return {
                ...state,
                done:false,
                error:'Wrong Username or Password!!!!'
            }
        }
        case 'AUTHENTICATE_SUCESS':{
            return{
                ...state,
                done:true,
                userName:action.username.data,
                error:''

            }
        }
        case 'EXIT_REQUEST':{
            localStorage.setItem('access_token',JSON.stringify(false));
            localStorage.setItem('isLoggedIn',false);
            return {
                ...state,
                done:false
            }
        }
        default: return state
    }

}