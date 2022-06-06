import { AnyAction } from 'redux'
import { TTollsSite } from 'types'
// /import { mockToll } from '_mockApis/toll/mockToll'

const tollReducer = (state: TTollsSite | {} = {}, action: AnyAction) => {
    switch (action.type) {
        case 'LIST_TOLL':
            return action.payload
        case 'ADD_EMPLOYEES':
            return {
                ...state,
                //@ts-ignore
                employees: [action.payload, ...state?.employees],
            }

        case 'UPDATE_EMPLOYEES': {
            //@ts-ignore
            const updateEmployee = state.employees.filter(
                (employee) => employee?.id !== action.payload.id
            )

            return {
                ...state,

                employees: [action.payload, ...updateEmployee],
            }
        }

        case 'ADD_EQUIP':
            return {
                //@ts-ignore
                nodes: [action.payload, ...state?.nodes],
            }
        case 'UPDATE_EQUIP': {
            //@ts-ignore
            const updateEquip = state.nodes.filter(
                (cards) => cards?.id !== action.payload.id
            )
            return {
                ...state,

                nodes: [action.payload, ...updateEquip],
            }
        }

        case 'DELETE_EQUIP': {
            //@ts-ignore
            const deleteEquips = state.nodes.filter(
                (nodes) => nodes?.id !== action.payload.id
            )
            return { ...state, nodes: [...deleteEquips] }
        }

        case 'ADD_LANES':
            return {
                //@ts-ignore
                lanes: [action.payload, ...state?.lanes],
            }
        case 'UPDATE_LANES': {
            //@ts-ignore
            const updateLane = state.lanes.filter(
                (cards) => cards?.id !== action.payload.id
            )
            return {
                ...state,

                nodes: [action.payload, ...updateLane],
            }
        }

        case 'DELETE_LANES': {
            //@ts-ignore
            const deleteLane = state.lanes.filter(
                (lanes) => lanes?.id !== action.payload.id
            )
            return {
                ...state,

                lanes: [...deleteLane],
            }
        }

        default:
            return state
    }
}

export default tollReducer
