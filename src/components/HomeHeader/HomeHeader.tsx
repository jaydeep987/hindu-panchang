import { TranslationFunction } from 'i18next';
import { startCase } from 'lodash';
import { Body, Button, Header, Icon, Left, Right, Subtitle, Title } from 'native-base';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import { Months, I18NNamespaces } from '../../common/constants';
import { getDropdownMonthsData } from '../../common/dropdown-data';
import { Icons } from '../../common/icons';
import { AdvancePanchangApiResponse } from '../../interface/advance-panchang-api';
import { Formats, formatDate } from '../../utils/date-utils';

const styles: {[key: string]: {}} = StyleSheet.create({
  btnChangeYear: {
    width: 70,
    color: '#fff',
  },
  btnChangeYearIcon: {
    fontSize: 33,
  },
  btnChangeYearText: {
    fontSize: 18,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dropdownContainer: {
    width: 60,
    marginLeft: 3,
  },
  dropdownOffset: {
    left: 0,
    top: 5,
  },
});

// Dropdown ripple duration
const RIPPLE_DURATION: number = 100;

const HomeHeader: React.FunctionComponent<HomeHeaderProps> = (props: HomeHeaderProps): JSX.Element => {
  const { currentDate, advancePanchangApiData, changeMonth, changeYear, resetCalendar, translate } = props;
  const selectedMonth: string =
      startCase(
        Months[
          parseInt(formatDate(currentDate, 'M', translate), 10) - 1
        ].toLowerCase(),
      );
  const currentShakYear: number = advancePanchangApiData && advancePanchangApiData.shaka_samvat;
  const currentVikramYear: number = advancePanchangApiData && advancePanchangApiData.vikram_samvat;
  const vikramLabel: string = `${translate(`${I18NNamespaces.LABELS}:vikramSamvat`)} ${currentVikramYear}`;
  const shakLabel: string = `${translate(`${I18NNamespaces.LABELS}:shakSamvat`)} ${currentShakYear}`;

  const render: () => JSX.Element = (): JSX.Element => (
    <View>
      <Header transparent={true}>
        <Left style={styles.left}>
          <Button iconLeft={true} transparent={true} style={styles.btnChangeYear} onPress={changeYear}>
            <Icon name={Icons.MD_ARROW_DROPLEFT} style={styles.btnChangeYearIcon} />
            <Text style={styles.btnChangeYearText}>{formatDate(currentDate, Formats.YYYY)}</Text>
          </Button>
          <Dropdown
            data={getDropdownMonthsData(translate)}
            value={selectedMonth}
            containerStyle={styles.dropdownContainer}
            dropdownOffset={styles.dropdownOffset}
            onChangeText={changeMonth}
            rippleDuration={RIPPLE_DURATION}
          />
        </Left>
        <Body>
          <Title>
            <Text>{currentVikramYear && vikramLabel}</Text>
          </Title>
          <Subtitle>
            <Text>{currentShakYear && shakLabel}</Text>
          </Subtitle>
        </Body>
        <Right>
          <Button transparent={true} onPress={resetCalendar}>
            <Icon name={Icons.MD_REFRESH} />
          </Button>
          <Button transparent={true}>
            <Icon name={Icons.MD_SETTINGS} />
          </Button>
        </Right>
      </Header>
    </View>
  );

  return render();
};

export {
  HomeHeader,
};

interface HomeHeaderProps {
  currentDate: Date;
  advancePanchangApiData: AdvancePanchangApiResponse;
  translate: TranslationFunction;
  changeMonth(itemValue: string): void;
  changeYear(): void;
  resetCalendar(): void;
}
