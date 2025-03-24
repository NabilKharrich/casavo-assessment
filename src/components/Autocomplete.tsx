import styles from "./../styles/Autocomplete.module.scss";

import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";

import {
    useAutocomplete,
    useClickOutside,
    useDebouncedValue,
    useKeydown,
} from "../hooks";

import { highlightSearchTerm } from "../utils";

import AutocompleteList from "./AutocompleteList";

function Autocomplete() {
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [input, setInput] = useState("");
    const term = useDebouncedValue(input, 500);
    const [isOpen, setIsOpen] = useState(false);

    const closeDropdown = () => setIsOpen(false);
    const openDropdown = () => setIsOpen(true);
    const chooseListItem = useCallback((country: string) => {
        setInput(country);
        closeDropdown();

        inputRef.current?.blur();
    }, []);

    const { status, data } = useAutocomplete(term);
    const noResult = status === "success" && data.length === 0;

    const list = useMemo(
        () =>
            data.map((country) => (
                <button
                    key={country}
                    className={styles.item}
                    onClick={() => {
                        chooseListItem(country);
                    }}
                >
                    {highlightSearchTerm(country, term)}
                </button>
            )),
        [data, term, chooseListItem]
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleExit = () => {
        if (noResult) {
            setInput("");
        }

        closeDropdown();

        inputRef.current?.blur();
    };

    const handleEnter = () => {
        if (isOpen) {
            handleExit();
            return;
        }

        openDropdown();
        inputRef.current?.focus();
    };

    useClickOutside(containerRef, handleExit);
    useKeydown("Escape", handleExit);
    useKeydown("/", handleEnter);

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.top}>
                <span className={styles.title}>Countries explorer</span>
                <span className={styles.description}>
                    Look for a country to see if it's in the list
                </span>
            </div>
            <div className={styles.inputWrapper}>
                <input
                    className={styles.input}
                    value={input}
                    ref={inputRef}
                    onChange={handleChange}
                    onFocus={openDropdown}
                    type="text"
                    placeholder="Italy"
                />
                {isOpen ? (
                    <AutocompleteList
                        status={status}
                        list={list}
                        noResult={noResult}
                    />
                ) : (
                    <span className={styles.icon}>/</span>
                )}
            </div>
            <div className={styles.bottom}>
                <span className={styles.description}>Tech assessment</span>
                <span className={styles.description}>Nabil Kharrich</span>
            </div>
        </div>
    );
}

export default Autocomplete;
