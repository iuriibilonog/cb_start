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
import { useState } from 'react';

import { LineChart } from 'react-native-gifted-charts';

const SimpleLineChart = () => {
  const [aprovedData, setApprovedData] = useState([]);
  const [declinedData, setDeclinedData] = useState([]);

  const test = [
    { date: '2023-10-01', currency: 'EUR', sum: 0 },
    { date: '2023-10-11', currency: 'EUR', sum: 599.8 },
    { date: '2023-10-12', currency: 'EUR', sum: 0 },
    { date: '2023-10-13', currency: 'EUR', sum: 10 },
    { date: '2023-10-14', currency: 'EUR', sum: 1 },
  ];

  const lineData3 = test.map((item) => {
    const n = new Date(item.date);
    const options = { month: 'short', day: 'numeric' };
    const dataObj = {
      value: item.sum,
      label: new Intl.DateTimeFormat('en-US', options).format(n),
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

    // item.value = item.sum;
    // item.label = new Intl.DateTimeFormat('en-US', options).format(n);

    return dataObj;
  });

  const lineData = [
    {
      value: 10,

      label: '18 Oct',
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
            <Text style={{ color: 'white' }}>10</Text>
          </View>
        );
      },
    },
    {
      value: 10,

      label: '19 Oct',
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
            <Text style={{ color: 'white' }}>10</Text>
          </View>
        );
      },
    },
    {
      value: 8,

      label: '20 Oct',
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
            <Text style={{ color: 'white' }}>8</Text>
          </View>
        );
      },
    },
    {
      value: 58,

      label: '21 Oct',
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
            <Text style={{ color: 'white' }}>58</Text>
          </View>
        );
      },
    },
    {
      value: 56,

      label: '22 Oct',
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
            <Text style={{ color: 'white' }}>56</Text>
          </View>
        );
      },
    },
  ];

  const lineData2 = [
    {
      value: 0,

      label: '18 Oct',
      dataPointLabelComponent: () => {
        return (
          <View
            style={{
              backgroundColor: 'red',
              paddingHorizontal: 5,
              paddingVertical: 2,
              borderRadius: 4,
              marginLeft: 20,
            }}
          >
            <Text style={{ color: 'white' }}>0</Text>
          </View>
        );
      },
    },
    {
      value: 0,

      label: '19 Oct',
      dataPointLabelComponent: () => {
        return (
          <View
            style={{
              backgroundColor: 'red',
              paddingHorizontal: 5,
              paddingVertical: 2,
              borderRadius: 4,
              marginLeft: 20,
            }}
          >
            <Text style={{ color: 'white' }}>0</Text>
          </View>
        );
      },
    },
    {
      value: 18,

      label: '20 Oct',
      dataPointLabelComponent: () => {
        return (
          <View
            style={{
              backgroundColor: 'red',
              paddingHorizontal: 5,
              paddingVertical: 2,
              borderRadius: 4,
              marginLeft: 20,
            }}
          >
            <Text style={{ color: 'white' }}>18</Text>
          </View>
        );
      },
    },
    {
      value: 40,

      label: '21 Oct',
      dataPointLabelComponent: () => {
        return (
          <View
            style={{
              backgroundColor: 'red',
              paddingHorizontal: 5,
              paddingVertical: 2,
              borderRadius: 4,
              marginLeft: 20,
            }}
          >
            <Text style={{ color: 'white' }}>40</Text>
          </View>
        );
      },
    },
    {
      value: 36,

      label: '22 Oct',
      dataPointLabelComponent: () => {
        return (
          <View
            style={{
              backgroundColor: 'red',
              paddingHorizontal: 5,
              paddingVertical: 2,
              borderRadius: 4,
              marginLeft: 20,
            }}
          >
            <Text style={{ color: 'white' }}>36</Text>
          </View>
        );
      },
    },
  ];
  return (
    <View style={{ marginVertical: 40 }}>
      <LineChart
        data={lineData3}
        // data2={declinedData}
        curved
        isAnimated={true}
        height={250}
        showVerticalLines
        spacing={(Dimensions.get('window').width - 40) / 5}
        initialSpacing={20}
        color1="#0BA39A"
        color2="red"
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
                    marginLeft: lineData3.indexOf(items[0]) === 4 ? -50 : 0,
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
                    marginLeft: lineData3.indexOf(items[0]) === 4 ? -50 : 0,
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
                            backgroundColor: 'red',
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
  );
};

export default SimpleLineChart;
