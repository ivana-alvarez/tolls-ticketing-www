import React, { FunctionComponent, ReactElement } from 'react'
import {
    PaletteMode,
    SvgIconTypeMap,
    SnackbarOrigin,
    ChipProps,
    TableCellClasses,
    //  TableCellProps,
} from '@material-ui/core'
import { Property } from 'csstype'

import { OverridableComponent } from '@material-ui/core/OverridableComponent'

// project imports
import { UserProfile } from '_mockApis/user-profile/types'
import { TablerIcon } from '@tabler/icons'
import { CartStateProps } from './cart'

export type ArrangementOrder = 'asc' | 'desc' | undefined

export type DateRange = { start: number | Date; end: number | Date }

export type GetComparator = (
    o: ArrangementOrder,
    o1: string
) => (a: KeyedObject, b: KeyedObject) => number

export type Direction = 'up' | 'down' | 'right' | 'left'

export type DialogMaxWidthType =
    | false
    | 'sm'
    | 'xs'
    | 'md'
    | 'lg'
    | 'xl'
    | undefined

export interface TabsProps {
    children?: React.ReactElement | string
    value: string | number
    index: number
}

export interface GenericCardProps {
    title?: string
    primary?: string | number | undefined
    secondary?: string
    content?: string
    image?: string
    dateTime?: string
    iconPrimary?: OverrideIcon
    color?: string
    size?: string
}

export type OverrideIcon =
    | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
          muiName: string
      })
    | React.ComponentClass<any>
    | FunctionComponent<any>
    | TablerIcon

export interface EnhancedTableHeadProps {
    classes?: Partial<TableCellClasses>
    onSelectAllClick?: (e: React.ChangeEvent<HTMLInputElement>) => void
    order?: ArrangementOrder
    orderBy?: string
    numSelected?: number
    rowCount?: number
    dataPrice?: any
    onRequestSort?: (e: React.SyntheticEvent, p: string) => void
}

export interface EnhancedTableToolbarProps {
    numSelected: number
}

export type HeadCell = {
    id: string
    numeric: boolean
    label: string
    disablePadding?: string | boolean | undefined
    align?: 'left' | 'right' | 'inherit' | 'center' | 'justify' | undefined
}

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top'

export type NavItemTypeObject = {
    children?: NavItemType[]
    items?: NavItemType[]
    type?: string
}

export type NavItemType = {
    id?: string
    icon?: GenericCardProps['iconPrimary']
    target?: boolean
    external?: string
    url?: string | undefined
    type?: string
    title?: React.ReactNode | string
    color?: 'primary' | 'secondary' | 'default' | undefined
    caption?: React.ReactNode | string
    breadcrumbs?: boolean
    disabled?: boolean
    chip?: ChipProps
}

export type AuthSliderProps = {
    title: string
    description: string
}

export interface CustomizationStateProps {
    isOpen: NavItemType[]
    type?: string
    id?: string
    navType: PaletteMode
    presetColor: string
    locale: string
    rtlLayout: boolean
    opened: boolean
    fontFamily: Property.FontFamily
    borderRadius?: number
    outlinedFilled: boolean
}
export interface SnackbarStateProps {
    action: boolean
    open: boolean
    message: string
    anchorOrigin: SnackbarOrigin
    variant: string
    alertSeverity: 'error' | 'warning' | 'success'
    transition: string
    close: boolean
    actionButton: boolean
}

export interface ColorPaletteProps {
    color: string
    label: string
    value: string
}

export interface OperatingCompanyProps {
    id?: string
    company_code?: string
    name: string
    abbreviation: string
    nif: string
    address: string
    city: string
    city_name?: string
    state: string
    state_name?: string
    legal_representative: string
    id_number: string
    company_type?: string
    logo?: string
    active: boolean
    department?: number
    filial_company?: string
    transportation_means?: Array<string>
    transportation_means_names?: Array<string>
    bank_details: [
        {
            bank?: string
            bank_code: string
            bank_name: string
            bank_agency: string
            account_type: string
            account_number: string
            swift_code?: string
        }
    ]
    created_by?: string
    created_on?: string
}
export interface TBanksProps {
    id: string
    bank_code: string
    bank_name: string
    swift_code: string
}

export interface TCardsProps {
    id?: string
    category: string
    name: string
    description: string
    allowed_media: string
    is_ticket_allowed: boolean
    web_rechargable: boolean
    allowed_actions: string
    abbreviation: string
    currency?: string
}
export interface TCardsCProps extends TCardsProps {
    factor: number
}

export interface TWeekDays {
    id?: string
    weekday: string
    name: string
    abbreviation: string
    description: string
}

export interface StopsAndZonesProps {
    id?: string
    stop_code?: string
    trans_means?: string
    name?: string
    abbreviation?: string
    route?: string
    location: {
        type?: any
        coordinates: Array<string | number>
    }
    municipality_code?: string
    state_code?: string
    is_public_stop?: boolean
}

export interface UserProps {
    id?: string
    employee_code?: string
    company_code?: string
    second_name: string
    second_last_name?: string
    sex: string
    personal_id: string
    mobile: string
    active: boolean
    role?: Array<string>
    permissions: Array<string>
    description: string
    department_no: number
    operator_card: string
    created_on: string
    last_update_on: null
    user?: string
    username: string
    password?: string
    first_name: string
    last_name: string
    email: string
}

export interface UserTry {
    user: {
        username: string
        password: string
        first_name: string
        last_name: string
        email: string
    }
    employee: {
        company?: string
        active: boolean
        username: string
        password: string
        first_name: string
        last_name: string
        email: string
        employee_code?: string
        company_code?: string
        second_name: string
        second_last_name?: string
        sex: string
        personal_id: string
        mobile: string
        role: string
        // permissions: Array<string>
        description: string
        department_no: number
        operator_card: string
        created_by: string
    }
}

export interface UserEdit {
    // user: {
    //     username: string
    //     password: string
    //     first_name: string
    //     last_name: string
    //     email: string
    // }
    active: boolean
    id?: string
    username: string
    password?: string
    first_name: string
    last_name: string
    email: string
    user: string
    employee_code?: string
    company_code?: string
    second_name: string
    second_last_name?: string
    sex: string
    personal_id: string
    mobile: string
    role: string
    // permissions: Array<string>
    description: string
    department_no: number
    operator_card: string
    updated_by: string
}
export interface TProfile {
    id?: string
    email: string
    // username: string
    password: String
    updated_by: string
}

export interface FleetDataProps {
    id?: string
    unit_id: string
    name?: string
    company_code?: string
    company_name?: string
    transportation_mean: string
    transportation_name?: string
    vin?: string
    plate: string
    make: string
    model: string
    capacity: number
    fuel_type?: string
    tank_capacity?: number
    manfucture_date?: string
    features?: string
}
export interface TAuthorizedRoutes {
    stop_code: string
    trans_means: string
    name: string
    abbreviation: string
    route: string
    location: {
        type: string
        state: string
        municipality: string
    }
}

export interface TfarePrices {
    from_zone: string
    to_zone: string
    price: number
}

export interface fareProps {
    id?: string
    type_vehicle: string
    number_ejes: string
    weight: number
    active: boolean
}

export interface TZones {
    _id?: string
    zone_code: string
    name?: string
    stops?: Array<StopsAndZonesProps>
    color?: string
    // location: {
    // 	type: Polygon,
    // 	coordintates: [
    // 		[lat, long],
    // 		[lat, long]
    // 	]
    // }
}

export interface TLeg {
    direction?: string
    stops?: Array<StopsAndZonesProps>
    zones: Array<TZones>
    estimated_time?: number
    distance?: number
}

export interface TRoutesAndZones {
    _id?: string
    route_code?: string
    name?: string
    description?: string
    abbreviation?: string
    route_type?: 'urban' | 'sub_urban' | 'extra_urban'
    ring?: boolean
    legs: Array<TLeg>
    // created_by: string;
    // updated_by: string;
    active?: boolean
}

export interface nodeProps {
    id?: string
    company_code: string
    node_type: string
    node_code: string
    name: string
    abbreviation: string
    ip?: string
    active: boolean
    monitorizable: boolean
    location: string
}

export interface nodeTypeProps {
    id: string
    node_type: string
    name: string
    abbreviation: string
    devices: Array<string>
    allowed_operations: Array<string>
}

export interface DefaultRootStateProps {
    lanes: Array<TLanes>
    tolls: Array<TTollsSite>
    toll: Array<TTollsSite>
    login: any
    loginData: TLoginDataProps
    customization: CustomizationStateProps
    snackbar: SnackbarStateProps
    cart: CartStateProps
    cards: Array<TCardsProps>
    operatingCompanies: Array<OperatingCompanyProps>
    stopsAndZones: Array<StopsAndZonesProps>
    users: Array<UserProps>
    fleets: Array<FleetDataProps>
    users2: Array<UserTry>
    usersEdit: Array<UserEdit>
    banks: Array<TBanksProps>
    typesCompany: Array<TTypesCompany>
    accountTypes: Array<TAccountTypes>
    stateOptions: Array<TStateOptions>
    cities: Array<TCities>
    fuelTypes: Array<TFuelTypes>
    roles: Array<TRoles>
    transportMeans: Array<TTransportMeans>
    routesAndZones: Array<TRoutesAndZones>
    authorizedRoutes: Array<TAuthorizedRoutes>
    days: Array<TWeekDays>
    farePrices: Array<TfarePrices>
    profile: UserProps
    node: Array<nodeProps>
    nodeType: Array<nodeTypeProps>
    saleTag: Array<SaleTag>
    Tvehicle: Array<Tvehicle>
    employee: Array<employees>
    account: Array<account>
    category: Array<category>
    fare: Array<fare>
    taking: takingsRes
    states: Array<states>
    work: workRes
    equips: Array<TEquips>
    transitRes: Array<transitRes>
    accountHolder: Array<accountHolder>
    fares: Array<fares>
    consolidate: Array<consolidateRes>
    monitoring: Array<monitoring>
    dashboard: dashboard
    ReportState: Array<ReportState>
}

export interface ColorProps {
    readonly [key: string]: string
}

export type GuardProps = {
    children: ReactElement | null
}

export interface StringColorProps {
    id?: string
    label?: string
    color?: string
    primary?: string
    secondary?: string
}

export interface JWTData {
    userId: string
}

export type KeyedObject = {
    [key: string]: string | number | KeyedObject | any
}

export interface initialLoginContextProps {
    isLoggedIn: boolean | string | null
    isInitialized: boolean
    user?: UserProfile | null | undefined
    content?: object
}
export interface TLoginDataProps {
    username: string
    password: string
    company_code?: string
    node_type?: string
    node_code?: string
}

export interface FormInputProps {
    bug: KeyedObject
    fullWidth?: boolean
    size?: 'small' | 'medium' | undefined
    label: string
    name: string
    required?: boolean
    InputProps?: {
        label: string
        startAdornment?: React.ReactNode
    }
}

export type HandleFunction = (i: string, s: string) => Promise<void>

export type Event = {
    id: string
    allDay: boolean
    color: string
    textColor?: string
    description: string
    start: Date
    end: Date
    title: string
}

/** ---- Common Functions types ---- */

export type StringBoolFunc = (s: string) => boolean
export type StringNumFunc = (s: string) => number
export type NumbColorFunc = (n: number) => StringColorProps | undefined
export type ChangeEventFunc = (e: React.ChangeEvent<HTMLInputElement>) => void

// CONST
// Types Company const
export interface TTypesCompany {
    id: string
    company_type: string
    name: string
    description: string
}
// account types

export interface TAccountTypes {
    id: string
    name: string
    account_code: string
    abbreviation: string
    description: string
}

// State
export interface TStateOptions {
    id: string
    state_code: string
    alpha_code: string
    name: string
    abbreviation: string
    description: string
}

// cities
export interface TCities {
    id: string
    city_code: string
    alpha_code: string
    name: string
    abbreviation: string
    description: string
}

// Fuel Types

export interface TFuelTypes {
    id: string
    name: string
    abbreviation: string
    description: string
}
// roles
export interface TRoles {
    id: string
    role: string
    name: string
    abbreviation: string
    description: string
}

// transport means
export interface TTransportMeans {
    id: string
    trans_means: string
    trans_mode: string
    name: string
    abbreviation: string
    description: string
}

export interface TIncomeReports {
    initial_date: string
    final_date: string
    company_code: Array<string>
    criteria: string
    resume_criteria: string
    // export_format: string
    operator_id?: string
    location_id?: string
    node_type?: string
    node_code?: string
    summary_criterias?: string
    report?: string
}

export interface TLanes {
    id?: string
    lane_code?: string
    name?: string
    direction?: string
    width_m?: number
    height_m?: number
    parent_nodes?: string
    is_active?: boolean
    is_deleted?: boolean
}
export interface TEquips {
    id?: string
    name?: string
    company?: string
    node_code?: string
    node_type?: string
    active?: boolean
    monitored?: boolean
    parent_site?: string
    phone_1?: string
    is_deleted?: boolean
    site_id?: string
}
export interface TEmployees {
    id: string
    first_name: string
    second_name: string
    last_name: string
    last_name_2: string
    identification: string
    phone: string
    sexo: string
    department: string
    id_user: string
    rol: string
}
export interface TFares {
    _id: string
    peso: string
    price: string
    abbreviation: string
    category: string
}
export interface TTollsSite {
    id?: string
    site_code?: string
    city?: string
    name?: string
    state?: string
    road?: string
    start_point?: string
    end_point?: string
    tolls_lanes?: string
    location: { coordinates: Array<string> }
    lanes: Array<TLanes>
    equips: Array<TEquips>
    employees: Array<TEmployees>
    fares: Array<TFares>
    toll_sites?: string
    readOnlyState?: string
}

export interface SaleTag {
    id?: string
    tag_number?: string
    tag_serial?: string
    media?: string
    media_spanish?: string
    is_deleted?: boolean
}

export interface Tvehicle {
    id?: string
    title?: string
    description?: string
    image?: string
    axles?: number
    weight_kg?: number
    active?: boolean
}

export interface employees {
    id?: string
    username?: string
    password?: string
    email?: string
    first_name?: string
    middle_name?: string
    last_name?: string
    second_last_name?: string
    sex?: string
    mobile?: string
    role?: string
    personal_id?: string
    employee_no?: string
    description?: string
    active?: boolean
    company_code?: string
    toll_site?: string
    toll_sites?: Array<any>
    company?: number
    is_deleted?: boolean
    name?: string
    role_spanish?: string
}

export interface account {
    id?: string
    license_plate?: string
    make?: string
    model?: string
    year?: string
    color?: string
    axles?: number
    weight?: number
    category?: string
    tag_id?: string
    movements?: string
    active?: boolean
    vin?: string
    holder_id?: string
    is_deleted?: boolean
}

export interface category {
    id?: string
    title?: string
    description?: string
    image?: string
    axles?: number
    weight_kg?: number
    active?: boolean
}

export interface fare {
    id?: string
    title?: string
    fare_name?: string
    nominal_amount?: number
    weight_factor?: number
    nominal_iso_code?: string
    category?: string
    site_id?: string
    is_deleted?: boolean
    sites?: Array<any>
}

export interface fares {
    site_id?: string
    site_name?: string
    id?: string
    title?: string
    fare_name?: string
    nominal_amount?: number
    weight_factor?: number
    nominal_iso_code?: string
    category_id?: string
}

export interface takingsReq {
    initial_date: string
    final_date: string
    group_criteria?: string
    site?: string | null
    node?: string | null
    category?: string | null
    payment_method?: string | null
    state?: string | null
    employee?: string | null
    currency_iso_code?: string | null
    report_type: string
    employee_username?: string | null
    fare_product?: string | null
    report_title?: string
}

export interface takingsRes {
    col_titles: Array<any>
    data: Array<any>
    rows?: string
    summary?: { total: string }
}

export interface states {
    id?: string
    state_code?: string
    alpha_code?: string
    name?: string
    abbreviation?: string
    description?: string
}

export interface ReportState {
    id?: string
    state_code?: string
    alpha_code?: string
    name?: string
    abbreviation?: string
    description?: string
}

export interface workRes {
    report_type: string
    initial_date: string
    final_date: string
    employee_username: string | null
}

export interface transitRes {
    report_type: string
    initial_date: string
    final_date: string
    group_criteria: string
    site: string | null
    node?: string | null
    category?: string | null
    state?: string | null
}

export interface consolidateRes {
    report_type: string
    initial_date: string
    final_date: string

    site: string | null
    toll: string | null
}

export interface accountHolder {
    username?: string
    account_holder?: string
    account_number?: string
    nif_holder?: string
    nif_holder_type?: string
    first_name?: string
    last_name?: string
    nif?: string
    phone_number1?: string
    phone_code?: string
    phone_code_holder?: string
    phone_number?: string
    state?: string
    address?: string
    email?: string
    is_company?: boolean
    vehicles?: Array<account>
    status?: boolean
    id?: string
    email_holder?: string
    phone_number_holder?: string
    nif_type?: string
    is_deleted?: boolean
    account_detail?: {
        nominal_amount: number
        nominal_iso_code: string
        last_use_tag: string
        last_use_date: string
        status: boolean
    }
}

export interface monitoring {
    id?: string
    name?: string
    state?: string
    city?: string
    site_code?: string
    active_nodes?: number
    active_lanes?: number
    nodes?: Array<any>
    lanes?: Array<any>
}

export interface dashboard {
    group_criteria: string
    site: string
    summary?: Array<any>
    data_by_fare?: Array<any>
    fare?: string
    vehicles?: number
    total?: string
    transit_by_lane?: Array<any>
    lane?: string
}

export interface TCommons {
    countPage: number
}

export interface analytics {
    initial_date: string
    final_date: string
    group_criteria?: string
    site?: string | null
    node?: string | null
    category?: string | null
    payment_method?: string | null
    state?: string | null
    employee?: string | null
    currency_iso_code?: string | null
    report_type?: string
    employee_username?: string | null
    fare_product?: string | null
    report_title?: string
    criteria?: string
}
