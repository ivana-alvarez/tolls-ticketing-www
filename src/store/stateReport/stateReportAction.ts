// import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'

export const listReportState = (payload) => ({
    type: 'LIST_STATE_REPORT',
    payload,
})

// const snackbarOpen = (message, type) => {
//     return {
//         type: SNACKBAR_OPEN,
//         open: true,
//         message: message,
//         anchorOrigin: { vertical: 'top', horizontal: 'right' },
//         variant: 'alert',
//         alertSeverity: type,
//     }
// }

export const getStatesReportRequest = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'state/by_site/', {
                _all_: true,
            })
            dispatch(listReportState(data.data))

            // dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            // dispatch(snackbarOpen(error, 'error'))
        }
    }
}
