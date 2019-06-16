import React from "react"
import { renderHook } from "react-hooks-testing-library"

import { Provider, useSelector } from "../src"
import configureStore from "./__mocks__/mockStore"

describe("useSelector", () => {
    const mockStore = configureStore()

    it("should throw an error when used outside of a redux context", () => {
        // Given
        const msg = "A redux store should be provided via the useRedux Provider component. <Provider value={store} />"
        const selector = (state: any) => state

        // When
        const hook = renderHook(() => useSelector(selector))

        // Then
        expect(hook.result.error.message).toEqual(msg)
    })

    it("should run a selector function that gets the current redux state", () => {
        // Given
        const state = { items: [1, 2, 3], name: "test" }
        const store = mockStore(state)
        const spy = jest.fn((s: any) => ({ first: s.items[0] }))

        // When
        let selected
        renderHook(
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
