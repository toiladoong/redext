type ModelEffect = {
    payload: Action['payload']
}

type ModelReducer = {
    state: any,
    payload?: Action['payload']
}

export interface Action {
    payload?: any
}

export interface InitConfig {
    models?: Models
}

export interface Models {
    [key: string]: Model
}

export interface Model {
    name?: string
    state: any
    effects?: ModelEffects
    reducers?: ModelReducers
}

export interface ModelEffects {
    [key: string]: ModelEffect
}

export interface ModelReducers {
    [key: string]: ModelReducer
}
