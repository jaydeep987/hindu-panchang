import { Dispatch } from 'redux';

import { RealmActionTypes } from '../common/action-contants';
import { RealmAction } from '../interface/actions';
import { initializeRealm } from '../realm/operations/initialize';

export function fetchRealm(): (dispatch: Dispatch) => void {
  return (dispatch: Dispatch): void => {
    initializeRealm(dispatch);
  };
}

export function getRealm(realm: Realm): RealmAction {
  return {
    type: RealmActionTypes.INIT,
    realm,
  };
}
