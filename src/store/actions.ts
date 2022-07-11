// action - account reducer
export const LOGIN = 'LOGIN'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGOUT = 'LOGOUT'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const ACCOUNT_INITIALIZE = 'ACCOUNT_INITIALIZE'
export const FIREBASE_STATE_CHANGED = 'FIREBASE_STATE_CHANGED'

// action - customization reducer
export const SET_MENU = '@customization/SET_MENU'
export const MENU_TOGGLE = '@customization/MENU_TOGGLE'
export const MENU_OPEN = '@customization/MENU_OPEN'
export const MENU_TYPE = '@customization/MENU_TYPE'
export const PRESET_COLORS = '@customization/PRESET_COLORS'
export const THEME_LOCALE = '@customization/THEME_LOCALE'
export const THEME_RTL = '@customization/THEME_RTL'
export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY'
export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS'
export const SET_OUTLINED_FILLED = '@customization/SET_OUTLINED_FILLED'

// action - snackbar
export const SNACKBAR_OPEN = '@snackbar/SNACKBAR_OPEN'

// action - cart
export const ADD_PRODUCTS = '@cart/ADD_PRODUCTS'
export const REMOVE_PRODUCT = '@cart/REMOVE_PRODUCT'
export const UPDATE_QUANTITY = '@cart/UPDATE_QUANTITY'
export const NEXT_STEP = '@cart/NEXT_STEP'
export const BACK_STEP = '@cart/BACK_STEP'
export const SET_STEP = '@cart/SET_STEP'
export const SET_BILLING_ADDRESS = '@cart/SET_BILLING_ADDRESS'
export const SET_DISCOUNT = '@cart/SET_DISCOUNT'
export const SET_SHIPPING_CHARGE = '@cart/SET_SHIPPING_CHARGE'
export const SET_PAYMENT_METHOD = '@cart/SET_PAYMENT_METHOD'
export const SET_PAYMENT_CARD = '@cart/SET_PAYMENT_CARD'
export const RESET_CART = '@cart/RESET_CART'

// action - operating companies

export const LIST_OPERATING_COMPANIES = 'LIST_OPERATING_COMPANIES'
export const ADD_OPERATING_COMPANY = 'ADD_OPERATING_COMPANY'
export const UPDATE_OPERATING_COMPANY = 'UPDATE_OPERATING_COMPANY'

//action - stops and zones
export const LIST_STOPS_ZONES = 'LIST_STOPS_ZONES'
export const ADD_STOP_ZONE = 'ADD_STOP_ZONE'
export const UPDATE_STOP_ZONE = 'UPDATE_STOP_ZONE'
export const DELETE_STOP_ZONE = 'DELETE_STOP_ZONE'

// action - users

export const LIST_USERS = 'LIST_USERS'
export const GET_USERS = 'GET_USERS'
export const ADD_USER = 'ADD_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const ROLE_USER = 'ROLE_USER'

//action - fleets

export const LIST_FLEET_COMPANY = 'LIST_FLEET_COMPANY'
export const ADD_FLEET_COMPANY = 'ADD_FLEET_COMPANY'
export const UPDATE_FLEET_COMPANY = 'UPDATE_FLEET_COMPANY'

// bancks - list banks
export const LIST_BANKS = 'LIST_BANKS'

//action - fleets

export const LIST_CARDS = 'LIST_CARDS'
export const ADD_CARDS = 'ADD_CARDS'
export const UPDATE_CARDS = 'UPDATE_CARDS'

// action - Types Company
export const LIST_TYPES_COMPANY = 'LIST_TYPES_COMPANY'

// action -  account types
export const LIST_ACCOUNT_TYPES = 'LIST_ACCOUNT_TYPES'

// action - state
export const LIST_STATE = 'LIST_STATE'

// action - cities
export const LIST_CITIES = 'LIST_CITIES'

// action - fuel types

export const LIST_FUEL_TYPES = 'LIST_FUEL_TYPES'

// action - roles
export const LIST_ROLES = 'LIST_ROLES'

//action - report sales
export const LIST_SALES_REPORT = 'LIST_SALES_REPORT'

// action - transport means
export const LIST_TRANSPORT_MEANS = 'LIST_TRANSPORT_MEANS'

// action - authorized routes
export const LIST_AUTHORIZED_ROUTES = 'LIST_AUTHORIZED_ROUTES'
export const ADD_AUTHORIZED_ROUTES = 'ADD_AUTHORIZED_ROUTES'
export const UPDATE_AUTHORIZED_ROUTES = 'UPDATE_AUTHORIZED_ROUTES'

//action - tariff management
export const LIST_TARIFF = 'LIST_TARIFF'
export const ADD_TARIFF = 'ADD_TARIFF'
export const UPDATE_TARIFF = 'UPDATE_TARIFF'
export const DELETE_FARE = 'DELETE_FARE'

//action -weekDays
export const LIST_DAYS = 'LIST_DAYS'

//action - user profile

export const LIST_PROFILE = 'LIST_PROFILE'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'

export const LIST_CONSOLIDATED_COMPANIES = 'LIST_CONSOLIDATED_COMPANIES'
export const LIST_DETAILS_OPERATORS = 'LIST_DETAILS_OPERATORS'
export const LIST_DETAILS_LOCATIONS = 'LIST_DETAILS_LOCATIONS'
export const LIST_DETAILS_TYPE_EQUIPMENT = 'LIST_DETAILS_TYPE_EQUIPMENT'

//action - node active
export const LIST_NODES = 'LIST_NODES'
export const ADD_NODES = 'ADD_NODES'
export const UPDATE_NODES = 'UPDATE_NODES'

//action - node type
export const LIST_NODE_TYPE = 'LIST_NODE_TYPE'

//action - lane actions
export const LIST_LANES = 'LIST_LANES'
export const LIST_STATE_LANES = 'LIST_STATE_LANES'
export const ADD_LANES = 'ADD_LANES'
export const UPDATE_LANES = 'UPDATE_LANES'
export const DELETE_LANES = 'DELETE_LANES'

//action - sale tag
export const LIST_TAG = 'LIST_TAG'
export const GET_TAG = 'GET_TAG'
export const ADD_TAG = 'ADD_TAG'
export const UPDATE_TAG = 'UPDATE_TAG'
export const DELETE_TAG = 'DELETE_TAG'

//action - one toll
export const LIST_TOLL = 'LIST_TOLL'

//action - employees
export const LIST_EMPLOYEES = 'LIST_EMPLOYEES'
export const ADD_EMPLOYEES = 'ADD_EMPLOYEES'
export const UPDATE_EMPLOYEES = 'UPDATE_EMPLOYEES'
export const DELETE_EMPLOYEES = 'DELETE_EMPLOYEES'

//action - gestion de cuentas - registered vehicle
export const LIST_ACCOUNT = 'LIST_ACCOUNT'
export const ADD_ACCOUNTS = 'ADD_ACCOUNTS'
export const UPDATE_ACCOUNTS = 'UPDATE_ACCOUNTS'
export const DELETE_ACCOUNT_HOLDER = 'DELETE_ACCOUNT_HOLDER'
export const ADD_ACCOUNT = 'ADD_ACCOUNT'
export const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT'
//action - tipos de vehiculo
export const LIST_VEHICLE_TYPE = 'LIST_VEHICLE_TYPE'

//action - gestion de categoria
export const LIST_CATEGORY = 'LIST_CATEGORY'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'

//action - reporte de recaudacion
export const LIST_TAKING = 'LIST_TAKING'

//action - equipos
export const LIST_EQUIP = 'LIST_EQUIP'
export const ADD_EQUIP = 'ADD_EQUIP'
export const UPDATE_EQUIP = 'UPDATE_EQUIP'
export const DELETE_EQUIP = 'DELETE_EQUIP'

// action - estados
export const LIST_STATES = 'LIST_STATES'

//action- reporte turnos de trabajo
export const LIST_WORK_REPORT = 'LIST_WORK_REPORT'

//action - reporte de transitos
export const LIST_TRANSIT_REPORT = 'LIST_TRANSIT_REPORT'

//action - gestion de cuentas de usuarios
export const LIST_ACCOUNT_HOLDER = 'LIST_ACCOUNT_HOLDER'
export const ADD_ACCOUNT_HOLDER = 'ADD_ACCOUNT_HOLDER'
export const UPDATE_ACCOUNT_HOLDER = 'UPDATE_ACCOUNT_HOLDER'

//action - todas las tarifas del peaje
export const LIST_ALL_FARES = 'LIST_ALL_FARES'

//action - reportes de consolidados
export const LIST_CONSOLIDATE_GENERIC = 'LIST_CONSOLIDATE_GENERIC'

//action - exportar excel reportes
export const LIST_EXCEL = 'LIST_EXCEL'

//action - monitorizacion
export const LIST_MONITORING = 'LIST_MONITORING'

//action - reportes de analítica
export const LIST_ANALYTICS_REPORT = 'LIST_ANALYTICS_REPORT'
//action - exportar pdf reportes
export const LIST_PDF = 'LIST_PDF'

//action - state de reducer
export const LIST_STATE_REPORT = 'LIST_STATE_REPORT'
