import { Fragment } from "react";

export const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const higlightSearchTerm = (country: string, term: string) => {
    if (!term.trim()) return country;

    const rx = new RegExp(`(${term})`, "gi");
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
