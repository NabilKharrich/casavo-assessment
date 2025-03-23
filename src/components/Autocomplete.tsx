import { ChangeEvent, useRef, useState } from "react";
import styles from "./../styles/Autocomplete.module.scss";

function Autocomplete() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [input, setInput] = useState("");

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

    return (
        <div className={styles.container}>
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
