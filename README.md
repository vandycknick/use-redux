# useRedux
React hook utilities to access your state and dispatch actions from a redux store.

[![build status][azure-pipeline-badge]][azure-pipeline]
[![npm version][npm-version-badge]][npm-version]

[azure-pipeline]: https://dev.azure.com/vandycknick/use-redux/_build/latest?definitionId=8&branchName=master
[azure-pipeline-badge]: https://dev.azure.com/vandycknick/use-redux/_apis/build/status/nickvdyck.use-redux?branchName=master

[npm-version]: https://badge.fury.io/js/%40nvd%2Fuse-redux
[npm-version-badge]: https://badge.fury.io/js/%40nvd%2Fuse-redux.svg

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

// Use hook utilities to access current state and dispatch actions
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
> &#x3C;T, P&#x3E;(selector: (state: T) =&#x3E; P) =&#x3E; P

Takes a selector function used to select and return a subset of the current redux state. The selector function will get invoked immediately after creation and after each store update.

```tsx
const TodoList = () => {
    const todos = useSelector(state => state.todos.filter(todo => !todo.completed))

    return (
        <div>
            { todos.map(t => <Todo item={t} />) }
        </div>
    )
}
```

### `useActionCreators`
> &#x3C;A extends Action, M extends ActionCreatorsMapObject&#x3C;A&#x3E;&#x3E;(actionCreators: M) =&#x3E; M

Automatically bind a given map of action creators to the current stores dispatch function

```tsx
const App = () => {
    const { incrementCounter } = useActionCreators(action)
    return <button onClick={incrementCounter}>Click</button>
}
```

### `useRedux`
> () =&#x3E; State

Returns the whole state tree from the current store

```tsx
const Count = () => {
    const state = useRedux()
    return <div> Current count: { state.counter } </div>
}
```

### `useDispatch`
> () =&#x3E; Dispatch&#x3C;AnyAction&#x3E;

Returns dispatch function from the current store.

```tsx
const App = () => {
    const dispatch = useDispatch()
    return <button onClick={() => dispatch({ type: "INCREMENT" }))}>Click</button>
}
```

## License
MIT
