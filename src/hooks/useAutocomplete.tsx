import { useEffect, useReducer, useRef } from "react";

import { MOCK_DATA } from "../data/mock";
import { sleep } from "../utils";

const initialState: AutocompleteState = {
    status: "idle",
    data: [],
    error: null,
};

const reducer = (
    state: AutocompleteState,
    action: AutocompleteAction
): AutocompleteState => {
    switch (action.type) {
        case "FETCHING":
            return { ...state, status: "pending" };
        case "FETCHED":
            return {
                ...state,
                status: "success",
                data: action.payload,
            };
        case "FETCH_ERROR":
            return {
                ...state,
                status: "error",
                error: action.payload,
            };
        default:
            return state;
    }
};

const filterData = (data: Country[], term: string) => {
    return data
        .map((d) => d.name.common)
        .filter((country) =>
            country.toLowerCase().includes(term.toLowerCase())
        );
};

function useAutocomplete(term: string) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const acRef = useRef<AbortController>(null);

    useEffect(() => {
        const fetchData = async () => {
            acRef.current?.abort();
            acRef.current = new AbortController();

            dispatch({ type: "FETCHING" });

            try {
                const response = await fetch(
                    "https://restcountries.com/v3.1/all?fields=name",
                    { signal: acRef.current.signal }
                );

                // simulate a delay because the API is too fast
                await sleep(500);

                const data: Country[] = await response.json();

                dispatch({ type: "FETCHED", payload: filterData(data, term) });
            } catch (error) {
                if (error instanceof Error && error.name === "AbortError") {
                    console.log("Fetch aborted");
                    return;
                }

                // For test purposes, return the mock data if API is down
                dispatch({
                    type: "FETCHED",
                    payload: filterData(MOCK_DATA, term),
                });

                return;

                // Error triggered by the API, ignored for the test
                dispatch({
                    type: "FETCH_ERROR",
                    payload: "An error has occurred",
                });
            }
        };

        fetchData();
    }, [term]);

    return {
        isLoading: state.status === "idle" || state.status === "pending",
        isError: state.status === "error",
        ...state,
    };
}

export default useAutocomplete;
