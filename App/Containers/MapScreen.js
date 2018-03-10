import React from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { Images } from '../Themes'
import ButtonBox from '../Components/ButtonBox'
import { StackNavigator } from 'react-navigation'
// Screens

// Styles
import styles from './Styles/PresentationScreenStyles'

console.log('test')
console.log(MapboxGL)
MapboxGL.setAccessToken('pk.eyJ1IjoiYy1jb3JlIiwiYSI6ImNqZWl3bzI0MzBsNm4zM21lcjBsZXpvajUifQ.gmSOoJC8y-fk9rNz88-gTg')
console.log(MapboxGL.getAccessToken())
class MapScreen extends React.Component {
  openComponents = () => {
    // this.props.navigation.navigate('ComponentExamplesScreen')
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <MapboxGL.MapView
          ref={(c) => this._map = c}
          style={{flex: 1}}>
        </MapboxGL.MapView>
      </View>
    )
  }
}

export default StackNavigator({
  MapScreen: {screen: MapScreen},
  // ComponentExamplesScreen: {screen: ComponentExamplesScreen},
}, {
  cardStyle: {
    opacity: 1,
    backgroundColor: '#3e243f'
  },
  initialRouteName: 'MapScreen',
  headerMode: 'none',
  // Keeping this here for future when we can make
  navigationOptions: {
    header: {
      left: (
        <TouchableOpacity onPress={() => window.alert('pop')} ><Image source={Images.closeButton} style={{marginHorizontal: 10}} /></TouchableOpacity>
      ),
      style: {
        backgroundColor: '#3e243f'
      }
    }
  }
})
