const lang = {
  // ================ Authorization Screen =================

  'common.sign_in': 'Sign In',
  'common.log_out_title': 'Are you sure?',
  'common.log_out_btn_confirm': 'Log out',
  'common.log_out_btn_cancel': 'Cancel',
  'common.remember_me': 'Remember me',
  'common.sign_up': 'Sign Up',

  // ================ Secure Screen ===================
  'secure.title_enter': 'Please enter your PIN code',
  'secure_create.title_enter': 'Please create your PIN code',
  'secure_confirm.title_enter': 'Confirm your PIN code',

  //===dashboard===
  'dashboard.all_balances': 'All Balances',
  'dashboard.banks': 'Banks',
  'dashboard.bank_conversion': 'Bank conversion',
  'dashboard.declined': 'Declined',
  'dashboard.approved': 'Approved',
  'dashboard.generate_report': 'Generate report',
  'dashboard.report_options': 'Report options',
  'dashboard.start_date': 'Start date',
  'dashboard.end_date': 'End date',
  'dashboard.download': 'Download',
  'dashboard.calendar': 'Calendar',
  'dashboard.timezone': 'Timezone',
  'dashboard.merchants': 'Merchants',
  'dashboard.merchants_api_key': 'Merchant’s api key',
  'dashboard.status': 'Status',
  'dashboard.filters_columns': 'Filters columns',
  'dashboard.reset': 'Reset',
  'dashboard.no_transactions': 'No transactions for this date',
  'dashboard.conversion.last_days': 'Conversion last days',
  'dashboard.max_days': 'Max 5 days',
  'dashboard.grouping_type': 'Grouping type',
  'dashboard.client.balance_history': 'Balance history',
  'dashboard.report_create_warning': '*Up to 90 days tx history available for download',

  //===transactions===
  'transactions.transactions': 'Transactions',
  'transactions.int_id': 'Int.ID',
  'transactions.amount': 'Amount',
  'transactions.mode': 'Mode',
  'transactions.status': 'Status',

  'transactions.cardholder_data': 'Cardholder data',
  'transactions.card.number': 'Card number',
  'transactions.card.card_holder': 'Card holder',
  'transactions.customer.first_name': 'Customer first name',
  'transactions.customer.last_name': 'Customer last name',
  'transactions.customer.email': 'Customer email',
  'transactions.customer.phone': 'Customer phone',
  'transactions.card.bin': 'Card bin',
  'transactions.card.brand': 'Card brand',
  'transactions.card.country': 'Card country',
  'transactions.card.issuer': 'Card issuer',

  'transactions.merchant_order_id': 'Merchant Order ID',
  'transactions.api_key_name': 'API Key name',
  'transactions.bank_payment_id': 'Bank Payment ID',
  'transactions.visit_3DS': 'Visit 3DS',
  'transactions.details_payment': 'Details payment',
  'transactions.not_found': 'Transaction not found',

  //filters====
  'filters.date': 'calendar',
  'filters.banks': 'banks',
  'filters.merchants': 'merchants',
  'filters.status': 'status',
  'filters.gmt': 'gmt',
  'filters.key': 'Merchant`s api key',
  'filters.user_key': 'api key',
  'filters.currency': 'currency',
  'filters.mode': 'mode',

  //API=======
  'api.api_keys': 'API keys',
  'api.api_key': 'API key',
  'api.api_key_name': 'API Key name',
  'api.new_api_key': 'new API Key',
  'api.edit_api': 'Edit API Key name',
  'api.api_product': 'Product',
  'api.api_info': 'API Info',
  'api.api_status': 'Status',
  'api.api_id': 'Id',
  'api.api_site_url': 'Website URL',
  'api.api_dallback_url': 'Callback URL',
  'api.api_secret': 'API Secret',

  //users=====
  'users.reg_date': 'Reg. Date',
  'users.ledgers': 'Ledgers',
  'users.ledger': 'Ledger',
  'users.new_user': 'new user',
  'users.edit_user': 'Edit user',
  'users.add_new_user': 'Add new user',
  'users.personal_info': 'Personal information',
  'users.ledgers_not_found': 'Ledgers not found',
  'users.payments_settings': 'Payments settings',
  'users.settings_not_found': 'Settings not found',
  'users.chains': 'Chains',
  'users.use_balancer': 'Use balancer',
  'users.validation_error': 'Validation failed (numeric string is expected)',
  'users.ledger_name': 'Ledger name',
  'users.add_new_ledger': 'Add new Ledger',
  'users.add_new_payments_settings': 'Add new Payments Settings',

  'users.payin': 'PayIn',
  'users.payout': 'PayOut',

  'users.payment_method_name': 'Payment method name',
  'users.payment_method': 'Payment method',
  'users.bank_name': 'Bank name',
  'users.setting_name': 'Setting name',
  'users.net_price': 'Net price',
  'users.fixed_net_price': 'Fixed net price',
  'users.min_amount': 'Min amount',
  'users.max_amount': 'Max amount',
  'users.min_commission': 'Min commission',
  'users.limit': 'Limit',
  'users.rate_commission': 'Rate commission',
  'users.restricted_countries': 'Restricted countries',
  'users.restricted_brands': 'Restricted brands',
  'users.current_chains': ' Current chains :',
  'users.use_whitelist': 'Use whitelist',
  'users.min_confirmation': 'Min confirmation',
  'users.setting_name': 'Setting name',
  'users.addit_setting_mastercard': 'Additional settings for MasterCard',
  'users.addit_setting_visa': 'Additional settings for Visa',
  'users.currentChains': 'Current chains',

  //balance=====
  'balance.history': 'History balance merchant',

  //errors=====
  'errors.required_field': 'required field',
  'errors.invalid_data': 'invalid data',
  'errors.email_not_valid': 'email must be an email',
  'errors.401': 'Session time has expired, log in again please.',
  'errors.500':
    'Service is unavailable. The server is temporarily unable to process your request, please try again later.',

  //actions=====

  'actions.to_login': 'To Login',
  'actions.to_main': 'To Main',
  'errors.date_interval': '*Max 5 days allowed',

  //common=====
  'common.date': 'Date',
  'common.email': 'email',
  'common.e_mail': 'E-Mail',
  'common.user_name': 'User name',
  'common.password': 'Password',
  'common.description': 'Description',
  'common.details': 'Details',
  'common.bank': 'Bank',
  'common.message': 'Message',
  'common.filters': 'Filters',
  'common.user': 'User',
  'common.users': 'Users',
  'common.edit': 'Edit',
  'common.del': 'Del',
  'common.delete': 'Delete',
  'common.create': 'Create',
  'common.delete_confirm': 'Are you sure  want delete?',
  'common.reset': 'Reset',
  'common.data_not_found': 'Data not found',
  'common.role': 'Role',
  'common.merchant': 'Merchant',
  'common.support': 'Support',
  'common.admin': 'Admin',
  'common.balance': 'Balance',
  'common.add': 'Add',
  'common.currency': 'Currency',
  'common.payments': 'payments',
  'common.empty': 'Empty',
  'common.active': 'Active',
  'common.chance': 'Chance',
  'common.type': 'Type',
  'common.upload': 'Upload',

  //chart=====
  'chart.approved_total': 'Approved total:',
  'chart.declined_total': 'Declined total:',
  'chart.processing_total': 'Processing total:',
  'chart.approved': 'approved',
  'chart.declined': 'declined',
  'chart.processing': 'processing',
};

// <FormattedMessage id={'dashboard.report_options'} />
// import { FormattedMessage } from 'react-intl';

export default lang;
