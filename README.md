# Casavo assessment

## How to start

-   Download the project.
-   Set node environment to match the project one (listed in .nvmrc).
-   Install dependencies.
-   Use `npm run dev` to run the project locally.

## Tools and libraries used

-   React.js: For user interface creation.
-   TypeScript: For static typing.
-   SCSS: For styling.
-   ESLint: For linting.

## Design decisions

-   A sleep function is fired to simulate a delay because the API was too fast.
-   For test purposes, mock data will be returned if API is down.
-   To enhance the user experience, shortcuts were added to the component:
    -   `/` shortcut key to toggle the autocomplete component.
    -   `Escape` shortcut key and clicking outside the component to close it.
