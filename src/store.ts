import { Store, applyMiddleware, createStore } from 'redux';
import { EpicMiddleware, createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';

import epics from './epics';
import { RootState } from './interface/app-state';
import reducers from './reducers';

/**
 * Creates redux store and return
 */
export function makeStore(): Store<RootState> {
  const epicMiddleware: EpicMiddleware<{type: number}> = createEpicMiddleware();
  const store: Store<RootState> = createStore(reducers, {}, applyMiddleware(epicMiddleware, thunk));

  epicMiddleware.run(epics);

  return store;
}
