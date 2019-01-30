import { TranslationFunction, i18n as I18n } from 'i18next';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';
import { NavigationScreenProp } from 'react-navigation';
import { MapDispatchToProps, connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AdvancePanchangApiRequestParams, fetchAdvancePanchangApiData } from '../../actions/advance-panchang';
import { MonthlyPanchangRequestParams, fetchMultiMonthPanchangData } from '../../actions/monthly-panchang';
import { fetchRealm } from '../../actions/realm';
import {
  Months,
} from '../../common/constants';
import { Formats, formatDate } from '../../utils/date-utils';

import { CustomizedCalendarList } from '../../components/CustomizedCalendarList/CustomizedCalendarList';
import { HomeHeader } from '../../components/HomeHeader/HomeHeader';
import { AdvancePanchangApiResponse } from '../../interface/advance-panchang-api';
import { RootState } from '../../interface/app-state';
import { MapStateToProps } from '../../interface/general';
import { MonthlyPanchangApiResponse } from '../../interface/monthly-panchang-api';

const styles: {[key: string]: {}} = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  btnChangeYear: {
    width: 70,
    color: '#fff',
  },
  dayCompDay: {
    fontSize: 15,
  },
  dayCompOthers: {
    fontSize: 10,
  },
});

/**
 * Home component
 */
class Home extends React.Component<HomeProps, HomeState> {

  /**
   * Constructs Home component.
   * Initializes state.
   *
   * @param props Home props
   */
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      currentDate: new Date(),
      advancePanchangApiData: undefined,
      advancePanchangApiError: undefined,
    };
  }

  componentWillMount(): void {
    this.props.fetchRealm();
  }

  componentDidMount(): void {
    const { currentDate } = this.state;

    this.fetchMultiMonthPanchangData({ month: currentDate.getMonth() + 1, year: currentDate.getFullYear() });
  }

  /**
   * Renders app elements
   */
  render(): JSX.Element {
    const { advancePanchangApiData, monthlyPanchangData } = this.props;
    const { translate } = this.props.screenProps;
    const { currentDate } = this.state;
    const customizedCalendarlist: JSX.Element = (
      <CustomizedCalendarList
        currentDate={currentDate}
        onVisibleMonthsChange={this.updateCurrentDate}
        {...this.props}
      />
    );
    const isMonthlyNotAvailable: boolean =
      !monthlyPanchangData ||
      monthlyPanchangData && !monthlyPanchangData[`${currentDate.getFullYear()}${currentDate.getMonth() + 1}`];

    return (
      <View style={styles.container}>
        <HomeHeader
          currentDate={currentDate}
          translate={translate}
          changeMonth={this.changeMonth}
          changeYear={this.changeYear}
          resetCalendar={this.resetCalendar}
          advancePanchangApiData={advancePanchangApiData}
        />

        {isMonthlyNotAvailable ? this.renderPlainCalendarList() : customizedCalendarlist}

      </View>
    );
  }

  /**
   * Renders non-customized calendar list
   */
  renderPlainCalendarList = (): JSX.Element => (
    <Calendar
      firstDay={1}
      hideExtraDays={true}
      hideArrows={false}
      current={this.state.currentDate}
    />
  )

  /**
   * When coming back from YearsSelection screen, change year here.
   */
  onGoBackChangeYear = (year: number): void => {
    if (year && parseInt(formatDate(this.state.currentDate, Formats.YYYY), 10) !== year) {
      const curDate: Date = new Date(this.state.currentDate.valueOf());

      curDate.setFullYear(year);

      this.fetchMultiMonthPanchangData({ year: curDate.getFullYear(), month: curDate.getMonth() + 1 });

      this.setState({
        currentDate: curDate,
      });
    }
  }

  /**
   * Change year.
   * Move to year selection screen
   */
  changeYear = (): void => {
    this.props.navigation.navigate('YearsSelection', {
      currentYear: parseInt(formatDate(this.state.currentDate, Formats.YYYY), 10),
      translate: this.props.screenProps.translate,
      onGoBackChangeYear: this.onGoBackChangeYear,
    });
  }

  /**
   * Changes locale
   */
  changeMonth = (itemValue: string): void => {
    // @ts-ignore Months has integer index too
    const changingMonth: number = Months[itemValue.toUpperCase()];
    // clone currentDate
    const curDate: Date = new Date(this.state.currentDate.valueOf());

    // change month
    curDate.setMonth(changingMonth);

    if (curDate.getMonth() > changingMonth) {
      curDate.setDate(-1);
    }

    this.fetchMultiMonthPanchangData({ month: curDate.getMonth() + 1, year: curDate.getFullYear() });

    this.setState({
      currentDate: curDate,
    });
  }

  /**
   * Reset calendar to current date
   */
  resetCalendar = (): void => {
    const now: Date = new Date();
    this.fetchMultiMonthPanchangData({ month: now.getMonth() + 1, year: now.getFullYear() });
    this.setState({
      currentDate: now,
    });
  }

  /**
   * Update current date in state when calendar scrolled
   */
  updateCurrentDate = (month: DateObject): void => {
    // Take first item always to get upcoming month.
    const curTimestamp: number = month.timestamp;
    const date: Date = new Date(curTimestamp);

    this.fetchMultiMonthPanchangData(month);

    // update state
    this.setState({
      currentDate: date,
    });
  }

  /**
   * Fetches multi month panchang data
   */
  fetchMultiMonthPanchangData = ({ month, year }: { month: number; year: number }): void => {
    const now: Date = new Date();

    this.props.fetchMultiMonthPanchangData({
      month,
      year,
      lat: 12312.1231,
      lon: 232.232,
      tzone: -5, // TODO get via set language and region
    });

    // Also fetch first day's advance data to get some other info like hindu year
    this.props.fetchAdvancePanchangApiData({
      day: 1,
      month,
      year,
      hour: now.getHours(),
      min: now.getMinutes(),
      lat: 12312.1231,
      lon: 232.232,
      tzone: -5, // TODO get via set language and region
    });
  }
}

const mapStateToProps: MapStateToProps<HomeReduxProps> = (state: RootState): HomeReduxProps => ({
  advancePanchangApiData: state.advancePanchangApiData.advancePanchagApiData,
  monthlyPanchangData: state.monthlyPanchangApiData.monthlyPanchangApiData,
  realm: state.realm.realm,
});

const mapDispatchToProps: MapDispatchToProps<HomeReduxActionProps, HomeProps> =
(dispatch: Dispatch): HomeReduxActionProps => ({
  fetchAdvancePanchangApiData: (reqParams: AdvancePanchangApiRequestParams): void => {
    fetchAdvancePanchangApiData(reqParams)(dispatch);
  },
  fetchRealm: (): void => {
    fetchRealm()(dispatch);
  },
  fetchMultiMonthPanchangData: (reqParams: MonthlyPanchangRequestParams): void => {
    fetchMultiMonthPanchangData(reqParams)(dispatch);
  },
});

const ConnectedHome: React.ComponentClass<HomeProps> =
  connect(mapStateToProps, mapDispatchToProps)(Home);

export {
  ConnectedHome as Home,
};

interface HomeReduxProps {
  advancePanchangApiData?: AdvancePanchangApiResponse;
  monthlyPanchangData?: { [key: string]: MonthlyPanchangApiResponse};
  realm?: Realm;
}

interface HomeReduxActionProps {
  fetchAdvancePanchangApiData(reqParams: AdvancePanchangApiRequestParams): void;
  fetchMultiMonthPanchangData(reqParams: MonthlyPanchangRequestParams): void;
  fetchRealm(): void;
}

export interface HomeProps extends HomeReduxProps, HomeReduxActionProps {
  screenProps: {
    i18n: I18n;
    tReady: boolean;
    translate: TranslationFunction;
  };
  navigation: NavigationScreenProp<{
    params: {
      currentYear: number;
      translate: TranslationFunction;
      onGoBackChangeYear(year: number): void;
    };
  }>;
}

interface HomeState {
  currentDate: Date;
  advancePanchangApiData?: AdvancePanchangApiResponse;
  advancePanchangApiError?: {};
}
