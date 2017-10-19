import 'babel-polyfill'
import { createStore,applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import saga from '../sagas/sagas'
import rootReducer from '../reducers/index';


export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()
    const store = createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware)
    );

    sagaMiddleware.run(saga);
    store.subscribe(function () {
        console.log(store.getState());
    })

    return store;

}