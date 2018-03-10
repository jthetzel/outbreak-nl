import { createStore, applyMiddleware, compose } from 'redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import { firebaseConfig, config } from '../Config/Firebase'
import Rehydration from '../Services/Rehydration'
import ReduxPersist from '../Config/ReduxPersist'
import Config from '../Config/DebugConfig'
import { createEpicMiddleware } from 'redux-observable'
import createSagaMiddleware from 'redux-saga'
import ScreenTracking from './ScreenTrackingMiddleware'

// creates the store
export default (rootReducer, rootSaga, rootEpic) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Analytics Middleware ------------- */
  middleware.push(ScreenTracking)

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = Config.useReactotron ? console.tron.createSagaMonitor() : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)



  /* ------------- Epic Middleware ------------- */
  // const epicMiddleware = createEpicMiddleware(rootEpic)
  // middleware.push(epicMiddleware)

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  enhancers.push(reactReduxFirebase(firebaseConfig, config))

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    Rehydration.updateReducers(store)
  }

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga)

  return {
    store,
    sagasManager,
    sagaMiddleware
  }
}
