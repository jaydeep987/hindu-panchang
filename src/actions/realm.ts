import { Dispatch } from 'redux';

import { RealmActionTypes } from '../common/action-contants';
import { RealmAction } from '../interface/actions';
import { initializeRealm } from '../realm/operations/initialize';

/**
 * Acts like fetching realm, but it just initialize realm with schemas and default data 
 */
export function fetchRealm(): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch): void => {
    initializeRealm((realm: Realm) => dispatch(getRealm(realm)));
  };
}

/**
 * Action creator for realm instance
 * @param realm Realm instance
 */
export function getRealm(realm: Realm): RealmAction {
  return {
    type: RealmActionTypes.INIT,
    realm,
  };
}
