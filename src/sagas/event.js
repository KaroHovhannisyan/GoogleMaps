/**
 * Created by Karo on 16.10.2017.
 */

import getEventsList from '../api/api'
import { call,put, takeEvery } from 'redux-saga/effects';
function* fetchEvents(action) {
    yield put({type: 'EVENTS_FETCH_LOADING'});
    try {
        const Events = yield call(getEventsList, action.payload.cityName);
        yield put({type: 'EVENTS_FETCH_SUCCEEDED', currentCity:Events.data.location,events:Events.data.events});
    } catch (e) {
        yield put({type: 'EVENTS_FETCH_FAILED', message: e.message});
    }
}


export const eventsSaga = [
    takeEvery('EVENTS_FETCH_REQUESTED', fetchEvents)
];