import { AdvancePanchangApiActionTypes } from '../common/action-contants';
import { AdvancePanchangApiActions } from '../interface/actions';
import { AdvancePanchangeApiState } from '../interface/app-state';

const initialState: AdvancePanchangeApiState = {
  advancePanchagApiData: undefined,
};

/**
 * Reduces advance panchang api data
 * @param state Current state
 * @param action Action received
 */
export function advancePanchangDataReducer(
  state: AdvancePanchangeApiState = initialState,
  action: AdvancePanchangApiActions): AdvancePanchangeApiState {

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
