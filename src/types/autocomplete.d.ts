import type { ReactNode } from "react";

interface AutocompleteState {
    status: "idle" | "pending" | "success" | "error";
    data: string[];
    error: string | null;
}

type AutocompleteAction =
    | { type: "FETCHING" }
    | { type: "FETCHED"; payload: string[] }
    | { type: "FETCH_ERROR"; payload: string };

interface AutocompleteListProps {
    status: AutocompleteState["status"];
    list: ReactNode;
    noResult: boolean;
}
