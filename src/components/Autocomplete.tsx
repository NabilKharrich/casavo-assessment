import { ChangeEvent, useRef, useState } from "react";
import styles from "./../styles/Autocomplete.module.scss";
import useKeydown from "../hooks/useKeydown";
import useDebouncedValue from "../hooks/useDebouncedvalue";
import useClickOutside from "../hooks/useClickOutside";
import useAutocomplete from "../hooks/useAutocomplete";

function Autocomplete() {
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [input, setInput] = useState("");
    const term = useDebouncedValue(input, 500);

    const [isOpen, setIsOpen] = useState(false);

    const { status, data, isLoading } = useAutocomplete(term);
    const noResult = !isLoading && data.length === 0;

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const openDropdown = () => {
        setIsOpen(true);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleEscape = () => {
        if (noResult) {
            setInput("");
        }

        closeDropdown();

        inputRef.current?.blur();
    };

    const handleEnter = () => {
        openDropdown();
        inputRef.current?.focus();
    };

    const handleListButtonClick = (country: string) => {
        setInput(country);
        closeDropdown();
    };

    useClickOutside(containerRef, handleEscape);

    useKeydown("Escape", handleEscape);
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
                {!isOpen && <span className={styles.icon}>/</span>}
                {isOpen && (
                    <div className={styles.list}>
                        {isLoading && (
                            <span className={styles.status}>Loading...</span>
                        )}
                        {noResult && (
                            <span className={styles.status}>
                                No results found
                            </span>
                        )}
                        {status === "success" &&
                            data.map((country) => (
                                <button
                                    key={country}
                                    className={styles.item}
                                    onClick={() =>
                                        handleListButtonClick(country)
                                    }
                                >
                                    {country}
                                </button>
                            ))}
                    </div>
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
