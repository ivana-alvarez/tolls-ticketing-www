import React from 'react'
import { useSelector } from 'react-redux'

// material-ui
import { makeStyles } from '@material-ui/styles'

import {
    CardContent,
    Grid,
    Tab,
    Tabs,
    Theme,
    Typography,
    CardActions,
} from '@material-ui/core'

import TagIconForm from '../icons/TagIconForm'
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
// import VpnKeyIcon from '@mui/icons-material/VpnKey'

// project imports
import MainCard from 'ui-component/cards/MainCard'
import { gridSpacing } from 'store/constant'

// assets

// import FleetProfile from './FleetProfile'
import { DefaultRootStateProps } from 'types'
import TagProfile from './TagProfile'

// style constant
const useStyles = makeStyles((theme: Theme) => ({
    profileTab: {
        '& .MuiTabs-flexContainer': {
            borderBottom: 'none',
            // color: '#5d299f',
        },
        '& button': {
            color:
                theme.palette.mode === 'dark'
                    ? theme.palette.grey[600]
                    : theme.palette.grey[600],
            minHeight: 'auto',
            minWidth: '100%',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            textAlign: 'left',
            justifyContent: 'flex-start',
        },
        '& button.Mui-selected': {
            color: theme.palette.primary.main,
            background:
                theme.palette.mode === 'dark'
                    ? theme.palette.dark.main
                    : theme.palette.grey[50],
        },
        '& button > svg': {
            marginBottom: '0px !important',
            marginRight: '10px',
            marginTop: '10px',
            height: '20px',
            width: '20px',
        },
        '& button > div > span': {
            display: 'block',
        },
        '& > div > span': {
            display: 'none',
        },
    },
    cardPanels: {
        borderLeft: '1px solid',
        borderLeftColor: theme.palette.mode === 'dark' ? '#333d5e' : '#eeeeee',
        height: '100%',
    },
}))

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

// ==============================|| PROFILE 2 ||============================== //

interface CompanyProfileProps {
    fleetId?: string
    readOnly?: boolean
    onlyView?: boolean
    createMode?: boolean
}
const TagIndex = ({
    fleetId,
    onlyView,
    readOnly,
    createMode,
}: CompanyProfileProps) => {
    // tabs
    function TabPanel(props: {
        children: React.ReactElement
        value: number
        index: number
    }) {
        const { children, value, index, ...other } = props

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <div>{children}</div>}
            </div>
        )
    }

    // tabs option
    const tabsOption = [
        {
            label: 'Agregar Tag',
            icon: <TagIconForm />,
            caption: 'Vincular un tag con su categoría asociada',
        },
        // {
        //     label: 'Datos bancarios',
        //     icon: <AccountBalanceIcon />,
        //     caption: 'Configuración de métodos de pago',
        // },
        // {
        //     label: 'Cambiar contraseña',
        //     icon: <VpnKeyIcon />,
        //     caption: 'Configuración de seguridad del perfil',
        // },
    ]

    const classes = useStyles()
    const customization = useSelector(
        (state: DefaultRootStateProps) => state.customization
    )

    const [value, setValue] = React.useState<number>(0)

    const handleChange = (event: React.SyntheticEvent, newValue) => {
        setValue(newValue)
    }

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard sx={{ padding: '15px' }} content={false}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12} lg={4}>
                            <CardContent>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    orientation="vertical"
                                    className={classes.profileTab}
                                    variant="scrollable"
                                    sx={{
                                        '& button': {
                                            borderRadius: `${customization.borderRadius}px`,
                                        },
                                    }}
                                >
                                    {tabsOption.map((tab, index) => (
                                        <Tab
                                            key={index}
                                            icon={tab.icon}
                                            label={
                                                <Grid
                                                    container
                                                    direction="column"
                                                >
                                                    <Typography
                                                        variant="subtitle1"
                                                        color="inherit"
                                                    >
                                                        {tab.label}
                                                    </Typography>
                                                    <Typography
                                                        component="div"
                                                        variant="caption"
                                                        sx={{
                                                            textTransform:
                                                                'none',
                                                        }}
                                                    >
                                                        {tab.caption}
                                                    </Typography>
                                                </Grid>
                                            }
                                            {...a11yProps(index)}
                                        />
                                    ))}
                                </Tabs>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <CardContent className={classes.cardPanels}>
                                <TabPanel value={value} index={0}>
                                    <TagProfile
                                        fleetId={fleetId}
                                        readOnly={readOnly}
                                        createMode={createMode}
                                    />
                                </TabPanel>
                                {/* <TabPanel value={value} index={1}>
                                    <ProfileBank />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <ProfilePassword />
                                </TabPanel> */}
                            </CardContent>
                        </Grid>
                    </Grid>
                    {/* <Divider /> */}
                    <CardActions>
                        <Grid
                            container
                            justifyContent="space-between"
                            spacing={0}
                        >
                            {/* <Grid item>
                                {value > 0 && (
                                    <AnimateButton>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            onClick={(e) =>
                                                handleChange(e, value - 1)
                                            }
                                        >
                                            Atrás
                                        </Button>
                                    </AnimateButton>
                                )}
                            </Grid> */}
                        </Grid>
                    </CardActions>
                </MainCard>
            </Grid>
        </Grid>
    )
}

export default TagIndex
