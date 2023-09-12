import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTransactionData } from 'src/redux/content/operations';
import { getTransactionInfo } from 'src/redux/content/selectors';
import {
  Text,
  StyleSheet,
  View,
  Keyboard,
  Dimensions,
  Pressable,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import SimpleText from '../components/atoms/SimpleText';
import { FormattedMessage } from 'react-intl';

const close = require('src/images/delete.png');
const arrowDown = require('src/images/arrow_down_small.png');
const arrowUp = require('src/images/arrow_up.png');

const TransactionsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const transactionInfo = useSelector(getTransactionInfo);

  useEffect(() => {
    dispatch(getTransactionData());
  }, []);

  useEffect(() => {
    console.log('transactionInfo', transactionInfo);
  }, [transactionInfo]);

  const handleNextScreen = () => {
    console.log('nextScreen>>');
    navigation.navigate('LoginScreen');
  };

  const [isAdditDataOpen, setIsAdditDataOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  const { width } = Dimensions.get('window');

  const transactionsData = {
    items: [
      {
        bin: {
          id: 9,
          bin: '65000000',
          brand: 'Discover',
          country: 'US',
          issuer: '',
          createdAt: '2023-09-11T09:13:48.449Z',
          updatedAt: '2023-09-11T09:13:48.449Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '650000******0895',
        amount: 20,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-12T07:50:58.193Z',
        updatedAt: '2023-09-12T07:50:58.529Z',
        id: 416989,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1694505058189',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [
          {
            id: '6b32ba18-50c3-4daf-92b8-ccc393454039',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=Aac78dhhB43c6cGGfAEg00ee',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-12T07:50:58.239Z',
            updatedAt: '2023-09-12T07:50:58.506Z',
            paymentId: 416989,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 9,
          bin: '65000000',
          brand: 'Discover',
          country: 'US',
          issuer: '',
          createdAt: '2023-09-11T09:13:48.449Z',
          updatedAt: '2023-09-11T09:13:48.449Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '650000******0895',
        amount: 20,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-12T07:49:57.752Z',
        updatedAt: '2023-09-12T07:49:58.329Z',
        id: 416988,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1694504997647',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [
          {
            id: '6a126348-89cb-44f5-9fde-e20c0af915cf',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=AD561BE53f66H5HHH6f7ffge',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-12T07:49:58.028Z',
            updatedAt: '2023-09-12T07:49:58.301Z',
            paymentId: 416988,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 9,
          bin: '65000000',
          brand: 'Discover',
          country: 'US',
          issuer: '',
          createdAt: '2023-09-11T09:13:48.449Z',
          updatedAt: '2023-09-11T09:13:48.449Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '650000******0895',
        amount: 20,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-12T07:45:13.923Z',
        updatedAt: '2023-09-12T07:45:13.949Z',
        id: 416987,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694504713780',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 9,
          bin: '65000000',
          brand: 'Discover',
          country: 'US',
          issuer: '',
          createdAt: '2023-09-11T09:13:48.449Z',
          updatedAt: '2023-09-11T09:13:48.449Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '650000******0895',
        amount: 20,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-12T07:43:03.592Z',
        updatedAt: '2023-09-12T07:43:03.614Z',
        id: 416986,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694504583500',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 9,
          bin: '65000000',
          brand: 'Discover',
          country: 'US',
          issuer: '',
          createdAt: '2023-09-11T09:13:48.449Z',
          updatedAt: '2023-09-11T09:13:48.449Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '650000******0895',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-12T07:40:39.763Z',
        updatedAt: '2023-09-12T07:40:39.782Z',
        id: 416985,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694504439719',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 9,
          bin: '65000000',
          brand: 'Discover',
          country: 'US',
          issuer: '',
          createdAt: '2023-09-11T09:13:48.449Z',
          updatedAt: '2023-09-11T09:13:48.449Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '650000******0895',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-12T07:40:26.623Z',
        updatedAt: '2023-09-12T07:40:26.661Z',
        id: 416984,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694504426555',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-12T07:39:38.253Z',
        updatedAt: '2023-09-12T07:39:38.285Z',
        id: 416983,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694504378167',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-12T07:37:29.736Z',
        updatedAt: '2023-09-12T07:37:29.772Z',
        id: 416982,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694504249696',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-12T07:36:32.240Z',
        updatedAt: '2023-09-12T07:36:32.264Z',
        id: 416981,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694504192194',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-12T07:36:28.430Z',
        updatedAt: '2023-09-12T07:36:28.480Z',
        id: 416980,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694504188224',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '92.253.212.219',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '400000******0085',
        amount: 10,
        commission: 25,
        currency: 'EUR',
        createdAt: '2023-09-11T16:26:23.635Z',
        updatedAt: '2023-09-11T16:26:24.015Z',
        id: 416979,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1111111111167',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [
          {
            id: 'aefeb8e0-4d3f-41c2-88dc-3266c56d2fbf',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=eE60dbba24B63A171Cd64hCd',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 25,
            createdAt: '2023-09-11T16:26:23.805Z',
            updatedAt: '2023-09-11T16:26:23.997Z',
            paymentId: 416979,
            ledgerId: 38,
            payMethodSettingId: 101,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 125,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '92.253.212.219',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '400000******0085',
        amount: 10,
        commission: 25,
        currency: 'EUR',
        createdAt: '2023-09-11T16:26:14.857Z',
        updatedAt: '2023-09-11T16:26:15.313Z',
        id: 416978,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1111111111166',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [
          {
            id: '1946a906-28ba-485f-886e-ce65a6151916',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=A30de8g3Gbgea6gfgGfAe8Ab',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 25,
            createdAt: '2023-09-11T16:26:15.049Z',
            updatedAt: '2023-09-11T16:26:15.291Z',
            paymentId: 416978,
            ledgerId: 38,
            payMethodSettingId: 101,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 125,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '92.253.212.219',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '400000******0085',
        amount: 10,
        commission: 25,
        currency: 'EUR',
        createdAt: '2023-09-11T16:25:01.900Z',
        updatedAt: '2023-09-11T16:26:01.089Z',
        id: 416977,
        mode: 'payin',
        message: 'Payment approved',
        orderId: '1111111111165',
        status: 'approved',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [
          {
            id: '402b6526-446e-499e-b83f-96c37e9c690f',
            bankPaymentId: '15223575',
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=b31g3g6885dFB5D4g06ffF4f',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'approved',
            message: 'Payment approved',
            commission: 25,
            createdAt: '2023-09-11T16:25:02.141Z',
            updatedAt: '2023-09-11T16:26:01.052Z',
            paymentId: 416977,
            ledgerId: 38,
            payMethodSettingId: 101,
            isVisitedUrl: true,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: 'Message:  | Status: COMPLETED | Decline reason: ',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 125,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '92.253.212.219',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '400000******0085',
        amount: 10,
        commission: 0,
        currency: 'EUR',
        createdAt: '2023-09-11T16:24:51.257Z',
        updatedAt: '2023-09-11T16:24:51.424Z',
        id: 416976,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1111111111164',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 125,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '92.253.212.219',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '400000******0085',
        amount: 10,
        commission: 25,
        currency: 'EUR',
        createdAt: '2023-09-11T16:24:34.034Z',
        updatedAt: '2023-09-11T16:24:34.713Z',
        id: 416975,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1111111111163',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [
          {
            id: 'e72c57b8-afb7-4b33-bc9e-d94300ed421e',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=b212F500hAH8H40F8gd4DeA0',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 25,
            createdAt: '2023-09-11T16:24:34.372Z',
            updatedAt: '2023-09-11T16:24:34.687Z',
            paymentId: 416975,
            ledgerId: 38,
            payMethodSettingId: 101,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 125,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T14:13:22.267Z',
        updatedAt: '2023-09-11T14:13:22.594Z',
        id: 416974,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1694441602634',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [
          {
            id: 'a9926273-d7c2-4c98-a54c-822c137d1efa',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=H6aGg1g7acEDGE0efh8aE2ac',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-11T14:13:22.313Z',
            updatedAt: '2023-09-11T14:13:22.565Z',
            paymentId: 416974,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T14:12:44.114Z',
        updatedAt: '2023-09-11T14:12:44.425Z',
        id: 416973,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1694441564433',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [
          {
            id: 'b6876822-65d0-4995-b896-6d86d01e7fa3',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=G2E1C2c3f4ghD0e827H8e0ae',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-11T14:12:44.198Z',
            updatedAt: '2023-09-11T14:12:44.400Z',
            paymentId: 416973,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: null,
        customerIp: '178.150.235.34',
        customerEmail: null,
        customerFirstName: null,
        customerLastName: null,
        customerPhone: null,
        cardNumber: null,
        amount: 47,
        commission: null,
        currency: 'EUR',
        createdAt: '2023-09-11T13:00:01.567Z',
        updatedAt: '2023-09-11T14:01:00.381Z',
        id: 416972,
        mode: 'payin',
        message: 'Payment timeout',
        orderId: 'wcfy9-4lrlc-dvrvp',
        status: 'declined',
        cardHolder: null,
        transactions: [],
        apiKey: {
          id: 132,
          name: 'testCreateUser12',
          user: {
            id: 90,
            email: 'testCreateUser12@test.com',
            username: 'testCreateUser12',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 132,
      },
      {
        bin: null,
        customerIp: '178.150.235.34',
        customerEmail: null,
        customerFirstName: null,
        customerLastName: null,
        customerPhone: null,
        cardNumber: null,
        amount: 47,
        commission: null,
        currency: 'EUR',
        createdAt: '2023-09-11T12:59:36.512Z',
        updatedAt: '2023-09-11T14:00:00.563Z',
        id: 416971,
        mode: 'payin',
        message: 'Payment timeout',
        orderId: '72v5n-vqrk7-unvum',
        status: 'declined',
        cardHolder: null,
        transactions: [],
        apiKey: {
          id: 132,
          name: 'testCreateUser12',
          user: {
            id: 90,
            email: 'testCreateUser12@test.com',
            username: 'testCreateUser12',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 132,
      },
      {
        bin: null,
        customerIp: '178.150.235.34',
        customerEmail: null,
        customerFirstName: null,
        customerLastName: null,
        customerPhone: null,
        cardNumber: null,
        amount: 47,
        commission: null,
        currency: 'EUR',
        createdAt: '2023-09-11T12:56:49.028Z',
        updatedAt: '2023-09-11T13:57:00.395Z',
        id: 416970,
        mode: 'payin',
        message: 'Payment timeout',
        orderId: 'djvhq-6vtq1-lqqmb',
        status: 'declined',
        cardHolder: null,
        transactions: [],
        apiKey: {
          id: 132,
          name: 'testCreateUser12',
          user: {
            id: 90,
            email: 'testCreateUser12@test.com',
            username: 'testCreateUser12',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 132,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T12:10:46.179Z',
        updatedAt: '2023-09-11T12:10:46.696Z',
        id: 416969,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1694434246117',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [
          {
            id: 'dd39188b-6e1d-436c-810d-ca8ad9903596',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=c0d0E7D5d1Dh4AdHf0c6hCgc',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-11T12:10:46.359Z',
            updatedAt: '2023-09-11T12:10:46.670Z',
            paymentId: 416969,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:52:03.139Z',
        updatedAt: '2023-09-11T09:52:03.406Z',
        id: 416968,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1694425922855',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [
          {
            id: 'cdff50bc-d12a-40c6-a5f0-1790e1a96556',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=Fca44CDA0b48Feb8A11aceHD',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-11T09:52:03.184Z',
            updatedAt: '2023-09-11T09:52:03.388Z',
            paymentId: 416968,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:51:45.754Z',
        updatedAt: '2023-09-11T09:51:45.790Z',
        id: 416967,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694425905460',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:51:20.137Z',
        updatedAt: '2023-09-11T09:51:20.474Z',
        id: 416966,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1694425879860',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [
          {
            id: '05f364d8-21c8-49fc-ac95-1f4b4a3cbdae',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=gga61Bb328D1aCGfBgACF6D2',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-11T09:51:20.174Z',
            updatedAt: '2023-09-11T09:51:20.457Z',
            paymentId: 416966,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:51:06.478Z',
        updatedAt: '2023-09-11T09:51:06.526Z',
        id: 416965,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694425866204',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:50:43.767Z',
        updatedAt: '2023-09-11T09:50:43.805Z',
        id: 416964,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694425843504',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:50:38.542Z',
        updatedAt: '2023-09-11T09:50:38.576Z',
        id: 416963,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694425838259',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:50:32.312Z',
        updatedAt: '2023-09-11T09:50:32.358Z',
        id: 416962,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694425832049',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:50:30.481Z',
        updatedAt: '2023-09-11T09:50:30.545Z',
        id: 416961,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694425830222',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:50:22.640Z',
        updatedAt: '2023-09-11T09:50:22.690Z',
        id: 416960,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694425822383',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:49:53.465Z',
        updatedAt: '2023-09-11T09:49:53.811Z',
        id: 416959,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1694425793158',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [
          {
            id: 'daa5134b-a04a-4572-a018-e2b4159a3bed',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=bA1e27bHAH8bHhG0EE1786h8',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-11T09:49:53.509Z',
            updatedAt: '2023-09-11T09:49:53.788Z',
            paymentId: 416959,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:49:41.817Z',
        updatedAt: '2023-09-11T09:49:42.122Z',
        id: 416958,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1694425781554',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [
          {
            id: 'd6b2d5d0-cd90-4b65-b978-ca607dac6f42',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=E0Bd6d7Ec7f0fh8fAfHD3h4a',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-11T09:49:41.882Z',
            updatedAt: '2023-09-11T09:49:42.102Z',
            paymentId: 416958,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:49:14.255Z',
        updatedAt: '2023-09-11T09:49:14.671Z',
        id: 416957,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1694425753924',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [
          {
            id: '1e169d21-148c-47b0-92d5-5c75f3f12918',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=ecfgf3G1ACDgfA4HE1a6H6fg',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-11T09:49:14.422Z',
            updatedAt: '2023-09-11T09:49:14.646Z',
            paymentId: 416957,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:43:07.505Z',
        updatedAt: '2023-09-11T09:43:07.763Z',
        id: 416956,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1694425387234',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [
          {
            id: '68ce206a-619d-4928-8a85-99fb7f2c0c75',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=a21CGHDh6C4EhG2B404F7302',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-11T09:43:07.537Z',
            updatedAt: '2023-09-11T09:43:07.744Z',
            paymentId: 416956,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:43:03.456Z',
        updatedAt: '2023-09-11T09:43:03.748Z',
        id: 416955,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1694425383127',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [
          {
            id: '239d2a89-fefa-488b-b3ea-24b6f4d9cb38',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=A50ehAaD8AgGFBdagHe1a3A8',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-11T09:43:03.502Z',
            updatedAt: '2023-09-11T09:43:03.724Z',
            paymentId: 416955,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:40:20.346Z',
        updatedAt: '2023-09-11T09:40:20.877Z',
        id: 416954,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1694425220037',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [
          {
            id: '2e3c7893-2bb2-416f-b8cc-a602a844fda6',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=cg0F0bd3g1ee0d1Bb4hF573a',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-11T09:40:20.443Z',
            updatedAt: '2023-09-11T09:40:20.853Z',
            paymentId: 416954,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 9,
          bin: '65000000',
          brand: 'Discover',
          country: 'US',
          issuer: '',
          createdAt: '2023-09-11T09:13:48.449Z',
          updatedAt: '2023-09-11T09:13:48.449Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '650000******0895',
        amount: 5,
        commission: null,
        currency: 'USD',
        createdAt: '2023-09-11T09:39:34.531Z',
        updatedAt: '2023-09-11T10:40:00.418Z',
        id: 416953,
        mode: 'payin',
        message: 'Payment timeout',
        orderId: '1694425173952',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 9,
          bin: '65000000',
          brand: 'Discover',
          country: 'US',
          issuer: '',
          createdAt: '2023-09-11T09:13:48.449Z',
          updatedAt: '2023-09-11T09:13:48.449Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '650000******0895',
        amount: 5,
        commission: null,
        currency: 'USD',
        createdAt: '2023-09-11T09:25:42.443Z',
        updatedAt: '2023-09-11T10:26:00.370Z',
        id: 416952,
        mode: 'payin',
        message: 'Payment timeout',
        orderId: '1694424342121',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro1',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 9,
          bin: '65000000',
          brand: 'Discover',
          country: 'US',
          issuer: '',
          createdAt: '2023-09-11T09:13:48.449Z',
          updatedAt: '2023-09-11T09:13:48.449Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '650000******0895',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:24:12.607Z',
        updatedAt: '2023-09-11T09:24:12.642Z',
        id: 416951,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694424252195',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 9,
          bin: '65000000',
          brand: 'Discover',
          country: 'US',
          issuer: '',
          createdAt: '2023-09-11T09:13:48.449Z',
          updatedAt: '2023-09-11T09:13:48.449Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '650000******0895',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:13:48.457Z',
        updatedAt: '2023-09-11T09:13:48.498Z',
        id: 416950,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1694423627980',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: null,
        currency: 'USD',
        createdAt: '2023-09-11T09:13:21.739Z',
        updatedAt: '2023-09-11T10:14:00.372Z',
        id: 416949,
        mode: 'payin',
        message: 'Payment timeout',
        orderId: '1694423601407',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: null,
        currency: 'USD',
        createdAt: '2023-09-11T09:08:35.578Z',
        updatedAt: '2023-09-11T10:09:00.388Z',
        id: 416948,
        mode: 'payin',
        message: 'Payment timeout',
        orderId: '1694423315173',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-11T09:07:17.405Z',
        updatedAt: '2023-09-11T09:07:17.832Z',
        id: 416947,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1694423237046',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro',
        transactions: [
          {
            id: 'd4993c18-f89e-441d-869e-b37d84a6ea15',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=C04cC5G3d13HCcfb7g4DH37B',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-11T09:07:17.437Z',
            updatedAt: '2023-09-11T09:07:17.798Z',
            paymentId: 416947,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: null,
        currency: 'USD',
        createdAt: '2023-09-11T09:06:51.000Z',
        updatedAt: '2023-09-11T10:07:00.263Z',
        id: 416946,
        mode: 'payin',
        message: 'Payment timeout',
        orderId: '1694423210590',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: null,
        currency: 'USD',
        createdAt: '2023-09-11T09:05:33.276Z',
        updatedAt: '2023-09-11T10:06:00.186Z',
        id: 416945,
        mode: 'payin',
        message: 'Payment timeout',
        orderId: '1694423132922',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: null,
        currency: 'USD',
        createdAt: '2023-09-11T09:05:06.269Z',
        updatedAt: '2023-09-11T10:06:00.186Z',
        id: 416944,
        mode: 'payin',
        message: 'Payment timeout',
        orderId: '1694423105889',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: null,
        currency: 'USD',
        createdAt: '2023-09-11T08:40:17.461Z',
        updatedAt: '2023-09-11T09:41:00.188Z',
        id: 416943,
        mode: 'payin',
        message: 'Payment timeout',
        orderId: '123123123',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: null,
        currency: 'USD',
        createdAt: '2023-09-11T08:37:20.863Z',
        updatedAt: '2023-09-11T09:38:00.171Z',
        id: 416942,
        mode: 'payin',
        message: 'Payment timeout',
        orderId: '8822223',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: null,
        currency: 'USD',
        createdAt: '2023-09-11T08:36:09.023Z',
        updatedAt: '2023-09-11T09:37:00.220Z',
        id: 416941,
        mode: 'payin',
        message: 'Payment timeout',
        orderId: '882223',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: null,
        currency: 'USD',
        createdAt: '2023-09-11T08:36:05.411Z',
        updatedAt: '2023-09-11T09:37:00.220Z',
        id: 416940,
        mode: 'payin',
        message: 'Payment timeout',
        orderId: '82182223',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '176.39.35.0',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '380955677835',
        cardNumber: '400000******0085',
        amount: 5,
        commission: null,
        currency: 'USD',
        createdAt: '2023-09-11T08:35:35.151Z',
        updatedAt: '2023-09-11T09:36:00.244Z',
        id: 416939,
        mode: 'payin',
        message: 'Payment timeout',
        orderId: '8218223',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '92.253.212.219',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '400000******0085',
        amount: 10,
        commission: 0,
        currency: 'EUR',
        createdAt: '2023-09-09T18:17:38.237Z',
        updatedAt: '2023-09-09T18:17:38.689Z',
        id: 416938,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1111111111162',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 125,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '92.253.212.219',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '400000******0085',
        amount: 10,
        commission: 0,
        currency: 'EUR',
        createdAt: '2023-09-09T18:17:17.279Z',
        updatedAt: '2023-09-09T18:17:17.450Z',
        id: 416937,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1111111111161',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 125,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '92.253.212.219',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '400000******0085',
        amount: 10,
        commission: 0,
        currency: 'EUR',
        createdAt: '2023-09-09T18:17:02.212Z',
        updatedAt: '2023-09-09T18:17:02.599Z',
        id: 416936,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '1111111111160',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 125,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '92.253.212.219',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '400000******0085',
        amount: 10,
        commission: 25,
        currency: 'EUR',
        createdAt: '2023-09-07T17:29:43.502Z',
        updatedAt: '2023-09-07T17:29:44.248Z',
        id: 416935,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1111111111159',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [
          {
            id: '7117c7f6-210f-40fb-85d7-47b43651e686',
            bankPaymentId: '15210137',
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=AAg6AAgFhg2Fdc5f6bdcA521',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 25,
            createdAt: '2023-09-07T17:29:43.918Z',
            updatedAt: '2023-09-09T06:25:06.911Z',
            paymentId: 416935,
            ledgerId: 38,
            payMethodSettingId: 101,
            isVisitedUrl: true,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 125,
      },
      {
        bin: null,
        customerIp: '176.39.35.0',
        customerEmail: 'test@gmail.com',
        customerFirstName: 'Dima',
        customerLastName: 'Popov',
        customerPhone: '380955677835',
        cardNumber: '650000******0895',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-07T11:52:06.663Z',
        updatedAt: '2023-09-07T11:52:06.912Z',
        id: 416934,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '818223',
        status: 'processing',
        cardHolder: 'Dima Pupkin',
        transactions: [
          {
            id: 'ff839546-0c6f-489a-adeb-dc7894e86ef5',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=h5Hdb1a5e41GH0H154CEF0Ae',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-07T11:52:06.685Z',
            updatedAt: '2023-09-07T11:52:06.891Z',
            paymentId: 416934,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 133,
      },
      {
        bin: null,
        customerIp: '176.39.35.0',
        customerEmail: 'test@gmail.com',
        customerFirstName: 'Dima',
        customerLastName: 'Popov',
        customerPhone: '380955677835',
        cardNumber: '650000******0895',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-07T11:51:45.139Z',
        updatedAt: '2023-09-07T11:51:45.206Z',
        id: 416933,
        mode: 'payin',
        message: 'No payment methods available',
        orderId: '816223',
        status: 'declined',
        cardHolder: 'Dima Pupkin',
        transactions: [],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 133,
      },
      {
        bin: null,
        customerIp: '176.39.35.0',
        customerEmail: 'test@gmail.com',
        customerFirstName: 'Dima',
        customerLastName: 'Popov',
        customerPhone: '380955677835',
        cardNumber: '650000******0895',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-07T11:50:07.915Z',
        updatedAt: '2023-09-07T11:50:08.182Z',
        id: 416932,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '815223',
        status: 'processing',
        cardHolder: 'Dima Pupkin',
        transactions: [
          {
            id: 'b96c40c1-2ba5-4280-a678-3bb7cb6f431e',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=d2A47FDfDbE527B6gH7f51B4',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-07T11:50:07.939Z',
            updatedAt: '2023-09-07T11:50:08.155Z',
            paymentId: 416932,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 133,
      },
      {
        bin: null,
        customerIp: '176.39.35.0',
        customerEmail: 'test@gmail.com',
        customerFirstName: 'Dima',
        customerLastName: 'Popov',
        customerPhone: '380955677835',
        cardNumber: '650000******0895',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-07T11:42:58.322Z',
        updatedAt: '2023-09-07T11:42:58.642Z',
        id: 416931,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '812223',
        status: 'processing',
        cardHolder: 'Dima Pupkin',
        transactions: [
          {
            id: '29c95e07-a2f5-4d9b-92fa-7c30f09c3e0c',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=c334ad30fCbC4A5cCGDcFDEd',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-07T11:42:58.345Z',
            updatedAt: '2023-09-07T11:42:58.624Z',
            paymentId: 416931,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 133,
      },
      {
        bin: null,
        customerIp: '176.39.35.0',
        customerEmail: 'test@gmail.com',
        customerFirstName: 'Dima',
        customerLastName: 'Popov',
        customerPhone: '380955677835',
        cardNumber: '650000******0895',
        amount: 5,
        commission: 0,
        currency: 'USD',
        createdAt: '2023-09-07T11:37:09.465Z',
        updatedAt: '2023-09-07T11:37:09.856Z',
        id: 416930,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '81223',
        status: 'processing',
        cardHolder: 'Dima Pupkin',
        transactions: [
          {
            id: 'e6154762-f37f-403e-84f1-64c47a038bac',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=eC6d1D8H1CaBEA8B6Cha504b',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 0,
            createdAt: '2023-09-07T11:37:09.499Z',
            updatedAt: '2023-09-07T11:37:09.828Z',
            paymentId: 416930,
            ledgerId: 45,
            payMethodSettingId: 112,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 133,
          name: 'Testunlim',
          user: {
            id: 94,
            email: 'testunlim@gmail.com',
            username: 'unlim',
          },
        },
        type: 'card',
        system: '',
        apiKeyId: 133,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '92.253.212.219',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '400000******0085',
        amount: 10,
        commission: 25,
        currency: 'EUR',
        createdAt: '2023-09-05T17:21:22.423Z',
        updatedAt: '2023-09-05T17:21:22.927Z',
        id: 416929,
        mode: 'payin',
        message: 'Payment processing',
        orderId: '1111111111158',
        status: 'processing',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [
          {
            id: 'f28e791b-dcaf-4fcc-8838-375f4afb485a',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=F56H4A044d6HF4Gadcf5E22f',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 25,
            createdAt: '2023-09-05T17:21:22.605Z',
            updatedAt: '2023-09-05T17:21:22.884Z',
            paymentId: 416929,
            ledgerId: 38,
            payMethodSettingId: 101,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
          {
            id: 'f28e791b-dcaf-4fcc-8838-375f4afb485a',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=F56H4A044d6HF4Gadcf5E22f',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 25,
            createdAt: '2023-09-05T17:21:22.605Z',
            updatedAt: '2023-09-05T17:21:22.884Z',
            paymentId: 416929,
            ledgerId: 38,
            payMethodSettingId: 101,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
          {
            id: 'f28e791b-dcaf-4fcc-8838-375f4afb485a',
            bankPaymentId: null,
            bankRedirectUrl:
              'https://sandbox.cardpay.com/MI/payment.html?uuid=F56H4A044d6HF4Gadcf5E22f',
            bankRedirectHtml: null,
            bankCommission: 12,
            status: 'processing',
            message: 'Payment processing',
            commission: 25,
            createdAt: '2023-09-05T17:21:22.605Z',
            updatedAt: '2023-09-05T17:21:22.884Z',
            paymentId: 416929,
            ledgerId: 38,
            payMethodSettingId: 101,
            isVisitedUrl: false,
            rate: null,
            rateWithCommission: null,
            originalBanksMessage: '',
            paymentMethod: {
              paymentMethod: {
                bank: {
                  name: 'Unliminted',
                },
              },
            },
          },
        ],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 125,
      },
      {
        bin: null,
        customerIp: '92.253.212.219',
        customerEmail: 'insan1y.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '555555******4444',
        amount: 10,
        commission: null,
        currency: 'EUR',
        createdAt: '2023-09-05T17:20:58.077Z',
        updatedAt: '2023-09-05T17:20:58.090Z',
        id: 416928,
        mode: 'payin',
        message: 'User blocked',
        orderId: '1111111111157',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'MasterCard',
        apiKeyId: 125,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '92.253.212.219',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '400000******0085',
        amount: 10,
        commission: null,
        currency: 'EUR',
        createdAt: '2023-09-05T17:20:39.285Z',
        updatedAt: '2023-09-05T17:20:39.301Z',
        id: 416927,
        mode: 'payin',
        message: 'User blocked',
        orderId: '1111111111156',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 125,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '92.253.212.219',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '400000******0085',
        amount: 10,
        commission: null,
        currency: 'EUR',
        createdAt: '2023-09-05T17:20:14.184Z',
        updatedAt: '2023-09-05T17:20:14.199Z',
        id: 416926,
        mode: 'payin',
        message: 'User blocked',
        orderId: '1111111111155',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 125,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '92.253.212.219',
        customerEmail: 'insany2.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '400000******0085',
        amount: 10,
        commission: null,
        currency: 'EUR',
        createdAt: '2023-09-05T17:19:48.584Z',
        updatedAt: '2023-09-05T17:19:48.601Z',
        id: 416925,
        mode: 'payin',
        message: 'User blocked',
        orderId: '1111111111153',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 125,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '92.253.212.219',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '400000******0085',
        amount: 10,
        commission: null,
        currency: 'EUR',
        createdAt: '2023-09-05T17:19:39.849Z',
        updatedAt: '2023-09-05T17:19:39.865Z',
        id: 416924,
        mode: 'payin',
        message: 'User blocked',
        orderId: '1111111111152',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 125,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '92.253.212.219',
        customerEmail: 'insan2y.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '400000******0085',
        amount: 10,
        commission: null,
        currency: 'EUR',
        createdAt: '2023-09-05T17:18:58.466Z',
        updatedAt: '2023-09-05T17:18:58.483Z',
        id: 416923,
        mode: 'payin',
        message: 'User blocked',
        orderId: '1111111111150',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 125,
      },
      {
        bin: {
          id: 5,
          bin: '40000000',
          brand: 'Visa',
          country: 'US',
          issuer: 'Intl Hdqtrs-Center Owned',
          createdAt: '2023-07-20T15:59:17.683Z',
          updatedAt: '2023-07-20T15:59:17.683Z',
        },
        customerIp: '92.253.212.219',
        customerEmail: 'insany.m@gmail.com',
        customerFirstName: 'Yevhenii',
        customerLastName: 'Lavro',
        customerPhone: '+380667675808',
        cardNumber: '400000******0085',
        amount: 10,
        commission: null,
        currency: 'EUR',
        createdAt: '2023-09-05T17:18:05.645Z',
        updatedAt: '2023-09-05T17:18:05.671Z',
        id: 416922,
        mode: 'payin',
        message: 'User blocked',
        orderId: '1111111111143',
        status: 'declined',
        cardHolder: 'Yevhenii Lavro J',
        transactions: [],
        apiKey: {
          id: 125,
          name: 'yy_key',
          user: {
            id: 86,
            email: 'yy@gmail.com',
            username: 'yy',
          },
        },
        type: 'card',
        system: 'Visa',
        apiKeyId: 125,
      },
    ],
    totalCount: 68,
  };

  //=================================
  //=================================
  const index = 1;

  const handleExpandRow = (index) => {
    setIsAdditDataOpen((prev) => !prev);
    setIsDetailsOpen(false);

    setSelectedIndex(index);
  };

  const flatListRenderModule = (item) => (
    <>
      <TouchableOpacity activeOpacity={0.5} onPress={() => handleExpandRow(item.id)}>
        <View
          style={{
            ...styles.tableRow,
            flexDirection: 'row',
            borderBottomWidth: 1,
            alignItems: 'center',
            borderBottomColor: 'rgba(217, 217, 217, 0.70)',
            backgroundColor: index % 2 !== 0 ? '#FAFAFA' : '#fff',
          }}
        >
          <View style={{ width: 20 }}>
            <Image
              source={isAdditDataOpen && selectedIndex === item.id ? arrowUp : arrowDown}
              style={{ width: 20, height: 20 }}
            />
          </View>
          <View style={{ ...styles.tableCell, width: width / 6 }}>
            <SimpleText>{item.id}</SimpleText>
          </View>
          <View style={{ ...styles.tableCell, width: width / 4 }}>
            <SimpleText>{item.amount}</SimpleText>
          </View>
          <View style={{ ...styles.tableCell, width: width / 6 }}>
            <SimpleText>{item.mode}</SimpleText>
          </View>
          <View
            style={{
              ...styles.tableCellStatus,
              // width: width / 4,
              backgroundColor:
                item.status === 'approved'
                  ? '#D2FFA4'
                  : item.status === 'declined'
                  ? '#FFCCCC'
                  : '#FDFF96',
            }}
          >
            <SimpleText>{item.status}</SimpleText>
          </View>
        </View>
        {isAdditDataOpen && selectedIndex === item.id && (
          <View style={styles.additDataHeader}>
            <Image source={arrowUp} style={{ width: 32, height: 32 }} />
          </View>
        )}
      </TouchableOpacity>
      {isAdditDataOpen && selectedIndex === item.id && (
        <View
          style={{
            ...styles.tableRow,
            flexDirection: 'row',
            borderBottomWidth: 1,
            alignItems: 'center',
            borderBottomColor: 'rgba(217, 217, 217, 0.70)',
          }}
        >
          <View style={{ ...styles.tableCell, width: width / 3, paddingVertical: 0 }}>
            <View style={styles.additDataCell}>
              <SimpleText>ID</SimpleText>
            </View>
            <View style={styles.additDataCell}>
              <SimpleText>Merchant Order ID</SimpleText>
            </View>
            <View style={styles.additDataCell}>
              <SimpleText>Date</SimpleText>
            </View>
            <View style={styles.additDataCell}>
              <SimpleText>API Key name</SimpleText>
            </View>
            <View style={styles.additDataCell}>
              <SimpleText>Mode</SimpleText>
            </View>
            <View style={styles.additDataCell}>
              <SimpleText>Description</SimpleText>
            </View>
            <View style={styles.additDataCell}>
              <SimpleText>Status</SimpleText>
            </View>
            <View style={styles.additDataCell}>
              <SimpleText>Amount</SimpleText>
            </View>
            {item.transactions.length > 0 && !isDetailsOpen && (
              <View style={styles.additDataCell}>
                <SimpleText>Details</SimpleText>
              </View>
            )}
          </View>
          <View
            style={{
              ...styles.tableCellStatus,
              paddingVertical: 0,
            }}
          >
            <View style={styles.additDataCellValues}>
              <SimpleText>{item.id}</SimpleText>
            </View>
            <View style={styles.additDataCellValues}>
              <SimpleText>{item.orderId}</SimpleText>
            </View>
            <View style={styles.additDataCellValues}>
              <SimpleText>{item.updatedAt}</SimpleText>
            </View>
            <View style={styles.additDataCellValues}>
              <SimpleText>{item.apiKey.name}</SimpleText>
            </View>
            <View style={styles.additDataCellValues}>
              <SimpleText>{item.mode}</SimpleText>
            </View>
            <View style={styles.additDataCellValues}>
              <SimpleText>{item.message}</SimpleText>
            </View>
            <View
              style={{
                ...styles.additDataCellValues,
                backgroundColor:
                  item.status === 'approved'
                    ? '#D2FFA4'
                    : item.status === 'declined'
                    ? '#FFCCCC'
                    : '#FDFF96',
              }}
            >
              <SimpleText>{item.status}</SimpleText>
            </View>
            <View style={styles.additDataCellValues}>
              <SimpleText>{`${item.amount} ${item.currency}`}</SimpleText>
            </View>
            {item.transactions.length > 0 && !isDetailsOpen && (
              <TouchableOpacity activeOpacity={0.5} onPress={() => setIsDetailsOpen(true)}>
                <View style={{ ...styles.additDataCellValues, alignItems: 'center' }}>
                  <SimpleText style={{ fontSize: 25 }}>+</SimpleText>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
      {item.transactions.length > 0 &&
        isDetailsOpen &&
        isAdditDataOpen &&
        item.id === selectedIndex && (
          <TouchableOpacity activeOpacity={0.5} onPress={() => setIsDetailsOpen((prev) => !prev)}>
            <View style={styles.additDataHeader}>
              <Image source={close} style={{ width: 32, height: 32 }} />
            </View>
          </TouchableOpacity>
        )}

      {isDetailsOpen &&
        item.id === selectedIndex &&
        item.transactions.map((transaction, index) => (
          <View
            key={index}
            style={{
              ...styles.tableRow,
              flexDirection: 'row',
              borderBottomWidth: 1,
              alignItems: 'center',
              borderBottomColor: 'rgba(217, 217, 217, 0.70)',
              marginVertical: 5,
            }}
          >
            <View style={{ ...styles.tableCell, width: width / 3, paddingVertical: 0 }}>
              <View style={styles.additDataCell}>
                <SimpleText>ID</SimpleText>
              </View>
              <View style={styles.additDataCell}>
                <SimpleText>Bank Payment ID</SimpleText>
              </View>
              <View style={styles.additDataCell}>
                <SimpleText>Bank</SimpleText>
              </View>
              <View style={styles.additDataCell}>
                <SimpleText>Date</SimpleText>
              </View>
              <View style={styles.additDataCell}>
                <SimpleText>Message</SimpleText>
              </View>
              <View style={styles.additDataCell}>
                <SimpleText>Visit 3DS</SimpleText>
              </View>
              <View style={styles.additDataCell}>
                <SimpleText>Status</SimpleText>
              </View>
            </View>
            <View
              style={{
                ...styles.tableCellStatus,
                paddingVertical: 0,
              }}
            >
              <View style={styles.additDataCellValues}>
                <SimpleText>{transaction.id}</SimpleText>
              </View>
              <View style={styles.additDataCellValues}>
                <SimpleText>{transaction.bankPaymentId}</SimpleText>
              </View>
              <View style={styles.additDataCellValues}>
                <SimpleText>{transaction.paymentMethod.paymentMethod.bank.name}</SimpleText>
              </View>
              <View style={styles.additDataCellValues}>
                <SimpleText>{transaction.updatedAt}</SimpleText>
              </View>
              <View style={styles.additDataCellValues}>
                <SimpleText>{transaction.message}</SimpleText>
              </View>
              <View style={styles.additDataCellValues}>
                <SimpleText>{transaction.isVisitedUrl ? 'Yes' : 'No'}</SimpleText>
              </View>
              <View
                style={{
                  ...styles.additDataCellValues,
                  backgroundColor:
                    transaction.status === 'approved'
                      ? '#D2FFA4'
                      : transaction.status === 'declined'
                      ? '#FFCCCC'
                      : '#FDFF96',
                }}
              >
                <SimpleText>{transaction.status}</SimpleText>
              </View>
            </View>
          </View>
        ))}
    </>
  );

  return (
    // <ScrollView>

    <View style={styles.wrapper}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 28,
        }}
      >
        <SimpleText>Filters</SimpleText>
        <Image source={arrowDown} style={{ width: 20, height: 20 }} />
      </View>
      <View
        style={{
          ...styles.tableRow,
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(217, 217, 217, 0.70)',
          backgroundColor: '#F4F4F4',
        }}
      >
        <View style={{ width: 20 }}></View>
        <View style={{ ...styles.tableCell, width: width / 6 }}>
          <SimpleText style={styles.headerText}>
            <FormattedMessage id={'transactions.int_id'} />
          </SimpleText>
        </View>
        <View style={{ ...styles.tableCell, width: width / 4 }}>
          <SimpleText style={styles.headerText}>
            <FormattedMessage id={'transactions.amount'} />
          </SimpleText>
        </View>
        <View style={{ ...styles.tableCell, width: width / 6 }}>
          <SimpleText style={styles.headerText}>
            <FormattedMessage id={'transactions.mode'} />
          </SimpleText>
        </View>
        <View style={{ ...styles.tableCellStatus }}>
          <SimpleText style={styles.headerText}>
            <FormattedMessage id={'transactions.status'} />
          </SimpleText>
        </View>
      </View>
      <FlatList
        data={transactionsData.items}
        renderItem={({ item }) => flatListRenderModule(item)}
      />
      {/* {transactionsData &&
          transactionsData.items.map((value, index) => (
            <>
              <TouchableOpacity
                activeOpacity={0.5}
                key={index}
                onPress={() => handleExpandRow(index)}
              >
                <View
                  key={index}
                  style={{
                    ...styles.tableRow,
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    alignItems: 'center',
                    borderBottomColor: 'rgba(217, 217, 217, 0.70)',
                    backgroundColor: index % 2 !== 0 ? '#FAFAFA' : '#fff',
                  }}
                >
                  <View style={{ width: 20 }}>
                    <Image
                      source={isAdditDataOpen && selectedIndex === index ? arrowUp : arrowDown}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>
                  <View style={{ ...styles.tableCell, width: width / 6 }}>
                    <SimpleText>{value.id}</SimpleText>
                  </View>
                  <View style={{ ...styles.tableCell, width: width / 4 }}>
                    <SimpleText>{value.amount}</SimpleText>
                  </View>
                  <View style={{ ...styles.tableCell, width: width / 6 }}>
                    <SimpleText>{value.mode}</SimpleText>
                  </View>
                  <View
                    style={{
                      ...styles.tableCellStatus,
                      // width: width / 4,
                      backgroundColor:
                        value.status === 'approved'
                          ? '#D2FFA4'
                          : value.status === 'declined'
                          ? '#FFCCCC'
                          : '#FDFF96',
                    }}
                  >
                    <SimpleText>{value.status}</SimpleText>
                  </View>
                </View>
                {isAdditDataOpen && selectedIndex === index && (
                  <View style={styles.additDataHeader}>
                    <Image source={arrowUp} style={{ width: 32, height: 32 }} />
                  </View>
                )}
              </TouchableOpacity>
              {isAdditDataOpen && selectedIndex === index && (
                <View
                  style={{
                    ...styles.tableRow,
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    alignItems: 'center',
                    borderBottomColor: 'rgba(217, 217, 217, 0.70)',
                  }}
                >
                  <View style={{ ...styles.tableCell, width: width / 3, paddingVertical: 0 }}>
                    <View style={styles.additDataCell}>
                      <SimpleText>ID</SimpleText>
                    </View>
                    <View style={styles.additDataCell}>
                      <SimpleText>Merchant Order ID</SimpleText>
                    </View>
                    <View style={styles.additDataCell}>
                      <SimpleText>Date</SimpleText>
                    </View>
                    <View style={styles.additDataCell}>
                      <SimpleText>API Key name</SimpleText>
                    </View>
                    <View style={styles.additDataCell}>
                      <SimpleText>Mode</SimpleText>
                    </View>
                    <View style={styles.additDataCell}>
                      <SimpleText>Description</SimpleText>
                    </View>
                    <View style={styles.additDataCell}>
                      <SimpleText>Status</SimpleText>
                    </View>
                    <View style={styles.additDataCell}>
                      <SimpleText>Amount</SimpleText>
                    </View>
                    {value.transactions.length > 0 && !isDetailsOpen && (
                      <View style={styles.additDataCell}>
                        <SimpleText>Details</SimpleText>
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      ...styles.tableCellStatus,
                      paddingVertical: 0,
                    }}
                  >
                    <View style={styles.additDataCellValues}>
                      <SimpleText>{value.id}</SimpleText>
                    </View>
                    <View style={styles.additDataCellValues}>
                      <SimpleText>{value.orderId}</SimpleText>
                    </View>
                    <View style={styles.additDataCellValues}>
                      <SimpleText>{value.updatedAt}</SimpleText>
                    </View>
                    <View style={styles.additDataCellValues}>
                      <SimpleText>{value.apiKey.name}</SimpleText>
                    </View>
                    <View style={styles.additDataCellValues}>
                      <SimpleText>{value.mode}</SimpleText>
                    </View>
                    <View style={styles.additDataCellValues}>
                      <SimpleText>{value.message}</SimpleText>
                    </View>
                    <View
                      style={{
                        ...styles.additDataCellValues,
                        backgroundColor:
                          value.status === 'approved'
                            ? '#D2FFA4'
                            : value.status === 'declined'
                            ? '#FFCCCC'
                            : '#FDFF96',
                      }}
                    >
                      <SimpleText>{value.status}</SimpleText>
                    </View>
                    <View style={styles.additDataCellValues}>
                      <SimpleText>{`${value.amount} ${value.currency}`}</SimpleText>
                    </View>
                    {value.transactions.length > 0 && !isDetailsOpen && (
                      <TouchableOpacity activeOpacity={0.5} onPress={() => setIsDetailsOpen(true)}>
                        <View style={{ ...styles.additDataCellValues, alignItems: 'center' }}>
                          <SimpleText style={{ fontSize: 25 }}>+</SimpleText>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
              {value.transactions.length > 0 &&
                isDetailsOpen &&
                isAdditDataOpen &&
                index === selectedIndex && (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => setIsDetailsOpen((prev) => !prev)}
                  >
                    <View style={styles.additDataHeader}>
                      <Image source={close} style={{ width: 32, height: 32 }} />
                    </View>
                  </TouchableOpacity>
                )}

              {isDetailsOpen &&
                index === selectedIndex &&
                value.transactions.map((transaction) => (
                  <View
                    key={index * 1000}
                    style={{
                      ...styles.tableRow,
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                      alignItems: 'center',
                      borderBottomColor: 'rgba(217, 217, 217, 0.70)',
                      marginVertical: 5,
                    }}
                  >
                    <View style={{ ...styles.tableCell, width: width / 3, paddingVertical: 0 }}>
                      <View style={styles.additDataCell}>
                        <SimpleText>ID</SimpleText>
                      </View>
                      <View style={styles.additDataCell}>
                        <SimpleText>Bank Payment ID</SimpleText>
                      </View>
                      <View style={styles.additDataCell}>
                        <SimpleText>Bank</SimpleText>
                      </View>
                      <View style={styles.additDataCell}>
                        <SimpleText>Date</SimpleText>
                      </View>
                      <View style={styles.additDataCell}>
                        <SimpleText>Message</SimpleText>
                      </View>
                      <View style={styles.additDataCell}>
                        <SimpleText>Visit 3DS</SimpleText>
                      </View>
                      <View style={styles.additDataCell}>
                        <SimpleText>Status</SimpleText>
                      </View>
                    </View>
                    <View
                      style={{
                        ...styles.tableCellStatus,
                        paddingVertical: 0,
                      }}
                    >
                      <View style={styles.additDataCellValues}>
                        <SimpleText>{transaction.id}</SimpleText>
                      </View>
                      <View style={styles.additDataCellValues}>
                        <SimpleText>{transaction.bankPaymentId}</SimpleText>
                      </View>
                      <View style={styles.additDataCellValues}>
                        <SimpleText>{transaction.paymentMethod.paymentMethod.bank.name}</SimpleText>
                      </View>
                      <View style={styles.additDataCellValues}>
                        <SimpleText>{transaction.updatedAt}</SimpleText>
                      </View>
                      <View style={styles.additDataCellValues}>
                        <SimpleText>{transaction.message}</SimpleText>
                      </View>
                      <View style={styles.additDataCellValues}>
                        <SimpleText>{transaction.isVisitedUrl ? 'Yes' : 'No'}</SimpleText>
                      </View>
                      <View
                        style={{
                          ...styles.additDataCellValues,
                          backgroundColor:
                            transaction.status === 'approved'
                              ? '#D2FFA4'
                              : transaction.status === 'declined'
                              ? '#FFCCCC'
                              : '#FDFF96',
                        }}
                      >
                        <SimpleText>{transaction.status}</SimpleText>
                      </View>
                    </View>
                  </View>
                ))}
            </> //====renderItemEnd===
          ))} */}
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerText: { fontFamily: 'Mont_SB' },
  tableRow: { paddingLeft: 14 },
  tableCell: { paddingVertical: 15, paddingHorizontal: 5 },
  tableCellStatus: { flex: 1, paddingVertical: 15, paddingLeft: 15 },
  additDataCell: {
    height: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  additDataCellValues: {
    height: 40,
    paddingLeft: 23,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderBottomColor: 'rgba(217, 217, 217, 0.40);',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  additDataHeader: {
    height: 40,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionsScreen;
