import { RealmActionTypes } from '../common/action-contants';
import { RealmActions } from '../interface/actions';
import { RealmState } from '../interface/app-state';

export function realmReducer(
  state: RealmState = {},
  action: RealmActions): RealmState {
  switch (action.type) {
    case RealmActionTypes.INIT:
      return {
        ...state,
        realm: action.realm,
      };
    default:
      return state;
  }
}
