import { RootState } from './app-state';

/**
 * Interface for dropdown data option
 */
export interface DropdownData {
  /** Value for dropdown option */
  value: string;
  /** Lable to show for option */
  label: string;
}

/** Type used for mapStateToProps function */
export type MapStateToProps<P> = (state: RootState) => P;
