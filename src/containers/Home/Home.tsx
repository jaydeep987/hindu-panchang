import Axios, { AxiosResponse } from 'axios';
import { TranslationFunction, i18n as I18n } from 'i18next';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CalendarList, DateObject, DayComponentProps } from 'react-native-calendars';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AdvancePanchangApiRequestParams, fetchAdvancePanchangApiData } from '../../actions/advance-panchang';
import { config } from '../../common/config';
import { CALENDAR_HEIGHT, FUTURE_SCROLL_MONTHS, Months, PAST_SCROLL_MONTHS } from '../../common/constants';
import { Formats, formatDate } from '../../utils/date-utils';

import { HomeHeader } from '../../components/HomeHeader/HomeHeader';
import { AdvancePanchangApiResponse } from '../../interface/advance-panchang-api';
import { RootState } from '../../interface/app-state';
import { MapStateToProps } from '../../interface/general';

const styles: {[key: string]: {}} = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  btnChangeYear: {
    width: 70,
    color: '#fff',
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
      wasCalendarScrolled: false,
      advancePanchangApiData: undefined,
      advancePanchangApiError: undefined,
    };
  }

  componentDidMount(): void {
    const { currentDate } = this.state;

    this.props.fetchAdvancePanchangApiData({
      day: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
      hour: currentDate.getHours(),
      min: currentDate.getMinutes(),
      lat: 12312.1231,
      lon: 232.232,
      tzone: -5, // TODO get via set language and region
    });
  }

  /**
   * Here to prevent recurssion when updating currentDate in state, we need to decide whether to update component or not
   * When calendar list is scrolled, we need to update currentDate also. But when we change currentDate,
   * calendar gets scrolled again because of change in month. So this gives recurring updates.
   * When calendar is scrolled, we set flag, and if that flag is true and currentDate in current state and next state
   * are different, then don't update component.
   *
   * @param nextProps Next Props
   * @param nextState Next State
   */
  shouldComponentUpdate = (nextProps: HomeProps, nextState: HomeState): boolean => {
    const { wasCalendarScrolled } = nextState;

    if (wasCalendarScrolled) {
      return false;
    }

    return true;
  }

  /**
   * Renders app elements
   */
  render(): JSX.Element {
    const { translate } = this.props.screenProps;
    const { currentDate } = this.state;

    console.log('api data: ', this.props.advancePanchangApiData);

    return (
      <View style={styles.container}>
        <HomeHeader
          currentDate={currentDate}
          translate={translate}
          changeMonth={this.changeMonth}
          changeYear={this.changeYear}
          resetCalendar={this.resetCalendar}
          currentHinduMonthYear="2017"
        />
        <CalendarList
          firstDay={1}
          current={currentDate}
          onVisibleMonthsChange={this.updateCurrentDate}
          calendarHeight={CALENDAR_HEIGHT}
          pastScrollRange={PAST_SCROLL_MONTHS}
          futureScrollRange={FUTURE_SCROLL_MONTHS}
          dayComponent={this.renderDayComponent}
        />
      </View>
    );
  }

  /**
   * Renders custom day component in calendar
   */
  renderDayComponent = ({date}: DayComponentProps): JSX.Element => {

    return (
      <View>
        <Text style={{fontSize: 15}}>{date.day}</Text>
        <Text style={{fontSize: 10}}>Magshira</Text>
        <Text style={{fontSize: 10}}>Sud 1</Text>
      </View>
    );
  }

  /**
   * When coming back from YearsSelection screen, change year here.
   */
  onGoBackChangeYear = (year: number): void => {
    if (year && parseInt(formatDate(this.state.currentDate, Formats.YYYY), 10) !== year) {
      const curDate: Date = new Date(this.state.currentDate.valueOf());

      curDate.setFullYear(year);

      this.setState({
        currentDate: curDate,
        wasCalendarScrolled: false,
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

    this.setState({
      currentDate: curDate,
      wasCalendarScrolled: false,
    });
  }

  /**
   * Reset calendar to current date
   */
  resetCalendar = (): void => {
    this.setState({
      currentDate: new Date(),
      wasCalendarScrolled: false,
    });
  }

  /**
   * Update current date in state when calendar scrolled
   */
  updateCurrentDate = (months: DateObject[]): void => {
    // Take first item always to get upcoming month.
    const curTimestamp: number = months[0].timestamp;

    // update state
    this.setState({
      currentDate: new Date(curTimestamp),
      wasCalendarScrolled: true,
    });
  }
}

const mapStateToProps: MapStateToProps<HomeReduxProps> = (state: RootState): HomeReduxProps => ({
  advancePanchangApiData: state.advancePanchangApiData.advancePanchagApiData,
});

const ConnectedHome: React.ComponentClass<HomeProps> = connect(mapStateToProps, { fetchAdvancePanchangApiData })(Home);

export {
  ConnectedHome as Home,
};

interface HomeReduxProps {
  advancePanchangApiData?: AdvancePanchangApiResponse;
}

interface HomeReduxActionProps {
  fetchAdvancePanchangApiData?(reqParams: AdvancePanchangApiRequestParams): void;
}

interface HomeProps extends HomeReduxProps, HomeReduxActionProps {
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
  wasCalendarScrolled: boolean;
  advancePanchangApiData?: AdvancePanchangApiResponse;
  advancePanchangApiError?: {};
}
