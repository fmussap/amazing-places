import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import AuthScreen from './src/screens/Auth'
import SharePlace from './src/screens/SharePlace'
import FindPlace from './src/screens/FindPlace'
import PlaceDetail from './src/screens/PlaceDetail'
import SideDrawer from './src/screens/SideDrawer'
import configureStore from './src/store/configureStore'

const store = configureStore()

Navigation.registerComponent('amazing-places.AuthScreen',
() => AuthScreen, store, Provider)
Navigation.registerComponent('amazing-places.SharePlaceScreen',
() => SharePlace, store, Provider)
Navigation.registerComponent('amazing-places.FindPlaceScreen',
() => FindPlace, store, Provider)
Navigation.registerComponent('amazing-places.PlaceDetailScreen',
() => PlaceDetail, store, Provider)
Navigation.registerComponent('amazing-places.SideDrawerScreen',
() => SideDrawer, store, Provider)

export default () => Navigation.startSingleScreenApp({
  screen: {
    navigatorStyle: {
      navBarHidden: true
    },
    screen: 'amazing-places.AuthScreen',
    title: 'Login'
  }
})
