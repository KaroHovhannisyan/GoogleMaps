/**
 * Created by Karo on 16.10.2017.
 */
import auth from '../api/auth'
import { call,put, takeLatest } from 'redux-saga/effects';
function* fetchRegister(action) {
    try {
          yield call(auth.register, action.payload);
          const ACESS_TOKEN = yield call(auth.authenticate,action.payload);
          yield put({type: 'REGISTER_USER_SUCESSED', username: action.payload.username,access_token:ACESS_TOKEN.data});
    } catch (e) {
          yield put({type: 'REGISTER_USER_FAILED', err: e.message});
    }
}

function* fetchLogin(action) {
    try {
        const token = yield call(auth.authenticate, action.payload);
        const user = yield call(auth.dashboard,token.data.token);
        yield put({type: 'LOGIN_USER_SUCESSED', access_token: token.data.token,username:user});
    } catch (e) {
        yield put({type: 'LOGIN_USER_FAILED', err: e.message});
    }
}

function* fetchAuthenticate() {
    try {
        const user = yield call(auth.dashboard,JSON.parse(localStorage.getItem( 'access_token' )));
        yield put({type: 'AUTHENTICATE_SUCESS',username:user});
    } catch (e) {
        yield put({type: 'AUTHENTICATE_FAILED', err: e.message});
    }
}
export const AuthSaga = [
    takeLatest('REGISTER_USER_REQUEST',fetchRegister),
    takeLatest('LOGIN_USER_REQUEST',fetchLogin),
    takeLatest('AUTHENTICATE_REQUEST',fetchAuthenticate)
]