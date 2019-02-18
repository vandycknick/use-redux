# useRedux
React hook utility functions to access state or dispatch actions from a redux store.

## Installation

```sh
# Yarn
yarn add @nvd/use-redux

# NPM
npm i --save @nvd/use-redux
```

## Usage
> This utility depends on React Hooks which are available as of react version 16.8.0 and higher.

```tsx
import React from "react"
import { render } from "react-dom"
import {createStore} from "redux"
import { Provider, useDispatch } from "@nvd/use-redux"

const store = createStore(reducer)

// Use hook utilities like to access current state and dispatch actions
const App = () => {
    const dispatch = useDispatch()
    const { counter } = useRedux()

    const increment = () => dispatch({ type: "INCREMENT", payload: counter++ })

    return (
        <button>Click {counter}</button>
    )
}

// Wrap you app in a provider function and pass a redux store as value
render(
    <Provider value={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
)
```

## API

### `Provider`
React component used to pass a store to any hook utility used in child components. This component is required in order for any of the hook utilities to work.

```tsx
const store = createStore({})

ReactDOM.render(
    <Provider value={store}>
        <ChildComponents />
    </Provider>
)
```

### `useSelector`
> <T, P>(selector: (state: T) => P) => P

Takes a selector function used to select and return a subset of the current redux state. The selector function will get invoked immediately after creation and after each store update.

```tsx
const TodoList = () => {
    const todos = useSelector(state => state.todos.filter(todo => !todo.completed))

    return (
        <div>
            { todos.map(t => <Todo item={t} />)}
        </div>
    )
}
```

### `useActionCreators`
> <A extends Action, M extends ActionCreatorsMapObject<A>>(actionCreators: M) => M

Automatically bind a given map of action creators to the current stores dispatch function

```tsx
const App = () => {
    const { incrementCounter } = useActionCreators(action)
    return <button onClick={incrementCounter}>Click</button>
}
```

### `useRedux`
> () => State

Returns the whole state tree from the current store

```tsx
const Count = () => {
    const state = useRedux()
    return <div> Current count: { state.counter } </div>
}
```

### `useDispatch`
> () => Dispatch<AnyAction>

Returns dispatch function from the current store.

```tsx
const App = () => {
    const dispatch = useDispatch()
    return <button onClick={() => dispatch({ type: "INCREMENT" }))}>Click</button>
}
```

## License
MIT
