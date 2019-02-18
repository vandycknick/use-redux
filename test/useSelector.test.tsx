import React from "react"
import { testHook } from "react-testing-library"

import { Provider, useSelector } from "../src"
import configureStore from "./__mocks__/mockStore"

describe("useSelector", () => {
    const mockStore = configureStore()

    it("should throw an error when used outside of a redux context", () => {
        // Given
        const msg = "A redux store should be provided via the useRedux Provider component. <Provider value={store} />"
        const selector = (state: any) => state

        // When, Then
        expect(() => {
            const error = console.error
            console.error = () => null

            testHook(() => useSelector(selector))

            console.error = error
        }).toThrowError(msg)
    })

    it("should run a selector function that gets the current redux state", () => {
        // Given
        const state = { items: [1, 2, 3], name: "test" }
        const store = mockStore(state)
        const spy = jest.fn((s: any) => ({ first: s.items[0] }))

        // When
        let selected
        testHook(
            () => {
                selected = useSelector(spy)
            },
            { wrapper: ({ children }) => <Provider value={store}>{children}</Provider> },
        )

        // Then
        expect(spy).toHaveBeenCalledWith(state)
        expect(selected).toEqual({ first: 1 })
    })

})
