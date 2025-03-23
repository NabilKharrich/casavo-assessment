import { Fragment } from "react";

export const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const highlightSearchTerm = (country: string, term: string) => {
    if (!term.trim()) return country;

    const escapedTerm = term.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

    const rx = new RegExp(`(${escapedTerm})`, "gi");
    const chunks = country.split(rx);

    return (
        <>
            {chunks.map((chunk, index) => (
                <Fragment key={index}>
                    {rx.test(chunk) ? <em>{chunk}</em> : chunk}
                </Fragment>
            ))}
        </>
    );
};
