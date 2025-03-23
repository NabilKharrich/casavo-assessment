import { useEffect, useLayoutEffect, useRef } from "react";

function useKeydown(key: string, callback: () => void) {
    const callbackRef = useRef(callback);

    useLayoutEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === key) {
                event.preventDefault();
                callbackRef.current();
            }
        };

        document.addEventListener("keydown", handleKeydown);

        return () => {
            document.removeEventListener("keydown", handleKeydown);
        };
    }, [key]);
}

export default useKeydown;
