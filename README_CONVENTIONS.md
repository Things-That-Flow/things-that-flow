# Conventions

> Folder structure and naming convention for ttflow

일반적인 규칙은 ESLint, TypeScript, Prettier, 그리고 Husky로 강제된다.<br>
그 외에 특정 디자인 패턴과 아키텍쳐, 네이밍 규칙 등은 아래에서 서술한 내용을 따른다.

## Code Collocation

- Every application or package in monorepo has project files/folders organized and grouped by **feature**.
- **Place code as close to where it's relevant as possible.**
- Deep folder nesting does not represent an issue.
- [Relevant article](https://kentcdodds.com/blog/colocation) on code collocation.

## Project Structure

프로젝트 전체 구조는 다음과 같다. pnpm workspace를 사용해 모노레포로 관리한다.<br>

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

app은 기본적으로 `vite`를 사용하며, package는 `tsup`을 사용한다.

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

Prop drilling 자체를 병적으로 경계할 필요는 없다.<br>
서버 상태는 React Query를 사용해 관리하며, 복잡해지는 ui 상태는 전역 상태 도구를 사용한다. (단, 전역 상태 관리를 남발하지 않는다.)

Component Composition, Compound Component 등 다양한 디자인 패턴을 활용해 코드를 작성한다.

## Design System

샘플 컴포넌트로 shadcn/ui를 참고한다.<br>
emotion을 기본 css 도구로 사용하며, 샘플 컴포넌트를 기반으로 필요할 때마다 디자인 시스템을 구축한다.

## Merge strategy and branching

Squash Merge를 기반으로 병합한다.<br>
Issue를 발행하고, 해당 Issue를 브랜치명에 반영한다.ㄴ

## Tests

...
