import Rx from 'rxjs'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import { getFirebase } from 'react-redux-firebase'
import { LocationTypes } from './locationRedux'
import { MapTypes } from './mapRedux'

const LOCATION_REQUESTED = LocationTypes.LOCATION_REQUESTED
const LOCATION_RECEIVED = LocationTypes.LOCATION_RECEIVED
const CHANGE_CENTER = MapTypes.CHANGE_CENTER

const locationReceived = location => ({ type: LOCATION_RECEIVED, location })
const changeCenter = ({coords: { latitude, longitude }}) =>
      ({ type: CHANGE_CENTER, center: {lat: latitude, lng: longitude} })

const getLocation = function (options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentLocation(resolve, reject, options)
  })
}

export const updateLocationEpic = (action$, store) =>
  action$.ofType(
    LOCATION_REQUESTED
  )
  .switchMap(action =>
             Rx.Observable.fromPromise(
               getLocation())
             .do((location) => {
               const { coords: { latitude, longitude }, timestamp } = location
               getFirebase().push('/locations', {latitude, longitude, timestamp})
             })
             .mergeMap((location) => ([
               locationReceived(location),
               changeCenter(location)
             ]))
            )
