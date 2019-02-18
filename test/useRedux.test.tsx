import React from "react"
import { testHook } from "react-testing-library"

import { Provider, useRedux } from "../src"
import configureStore from "./__mocks__/mockStore"

describe("useRedux", () => {
    const mockStore = configureStore()

    it("should throw an error when used outside of a redux context", () => {
        // Given
        const msg = "A redux store should be provided via the useRedux Provider component. <Provider value={store} />"

        // When, Then
        expect(() => {
            const error = console.error
            console.error = () => null

            testHook(() => useRedux())

            console.error = error
        }).toThrowError(msg)
    })

    it("should return the current redux state", () => {
        // Given
        const state = { items: [1, 2, 3], name: "test" }
        const store = mockStore(state)
        const spy = jest.fn((s: any) => ({ first: s.items[0] }))

        // When
        let current
        testHook(
            () => {
                current = useRedux()
            },
            { wrapper: ({ children }) => <Provider value={store}>{children}</Provider> },
        )

        // Then
        expect(current).toEqual(state)
    })

})
