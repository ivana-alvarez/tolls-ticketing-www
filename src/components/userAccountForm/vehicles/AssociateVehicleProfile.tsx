import React from 'react'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
// import { DefaultRootStateProps } from 'types'

// material-ui
import {
    Grid,
    // TextField,
    Theme,
    Typography,
    CardActions,
    // MenuItem,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AnimateButton from 'ui-component/extended/AnimateButton'
import TextField from '@mui/material/TextField'
import { MenuItem } from '@mui/material'
//REDUX
import { useSelector, useDispatch } from 'react-redux'
import { DefaultRootStateProps, account } from 'types'

import { useNavigate } from 'react-router'
import { getCategoryRequest } from 'store/Category/CategoryActions'
import { getTagRequest } from 'store/saleTag/saleTagActions'
import {
    createVehiclesRequest,
    updateVehiclesRequest,
} from 'store/gestionCuentas/AccountActions'

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
    license_plate: string
    make?: string
    vin?: string
    model: string
    year: string
    color: string
    category: string
    axles: number
    weight: number
    tag_id: string
}

const Schema = yup.object().shape({
    license_plate: yup
        .string()
        .max(8, 'Máximo 8 caracteres')
        .required('Este campo es requerido'),
    make: yup.string().required('Este campo es requerido'),
    vin: yup.string().required('Este campo es obligatorio'),
    model: yup.string().required('Este campo es requerido'),
    year: yup.number().required('Este campo es requerido'),
    color: yup.string().required('Este campo es requerido'),
    category: yup.string().required('Este campo es requerido'),
    axles: yup.number().required('Este campo es requerido'),
    weight: yup.number().required('Este campo es requerido'),
    tag_id: yup.string().required('Este campo es requerido'),
})

interface FleetProfileProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
    userData?: any
    handleEditVehicle?: () => void
    handleCreateNew: (boo: boolean) => void
    dataVehicle?: any
}

const AssociateVehicleProfile = ({
    fleetId,
    onlyView,
    readOnly,
    userData,
    handleEditVehicle,
    handleCreateNew,
    dataVehicle,
}: FleetProfileProps) => {
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

    // const accounts = useSelector(
    //     (state: DefaultRootStateProps) => state.account
    // )

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [editable, setEditable] = React.useState<boolean>(false)

    const [AccountData] = React.useState<account | any>(
        readOnlyState
            ? userData?.vehicles?.find((user) => user.id === fleetId)
            : []
    )

    console.log(AccountData)
    console.log(userData?.vehicles)

    const category = useSelector(
        (state: DefaultRootStateProps) => state.category
    )
    const tag = useSelector((state: DefaultRootStateProps) => state.saleTag)
    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        if (readOnlyState) {
            setValue('tag_id', userData?.vehicles?.tag_id, {})
            setValue('make', userData?.vehicles?.make, {})
            setValue('model', userData?.vehicles?.model, {})
            setValue('vin', userData?.vehicles?.vin, {})
            setValue('year', userData?.vehicles?.year, {})
            setValue('color', userData?.vehicles?.color, {})
            setValue('category', userData?.vehicles?.category, {})
            setValue('axles', userData?.vehicles?.axles, {})
            setValue('weight', userData?.vehicles?.weight, {})
            setValue('license_plate', userData?.vehicles?.license_plate, {})
        }
    }

    React.useEffect(() => {
        dispatch(getCategoryRequest())
        dispatch(getTagRequest())
        if (readOnlyState) {
            setValue('tag_id', userData?.vehicles?.tag_id, {})
            setValue('make', userData?.vehicles?.make, {})
            setValue('model', userData?.vehicles?.model, {})
            setValue('vin', userData?.vehicles?.vin, {})
            setValue('year', userData?.vehicles?.year, {})
            setValue('color', userData?.vehicles?.color, {})
            setValue('category', userData?.vehicles?.category, {})
            setValue('axles', userData?.vehicles?.axles, {})
            setValue('weight', userData?.vehicles?.weight, {})
            setValue('license_plate', userData?.vehicles?.license_plate, {})
        }
    }, [dispatch, setValue, readOnlyState])
    const onInvalid = (data) => {
        console.log(data)
    }

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const {
            tag_id,

            model,
            year,
            color,
            category,
            axles,
            weight,
            license_plate,
            make,
            vin,
        } = data
        if (!editable) {
            dispatch(
                createVehiclesRequest({
                    holder_id: userData?.id,
                    tag_id,
                    model,
                    year,
                    color,
                    category,
                    axles,
                    weight,
                    license_plate,
                    make,
                    vin,
                })
            )
        }

        if (editable) {
            dispatch(
                updateVehiclesRequest({
                    holder_id: userData?.id,
                    id: userData?.vehicles?.id,
                    tag_id,
                    make,
                    model,
                    year,
                    color,
                    category,
                    axles,
                    weight,
                    license_plate,
                    vin,
                })
            )
        }
    }
    const handleTable = () => {
        navigate(`/gestion-de-cuentas-usuarios/editar/${fleetId}`)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4">Asociación de vehiculo</Typography>

                    {!onlyView && readOnly ? (
                        <Grid item sx={{ marginRight: '16px' }}>
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
                <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                    <Controller
                        name="tag_id"
                        control={control}
                        defaultValue={userData?.vehicles?.tag_id}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    {...field}
                                    fullWidth
                                    select
                                    label="Tag"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.tag_id}
                                    helperText={errors.tag_id?.message}
                                    disabled={readOnlyState}
                                >
                                    {tag.map((option) => (
                                        <MenuItem
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {option.tag_number}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        )}
                    />

                    <Controller
                        name="make"
                        control={control}
                        defaultValue={userData?.vehicles?.make}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Marca del vehiculo"
                                    fullWidth
                                    select
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.make}
                                    helperText={errors.make?.message}
                                    disabled={readOnlyState}
                                >
                                    {
                                        <MenuItem key={'Ford'} value={'ford'}>
                                            {'Ford'}
                                        </MenuItem>
                                    }
                                </TextField>
                            </Grid>
                        )}
                    />
                    <Controller
                        name="model"
                        control={control}
                        defaultValue={userData?.vehicles?.model}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Modelo del vehiculo"
                                    fullWidth
                                    select
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.model}
                                    helperText={errors.model?.message}
                                    disabled={readOnlyState}
                                >
                                    {
                                        <>
                                            <MenuItem
                                                key={'explorer'}
                                                value={'explorer'}
                                            >
                                                {'Explorer'}
                                            </MenuItem>
                                            <MenuItem
                                                key={'escape'}
                                                value={'escape'}
                                            >
                                                {'Escape'}
                                            </MenuItem>
                                            <MenuItem
                                                key={'fiesta'}
                                                value={'fiesta'}
                                            >
                                                {'Fiesta'}
                                            </MenuItem>
                                        </>
                                    }
                                </TextField>
                            </Grid>
                        )}
                    />
                    {/* <Controller
                        name="license_plate"
                        control={control}
                        // defaultValue={fleetData?.unit_id}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Tipo de vehiculo"
                                    fullWidth
                                    select
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.license_plate}
                                    helperText={errors.license_plate?.message}
                                    disabled={readOnlyState}
                                >
                                    {
                                        <>
                                            <MenuItem
                                                key={'sedan'}
                                                value={'sedan'}
                                            >
                                                {'Sedan'}
                                            </MenuItem>
                                            <MenuItem
                                                key={'pickup'}
                                                value={'pickup'}
                                            >
                                                {'Pickup'}
                                            </MenuItem>
                                            <MenuItem
                                                key={'coupe'}
                                                value={'coupe'}
                                            >
                                                {'Coupé'}
                                            </MenuItem>
                                        </>
                                    }
                                </TextField>
                            </Grid>
                        )}
                    /> */}
                    <Controller
                        name="category"
                        control={control}
                        defaultValue={userData?.vehicles?.category}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Categoria"
                                    fullWidth
                                    select
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.category}
                                    helperText={errors.category?.message}
                                    disabled={readOnlyState}
                                >
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
                        name="license_plate"
                        control={control}
                        // defaultValue={fleetData?.unit_id}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Placa del vehiculo"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.license_plate}
                                    helperText={errors.license_plate?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="vin"
                        control={control}
                        // defaultValue={fleetData?.unit_id}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Vin"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.vin}
                                    helperText={errors.vin?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />
                    <Controller
                        name="axles"
                        control={control}
                        // defaultValue={fleetData?.unit_id}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Configuración de ejes"
                                    fullWidth
                                    type="number"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.axles}
                                    helperText={errors.axles?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />

                    <Controller
                        name="weight"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="Peso del vehiculo"
                                    fullWidth
                                    type="number"
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.weight}
                                    helperText={errors.weight?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />
                    <Controller
                        name="color"
                        control={control}
                        render={({ field }) => (
                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.searchControl}
                            >
                                <TextField
                                    label="color del vehiculo"
                                    fullWidth
                                    size="small"
                                    autoComplete="off"
                                    {...field}
                                    error={!!errors.color}
                                    helperText={errors.color?.message}
                                    disabled={readOnlyState}
                                />
                            </Grid>
                        )}
                    />
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
                            {editable ? null : (
                                <>
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
                                                Asociar
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default AssociateVehicleProfile