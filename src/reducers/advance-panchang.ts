import { AdvancePanchangApiActionTypes } from '../common/action-contants';
import { AdvancePanchangApiActions } from '../interface/actions';
import { AdvancePanchangApiState } from '../interface/app-state';

const initialState: AdvancePanchangApiState = {
  advancePanchagApiData: undefined,
};

/**
 * Reduces advance panchang api data
 * @param state Current state
 * @param action Action received
 */
export function advancePanchangDataReducer(
  state: AdvancePanchangApiState = initialState,
  action: AdvancePanchangApiActions): AdvancePanchangApiState {

  switch (action.type) {
    case AdvancePanchangApiActionTypes.FETCH_ADVANCE_PANCHANG_DATA:
      return {
        ...state,
        advancePanchagApiData: action.advancePanchagApiData,
      };
    case AdvancePanchangApiActionTypes.FETCH_ADVANCE_PANCHANG_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
