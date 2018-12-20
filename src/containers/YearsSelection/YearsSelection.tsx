import { TranslationFunction } from 'i18next';
import { Button, Col, Grid, Header, Row, Title } from 'native-base';
import * as React from 'react';
import { ScrollView, Text, View, GestureResponderEvent } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import { I18NNamespaces, YEARS_RANGE } from '../../common/constants';
import { formatDate } from '../../utils/date-utils';

const styles: {[key: string]: {}} = {
  header: {
    height: 45,
    paddingTop: 10,
  },
  columns: {
    height: 50,
    margin: 3,
  },
  rows: {
    height: 50,
    textAlign: 'center',
  },
  buttons: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};

/**
 * Screen to show years and let user change year of calendar
 */
class YearsSelection extends React.Component<YearsSelectionProps> {

  /**
   * Render elements
   */
  render(): JSX.Element {
    const { translate } = this.props.navigation.state.params;

    return (
      <View>
        <Header style={styles.header}>
          <Title>
            {translate(`${I18NNamespaces.YEAR_SELECTION}:headerTitle`)}
          </Title>
        </Header>
        <ScrollView>
          <Grid>
            {this.renderColumns()}
            <Row style={styles.rows} />
            <Row style={styles.rows} />
          </Grid>
        </ScrollView>
      </View>
    );
  }

  /**
   * Generates and renders columns of years YEARS_RANGE back and forth of current year
   */
  renderColumns(): JSX.Element[] {
    const COL_PER_ROW: number = 5;
    const { currentYear } = this.props.navigation.state.params;
    const nYears: number = (YEARS_RANGE * 2); // tslint:disable-line:no-magic-numbers
    const nRows: number = Math.ceil(nYears / COL_PER_ROW);
    const startYear: number = parseInt(formatDate(new Date(), 'YYYY'), 10) - YEARS_RANGE;
    const rows: {[key: number]: JSX.Element[]} = {};

    // initialize rows
    [
      ...Array(nRows)
      .keys(),
    ]
    .forEach((value: number) => {
      rows[value] = [];
    });

    let rowCounter: number = -1;

    [
      ...Array(nYears)
      .keys(),
    ]
    .map((v: number, index: number) => {
      const year: number = startYear + v + 1;
      if (index % COL_PER_ROW === 0) {
        rowCounter++;
      }

      rows[rowCounter].push(
        <Col key={year} style={styles.columns}>
          <Button
            full={true}
            light={true}
            primary={currentYear === year}
            block={true}
            onPress={this.changeYear.bind(this, year)}
          >
            <Text style={{...styles.buttons, color: currentYear === year ? '#fff' : '#000'}}>{year}</Text>
          </Button>
        </Col>,
      );
    }); // /map

    return Object.keys(rows)
      .map((key: string) => {
      const cols: JSX.Element[] = rows[parseInt(key, 10)];

      return (
        <Row key={`row-${key}`} style={styles.rows}>
          {cols}
        </Row>
      );
    });
  }

  /**
   * Navigate to Home screen to change current year.
   */
  changeYear = (year: number): void => {
    const { onGoBackChangeYear } = this.props.navigation.state.params;

    onGoBackChangeYear(year);
    this.props.navigation.goBack();
  }
}

export {
  YearsSelection,
};

interface YearsSelectionProps {
  navigation: NavigationScreenProp<{
    params: {
      currentYear: number;
      translate: TranslationFunction;
      onGoBackChangeYear(year: number): void;
    };
  }>;
}
