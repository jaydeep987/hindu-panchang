import { Text, View } from 'native-base';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Calendar, DateObject, DayComponentProps } from 'react-native-calendars';

import { Nakshatra } from '../../common/api-constants';
import { CALENDAR_HEIGHT, FUTURE_SCROLL_MONTHS, I18NNamespaces, PAST_SCROLL_MONTHS } from '../../common/constants';
import { HomeProps } from '../../containers/Home/Home';
import { MonthlyPanchang } from '../../interface/monthly-panchang-api';

const styles: {[key: string]: {}} = StyleSheet.create({
  dayCompDay: {
    fontSize: 15,
    textAlign: 'center',
  },
  dayCompOthers: {
    fontSize: 10,
    textAlign: 'right',
  },

  dayView: {
    // borderColor: '#7FDBFF',
    // borderStyle: 'solid',
    // borderWidth: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: 60,
  },
});

/**
 * Renders customized calendar list
 */
class CustomizedCalendarList extends React.Component<CustomizedCalendarListProps> {
  /**
   * Render component
   */
  render(): JSX.Element {
    return (
      <Calendar
          firstDay={1}
          hideExtraDays={true}
          hideArrows={false}
          onMonthChange={this.props.onVisibleMonthsChange}
          current={this.props.currentDate}
          dayComponent={this.renderDayComponent}
          theme={{backgroundColor: '#fafafa'}}
      />
    );
  }

  /**
   * Renders custom day component in calendar
   */
  renderDayComponent = ({date}: DayComponentProps): JSX.Element => {
    const { monthlyPanchangData, screenProps: { translate } } = this.props;
    // const regionalCalName: string = getRegionalCalendarName(getSettings(realm).location);

    // console.log("day", date.year, date.month);
    if (!monthlyPanchangData || (monthlyPanchangData && !monthlyPanchangData[`${date.year}${date.month}`])) {
      return (
        <View>
          <Text style={styles.dayCompDay}>{date.day}</Text>
        </View>
      );
    }

    // Current api is not giving this info in monthly data. So keep it for future
    // let hinduMaah: string = regionalCalName === calendarName.amanta ? advancePanchangApiData.hindu_maah.amanta :
    //   advancePanchangApiData.hindu_maah.purnimanta;
    // hinduMaah = translate(`${I18NNamespaces.HINDU_MAAH}:${hinduMaahMappings[hinduMaah]}`);
    // const paksha: string = translate(`${I18NNamespaces.PAKSH}:${pakshaMappings[advancePanchangApiData.paksha]}`);
    const filteredDays: MonthlyPanchang[] =
      monthlyPanchangData[`${date.year}${date.month}`]
        .panchang
        .filter((value: MonthlyPanchang) => value.day === date.day) || [];
    const thisDay: MonthlyPanchang = filteredDays[0];
    const nakshatra: string =
      thisDay && translate(`${I18NNamespaces.NAKSHATRA}:${Nakshatra[thisDay.nak].toLocaleLowerCase()}`);

    return (
      <View style={styles.dayView}>
        <Text style={styles.dayCompDay}>{date.day}</Text>
        <Text style={styles.dayCompOthers}>{nakshatra}</Text>
        <Text style={styles.dayCompOthers}>{thisDay && thisDay.tithi + 1}</Text>
      </View>
    );
  }
}

interface CustomizedCalendarListProps extends HomeProps {
  currentDate: Date;
  onVisibleMonthsChange(month: DateObject): void;
}

export {
  CustomizedCalendarList,
};
