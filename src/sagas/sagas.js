/**
 * Created by Karo on 14.10.2017.
 */

import { all } from 'redux-saga/effects';
import  { AuthSaga}  from './login';
import  { eventsSaga }  from './event';



export default function* rootSaga() {
    yield all([
        ...AuthSaga,
        ...eventsSaga]
    )
}
