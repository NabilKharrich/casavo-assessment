import { ChangeEvent, useRef, useState } from "react";
import styles from "./../styles/Autocomplete.module.scss";
import useKeydown from "../hooks/useKeydown";
import useDebouncedValue from "../hooks/useDebouncedvalue";

function Autocomplete() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [input, setInput] = useState("");
    const term = useDebouncedValue(input, 500);

    const [isOpen, setIsOpen] = useState(false);

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
        // todo: clear input only if there are no results
        setInput("");

        closeDropdown();

        inputRef.current?.blur();
    };

    const handleEnter = () => {
        openDropdown();
        inputRef.current?.focus();
    };

    useKeydown("Escape", handleEscape);
    useKeydown("/", handleEnter);

    return (
        <div className={styles.container}>
            debounce test {term}
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
                {isOpen && <div className={styles.list}>list</div>}
            </div>
            <div className={styles.bottom}>
                <span className={styles.description}>Tech assessment</span>
                <span className={styles.description}>Nabil Kharrich</span>
            </div>
        </div>
    );
}

export default Autocomplete;
