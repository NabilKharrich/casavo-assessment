import { RefObject, useEffect, useLayoutEffect, useRef } from "react";

function useClickOutside(
    ref: RefObject<HTMLElement | null>,
    callback: () => void
) {
    const callbackRef = useRef(callback);

    useLayoutEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const handleClick = (event: PointerEvent) => {
            if (!ref?.current || ref.current.contains(event.target as Node))
                return;

            callbackRef.current();
        };

        document.addEventListener("pointerdown", handleClick);

        return () => {
            document.removeEventListener("pointerdown", handleClick);
        };
    }, [ref]);
}

export default useClickOutside;
