import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import { firebaseStateReducer } from 'react-redux-firebase'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'
import { combineEpics } from 'redux-observable'
// import { updateLocationEpic } from './LocatoinEpic'
console.log('hi')
/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  firebase: firebaseStateReducer,
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  location: require('./LocationRedux').reducer,
  map: require('./MapRedux').reducer
})

export default () => {
  // const rootEpic = combineEpics(
  //   updateLocationEpic
  // )

  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
