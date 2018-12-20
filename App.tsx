import { TranslationFunction, i18n } from 'i18next';
import * as React from 'react';
import { withNamespaces } from 'react-i18next';
// @ts-ignore createAppContainer is not in @types yet
import { NavigationContainer, createAppContainer, createStackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import { initI18N } from './src/i18n';
import { stack as screenStack } from './src/screen-stack';
import { makeStore } from './src/store';

// Create stack navigator having screens
const StackNavigator: NavigationContainer = createStackNavigator(screenStack);

// From v3, it's necessary to create App Container which will pass necessary props
const AppContainer: React.ComponentClass<AppContainerProps> = createAppContainer(StackNavigator);

// Initialize i18n
initI18N();

// This wrapped container component will get translation prop(s) from withNamespaces
const WrappedContainer: WrappedContainerType =
  (props: WrappedContainerProps): React.ReactElement<AppContainerProps> => (
    <AppContainer screenProps={{ translate: props.t, i18n: props.i18n}} />
  );

// withNamespaces will get some options and our Container, so that it can pass translation props
const LocalizedApp: React.ComponentType = withNamespaces('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
  wait: false,
})(WrappedContainer);

/**
 * Main class for our app. App starts from here.
 */
export default class App extends React.Component {
  /**
   * Renders app elements
   */
  render = (): JSX.Element => (
    <Provider store={makeStore()}>
      <LocalizedApp />
    </Provider>
  )
}

interface AppContainerProps {
  screenProps: {};
}

interface WrappedContainerProps {
  t: TranslationFunction;
  i18n: i18n;
}

type WrappedContainerType = (props: WrappedContainerProps) => React.ReactElement<AppContainerProps>;
