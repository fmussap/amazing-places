import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

const startTabs = async () => {
  const navigatorButtons = {
    leftButtons: [
      {
        icon: await Icon.getImageSource('ios-menu', 30),
        title: 'Menu',
        id: 'sideDrawerToggle'
      }
    ]
  }

  const navBarStyle = {
    tabBarButtonColor: '#A5D6A7',
    tabBarSelectedButtonColor: 'white',
    tabBarBackgroundColor: '#43A047'
  }

  const navigatorStyle = {
    navBarBackgroundColor: '#43A047',
    navBarTextColor: 'white',
    navBarButtonColor: 'white'
  }

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'amazing-places.FindPlaceScreen',
        navigatorStyle,
        label: 'Find Place',
        title: 'Find Place',
        icon: await Icon.getImageSource('md-map', 30),
        navigatorButtons
      },
      {
        screen: 'amazing-places.SharePlaceScreen',
        navigatorStyle,
        label: 'Share Place',
        title: 'Share Place',
        icon: await Icon.getImageSource('md-share', 30),
        navigatorButtons
      }
    ],
    tabStyle: navBarStyle,
    appStyle: navBarStyle,
    drawer: {
      left: {
        screen: 'amazing-places.SideDrawerScreen'
      }
    }
  })
}

export default startTabs
