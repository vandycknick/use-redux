import React from "react"
import { cleanup, renderHook } from "react-hooks-testing-library"

import { Provider, useDispatch } from "../src"
import configureStore from "./__mocks__/mockStore"

describe("useDispatch", () => {
    const mockStore = configureStore()

    afterEach(cleanup)

    it("should throw an error when used outside of a redux context", () => {
        // Given
        const msg = "A redux store should be provided via the useRedux Provider component. <Provider value={store} />"

        // When, Then
        expect(() => {
            const error = console.error
            console.error = () => null

            renderHook(() => useDispatch())

            console.error = error
        }).toThrowError(msg)
    })

    it("should return a dispatch function that dispatches actions on the provided store", () => {
        // Given
        const store = mockStore()

        // When
        renderHook(
            () => {
                const dispatch = useDispatch()
                dispatch({ type: "TEST" })
            },
            { wrapper: ({ children }) => <Provider value={store}>{children}</Provider> },
        )

        // Then
        expect(store.getActions()).toEqual([{ type: "TEST" }])
    })

})
