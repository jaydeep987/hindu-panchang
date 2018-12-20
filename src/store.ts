import { Store, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { RootState } from './interface/app-state';
import reducers from './reducers';

/**
 * Creates redux store and return
 */
export function makeStore(): Store<RootState> {
  const store: Store<RootState> = createStore(reducers, {}, applyMiddleware(thunk));

  return store;
}
