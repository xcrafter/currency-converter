import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import Home from './../views/home';
import Histories from './../views/history';


const homeRouter = StackNavigator({
  home: Home,
  history: Histories,
}, {
  initialRouteName: 'home',
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
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  lazy: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#d16907',
    style: {
      backgroundColor: '#fff',
    },
  },

});

export default MainTabRouter;

