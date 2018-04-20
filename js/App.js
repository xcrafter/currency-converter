import React, { Component } from 'react';

import { AppState } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './config/configureStore';
import AppLoading from './components/splash';
import MainRoute from './routes/index';
import theme from './config/theme';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      rehydrated: false,
      appState: AppState.currentState,
      store: null,
    };
  }
  componentWillMount() {
    const self = this;
    AppState.addEventListener('change', self.handleAppStateChange.bind(this));
    const store = configureStore(() => {
      this.setState({ isLoading: false });
    });
    this.setState({ store });
  }
  componentWillUnmount() {
    const self = this;

    AppState.removeEventListener('change', self.handleAppStateChange.bind(self));
  }
  handleAppStateChange(nextState) {
    this.setState({
      appState: nextState,
    });
  }
  render() {
    const self = this;
    if (self.state.isLoading) return (<AppLoading appText="Test App" />);

    return (
      <Provider store={self.state.store}>
        <MainRoute />
      </Provider>
    );
  }
}
