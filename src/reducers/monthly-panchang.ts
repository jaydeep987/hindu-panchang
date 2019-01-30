import { MonthlyPanchangApiActionTypes } from '../common/action-contants';
import { MonthlyPanchangApiActions } from '../interface/actions';
import { MonthlyPanchangApiState } from '../interface/app-state';

/**
 * Reduces monthly panchang api data
 * @param state Current state
 * @param action Action received
 */
export function monthlyPanchangApiReducer(
  state: MonthlyPanchangApiState = {},
  action: MonthlyPanchangApiActions): MonthlyPanchangApiState {

  switch (action.type) {
    case MonthlyPanchangApiActionTypes.FETCH_MONTHLY_PANCHANG_DATA:
      const { monthlyPanchangApiData } = action;

      return {
        ...state,
        monthlyPanchangApiData: {
          ...state.monthlyPanchangApiData,
          [`${monthlyPanchangApiData.year}${monthlyPanchangApiData.month}`]: monthlyPanchangApiData,
        },
      };
    case MonthlyPanchangApiActionTypes.FETCH_MONTHLY_PANCHANG_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
