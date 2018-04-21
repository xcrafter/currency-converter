import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import Home from './../views/home';
import Histories from './../views/history';
import Entries from './../views/entries';
import { AppColorTheme } from '../config/constants';


const homeRouter = StackNavigator({
  home: Home,
  entries: Entries,
}, {
  initialRouteName: 'home',
  navigationOptions: {
    headerStyle: {
      backgroundColor: AppColorTheme.color_primay,
    },
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  lazy: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: AppColorTheme.color_primay,
    style: {
      backgroundColor: '#fff',
    },
  },

});
const historyRouter = StackNavigator({
  history: Histories,
}, {
  initialRouteName: 'history',
});

const MainTabRouter = TabNavigator({
  home: homeRouter,
  history: historyRouter,
}, {
  initialRouteName: 'home',
  navigationOptions: {
    headerStyle: {
      backgroundColor: AppColorTheme.color_primay,
    },
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  lazy: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: AppColorTheme.color_primay,
    style: {
      backgroundColor: '#fff',
    },
  },

});

export default homeRouter;

