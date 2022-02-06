import { combineReducers, createStore } from "redux"
import { ProductReducer } from "./reducers/ProductReducer"
export type StateType = ReturnType<typeof combine>;

const combine = combineReducers({
    ProductReducer,
    
})

export const store = createStore(combine)