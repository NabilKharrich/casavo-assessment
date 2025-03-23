import { useEffect, useState } from "react";

function useDebouncedValue<T>(value: T, time = 300) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounced(value);
        }, time);

        return () => {
            clearTimeout(timeout);
        };
    }, [value, time]);

    return debounced;
}

export default useDebouncedValue;
