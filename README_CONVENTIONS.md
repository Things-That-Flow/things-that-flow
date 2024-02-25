# Conventions

> Folder structure and naming convention for ttflow

General conventions are enforced by ESLint, TypeScript, Prettier, and Husky.<br>
Other specific design patterns, architectures, naming conventions, etc. follow the conventions described below.

## Code Collocation

- Every application or package in monorepo has project files/folders organized and grouped by **feature**.
- **Place code as close to where it's relevant as possible.**
- Deep folder nesting does not represent an issue.
- [Relevant article](https://kentcdodds.com/blog/colocation) on code collocation.

## Project Structure

The overall structure of the project is as follows Managed as a monorepo using pnpm workspace.<br>

```shell
apps/
├─ graphics/
│  └─ src/
│     ├─ app/
│     │  ├─ [page1]/
│     │  │  ├─ page.tsx
│     │  │  └─ layout.tsx
│     │  ├─ [page2]/
│     │  ├─ ...
│     │  └─ rootLayout.tsx
│     └─ libs/
│        ├─ [domain1]/
│        │  ├─ data-access- .../
│        │  │  └─ index.ts
│        │  ├─ feature- .../
│        │  │  └─ index.tsx
│        │  ├─ util- .../
│        │  │  └─ index.ts
│        │  ├─ ui- .../
│        │  │  └─ index.ts
│        │  └─ types/
│        ├─ [domain2]/
│        ├─ ...
│        └─ shared/
│           ├─ components/
│           ├─ styles/
│           ├─ types/
│           ├─ constants/
│           ├─ functions/
│           └─ hooks/
└─ ...
packages/
│  ├─ design-system/
│  ├─ eslint-config-custom/
│  ├─ tsconfig/
|  └─ ...
```

- `src/app` folder is responsible for routing pages. Each page is forced to be named `page.tsx`, and data sharing between pages is done in `layout.tsx`. All pages are merged in `rootLayout.tsx`.
- `src/libs` folder serves to organize the domains: there are individual folders for each specific domain name, and each domain folder uses the four library types (data-access, feature, util, ui) as a convention. Code shared by multiple domains is located in the shared folder.
- `packages` folder manages code that is shared by multiple apps.

`app` uses `vite` by default, and `package` uses `tsup`.

## Data immutability

Majority of the data should be immutable (`Readonly`, `ReadonlyArray`). Always return new array, object etc. with the changes, not the original.

## Functions

Since React components are also functions, convention should be followed as much as possible.

- Function should have single responsibility.
- Function should be stateless where for the same input arguments they return same value every single time.
- Function should accept at least one argument and return data.
- Function should not have side effects, but be pure. It's implementation should not modify or access variable value outside its local environment (global state, fetching etc.).

Sometimes **potential** exceptions are react components and hooks.

<details>
<summary>Exception examples</summary>

```ts
// CirclePrimitiveWithWebGL.tsx
type Props = SizeProp

const CirclePrimitiveWithWebGL = ({ size, color }: ColorPropsWithOthers<Props>) => {
  const { ref } = useDrawCirclePrimitiveWithWebGL({
    color
  })

  return <canvas ref={ref} {...size} />
}
```

```ts
// util-init/index.ts
type Params = {
  canvas: HTMLCanvasElement
}

export default ({ canvas, color }: ColorPropsWithOthers<Params>) => {
  if (!canvas) {
    return
  }

  const gl = canvas.getContext('webgl')

  if (!gl) {
    return
  }

  const GLC = new GLCommander(gl)
  GLC.clear(color)
}
```

</details>

## Library Types

- `feature-` library contains business logic and API integrations. All other libraries are merged in the feature library.
- `data-access-` library is responsible for data management.
- `ui-` library is responsible for the view logic. It only allows some level of data processing for view purposes, and all style code should be written around the UI library. `ui-` library does not include the FEATURE library.
- `util-` library is responsible for data processing except for state management.

### Component Types

- Container:
  - All container components have postfix "Container" or "Page" `[ComponentName]Container|Page`
  - Each feature has a container component (`AddUserContainer.tsx`, `EditProductContainer.tsx`, `ProductsPage.tsx` etc.)
  - Includes business logic.
  - API integration.
  - Expected file/folder structure:
  ```
  ProductsPage/
  ├─ api/
  │  └─ useGetProducts/
  ├─ components/
  │  └─ ProductItem/
  ├─ utils/
  │  └─ filterProductsByType/
  └─ index.tsx
  ```
- UI - Feature specific
  - Representational components that are designed to fulfill feature requirements.
  - Should follow functions conventions as much as possible.
  - No API integration.
  - Expected file/folder structure:
  ```
  ProductItem/
  ├─ index.tsx
  ├─ styled.tsx
  ├─ ProductItem.stories.tsx
  └─ ProductItem.test.tsx
  ```
- UI - Design system
  - Reusable/generic types of components used throughout whole monorepo.
  - Expected file/folder structure:
  ```
  Button/
  ├─ index.tsx
  ├─ styled.tsx
  ├─ Button.stories.tsx
  └─ Button.test.tsx
  ```

## Naming

Strive to keep naming conventions consistent and readable, because another person will maintain the code you have written.  
There is no convention on cache invalidation, but for the second hardest thing, bellow conventions should be followed:

- Domains & Library Types - kebab-case [`data-access-draw-circle`, `feature-simple-circle-primitive`]
- React components - Pascal case (`ProductItem`, `ProductsPage`)
- Prop Types - component should be written as `Props`, and the props type of a function that belongs to util or data-access should be written as `Params`.
- Functions - Camel case (`filterProductsByType`, `useGetProducts`)
- Variables
  - Locals (`products`, `productsFiltered`)
  - Booleans are prefixed with `is`, `has` (`isProduct`)
  - Constants (`PRODUCT_ID`)
  - Enums are singular with values as constants
    ```ts
    enum OrderStatus {
      PENDING,
      FULFILLED,
      ERROR
    }
    ```

Additionally, in a graphics application, each React component must specify its means of implementation with the name `With`.

## State Management

Prop drilling should not become an issue, if it does [break out your render method](https://kentcdodds.com/blog/prop-drilling#how-can-we-avoid-problems-with-prop-drilling) and keep in mind that React components are functions, which should have single responsibility.<br>
Server state is managed using React Query, and complex UI state is managed using global state tools. (However, do not abuse global state management).

Write code utilizing various design patterns such as Component Composition and Compound Component.

## Design System

See the sample component based on `shadcn/ui` that we wrote in the Design System package.<br>
Use emotion as our primary CSS tool, and build our design system as needed based on sample components.

## Merge strategy and branching

Merge based on Squash Merge. Publish an issue and reflect it in the branch name.

## Conventions enforced by automated tooling

List and reasoning of some conventions enforced by automated tooling:

- Whole monorepo codebase is written in TypeScript strict mode with enabled ESlint [Strict Configuration](https://typescript-eslint.io/docs/linting/configs#strict)
- All types are defined with `type` alias. In case of rare exceptions (extending third-party types) `interface` can be used with disabling linter:

  ```ts
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  ```

- Arrays are defined with `generic` syntax.

  ```ts
  const x: Array<string> = ['a', 'b']
  const y: ReadonlyArray<string> = ['a', 'b']
  ```

- Default export is not allowed. In case of exception this rule is disabled in `.eslintrc.js` (Next.js pages etc.)
- All test descriptions follows naming convention as `it('should ... when ...')`.

## Tests

...
