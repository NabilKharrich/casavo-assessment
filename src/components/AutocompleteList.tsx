import { AutocompleteListProps } from "../types/autocomplete";
import styles from "./../styles/Autocomplete.module.scss";

import Status from "./Status";

function AutocompleteList({ status, list, noResult }: AutocompleteListProps) {
    const isLoading = status === "pending" || status === "idle";
    const isError = status === "error";
    const isSuccess = status === "success";

    return (
        <div className={styles.list}>
            {isLoading && <Status label="Loading..." />}
            {isError && <Status label="An error has occurred" />}
            {noResult && <Status label="No results found" />}
            {isSuccess && list}
        </div>
    );
}

export default AutocompleteList;
