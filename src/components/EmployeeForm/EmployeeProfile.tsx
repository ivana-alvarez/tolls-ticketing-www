import React from 'react'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    useForm,
    Controller,
    SubmitHandler,
    SubmitErrorHandler,
} from 'react-hook-form'
// import { DefaultRootStateProps } from 'types'

//REDUX
// import { useSelector } from 'react-redux'
// import {
//     createFleetRequest,
//     updateFleetRequest,
// } from 'store/fleetCompany/FleetCompanyActions'
// material-ui
import {
    Grid,
    // TextField,
    Theme,
    Typography,
    CardActions,
    MenuItem,
    Button,
    FormControlLabel,
    Switch,
    // FormControlLabel,
    // Switch,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AnimateButton from 'ui-component/extended/AnimateButton'
// import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone'
// import UploadTwoToneIcon from '@material-ui/icons/UploadTwoTone'
// import Avatar from 'ui-component/extended/Avatar'
// import { gridSpacing } from 'store/constant'

import TextField from '@mui/material/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultRootStateProps, employees } from 'types'
import { useNavigate } from 'react-router'
import {
    createEmployeesRequest,
    updateEmployeesRequest,
} from 'store/employee/employeeActions'
import { gridSpacing, NUMBER_CODE, SEX } from 'store/constant'
import { onKeyDown } from 'components/utils'
import SelectChip from './SelectChip'
import { getTollsRequest } from 'store/tolls/tollsActions'

// import { useDispatch, useSelector } from 'react-redux'
// import { DefaultRootStateProps } from 'types'

const useStyles = makeStyles((theme: Theme) => ({
    alertIcon: {
        height: '16px',
        width: '16px',
        marginRight: '5px',
        verticalAlign: 'text-bottom',
        marginTop: '15px',
        marginLeft: '-15px',
    },
    userAvatar: {
        height: '80px',
        width: '80px',
    },
    input: {
        opacity: 0,
        position: 'absolute',
        zIndex: 1,
        padding: 0.5,
        cursor: 'pointer',
        width: '30%',
    },
    searchControl: {
        width: '100%',
        '& input': {
            background: 'transparent !important',
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
        },
    },
}))

// ==============================|| PROFILE 1 - PROFILE ACCOUNT ||============================== //
interface Inputs {
    first_name: string
    middle_name: string
    last_name: string
    second_last_name: string
    identification: string
    phone_number: string
    sex: string
    // department: string
    personal_id: string
    role: string
    document_type: string
    cellphone_code: string
    username: string
    password: string
    email: string
    active: boolean
}

const Schema = yup.object().shape({
    first_name: yup.string().required('Este campo es requerido'),

    middle_name: yup.string().optional(),

    last_name: yup.string().required('Este campo es requerido'),
    second_last_name: yup.string().optional(),
    // identification: yup.string().required('Este campo es requerido'),
    phone_number: yup
        .string()
        .max(7, 'Máximo 7 carácteres')
        .required('Este campo es requerido'),
    sex: yup.string().required('Este campo es requerido'),
    // department: yup.string().required('Este campo es requerido'),
    personal_id: yup.string().required('Este campo es requerido'),
    role: yup.string().required('Este campo es requerido'),
    // document_type: yup.string().required('Este campo es requerido'),
    cellphone_code: yup.string().required('Este campo es requerido'),
    username: yup.string().when('readOnly', {
        is: (readOnly) => readOnly,
        then: (value) => value.required('Este campo es requerido'),
    }),
    password: yup.string().when('readOnly', {
        is: (readOnly) => readOnly,
        then: (value) => value.required('Este campo es requerido'),
    }),
    email: yup
        .string()
        .email('Debe ser un email válido')
        .required('Este campo es requerido'),
    active: yup.boolean(),
})

interface FleetProfileProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
}

const FareProfile = ({ fleetId, onlyView, readOnly }: FleetProfileProps) => {
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
    const [optionSelected, setOptionSelected] = React.useState<any>([])
    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)
    const [active, setActive] = React.useState<boolean>(true)
    const company = useSelector(
        (state: DefaultRootStateProps) => state.login.user?.company_info?.id
    )
    const roles = useSelector(
        (state: DefaultRootStateProps) => state.login?.user?.roles
    )
    const employees = useSelector(
        (state: DefaultRootStateProps) => state.employee
    )
    const tolls = useSelector((state: DefaultRootStateProps) => state.tolls)

    const [employeeData] = React.useState<employees | any>(
        readOnlyState
            ? employees?.find((employee) => employee.id === fleetId)
            : []
    )

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleActive = () => {
        setValue('active', !active, {
            shouldValidate: true,
        })
        setActive(!active)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        setValue('first_name', employeeData?.first_name)
        setValue('middle_name', employeeData?.middle_name)
        setValue('last_name', employeeData?.last_name)
        setValue('second_last_name', employeeData?.second_last_name)
        setValue('cellphone_code', employeeData?.mobile.substring(0, 4))
        setValue('phone_number', employeeData?.mobile.slice(4))
        setValue('sex', employeeData?.sex)
        setValue('personal_id', employeeData?.personal_id)
        setValue('role', employeeData?.role)
        setValue('username', employeeData?.username)
        setValue('password', employeeData?.password)
        setValue('email', employeeData?.email)
        setValue('active', employeeData?.active)
    }

    React.useEffect(() => {
        dispatch(getTollsRequest({ _all_: true }))
        if (readOnlyState) {
            setValue('first_name', employeeData?.first_name)
            setValue('middle_name', employeeData?.middle_name)
            setValue('last_name', employeeData?.last_name)
            setValue('second_last_name', employeeData?.second_last_name)
            setValue('cellphone_code', employeeData?.mobile.substring(0, 4))
            setValue('phone_number', employeeData?.mobile.slice(4))
            setValue('sex', employeeData?.sex)
            setValue('personal_id', employeeData?.personal_id)
            setValue('role', employeeData?.role)
            setValue('username', employeeData?.username)
            setValue('password', employeeData?.password)
            setValue('email', employeeData?.email)
            setValue('active', employeeData?.active)
        }
    }, [dispatch, employeeData, setValue])

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log(data)
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)

        const {
            first_name,
            middle_name,
            second_last_name,
            sex,
            last_name,
            personal_id,
            role,
            cellphone_code,
            phone_number,
            username,
            password,
            email,
        } = data

        if (!editable) {
            dispatch(
                createEmployeesRequest({
                    first_name,
                    middle_name,
                    last_name,
                    second_last_name,
                    mobile: `${cellphone_code}${phone_number}`,
                    sex,
                    toll_site: optionSelected,
                    personal_id,
                    role,
                    company: company,
                    username,
                    password,
                    email,
                    active: active,
                })
            )
        }

        if (editable) {
            dispatch(
                updateEmployeesRequest({
                    id: employeeData.id,
                    first_name,
                    middle_name,
                    last_name,
                    second_last_name,
                    mobile: `${cellphone_code}${phone_number}`,
                    sex,
                    toll_site: optionSelected,
                    personal_id,
                    role,
                    company: company,
                    username,
                    password,
                    email,
                    active: active,
                })
            )
        }
        navigate(`/empleados`)
    }

    const handleTable = () => {
        navigate(`/empleados`)
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Datos del empleado</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item sm zeroMinWidth></Grid>
                    {!onlyView && readOnly ? (
                        <Grid item>
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={handleAbleToEdit}
                                >
                                    Editar
                                </Button>
                            </AnimateButton>
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>

            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="first_name"
                            control={control}
                            // defaultValue={dataEmployee?.first_name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Primer nombre"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.first_name}
                                    helperText={errors.first_name?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="middle_name"
                            control={control}
                            // defaultValue={dataEmployee?.second_name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Segundo nombre"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.middle_name}
                                    helperText={errors.middle_name?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="last_name"
                            control={control}
                            // defaultValue={dataEmployee?.last_name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Primer apellido"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.last_name}
                                    helperText={errors.last_name?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="second_last_name"
                            control={control}
                            // defaultValue={dataEmployee?.last_name_2 || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Segundo apellido"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.second_last_name}
                                    helperText={
                                        errors.second_last_name?.message
                                    }
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>

                    <Controller
                        name="sex"
                        control={control}
                        defaultValue={employeeData?.sex}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={2}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    label="Sexo"
                                    fullWidth
                                    size="small"
                                    {...field}
                                    error={!!errors.sex}
                                    helperText={errors.sex?.message}
                                    disabled={readOnlyState}
                                >
                                    {SEX.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />
                    {/* <Controller
                        name="document_type"
                        control={control}
                        // defaultValue={dataEmployee?.identification?.charAt(0)}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={2}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    fullWidth
                                    label="Tipo"
                                    size="small"
                                    {...field}
                                    error={!!errors.document_type}
                                    helperText={errors.document_type?.message}
                                    disabled={readOnlyState}
                                >
                                    {RIF_OPTIONS.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={3}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="identification"
                            control={control}
                            // defaultValue={
                            //     dataEmployee?.identification.substr(1) || ''
                            // }
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Identificacion"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.identification}
                                    helperText={errors.identification?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid> */}
                    <Controller
                        name="cellphone_code"
                        control={control}
                        defaultValue={employeeData?.mobile}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={2}
                                className={classes.searchControl}
                            >
                                <TextField
                                    select
                                    label="04XX"
                                    fullWidth
                                    size="small"
                                    {...field}
                                    error={!!errors.cellphone_code}
                                    helperText={errors.cellphone_code?.message}
                                    disabled={readOnlyState}
                                >
                                    {NUMBER_CODE.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={3}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="phone_number"
                            control={control}
                            // defaultValue={dataEmployee?.phone.substr(4) || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Teléfono"
                                    onKeyDown={onKeyDown}
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.phone_number}
                                    helperText={errors.phone_number?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '25px',
                    }}
                >
                    <Typography variant="h4"> Datos del usuario </Typography>
                </Grid>
                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <SelectChip
                            options={tolls}
                            optionSelected={optionSelected}
                            setOptionSelected={setOptionSelected}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="personal_id"
                            control={control}
                            // defaultValue={dataEmployee?.id_user || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Código de usuario"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.personal_id}
                                    helperText={errors.personal_id?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="role"
                            control={control}
                            defaultValue={employeeData?.role}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Rol"
                                    size="small"
                                    select
                                    autoComplete="off"
                                    error={!!errors.role}
                                    helperText={errors.role?.message}
                                    disabled={readOnlyState}
                                >
                                    {roles.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                    </Grid>
                    {readOnly ? null : (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <Controller
                                name="username"
                                control={control}
                                // defaultValue={dataEmployee?.rol || ''}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        label="Nombre de usuario"
                                        size="small"
                                        autoComplete="off"
                                        error={!!errors.username}
                                        helperText={errors.username?.message}
                                        disabled={readOnlyState}
                                    />
                                )}
                            />
                        </Grid>
                    )}

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="password"
                            control={control}
                            // defaultValue={dataEmployee?.rol || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    type="password"
                                    label="Contraseña"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="email"
                            control={control}
                            // defaultValue={dataEmployee?.rol || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Correo electrónico"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    disabled={readOnlyState}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={6} md={6}>
                        <Controller
                            name="active"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    {...field}
                                    value="top"
                                    name="active"
                                    control={
                                        <Switch
                                            color="primary"
                                            onChange={handleActive}
                                            checked={active}
                                            disabled={readOnlyState}
                                        />
                                    }
                                    label="Activo"
                                    labelPlacement="start"
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
                        <Grid item>
                            {editable ? (
                                <Grid item sx={{ display: 'flex' }}>
                                    <AnimateButton>
                                        <Button
                                            // variant="contained"
                                            size="medium"
                                            onClick={handleCancelEdit}
                                            className="mx-4"
                                            color="error"
                                        >
                                            Cancelar
                                        </Button>
                                    </AnimateButton>
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            type="submit"
                                        >
                                            Aceptar
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            ) : null}
                            {readOnly ? null : (
                                <Grid item sx={{ display: 'flex' }}>
                                    <AnimateButton>
                                        <Button
                                            size="medium"
                                            onClick={handleTable}
                                            color="error"
                                            // disabled={loading}
                                            className="mx-4"
                                        >
                                            Cancelar
                                        </Button>
                                    </AnimateButton>
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            size="medium"
                                            type="submit"
                                        >
                                            Aceptar
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default FareProfile