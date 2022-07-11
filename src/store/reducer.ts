import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// reducer import
import customizationReducer from './customizationReducer'
import snackbarReducer from './snackbarReducer'
import cartReducer from './cartReducer'
import loginReducer from './login/loginReducer'
import tollsReducer from './tolls/tollsReducer'
import laneReducer from './lane/laneReducer'
import saleTagReducer from './saleTag/saleTagReducer'
import tollReducer from './toll/tollReducer'
import employeeReducer from './employee/employeeReducer'
import AccountReducer from './gestionCuentas/AccountReducer'
import VehicleTypeReducer from './vehicleType/VehicleReducer'
import CategoryReducer from './Category/CategoryReducer'
import FareReducer from './fare/FareReducer'
import RecaudacionReducer from './Reports/RecaudacionReducer'
import EquipReducer from './equip/EquipReducer'
import stateReducer from './states/stateducer'
import WorkReducer from './workShift/WorkReducer'
import TransitReducer from './transitReport/TransitReducer'
import AccountHolderReducer from './accountHolder/AccountHolderReducer'
// import FareOneReducer from './fareUnique/FareOneReducer'
import ConsolidateReducer from './consolidate/ConsolidateReducer'
import DashboardReducer from './dashboard/dashboardReducer'
import ExportExcelReducer from './exportReportExcel/ExportExcelReducer'
import MonitoringReducer from './monitoring/MonitoringReducer'
import commonsReducer from './commons/commonsReducer'
import AnalyticsReducer from './analytics/AnalyticsReducer'
import ExportPdfReducer from './exportReportPdf/ExportPdfReducer'
import stateReportReducer from './stateReport/stateReportReducer'

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    login: loginReducer,
    customization: customizationReducer,
    snackbar: snackbarReducer,
    tolls: tollsReducer,
    lanes: laneReducer,
    saleTag: saleTagReducer,
    toll: tollReducer,
    employee: employeeReducer,
    account: AccountReducer,
    Tvehicle: VehicleTypeReducer,
    category: CategoryReducer,
    fare: FareReducer,
    taking: RecaudacionReducer,
    equips: EquipReducer,
    states: stateReducer,
    work: WorkReducer,
    transitRes: TransitReducer,
    accountHolder: AccountHolderReducer,
    // fares: FareOneReducer,
    consolidate: ConsolidateReducer,
    excel: ExportExcelReducer,
    monitoring: MonitoringReducer,
    dashboard: DashboardReducer,
    commons: commonsReducer,
    analytics: AnalyticsReducer,
    pdf: ExportPdfReducer,
    ReportState: stateReportReducer,

    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'berry-',
        },
        cartReducer
    ),
})

export default reducer
