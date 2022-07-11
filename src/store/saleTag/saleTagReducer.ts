import { AnyAction } from 'redux'
import { SaleTag } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const saleTagReducer = (
    state: Array<SaleTag> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_TAG':
            return action.payload
        case 'GET_TAG':
            return action.payload
        case 'ADD_TAG':
            return [action.payload, ...state]
        case 'UPDATE_TAG': {
            const deleteTag = state.filter(
                (tag) => tag?.id !== action.payload.id
            )
            return [...deleteTag, action.payload]
        }

        case 'DELETE_TAG': {
            const deleteTags = state.filter(
                (tags) => tags?.id !== action.payload.id
            )
            return [...deleteTags]
        }
        default:
            return state
    }
}

export default saleTagReducer
