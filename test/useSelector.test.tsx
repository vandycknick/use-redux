import React from "react"
import { renderHook } from "@testing-library/react-hooks"

import { Provider, useSelector } from "../src"
import configureStore from "./__mocks__/mockStore"

describe("useSelector", () => {
    const mockStore = configureStore()

    it("should throw an error when used outside of a redux context", () => {
        // Given
        const msg = "A redux store should be provided via the useRedux Provider component. <Provider value={store} />"
        const selector = <T extends unknown>(state: T): T => state

        // When
        const hook = renderHook(() => useSelector(selector))

        // Then
        expect(hook.result.error.message).toEqual(msg)
    })

    it("should run a selector function that gets the current redux state", () => {
        // Given
        const state = { items: [1, 2, 3], name: "test" }
        const store = mockStore(state)
        const spy = jest.fn((s: typeof state) => ({ first: s.items[0] }))
        const wrapper: React.FC = ({ children }) => <Provider value={store}>{children}</Provider>

        // When
        const hook = renderHook(() => useSelector(spy), { wrapper })

        // Then
        expect(spy).toHaveBeenCalledWith(state)
        expect(hook.result.current).toEqual({ first: 1 })
    })
})
