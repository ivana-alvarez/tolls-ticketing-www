import React from 'react'

// material-ui
import {
    Grid,
    CardActions,
    // TextField,
    Button,
    Theme,
    MenuItem,
    Typography,
} from '@material-ui/core'
import AnimateButton from 'ui-component/extended/AnimateButton'

import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'

// import {dayjs} from ''

// project imports
import { gridSpacing } from 'store/constant'
import { makeStyles } from '@material-ui/styles'

//hook-form
import { yupResolver } from '@hookform/resolvers/yup'
import {
    useForm,
    Controller,
    SubmitHandler,
    SubmitErrorHandler,
} from 'react-hook-form'
import * as yup from 'yup'
import { DefaultRootStateProps } from 'types'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getTakingReportRequest } from 'store/Reports/RecaudacionAction'
import { getTollsRequest } from 'store/tolls/tollsActions'
import { getCategoryRequest } from 'store/Category/CategoryActions'
import { getLaneRequest } from 'store/lane/laneActions'
import { getEmployeesRequest } from 'store/employee/employeeActions'
import { getStatesRequest } from 'store/states/stateAction'

const useStyles = makeStyles((theme: Theme) => ({
    searchControl: {
        width: '100%',
        paddingRight: '16px',
        paddingLeft: '16px',
        '& input': {
            background: 'transparent !important',
            paddingLeft: '5px !important',
        },
        '& .Mui-focused input': {
            boxShadow: 'none',
        },
        ' & .css-1xu5ovs-MuiInputBase-input-MuiOutlinedInput-input': {
            color: '#6473a8',
        },

        [theme.breakpoints.down('lg')]: {
            width: '250px',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
            marginLeft: '4px',
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark[800]
                    : '#fff',
        },
    },
    SelectIcon: {
        right: '7px',
    },
}))

interface Inputs {
    summary_criterias: string
    dates: string
    initial_date: string
    final_date: string
    toll: string
    lane: string
    category: string
    payments: string
    employee: string
    state: string
    currency_iso_code: string
}

const validateDate = () => {
    const today = new Date()
    let hours = 24 * 60 * 60 * 100
    const tomorrow = new Date(today.getTime() + hours)
    return tomorrow
}

const Schema = yup.object().shape({
    initial_date: yup
        .date()
        .max(validateDate(), 'Fecha no permitida')
        .nullable()
        .typeError('Debe seleccionar una fecha valida')
        .required('Este campo es requerido'),
    final_date: yup
        .date()
        .default(null)
        .min(yup.ref('initial_date'), 'Debe ser mayor que la fecha inicial')
        .max(validateDate(), 'Fecha no permitida')
        .nullable()
        .typeError('Debe seleccionar una fecha valida')
        .required('Este campo es requerido'),
    summary_criterias: yup.string().required('Este campo es requerido'),
    dates: yup.string().required('Este campo es obligatorio'),
    currency_iso_code: yup.string().required('Este campo es obligatorio'),

    state: yup.string().when('summary_criterias', {
        is: (summary_criterias) =>
            summary_criterias === 'lane' ||
            summary_criterias === 'operator' ||
            summary_criterias === 'payments',
        then: (value) => value.required('Este campo es requerido'),
    }),

    toll: yup.string().when('summary_criterias', {
        is: (summary_criterias) =>
            summary_criterias === 'lane' ||
            summary_criterias === 'operator' ||
            summary_criterias === 'payments',
        then: (value) => value.required('Este campo es requerido'),
    }),

    lane: yup.string().when('summary_criterias', {
        is: (summary_criterias) =>
            summary_criterias === 'lane' || summary_criterias === 'payments',
        then: (value) => value.required('Este campo es requerido'),
    }),

    category: yup.string().when('summary_criterias', {
        is: (summary_criterias) =>
            summary_criterias === 'lane' || summary_criterias === 'operator',
        then: (value) => value.required('Este campo es requerido'),
    }),

    payments: yup.string().when('summary_criterias', {
        is: (summary_criterias) =>
            summary_criterias === 'lane' ||
            summary_criterias === 'operator' ||
            summary_criterias === 'payments',
        then: (value) => value.required('Este campo es requerido'),
    }),

    employee: yup.string().when('summary_criterias', {
        is: (summary_criterias) => summary_criterias === 'operator',
        then: (value) => value.required('Este campo es requerido'),
    }),
})

const criterias = [
    {
        name: 'lane',
        label: 'Recaudación por canales',
    },

    {
        name: 'payments',
        label: 'Métodos de pago',
    },
    {
        name: 'operate',
        label: 'Recaudación por operadores',
    },
]

const payments = [
    {
        name: 'null',
        label: 'Todos',
    },
    {
        name: 'cash',
        label: 'Efectivo',
    },
    {
        name: 'debit/credit',
        label: 'Debito/credito',
    },
]

const DetailsIncomeReportsForm = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    const tolls = useSelector((state: DefaultRootStateProps) => state.tolls)

    const category = useSelector(
        (state: DefaultRootStateProps) => state.category
    )
    const lanes = useSelector((state: DefaultRootStateProps) => state.lanes)
    const employees = useSelector(
        (state: DefaultRootStateProps) => state.employee
    )

    const states = useSelector((state: DefaultRootStateProps) => state.states)

    const readOnly = true

    const [initialDate, setInitialDate] = React.useState<Date | any>(null)
    const [finishDate, setFinishDate] = React.useState<Date | any>(null)
    const [criteria, setCriteria] = React.useState<string>('')
    const [loading, setLoading] = React.useState(false)

    const handleDateMonth = () => {
        const date = new Date()
        const initial = new Date(date.getFullYear(), date.getMonth(), 1)
        setInitialDate(initial)
        setFinishDate(date)
        setValue('initial_date', initial, { shouldValidate: true })
        setValue('final_date', date, { shouldValidate: true })
    }

    const handleLastMonth = () => {
        const date = new Date()
        const initial = new Date(date.getFullYear(), date.getMonth() - 1)
        const ini = new Date(initial.getFullYear(), initial.getMonth(), 1)
        const final = new Date(date.getFullYear(), initial.getMonth() + 1, 0)
        setInitialDate(ini)
        setFinishDate(final)
        setValue('initial_date', ini, { shouldValidate: true })
        setValue('final_date', final, { shouldValidate: true })
    }

    const handleYear = () => {
        const date = new Date()
        const ini = new Date(date.getFullYear(), 0, 1)
        setInitialDate(ini)
        setFinishDate(date)
        setValue('initial_date', ini, { shouldValidate: true })
        setValue('final_date', date, { shouldValidate: true })
    }

    const handleChangeInitialDate = (newValue: Date | null) => {
        setInitialDate(newValue)
        if (newValue)
            setValue('initial_date', newValue, { shouldValidate: true })
        if (newValue === null)
            setValue('initial_date', null, { shouldValidate: true })
    }

    const handleChangeFinishDate = (newValue: Date | null) => {
        setFinishDate(newValue)
        if (newValue) setValue('final_date', newValue, { shouldValidate: true })
        if (newValue === null)
            setValue('final_date', null, { shouldValidate: true })
    }

    const handleCriteria = (event) => {
        const value = event.target.value

        setValue('summary_criterias', value, { shouldValidate: true })
        setCriteria(event.target.value)
    }

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log(data)

        return
    }
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const {
            toll,
            state,
            lane,
            category,
            payments,
            employee,
            dates,
            currency_iso_code,
        } = data

        const fetchData = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                getTakingReportRequest({
                    initial_date: initialDate.toLocaleDateString('es-VE'),
                    final_date: finishDate.toLocaleDateString('es-VE'),
                    group_criteria: dates,
                    site: 'null' ? null : toll,
                    state: 'null' ? null : state,
                    node: 'null' ? null : lane,
                    category: 'null' ? null : category,
                    payment_method: 'null' ? null : payments,
                    employee: 'null' ? null : employee,
                    currency_iso_code,
                    report_type: 'takings',
                })
            )
            setLoading(false)
            return responseData2
        }

        const responseData1 = await fetchData()

        if (responseData1) {
            console.log(responseData1)
            navigate('/reportes/preliminar')
        }
    }

    // React.useEffect(() => {

    //     if (isSummaryrCiterias === 'by_location') {
    //         setValue('operator_id', '', { shouldValidate: true })
    //         setValue('node_type', '', { shouldValidate: true })
    //         setValue('node_code', '', { shouldValidate: true })
    //     }
    //     if (isSummaryrCiterias === 'by_operator') {
    //         setValue('location_id', '', { shouldValidate: true })
    //         setValue('node_type', '', { shouldValidate: true })
    //         setValue('node_code', '', { shouldValidate: true })
    //     }
    //     if (isSummaryrCiterias === 'by_equipment') {
    //         setValue('location_id', '', { shouldValidate: true })
    //         setValue('operator_id', '', { shouldValidate: true })
    //     }
    // }, [isSummaryrCiterias, setValue])

    React.useEffect(() => {
        dispatch(getTollsRequest())
        dispatch(getCategoryRequest())
        dispatch(getLaneRequest())
        dispatch(getEmployeesRequest())
        dispatch(getStatesRequest())
    }, [dispatch])

    return (
        <>
            <Grid item sx={{ height: 20 }} xs={12}>
                <Typography variant="h3">
                    Reporte por recaudación de un canal
                </Typography>
            </Grid>
            <CardActions sx={{ justifyContent: 'flex flex-ini space-x-2' }}>
                <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    //disabled={rea}
                    onClick={handleDateMonth}
                >
                    Mes en curso
                </Button>
                <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    //disabled={rea}
                    onClick={handleLastMonth}
                >
                    Mes anterior
                </Button>
                <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    //disabled={rea}
                    onClick={handleYear}
                >
                    Año en curso
                </Button>
            </CardActions>

            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid
                    container
                    spacing={gridSpacing}
                    className={classes.searchControl}
                    // md={12}
                >
                    <Controller
                        name="initial_date"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                className={classes.searchControl}
                            >
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            {...field}
                                            label="Fecha de inicio"
                                            inputFormat="dd/MM/yyyy"
                                            value={initialDate}
                                            onChange={handleChangeInitialDate}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    size="small"
                                                    autoComplete="off"
                                                    error={
                                                        !!errors.initial_date
                                                    }
                                                    helperText={
                                                        errors.initial_date
                                                            ?.message
                                                    }
                                                    disabled={!!!readOnly}
                                                />
                                            )}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                        )}
                    />
                    <Controller
                        name="final_date"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                className={classes.searchControl}
                            >
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                >
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                            {...field}
                                            label="Fecha de cierre"
                                            inputFormat="dd/MM/yyyy"
                                            value={finishDate}
                                            onChange={handleChangeFinishDate}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    size="small"
                                                    autoComplete="off"
                                                    error={!!errors.final_date}
                                                    helperText={
                                                        errors.final_date
                                                            ?.message
                                                    }
                                                    disabled={!!!readOnly}
                                                />
                                            )}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="dates"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Agrupación"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.dates}
                                    helperText={errors.dates?.message}
                                    disabled={!!!readOnly}
                                >
                                    <MenuItem key="daily" value="daily">
                                        {'Dia'}
                                    </MenuItem>
                                    <MenuItem key="monthly" value="monthly">
                                        {'Mes'}
                                    </MenuItem>
                                    <MenuItem key="yearly" value="yearly">
                                        {'Año'}
                                    </MenuItem>
                                </TextField>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Estado"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.state}
                                    helperText={errors.state?.message}
                                    disabled={!!!readOnly}
                                >
                                    <MenuItem key="null" value="null">
                                        {'Todos'}
                                    </MenuItem>
                                    {states.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="toll"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Peaje"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.toll}
                                    helperText={errors.toll?.message}
                                    disabled={!!!readOnly}
                                >
                                    <MenuItem key="null" value="null">
                                        {'Todos'}
                                    </MenuItem>
                                    {tolls.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="summary_criterias"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Criterio"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.summary_criterias}
                                    helperText={
                                        errors.summary_criterias?.message
                                    }
                                    disabled={!!!readOnly}
                                    onChange={handleCriteria}
                                >
                                    {criterias.map((option) => (
                                        <MenuItem
                                            key={option.name}
                                            value={option.name}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />

                    {criteria === 'lane' && (
                        <>
                            <Controller
                                name="lane"
                                control={control}
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={6}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            select
                                            fullWidth
                                            label="Canales"
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.lane}
                                            helperText={errors.lane?.message}
                                            disabled={!!!readOnly}
                                        >
                                            <MenuItem key="null" value="null">
                                                {'Todos'}
                                            </MenuItem>
                                            {lanes.map((option) => (
                                                <MenuItem
                                                    key={option.id}
                                                    value={option.id}
                                                >
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                )}
                            />

                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={6}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            select
                                            fullWidth
                                            label="Categoria"
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.category}
                                            helperText={
                                                errors.category?.message
                                            }
                                            disabled={!!!readOnly}
                                        >
                                            <MenuItem key="null" value="null">
                                                {'Todos'}
                                            </MenuItem>
                                            {category.map((option) => (
                                                <MenuItem
                                                    key={option.id}
                                                    value={option.id}
                                                >
                                                    {option.title}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                )}
                            />

                            <Controller
                                name="payments"
                                control={control}
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={6}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            select
                                            fullWidth
                                            label="Métodos de pago"
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.payments}
                                            helperText={
                                                errors.payments?.message
                                            }
                                            disabled={!!!readOnly}
                                        >
                                            {payments.map((option) => (
                                                <MenuItem
                                                    key={option.name}
                                                    value={option.name}
                                                >
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                )}
                            />
                        </>
                    )}

                    {criteria === 'payments' && (
                        <>
                            <Controller
                                name="lane"
                                control={control}
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={6}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            select
                                            fullWidth
                                            label="Canales"
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.lane}
                                            helperText={errors.lane?.message}
                                            disabled={!!!readOnly}
                                        >
                                            <MenuItem key="null" value="null">
                                                {'Todos'}
                                            </MenuItem>
                                            {lanes.map((option) => (
                                                <MenuItem
                                                    key={option.id}
                                                    value={option.id}
                                                >
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                )}
                            />

                            <Controller
                                name="payments"
                                control={control}
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={6}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            select
                                            fullWidth
                                            label="Métodos de pago"
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.payments}
                                            helperText={
                                                errors.payments?.message
                                            }
                                            disabled={!!!readOnly}
                                        >
                                            {payments.map((option) => (
                                                <MenuItem
                                                    key={option.name}
                                                    value={option.name}
                                                >
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                )}
                            />
                        </>
                    )}

                    {criteria === 'operate' && (
                        <>
                            <Controller
                                name="employee"
                                control={control}
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={6}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            select
                                            fullWidth
                                            label="Operador"
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.employee}
                                            helperText={
                                                errors.employee?.message
                                            }
                                            disabled={!!!readOnly}
                                        >
                                            <MenuItem key="null" value="null">
                                                {'Todos'}
                                            </MenuItem>
                                            {employees.map((option) => (
                                                <MenuItem
                                                    key={option.id}
                                                    value={option.id}
                                                >
                                                    {option.username}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                )}
                            />

                            <Controller
                                name="category"
                                control={control}
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={6}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            select
                                            fullWidth
                                            label="Categoría"
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.category}
                                            helperText={
                                                errors.category?.message
                                            }
                                            disabled={!!!readOnly}
                                        >
                                            <MenuItem key="null" value="null">
                                                {'Todos'}
                                            </MenuItem>
                                            {category.map((option) => (
                                                <MenuItem
                                                    key={option.id}
                                                    value={option.id}
                                                >
                                                    {option.title}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                )}
                            />

                            <Controller
                                name="payments"
                                control={control}
                                render={({ field }) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={6}
                                        className={classes.searchControl}
                                    >
                                        <TextField
                                            select
                                            fullWidth
                                            label="Métodos de pago"
                                            size="small"
                                            autoComplete="off"
                                            {...field}
                                            error={!!errors.payments}
                                            helperText={
                                                errors.payments?.message
                                            }
                                            disabled={!!!readOnly}
                                        >
                                            {payments.map((option) => (
                                                <MenuItem
                                                    key={option.name}
                                                    value={option.name}
                                                >
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                )}
                            />
                        </>
                    )}

                    <Controller
                        name="currency_iso_code"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Moneda"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.currency_iso_code}
                                    helperText={
                                        errors.currency_iso_code?.message
                                    }
                                    disabled={!!!readOnly}
                                >
                                    <MenuItem key={'937'} value={'937'}>
                                        {'BsD'}
                                    </MenuItem>
                                </TextField>
                            </Grid>
                        )}
                    />
                </Grid>
                <CardActions>
                    <Grid
                        container
                        justifyContent="flex-end"
                        spacing={0}
                        sx={{ marginTop: '10px' }}
                    >
                        {readOnly ? (
                            <>
                                <Grid item>
                                    <AnimateButton>
                                        <Button
                                            disableElevation
                                            variant="contained"
                                            size="medium"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            Crear Reporte
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </>
                        ) : null}
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default DetailsIncomeReportsForm
