import React from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// import { v4 as uuidv4 } from 'uuid'
import {
    useForm,
    SubmitHandler,
    Controller,
    SubmitErrorHandler,
} from 'react-hook-form'

import { useNavigate } from 'react-router-dom'
// material-ui
import { makeStyles } from '@material-ui/styles'
import {
    Grid,
    Button,
    TextField,
    Theme,
    Typography,
    FormControlLabel,
    // Checkbox,
    CardActions,
    Divider,
    // FormHelperText,
    Switch,
    MenuItem,
} from '@material-ui/core'
import AnimateButton from 'ui-component/extended/AnimateButton'

import { useDispatch, useSelector } from 'react-redux'
// project imports
import { gridSpacing } from 'store/constant'

import { createLaneRequest, updateLaneRequest } from 'store/lane/laneActions'
// import { getTollsALLRequest } from 'store/toll/tollActions'
import { DefaultRootStateProps, TLanes } from 'types'
import { getEquipRequest } from 'store/equip/EquipActions'
import { direction } from '_mockApis/toll/mockToll'
import { onKeyDown } from 'components/utils'
import SelectChip from './SelectChip'

// style constant
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
    ButtonControl: {
        width: '50%',
        '& input': {
            color: ' transparent !important',
            marginLeft: '5px',
        },
        [theme.breakpoints.down('md')]: {
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark[800]
                    : '#ffff',
        },
    },
    borderDebug: {
        border: '1px solid red',
    },
    input: {
        opacity: 0,
        position: 'absolute',
        zIndex: 1,
        padding: 0.5,
        cursor: 'pointer',
        width: '30%',
    },
}))

//types form
interface Inputs {
    name: string
    lane_code: string
    width_m: number
    height_m: number
    direction: string
    is_active: boolean
    parent_nodes: string
}
//schema validation
const Schema = yup.object().shape({
    name: yup
        .string()
        .required('Este campo es requerido')
        .min(3, 'Mínimo 3 caracteres')
        .max(50, 'Máximo 50 caracteres'),
    lane_code: yup.string().required('Este campo es requerido'),
    height_m: yup
        .number()
        .typeError('Debe ser un número')
        .min(0.01, 'Este valor no puede ser menor a 0.01m')
        .required('Este campo es requerido'),
    width_m: yup
        .number()
        .typeError('Debe ser un número')
        .min(0.01, 'Este valor no puede ser menor a 0.01m')
        .required('Este campo es requerido'),
    direction: yup.string().required('Este campo es requerido'),
    is_active: yup.boolean(),
})
// ==============================|| COMPANY PROFILE FORM ||============================== //
interface CompanyProfileFormProps {
    tollIdParam?: string
    readOnly?: boolean
    onlyView?: boolean
    setTabValue?: any
    tollData?: any
    handleEditLanes?: () => void
    dataLane?: any
    handleTable: () => void
    add?: number
    handleCreateNew: (boo: boolean) => void
    selectedLaneId?: any
    setEditLane?: any
    setNeww?: any
}

const LineForm = ({
    tollIdParam,
    readOnly,
    setTabValue,
    tollData,
    handleEditLanes,
    dataLane,
    handleTable,
    add,
    handleCreateNew,
    selectedLaneId,
    setEditLane,
    setNeww,
}: CompanyProfileFormProps) => {
    // CUSTOMS HOOKS
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const { id } = useParams()

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        // getValues,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })
    // STATES

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)
    const [editable, setEditable] = React.useState<boolean>(false)

    const [LaneData] = React.useState<TLanes | any>(
        readOnlyState
            ? tollData?.lanes.find((lane) => lane.id === selectedLaneId)
            : []
    )
    const [active, setActive] = React.useState<boolean>(
        readOnly ? !!LaneData?.is_active : true
    )

    const [loading, setLoading] = React.useState(true)

    const [optionSelected, setOptionSelected] = React.useState<any>(
        readOnlyState
            ? tollData?.lanes?.find((lane) => lane.id === selectedLaneId)
                  ?.parent_nodes
            : []
    )

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const responseData = await dispatch(
                getEquipRequest({ parent_site: tollData.id, is_deleted: false })
            )

            setLoading(false)
            return responseData
        }

        fetchData()
    }, [dispatch, tollData])

    const equips = useSelector((state: DefaultRootStateProps) => state.equips)

    const onInvalid: SubmitErrorHandler<Inputs> = (data, e) => {
        console.log(data)
    }
    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const { lane_code, name, direction, height_m, width_m } = data

        if (!editable) {
            dispatch(
                createLaneRequest({
                    lane_code,
                    name,
                    direction,
                    height_m,
                    width_m,
                    is_active: active,
                    parent_nodes: optionSelected,
                })
            )

            // dispatch(getTollsALLRequest(id))
            navigate(`/peajes/editar/${tollIdParam}`)

            handleCreateNew(false)
            handleReturnTable()
        }
        if (editable) {
            dispatch(
                updateLaneRequest({
                    id: LaneData.id,
                    lane_code,
                    name,
                    direction,
                    height_m,
                    width_m,
                    is_active: active,
                    parent_nodes: optionSelected,
                })
            )
            // dispatch(getTollsALLRequest(id))
            navigate(`/peajes/editar/${tollIdParam}`)
            handleReturnTable()
        }
    }

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }
    const handleActive = () => {
        setValue('is_active', !active, {
            shouldValidate: true,
        })
        setActive(!active)
        // setEqualBankInfo(false)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        setValue('name', LaneData?.name)
        setValue('lane_code', LaneData?.lane_code)
        setValue('direction', LaneData?.direction)
        setValue('is_active', LaneData?.is_active)
        setValue('width_m', LaneData?.width_m)
        setValue('height_m', LaneData?.height_m)
        setValue('parent_nodes', LaneData?.parent_nodes)
    }
    React.useEffect(() => {
        if (readOnlyState) {
            setValue('name', LaneData?.name)
            setValue('lane_code', LaneData?.lane_code)
            setValue('direction', LaneData?.direction)
            setValue('is_active', LaneData?.is_active)
            setValue('width_m', LaneData?.width_m)
            setValue('height_m', LaneData?.height_m)
            setValue('parent_nodes', LaneData?.parent_nodes)
            // dispatch(getEquipRequest({ _all_: true }))
        }
    }, [tollData, dispatch, setValue])

    const handleReturnTable = () => {
        setEditLane(false)
        setNeww(false)
    }

    return (
        <>
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4"> Datos de canales </Typography>
                {readOnlyState ? (
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

            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Grid container spacing={gridSpacing} sx={{ marginTop: '5px' }}>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        className={classes.searchControl}
                    >
                        <Controller
                            name="lane_code"
                            control={control}
                            // defaultValue={dataLane?.name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Código para el canal"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.lane_code}
                                    helperText={errors.lane_code?.message}
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
                            name="name"
                            control={control}
                            // defaultValue={dataLane?.name || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Nombre"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
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
                            name="direction"
                            control={control}
                            defaultValue={LaneData?.direction}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    select
                                    label="Dirección"
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.direction}
                                    helperText={errors.direction?.message}
                                    disabled={readOnlyState}
                                >
                                    {direction.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
                            name="width_m"
                            control={control}
                            // defaultValue={dataLane?.state || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Ancho(m)"
                                    onKeyDown={onKeyDown}
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.width_m}
                                    helperText={errors.width_m?.message}
                                    disabled={readOnlyState}
                                    // onChange={(event) => handleState(event)}
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
                            name="height_m"
                            control={control}
                            // defaultValue={dataLane?.state || ''}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Alto(m)"
                                    onKeyDown={onKeyDown}
                                    size="small"
                                    autoComplete="off"
                                    error={!!errors.height_m}
                                    helperText={errors.height_m?.message}
                                    disabled={readOnlyState}
                                    // onChange={(event) => handleState(event)}
                                />
                            )}
                        />
                    </Grid>

                    {!loading ? (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <SelectChip
                                options={equips}
                                optionSelected={optionSelected}
                                setOptionSelected={setOptionSelected}
                                readOnlyState={readOnlyState}
                                employeeData={dataLane}
                            />
                        </Grid>
                    ) : (
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            className={classes.searchControl}
                        >
                            <TextField
                                fullWidth
                                label="Nodos"
                                size="small"
                                autoComplete="off"
                                disabled={true}
                            />
                        </Grid>
                    )}

                    <Grid item xs={6} md={6}>
                        <Controller
                            name="is_active"
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
                                    label="Habilitado"
                                    labelPlacement="start"
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ marginTop: '70px' }} />
                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
                        {editable ? (
                            <Grid item sx={{ display: 'flex' }}>
                                <AnimateButton>
                                    <Button
                                        //variant="contained"
                                        color="error"
                                        size="large"
                                        onClick={handleCancelEdit}
                                        className="mx-4"
                                    >
                                        Cancelar
                                    </Button>
                                </AnimateButton>
                                <AnimateButton>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        type="submit"
                                        // onclick={}
                                    >
                                        Aceptar
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        ) : null}
                        {readOnly ? null : (
                            <Grid
                                container
                                justifyContent="flex-end"
                                sx={{ marginBottom: '-45px' }}
                            >
                                <Grid item>
                                    <AnimateButton>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            type="submit"
                                        >
                                            Crear canal
                                        </Button>
                                    </AnimateButton>
                                </Grid>
                            </Grid>
                        )}
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <AnimateButton>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={handleReturnTable}
                                    >
                                        Volver
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardActions>
            </form>
        </>
    )
}

export default LineForm
