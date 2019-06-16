import React from "react"
import { renderHook } from "react-hooks-testing-library"

import { Provider, useActionCreators } from "../src"
import configureStore from "./__mocks__/mockStore"

describe("useActionCreators", () => {
    const mockStore = configureStore()

    it("should throw an error when used outside of a redux context", () => {
        // Given
        const msg = "A redux store should be provided via the useRedux Provider component. <Provider value={store} />"

        // When
        const hook = renderHook(() => useActionCreators({}))

        // Then
        expect(hook.result.error.message).toEqual(msg)
    })

    it("should bind dispatch to each key in the given ActionCreatorsMapObject", () => {
        // Given
        const store = mockStore()
        const creatorsMap = {
            addTodo: () => ({ type: "ADD_TODO" }),
            removeTodo: () => ({ type: "REMOVE_TODO" }),
        }

        // When
        renderHook(
            () => {
                const { addTodo, removeTodo } = useActionCreators(creatorsMap)

                addTodo()
                removeTodo()
            },
            { wrapper: ({ children }) => <Provider value={store}>{children}</Provider> },
        )

        // Then
        expect(store.getActions()).toEqual([{ type: "ADD_TODO" }, { type: "REMOVE_TODO" }])
    })

    it("should cache the bound ActionCreatorsMap and only update when the given ActionCreatorsMap changes", () => {
        // Given
        const store = mockStore()
        const creatorsMap = {
            addTodo: () => ({ type: "ADD_TODO" }),
            removeTodo: () => ({ type: "REMOVE_TODO" }),
        }

        let mapOne
        let mapTwo
        let mapThree

        // When
        renderHook(
            () => {
                mapOne = useActionCreators(creatorsMap)
                mapTwo = useActionCreators(creatorsMap)
            },
            { wrapper: ({ children }) => <Provider value={store}>{children}</Provider> },
        )

        renderHook(
            () => {
                mapThree = useActionCreators(creatorsMap)
            },
            { wrapper: ({ children }) => <Provider value={store}>{children}</Provider> },
        )

        // Then
        expect(mapOne).toEqual(mapTwo)
        expect(mapOne).toEqual(mapThree)
        expect(mapTwo).toEqual(mapThree)
    })

    it("should cache correctly when using multiple stores", () => {
        // Given
        const store = mockStore()
        const store2 = mockStore()
        const creatorsMap = {
            addTodo: () => ({ type: "ADD_TODO" }),
            removeTodo: () => ({ type: "REMOVE_TODO" }),
        }

        let mapOne
        let mapTwo
        let mapThree
        let mapFour

        // When
        renderHook(
            () => {
                mapOne = useActionCreators(creatorsMap)
                mapTwo = useActionCreators(creatorsMap)
            },
            { wrapper: ({ children }) => <Provider value={store}>{children}</Provider> },
        )

        renderHook(
            () => {
                mapThree = useActionCreators(creatorsMap)
                mapFour = useActionCreators(creatorsMap)
            },
            { wrapper: ({ children }) => <Provider value={store2}>{children}</Provider> },
        )

        // Then
        expect(mapOne).toEqual(mapTwo)
        expect(mapOne).not.toEqual(mapThree)
        expect(mapOne).not.toEqual(mapFour)
        expect(mapTwo).not.toEqual(mapThree)
        expect(mapTwo).not.toEqual(mapFour)
        expect(mapThree).toEqual(mapFour)
    })

})
