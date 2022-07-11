import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { SaleTag } from 'types'
import { listCountPage } from 'store/commons/commonsActions'

export const listTag = (payload) => ({
    type: 'LIST_TAG',
    payload,
})

export const getTags = (payload) => ({
    type: 'GET_TAG',
    payload,
})

export const addTag = (payload) => ({
    type: 'ADD_TAG',
    payload,
})

export const updateTag = (payload) => ({
    type: 'UPDATE_TAG',
    payload,
})

export const deleteTag = (payload) => ({
    type: 'DELETE_TAG',
    payload,
})
const snackbarOpen = (message, type) => {
    return {
        type: SNACKBAR_OPEN,
        open: true,
        message: message,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        variant: 'alert',
        alertSeverity: type,
    }
}

// async request
export const getTagRequest = (tags) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'registered-tag/get/', tags)
            dispatch(listTag(data.data))
            dispatch(listCountPage(data.count_page))
            dispatch(snackbarOpen('Operación exitosa', 'success'))
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const getAllTagRequest = () => {
    return async (dispatch) => {
        try {
            const headers: object = {
                'Content-Type': 'application/json',
            }
            const responseType = 'arraybuffer'
            const data = await axiosRequest(
                'get',
                'registered-tag/get-template/',
                {},
                headers,
                responseType
            )
            const url = window.URL.createObjectURL(new Blob([data.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `modelo.xlsx`)
            document.body.appendChild(link)
            link.click()
            // dispatch(listExcelReport(data.data))
            dispatch(snackbarOpen('Operación exitosa', 'success'))
            return true
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const createTagRequest = (tagData: SaleTag) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'registered-tag/create/',
                tagData
            )

            dispatch(addTag(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Tag creado correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const updateTagRequest = (tagData: SaleTag) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'registered-tag/update/',
                tagData
            )
            dispatch(updateTag(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Tag actualizado exitoso',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}

export const deleteTagRequest = (tagData: SaleTag) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'registered-tag/update/',
                tagData
            )

            dispatch(deleteTag(data.data))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Eliminado con éxito',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch(snackbarOpen(error, 'error'))
        }
    }
}
