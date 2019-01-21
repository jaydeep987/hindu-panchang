import Realm from 'realm';
import { Dispatch } from 'redux';

import { getRealm } from '../../actions/realm';
import { config } from '../../common/config';
// get schema
import { Settings } from '../schema/settings';

/**
 * Initializes realm schemas, first time when app is loaded
 * Initialize when app loads
 */
export function initializeRealm(dispatch: Dispatch): void {
  Realm
    .open({ schema:  [Settings] })
    .then((realm: Realm) => {
      const settings: number = realm.objects(Settings.name).length;
      console.log('settings len ', settings);
      if (settings <= 0) {
        realm.write(() => {
          realm.create(Settings.name, {
            ...config.defaultSettings as {},
          });
        });
      }

      dispatch(getRealm(realm));
    })
    .catch();
}
