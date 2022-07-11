import React from 'react'
import * as yup from 'yup'
// import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
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
    TextField,
    Theme,
    Typography,
    CardActions,
    MenuItem,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {
    getAllTagRequest,
    updateTagRequest,
} from 'store/saleTag/saleTagActions'
import { useDispatch, useSelector } from 'react-redux'
// import { DefaultRootStateProps } from 'types'
// import { vehicle } from '_mockApis/vehicle_category/vehicle'
import { DefaultRootStateProps, SaleTag } from 'types'
import { useNavigate } from 'react-router'
import { Media } from 'store/constant'
import AcceptButton from 'components/buttons/AcceptButton'
import EditButton from 'components/buttons/EditButton'
import CancelEditButton from 'components/buttons/CancelEditButton'
import DownloadButton from 'components/buttons/DownloadButton'
// import axios from 'axios'

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
    tag_number: string
    tag_serial: string
    media: string
    proofOfPaymentType: string
    uploadFile: any
}

const Schema = yup.object().shape({
    // tag_number: yup
    //     .string()
    //     .required('Este campo es requerido')
    //     .max(12, 'Debe tener máximo 12 carácteres'),
    // tag_serial: yup.string().required('Este campo es requerido'),
    // media: yup.string().required('Este campo es requerido'),
    proofOfPaymentType: yup.string(),
    uploadFile: yup.mixed().when('proofOfPaymentType', {
        is: (val) => val !== 'sin comprobante',
        then: yup
            .mixed()
            .test('name', 'Debes subir un comprobante', (value) => {
                return value[0] && value[0].name !== ''
            })
            .test('fileSize', 'Supera el tamaño máximo', (value) => {
                return value[0] && value[0].size <= 1000000
            })
            .test('type', 'Solo soporta .xlsx (excel)', (value) => {
                if (
                    value[0]?.type.includes(
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    )
                ) {
                    return true
                }

                return false
            }),
    }),
})

interface FleetProfileProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
    createMode?: boolean
}

const TagProfile = ({
    fleetId,
    onlyView,
    readOnly,
    createMode,
}: FleetProfileProps) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const tag = useSelector((state: DefaultRootStateProps) => state.saleTag)

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        register,
        getValues,
    } = useForm<Inputs>({
        resolver: yupResolver(Schema),
    })

    const [readOnlyState, setReadOnlyState] = React.useState<
        boolean | undefined
    >(readOnly)

    const [loading, setLoading] = React.useState(false)
    const [editable, setEditable] = React.useState<boolean>(false)
    const [TagData] = React.useState<SaleTag | undefined>(
        tag?.find((tag) => tag.id === fleetId)
    )
    const [selectedFile, setSelectedFile] = React.useState(null)
    const [showButton, setShowButton] = React.useState(false)

    // const [usedTitle, setUsedTitle] = React.useState<boolean>(true)

    // const [dataUser, setDataUser] = React.useState<any>([])

    // const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const name = event.target.name

    //     if (name === 'active') {
    //         setUsedTitle(!usedTitle)
    //         setValue(name, !usedTitle)
    //     }
    // }
    const uploadPhoto = async (e) => {
        const file = e.target?.files[0]
        setSelectedFile(file)
        setValue('uploadFile', e.target.files, { shouldValidate: true })
    }

    const handleAbleToEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
    }

    const handleCancelEdit = () => {
        setReadOnlyState(!readOnlyState)
        setEditable(!editable)
        setValue('tag_number', TagData?.tag_number, {
            shouldValidate: true,
        })
        setValue('tag_serial', TagData?.tag_serial, {
            shouldValidate: true,
        })
        setValue('media', TagData?.media, {
            shouldValidate: true,
        })
    }
    React.useEffect(() => {
        setValue('tag_number', TagData?.tag_number)
        setValue('tag_serial', TagData?.tag_serial)
        setValue('media', TagData?.media)
    }, [TagData, setValue])
    const onInvalid = (data) => {
        console.log(data)
    }
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const { tag_number, tag_serial, media } = data

        const file = getValues('uploadFile')[0]

        const formData = new FormData()

        Object.entries({ file }).forEach(([key, value]) => {
            //@ts-ignore
            formData.append(key, value)
        })
        const url =
            'http://api.regional-toll-qa.local:11089/api/registered-tag/upload/?file'
        const upload = await fetch(url, {
            method: 'POST',
            body: formData,
            credentials: 'include',
        })
        console.log(upload)

        // const fetchData1 = async () => {
        //     setLoading(true)
        //     const responseData1 = await dispatch(
        //         createTagRequest({
        //             tag_number,
        //             tag_serial,
        //             media: media.toUpperCase(),
        //             is_deleted: false,
        //         })
        //     )
        //     setLoading(false)
        //     return responseData1
        // }
        const fetchData2 = async () => {
            setLoading(true)
            const responseData2 = await dispatch(
                updateTagRequest({
                    id: TagData?.id,
                    tag_number,
                    tag_serial,
                    media: media.toUpperCase(),
                    is_deleted: false,
                })
            )
            setLoading(false)
            return responseData2
        }
        if (!editable) {
            // upload()
        }

        if (editable) {
            fetchData2()
        }
        navigate(`/ventaTag`)
    }
    // const handleTable = () => {
    //     navigate(`/ventaTag`)
    // }
    const handleDownload = () => {
        const fetchData1 = async () => {
            setLoading(true)
            const responseData1 = await dispatch(getAllTagRequest())
            setLoading(false)
            setShowButton(true)
            return responseData1
        }

        fetchData1()
    }

    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h4">Carga de soportes</Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
                    {/* <Grid item>
                        <Avatar
                            alt="logo de la empresa"
                            className={classes.userAvatar}
                        />
                    </Grid> */}
                    <Grid item sm zeroMinWidth></Grid>
                    {!onlyView && readOnly ? (
                        <Grid item>
                            <EditButton
                                loading={loading}
                                handleAbleToEdit={handleAbleToEdit}
                            />
                        </Grid>
                    ) : null}
                </Grid>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
                {!onlyView && readOnly ? (
                    <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                        <Controller
                            name="tag_number"
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
                                        label="Número de tag"
                                        fullWidth
                                        size="small"
                                        autoComplete="off"
                                        {...field}
                                        error={!!errors.tag_number}
                                        helperText={errors.tag_number?.message}
                                        disabled={readOnlyState}
                                    />
                                </Grid>
                            )}
                        />

                        <Controller
                            name="tag_serial"
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
                                        label="Serial del tag"
                                        fullWidth
                                        size="small"
                                        autoComplete="off"
                                        {...field}
                                        error={!!errors.tag_serial}
                                        helperText={errors.tag_serial?.message}
                                        disabled={readOnlyState}
                                    />
                                </Grid>
                            )}
                        />

                        <Controller
                            name="media"
                            control={control}
                            defaultValue={TagData?.media}
                            render={({ field }) => (
                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    className={classes.searchControl}
                                >
                                    <TextField
                                        label="Media"
                                        fullWidth
                                        select
                                        size="small"
                                        autoComplete="off"
                                        {...field}
                                        error={!!errors.media}
                                        helperText={errors.media?.message}
                                        disabled={readOnlyState}
                                    >
                                        {Media.map((option) => (
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
                    </Grid>
                ) : null}

                {createMode ? (
                    <>
                        <div className="w-full md:w-1/2 px-4 my-4">
                            <DownloadButton
                                loading={loading}
                                handleDownload={handleDownload}
                            />
                        </div>

                        {showButton ? (
                            <div className="w-full md:w-1/2 px-4 my-4">
                                <label className="font-bold">
                                    Archivo{' '}
                                    {errors.uploadFile?.message ? (
                                        <span className="text-red-600">
                                            ({errors.uploadFile?.message})
                                        </span>
                                    ) : null}
                                </label>
                                <label
                                    className={`flex mt-1 justify-center h-10 items-center text-white hover:text-black rounded-lg hover:border-logo border-2 cursor-pointer ${
                                        selectedFile && !errors.uploadFile
                                            ? 'bg-greenO'
                                            : 'bg-green'
                                    }`}
                                >
                                    <svg
                                        className="w-8 h-8 mx-2 "
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                    </svg>
                                    <span className=" text-base leading-normal mx-2 font-bold">
                                        Subir Archivo
                                    </span>

                                    <input
                                        type="file"
                                        className="hidden"
                                        {...register('uploadFile')}
                                        name="uploadFile"
                                        onChange={uploadPhoto}
                                    />
                                </label>
                            </div>
                        ) : null}
                    </>
                ) : null}

                <CardActions>
                    <Grid container justifyContent="flex-end" spacing={0}>
                        <Grid item>
                            {editable ? (
                                <Grid item sx={{ display: 'flex' }}>
                                    <CancelEditButton
                                        loading={loading}
                                        handleCancelEdit={handleCancelEdit}
                                    />
                                    <AcceptButton loading={loading} />
                                </Grid>
                            ) : null}
                            {readOnly ? null : (
                                <>
                                    {/* <Grid item>
                                        <CancelButton loading={loading} handleTable={handleTable} />
                                    </Grid> */}
                                    <Grid item>
                                        <AcceptButton loading={loading} />
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

export default TagProfile
