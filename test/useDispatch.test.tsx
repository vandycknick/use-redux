import React from "react"
import { renderHook } from "@testing-library/react-hooks"

import { Provider, useDispatch } from "../src"
import configureStore from "./__mocks__/mockStore"

describe("useDispatch", () => {
    const mockStore = configureStore()

    it("should throw an error when used outside of a redux context", () => {
        // Given
        const msg = "A redux store should be provided via the useRedux Provider component. <Provider value={store} />"

        // When, Then
        const hook = renderHook(() => useDispatch())

        // Then
        expect(hook.result.error.message).toEqual(msg)
    })

    it("should return a dispatch function that dispatches actions on the provided store", () => {
        // Given
        const store = mockStore()
        const wrapper: React.FC = ({ children }) => <Provider value={store}>{children}</Provider>

        // When
        renderHook(
            () => {
                const dispatch = useDispatch()
                dispatch({ type: "TEST" })
            },
            { wrapper },
        )

        // Then
        expect(store.getActions()).toEqual([{ type: "TEST" }])
    })
})
