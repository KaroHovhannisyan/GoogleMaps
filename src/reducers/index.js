// /**
//  * Created by Karo on 14.10.2017.
//  */
//
// import * as ActionTypes from '../actions'
// import merge from 'lodash/object/merge'
//import { combineReducers } from 'redux'
import { combineReducers } from 'redux'
import events from './events'
import login from './login'

export default combineReducers({
    events,
    login
})