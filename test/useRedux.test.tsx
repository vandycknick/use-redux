import React from "react"
import { renderHook } from "react-hooks-testing-library"

import { Provider, useRedux } from "../src"
import configureStore from "./__mocks__/mockStore"

describe("useRedux", () => {
    const mockStore = configureStore()

    it("should throw an error when used outside of a redux context", () => {
        // Given
        const msg = "A redux store should be provided via the useRedux Provider component. <Provider value={store} />"

        // When
        const hook = renderHook(() => useRedux())

        // Then
        expect(hook.result.error.message).toEqual(msg)
    })

    it("should return the current redux state", () => {
        // Given
        const state = { items: [1, 2, 3], name: "test" }
        const store = mockStore(state)

        // When
        let current
        renderHook(
            () => {
                current = useRedux()
            },
            { wrapper: ({ children }) => <Provider value={store}>{children}</Provider> },
        )

        // Then
        expect(current).toEqual(state)
    })

})
