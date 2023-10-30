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
  Pressable,
} from 'react-native';
import { useEffect, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import { LineChart } from 'react-native-gifted-charts';
import SimpleText from '../atoms/SimpleText';

const SimpleLineChart = ({
  approvedDataChart = [],
  declinedDataChart = [],
  processingDataChart = [],
  currency,
}) => {
  const [aprovedData, setApprovedData] = useState([]);
  const [declinedData, setDeclinedData] = useState([]);
  const [processingData, setProcessingData] = useState([]);
  const [maxChartValue, setMaxChartValue] = useState(100);
  // const [minChartValue, setMinChartValue] = useState(100);
  const [conversionApproved, setConversionApproved] = useState(0);
  const [conversionDeclined, setConversionDeclined] = useState(0);
  const [conversionProcessing, setConversionProcessing] = useState(0);
  const [isApprovedActive, setIsApprovedActive] = useState(true);
  const [isDeclinedActive, setIsDeclinedActive] = useState(true);
  const [isProccesingActive, setIsProccesingActive] = useState(true);
  const [yAxisLabelTexts, setYAxisLabelTexts] = useState({});
  const [yAxisOffset, setYAxisOffset] = useState(0);

  // const test = [
  //   { date: '2023-10-23', currency: 'EUR', sum: 20 },
  //   { date: '2023-10-24', currency: 'EUR', sum: 23 },
  //   { date: '2023-10-25', currency: 'EUR', sum: 19 },
  //   { date: '2023-10-26', currency: 'EUR', sum: 20 },
  //   { date: '2023-10-27', currency: 'EUR', sum: 21 },
  // ];
  // const test2 = [
  //   { date: '2023-10-23', currency: 'EUR', sum: 1 },
  //   { date: '2023-10-24', currency: 'EUR', sum: 22 },
  //   { date: '2023-10-25', currency: 'EUR', sum: 20 },
  //   { date: '2023-10-26', currency: 'EUR', sum: 3 },
  //   { date: '2023-10-27', currency: 'EUR', sum: 22 },
  // ];
  // const test3 = [
  //   { date: '2023-10-23', currency: 'EUR', sum: 20 },
  //   { date: '2023-10-24', currency: 'EUR', sum: 21 },
  //   { date: '2023-10-25', currency: 'EUR', sum: 20 },
  //   { date: '2023-10-26', currency: 'EUR', sum: 23 },
  //   { date: '2023-10-27', currency: 'EUR', sum: 25 },
  // ];

  const getMaxMinValue = (arr, type) => {
    let max = arr[0]?.sum || 0;
    let min = arr[0]?.sum || 0;
    let conversionTotal = 0;
    arr.forEach((item) => {
      if (item.sum > max) max = item.sum;
      if (item.sum < min) min = item.sum;
      conversionTotal = conversionTotal + item.sum;
    });
    switch (type) {
      case 'approved':
        setConversionApproved(conversionTotal);
        break;
      case 'declined':
        setConversionDeclined(conversionTotal);
        break;
      case 'processing':
        setConversionProcessing(conversionTotal);
        break;

      default:
        break;
    }

    return { max, min };
  };

  useEffect(() => {
    const approvedMaxMin = getMaxMinValue(approvedDataChart, 'approved');
    const declinedMaxMin = getMaxMinValue(declinedDataChart, 'declined');
    const processingMaxMin = getMaxMinValue(processingDataChart, 'processing');
    // const approvedMaxMin = getMaxMinValue(test, 'approved');
    // const declinedMaxMin = getMaxMinValue(test2, 'declined');
    // const processingMaxMin = getMaxMinValue(test3, 'processing');
    const maxValue = Math.max(approvedMaxMin.max, declinedMaxMin.max, processingMaxMin.max);
    const minValue = Math.min(approvedMaxMin.min, declinedMaxMin.min, processingMaxMin.min);
    setMaxChartValue(maxValue);
    // setMinChartValue(minValue);

    // console.log('maxValue', maxValue);
    // console.log('minValue', minValue);
    let step = maxValue / 10;

    let targetStep = Math.floor(minValue / step);
    const yOffset = minValue - step;
    setYAxisOffset(yOffset <= 0 ? 0 : yOffset);
    // console.log('targetStep', targetStep);
    // console.log('yAxisOffset', yOffset);

    if (maxValue > 999) {
      let labelsRow = [yOffset <= 0 ? '0k' : (yOffset / 1000).toFixed(1) + 'k'];
      const stepIfOffset = (maxValue - yOffset) / 8;
      for (let i = 1; i <= 10; i++) {
        '' +
          labelsRow.push(
            maxValue > 9999
              ? ((yOffset + stepIfOffset * i) / 1000).toFixed(0) + 'k'
              : ((yOffset + stepIfOffset * i) / 1000).toFixed(2) + 'k'
          );
      }
      setYAxisLabelTexts(labelsRow);
    } else {
      let labelsRow = [yOffset <= 0 ? '0' : yOffset.toFixed(1)];
      const stepIfOffset = (maxValue - yOffset) / 8;
      for (let i = 1; i <= 10; i++) {
        labelsRow.push((yOffset + stepIfOffset * i).toFixed(0));
      }
      setYAxisLabelTexts(labelsRow);
    }

    createApprovedDataForChart(approvedDataChart, 'approved');
    createApprovedDataForChart(declinedDataChart, 'declined');
    createApprovedDataForChart(processingDataChart, 'processing');
    // createApprovedDataForChart(test, 'approved');
    // createApprovedDataForChart(test2, 'declined');
    // createApprovedDataForChart(test3, 'processing');
  }, [approvedDataChart, declinedDataChart, processingDataChart]);

  const createApprovedDataForChart = (data, type) => {
    const lineData = data.map((item) => {
      const n = new Date(item.date);
      const options = { month: 'short', day: 'numeric' };

      const dataObj = {
        value: item.sum,
        label: new Intl.DateTimeFormat('en-US', options).format(n),
        labelComponent: () => (
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Mont',
              lineHeight: 15,
              textAlign: aprovedData.length !== 1 ? 'center' : 'left',
            }}
          >
            {new Intl.DateTimeFormat('en-US', options).format(n)}
          </Text>
        ),
        dataPointLabelComponent: () => {
          return (
            <View
              style={{
                backgroundColor:
                  type === 'approved' ? '#06BBB1' : type === 'declined' ? '#FF5A5A' : '#F2CE4D',
                opacity: type === 'approved' && !isApprovedActive ? 0 : 1,
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
        setApprovedData(lineData);

        break;
      case 'declined':
        setDeclinedData(lineData);
        break;
      case 'processing':
        setProcessingData(lineData);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    createApprovedDataForChart(approvedDataChart, 'approved');
    // createApprovedDataForChart(test, 'approved');
  }, [isApprovedActive]);

  const handleChangeChartLines = (type) => {
    switch (type) {
      case 'approved':
        setIsApprovedActive(!isApprovedActive);
        break;
      case 'declined':
        setIsDeclinedActive(!isDeclinedActive);
        break;
      case 'processing':
        setIsProccesingActive(!isProccesingActive);
        break;

      default:
        break;
    }
  };

  return (
    <View style={{ marginTop: 40 }}>
      <View style={styles.schartBar}>
        <View style={{ ...styles.barTitleWrapper, marginBottom: 12 }}>
          <View style={{ ...styles.marker, backgroundColor: '#06BBB1' }}></View>
          <SimpleText>
            <FormattedMessage id={'chart.approved_total'} />
          </SimpleText>
          <SimpleText style={{ marginLeft: 5, fontFamily: 'Mont_B' }}>
            {`${conversionApproved} ${currency}`}
          </SimpleText>
          {conversionApproved !== 0 && (
            <SimpleText style={{ marginLeft: 5, fontFamily: 'Mont_B' }}>
              {`(${((conversionApproved * 100) / (conversionApproved + conversionDeclined)).toFixed(
                2
              )}%)`}
            </SimpleText>
          )}
        </View>
        <View style={{ ...styles.barTitleWrapper, marginBottom: 12 }}>
          <View style={{ ...styles.marker, backgroundColor: '#FF5A5A' }}></View>
          <SimpleText>
            <FormattedMessage id={'chart.declined_total'} />
          </SimpleText>
          <SimpleText style={{ marginLeft: 5, fontFamily: 'Mont_B' }}>
            {`${conversionDeclined} ${currency}`}
          </SimpleText>
          {conversionDeclined !== 0 && (
            <SimpleText style={{ marginLeft: 5, fontFamily: 'Mont_B' }}>
              {`(${((conversionDeclined * 100) / (conversionApproved + conversionDeclined)).toFixed(
                2
              )}%)`}
            </SimpleText>
          )}
        </View>
        <View style={{ ...styles.barTitleWrapper }}>
          <View style={{ ...styles.marker, backgroundColor: '#F2CE4D' }}></View>
          <SimpleText>
            <FormattedMessage id={'chart.processing_total'} />
          </SimpleText>
          <SimpleText style={{ marginLeft: 5, fontFamily: 'Mont_B' }}>
            {`${conversionProcessing} ${currency}`}
          </SimpleText>
        </View>
      </View>
      <View style={styles.chartBtnsWrapper}>
        <TouchableOpacity onPress={() => handleChangeChartLines('approved')}>
          <View style={styles.barTitleWrapper}>
            <View
              style={{
                ...styles.marker,
                backgroundColor: isApprovedActive ? '#06BBB1' : 'rgba(6, 187, 177, 0.2)',
              }}
            ></View>
            <SimpleText style={{ opacity: isApprovedActive ? 1 : 0.2 }}>
              <FormattedMessage id={'chart.approved'} />
            </SimpleText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeChartLines('declined')}>
          <View style={styles.barTitleWrapper}>
            <View
              style={{
                ...styles.marker,
                backgroundColor: isDeclinedActive ? '#FF5A5A' : 'rgba(255, 90, 90, 0.2)',
              }}
            ></View>
            <SimpleText style={{ opacity: isDeclinedActive ? 1 : 0.2 }}>
              <FormattedMessage id={'chart.declined'} />
            </SimpleText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChangeChartLines('processing')}>
          <View style={styles.barTitleWrapper}>
            <View
              style={{
                ...styles.marker,
                backgroundColor: isProccesingActive ? '#F2CE4D' : 'rgba(242, 206, 77, 0.2)',
              }}
            ></View>
            <SimpleText style={{ opacity: isProccesingActive ? 1 : 0.2 }}>
              <FormattedMessage id={'chart.processing'} />
            </SimpleText>
          </View>
        </TouchableOpacity>
      </View>
      {aprovedData.length > 0 && declinedData.length >= 0 && processingData.length >= 0 && (
        <View>
          <LineChart
            data={aprovedData}
            data2={isDeclinedActive ? declinedData : []}
            data3={isProccesingActive ? processingData : []}
            curved
            hideDataPoints1={!isApprovedActive}
            // yAxisLabelSuffix={maxChartValue > 999 ? 'k' : ''}
            // rotateLabel
            showFractionalValues={maxChartValue > 999 && maxChartValue < 9999 ? true : false}
            isAnimated={true}
            height={250}
            showVerticalLines
            width={aprovedData.length !== 1 ? false : Dimensions.get('window').width - 100}
            yAxisLabelTexts={yAxisLabelTexts}
            // yAxisLabelWidth={100}
            // yAxisLabelContainerStyle={{ paddingLeft: 5 }}
            yAxisTextStyle={{ marginLeft: -20 }}
            spacing={
              aprovedData.length !== 1
                ? (Dimensions.get('window').width - 130) / (aprovedData.length - 1)
                : 170
            }
            initialSpacing={
              aprovedData.length !== 1 ? 25 : (Dimensions.get('window').width - 80) / 2
            }
            // initialSpacing={0}
            // maxValue={maxChartValue + maxChartValue / 8}
            // yAxisOffset={minChartValue - minChartValue / 8}

            maxValue={maxChartValue - yAxisOffset + maxChartValue / 10}
            yAxisOffset={yAxisOffset}
            color1={isApprovedActive ? '#06BBB1' : 'transparent'}
            color2="#FF5A5A"
            color3="#F2CE4D"
            // delayBeforeUnFocus={5000}

            pointerConfig={{
              pointerStripColor: 'transparent',

              pointerColor: 'transparent',

              pointerLabelComponent: (items) => {
                return (
                  <View>
                    {(items[0].value !== 0 || items[1].value !== 0 || items[2].value !== 0) && (
                      <>
                        <View
                          style={{
                            backgroundColor: '#f4f4f4',
                            width: 90,
                            paddingVertical: 5,
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4,
                            marginLeft: aprovedData.indexOf(items[0]) === 4 ? -70 : 0,
                          }}
                        >
                          <Text style={{ color: 'black', textAlign: 'center' }}>
                            {items[0].label}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: 90,
                            backgroundColor: '#282C3E',
                            borderBottomLeftRadius: 4,
                            borderBottomRightRadius: 4,
                            justifyContent: 'center',
                            paddingLeft: 5,
                            paddingRight: 5,
                            paddingTop: 5,
                            paddingBottom: 15,
                            marginLeft: aprovedData.indexOf(items[0]) === 4 ? -70 : 0,
                          }}
                        >
                          {aprovedData.length && items[0].value !== 0 && (
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
                                <Text style={{ color: 'lightgray', fontSize: 12 }}>
                                  {'approved:'}
                                </Text>
                              </View>
                              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                {items[0].value + yAxisOffset}
                              </Text>
                            </>
                          )}
                          {declinedData.length && items[1].value !== 0 && (
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
                                <Text style={{ color: 'lightgray', fontSize: 12 }}>
                                  {'declined:'}
                                </Text>
                              </View>
                              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                {items[1].value + yAxisOffset}
                              </Text>
                            </>
                          )}
                          {processingData.length && items[2].value !== 0 && (
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
                                <Text style={{ color: 'lightgray', fontSize: 12 }}>
                                  {'processing:'}
                                </Text>
                              </View>
                              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                                {items[2].value + yAxisOffset}
                              </Text>
                            </>
                          )}
                        </View>
                      </>
                    )}
                  </View>
                );
              },
            }}
          />
        </View>
      )}
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
});

export default SimpleLineChart;
