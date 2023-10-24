import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from 'react-native';
import { useEffect, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import { LineChart } from 'react-native-gifted-charts';
import SimpleText from '../atoms/SimpleText';

const SimpleLineChart = ({ approvedDataChart, declinedDataChart, processingDataChart }) => {
  const [aprovedData, setApprovedData] = useState([]);
  const [declinedData, setDeclinedData] = useState([]);
  const [processingData, setProcessingData] = useState([]);
  const [maxChartValue, setMaxChartValue] = useState(100);

  const test = [
    { date: '2023-10-01', currency: 'EUR', sum: 0 },
    { date: '2023-10-11', currency: 'EUR', sum: 1000 },
    { date: '2023-10-12', currency: 'EUR', sum: 0 },
    { date: '2023-10-13', currency: 'EUR', sum: 10 },
    { date: '2023-10-14', currency: 'EUR', sum: 1 },
  ];

  const getMaxValue = (arr) => {
    console.log('arr', arr);
    let res = 0;
    arr.forEach((item) => {
      if (item.sum > res) res = item.sum;
    });
    return res;
  };

  useEffect(() => {
    const approvedMax = getMaxValue(approvedDataChart);
    const declinedMax = getMaxValue(declinedDataChart);
    const processingMax = getMaxValue(processingDataChart);
    const maxValue = Math.max(approvedMax, declinedMax, processingMax);
    setMaxChartValue(maxValue);

    createApprovedDataForChart(approvedDataChart, 'approved');
    createApprovedDataForChart(declinedDataChart, 'declined');
    createApprovedDataForChart(processingDataChart, 'processing');
  }, [approvedDataChart, declinedDataChart, processingDataChart]);

  const createApprovedDataForChart = (data, type) => {
    const lineData = data.map((item) => {
      const n = new Date(item.date);
      const options = { month: 'short', day: 'numeric' };
      const dataObj = {
        value: item.sum,
        // label: new Intl.DateTimeFormat('en-US', options).format(n),
        labelComponent: () => (
          <Text
            style={{
              marginLeft: 35,
              width: 50,
            }}
          >
            {new Intl.DateTimeFormat('en-US', options).format(n)}
          </Text>
        ),
        dataPointLabelComponent: () => {
          return (
            <View
              style={{
                backgroundColor: '#0BA39A',
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRadius: 4,
                marginLeft: 20,
              }}
            >
              <Text style={{ color: 'white' }}>{item.sum}</Text>
            </View>
          );
        },
      };

      return dataObj;
    });

    switch (type) {
      case 'approved':
        // console.log('approved', lineData);
        setApprovedData(lineData);
        break;
      case 'declined':
        // console.log('declined', lineData);
        setDeclinedData(lineData);
        break;
      case 'processing':
        // console.log('processing', lineData);
        setProcessingData(lineData);
        break;

      default:
        break;
    }
  };

  return (
    <View style={{ marginVertical: 40 }}>
      <View style={styles.schartBar}>
        <View style={{ ...styles.barTitleWrapper, marginBottom: 12 }}>
          <View style={{ ...styles.marker, backgroundColor: '#06BBB1' }}></View>
          <SimpleText>
            <FormattedMessage id={'chart.approved_total'} />
          </SimpleText>
          <SimpleText>9999999</SimpleText>
        </View>
        <View style={{ ...styles.barTitleWrapper, marginBottom: 12 }}>
          <View style={{ ...styles.marker, backgroundColor: '#FF5A5A' }}></View>
          <SimpleText>
            <FormattedMessage id={'chart.declined_total'} />
          </SimpleText>
        </View>
        <View style={{ ...styles.barTitleWrapper }}>
          <View style={{ ...styles.marker, backgroundColor: '#F2CE4D' }}></View>
          <SimpleText>
            <FormattedMessage id={'chart.processing_total'} />
          </SimpleText>
        </View>
      </View>
      <View style={styles.chartBtnsWrapper}>
        <TouchableOpacity>
          <View style={styles.barTitleWrapper}>
            <View style={{ ...styles.marker, backgroundColor: '#06BBB1' }}></View>
            <SimpleText>
              <FormattedMessage id={'chart.approved'} />
            </SimpleText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.barTitleWrapper}>
            <View style={{ ...styles.marker, backgroundColor: '#FF5A5A' }}></View>
            <SimpleText>
              <FormattedMessage id={'chart.declined'} />
            </SimpleText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.barTitleWrapper}>
            <View style={{ ...styles.marker, backgroundColor: '#F2CE4D' }}></View>
            <SimpleText>
              <FormattedMessage id={'chart.processing'} />
            </SimpleText>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <LineChart
          data={aprovedData}
          data2={declinedData}
          data3={processingData}
          curved
          isAnimated={true}
          height={250}
          showVerticalLines
          width={Dimensions.get('window').width - 90}
          // yAxisLabelTexts={['A', 'B', 'C', 'D', 'E', 'A', 'B', 'C', 'D', 'E']}
          spacing={
            aprovedData.length > 1
              ? (Dimensions.get('window').width - 130) / (aprovedData.length - 1)
              : 50
          }
          // initialSpacing={aprovedData.length > 1 ? 0 : (Dimensions.get('window').width - 130) / 2}
          initialSpacing={0}
          maxValue={maxChartValue}
          color1="#06BBB1"
          color2="#FF5A5A"
          color3="#F2CE4D"
          pointerConfig={{
            delayBeforeUnFocus: 5000,
            pointerStripUptoDataPoint: true,
            pointerStripColor: 'transparent',

            pointerColor: 'transparent',

            pointerLabelComponent: (items) => {
              return (
                <View>
                  <View
                    style={{
                      backgroundColor: '#f4f4f4',
                      width: 80,
                      paddingVertical: 5,
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 4,
                      marginLeft: aprovedData.indexOf(items[0]) === 4 ? -50 : 0,
                      marginTop: items[0].value === 0 ? -20 : 0,
                    }}
                  >
                    <Text style={{ color: 'black', textAlign: 'center' }}>{items[0].label}</Text>
                  </View>

                  <View
                    style={{
                      width: 80,
                      backgroundColor: '#282C3E',
                      borderBottomLeftRadius: 4,
                      borderBottomRightRadius: 4,
                      justifyContent: 'center',
                      paddingLeft: 5,
                      paddingRight: 5,
                      paddingTop: 5,
                      paddingBottom: 15,
                      marginLeft: aprovedData.indexOf(items[0]) === 4 ? -50 : 0,
                    }}
                  >
                    {aprovedData.length && (
                      <>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <View
                            style={{
                              borderRadius: 10,
                              width: 10,
                              height: 10,
                              backgroundColor: '#0BA39A',
                              marginRight: 5,
                            }}
                          ></View>
                          <Text style={{ color: 'lightgray', fontSize: 12 }}>{'approved:'}</Text>
                        </View>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>{items[0].value}</Text>
                      </>
                    )}
                    {declinedData.length && (
                      <>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 8,
                          }}
                        >
                          <View
                            style={{
                              borderRadius: 10,
                              width: 10,
                              height: 10,
                              backgroundColor: '#FF5A5A',
                              marginRight: 5,
                            }}
                          ></View>
                          <Text style={{ color: 'lightgray', fontSize: 12 }}>{'declined:'}</Text>
                        </View>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>{items[1].value}</Text>
                      </>
                    )}
                    {processingData.length && (
                      <>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 8,
                          }}
                        >
                          <View
                            style={{
                              borderRadius: 10,
                              width: 10,
                              height: 10,
                              backgroundColor: '#F2CE4D',
                              marginRight: 5,
                            }}
                          ></View>
                          <Text style={{ color: 'lightgray', fontSize: 12 }}>{'declined:'}</Text>
                        </View>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>{items[1].value}</Text>
                      </>
                    )}
                  </View>
                </View>
              );
            },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barTitleWrapper: { display: 'flex', flexDirection: 'row', alignItems: 'baseline' },
  marker: {
    width: 12,
    height: 12,
    borderRadius: 12,
    marginRight: 7,
  },
  chartBtnsWrapper: {
    marginTop: 50,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SimpleLineChart;
