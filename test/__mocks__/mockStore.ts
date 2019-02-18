import { AnyAction, applyMiddleware, Middleware, Reducer, Store } from "redux"

const isFunction = (arg: any): boolean => typeof arg === "function"

type Listener = () => any

interface MockStoreExtensions {
    getActions: () => AnyAction[],
    clearActions: () => void,
}

const configureStore = (middleware: Middleware[] = []) =>
    function mockStore(getState = {}): Store & MockStoreExtensions {
        const mockStoreWithoutMiddleware = () => {
            let actions: AnyAction[] = []
            const listeners: Listener[] = []

            const store = {

                getState() {
                    return isFunction(getState) ? (getState as (arg: object) => object)(actions) : getState
                },

                getActions: () => actions,

                dispatch(action: AnyAction) {
                    actions.push(action)

                    for (const listener of listeners) {
                        listener()
                    }

                    return action
                },

                clearActions: () => actions = [],

                subscribe(cb: Listener) {
                    if (isFunction(cb)) {
                        listeners.push(cb)
                    }

                    return () => {
                        const index = listeners.indexOf(cb)

                        if (index < 0) return

                        listeners.splice(index, 1)
                    }
                },

                replaceReducer<S, A extends AnyAction>(nextReducer: Reducer<S, A>) {
                    if (!isFunction(nextReducer)) {
                        throw new Error("Next reducer should be a function!")
                    }
                },

            }

            return store
        }

        const mockStoreWithMiddleware: any = applyMiddleware(...middleware)(mockStoreWithoutMiddleware as any)

        return mockStoreWithMiddleware()
    }

export default configureStore
