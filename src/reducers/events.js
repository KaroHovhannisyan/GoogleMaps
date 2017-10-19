/**
 * Created by Karo on 16.10.2017.
 */
const initialState  = {
    isLoading:false,
    city:'',
    eventsList:[]
}


export default function(state=initialState,action) {
    var { type } = action;
    switch(type){
        case 'EVENTS_FETCH_SUCCEEDED':{
            return {
                ...state,
                isLoading:false,
                city:action.currentCity,
                eventsList:action.events
            }
        }
        case'EVENTS_FETCH_LOADING':{
            return {
                ...state,
                isLoading:true
            }

        }
        default: return state
    }

}
