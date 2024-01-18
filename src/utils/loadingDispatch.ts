import { loadingActions } from './loadingActions'

export const loadingDispatch = (dispatch: any, loadingStates: any) => {
    for (const key in loadingStates) {
        const actionCreator = loadingActions[`${key}`]

        if (actionCreator) {
            dispatch(actionCreator(false))
        }
    }
}
