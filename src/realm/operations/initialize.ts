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
export function initializeRealm(dispatchRealm: (realm: Realm) => void): void {
  Realm
    .open({ schema:  [Settings] })
    .then((realm: Realm) => {
      const settings: number = realm.objects(Settings.name).length;

      if (settings <= 0) {
        realm.write(() => {
          realm.create(Settings.name, {
            ...config.defaultSettings as {},
          });
        });
      }

      dispatchRealm(realm);
    })
    .catch();
}
