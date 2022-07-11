// import  React from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'

import MenuItem from '@mui/material/MenuItem'

import { SelectChangeEvent } from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { TextField } from '@material-ui/core'
// import { makeStyles } from '@material-ui/styles'

// const useStyles = makeStyles((theme: Theme) => ({
//     searchControl: {
//         width: '100%',
//         '& input': {
//             background: 'transparent !important',
//         },
//         '& .Mui-focused input': {
//             boxShadow: 'none',
//         },
//         ' & .css-1xu5ovs-MuiInputBase-input-MuiOutlinedInput-input': {
//             color: '#6473a8',
//         },

//         // [theme.breakpoints.down('lg')]: {
//         //     width: '250px',
//         // },
//         [theme.breakpoints.down('md')]: {
//             width: '100%',
//             marginLeft: '4px',
//         },
//     },
// }))

function getStyles(
    name: string,
    optionSelected: readonly string[],
    theme: Theme
) {
    return {
        fontWeight:
            optionSelected.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

export default function MultipleSelectChip({
    options,
    optionSelected,
    setOptionSelected,
    employeeData,
    readOnlyState,
}) {
    const theme = useTheme()
    // const classes = useStyles()

    const handleChange = (event: SelectChangeEvent<typeof optionSelected>) => {
        const {
            target: { value },
        } = event
        setOptionSelected(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        )
    }

    const handleBox = (Selected) => {
        return (
            <Box>
                {Selected.map((value) => {
                    const findLabel = options.find(
                        (option) => option.id === value
                    )

                    return <Chip key={value} label={findLabel?.name} />
                })}
            </Box>
        )
    }

    return (
        <div>
            <TextField
                select
                fullWidth
                label="Nodos"
                size="small"
                autoComplete="off"
                disabled={readOnlyState}
                SelectProps={{
                    multiple: true,
                    value: optionSelected,
                    onChange: handleChange,
                    variant: 'standard',
                    renderValue: (selected) => {
                        return handleBox(selected)
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option.id}
                        value={option.id}
                        style={getStyles(option, optionSelected, theme)}
                    >
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    )
}
