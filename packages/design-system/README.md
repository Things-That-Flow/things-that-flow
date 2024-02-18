# Shared Design System For ThingsThatFlow

Both tsup and vite are widely used tools in the modern JavaScript ecosystem, each serving distinct purposes and offering different functionalities. Tsup is a streamlined tool focused on building and minifying TypeScript and JavaScript files, ideal for library or small project development, leveraging ESBuild for rapid build speeds. It's primarily used for package development and library distribution. On the other hand, Vite is a modern front-end build tool that excels in starting development servers, providing hot module reloading (HMR), and handling production builds with Rollup. It's designed for large application development and component playgrounds, enhancing the development experience with fast reloading times and efficient module management. While tsup simplifies the build and optimization process, Vite focuses on improving the development environment, offering easy setup and customization.

We chose to use `tsup` for its build-focused approach, specifically to concentrate on building our design system package, and `Vite` for its strengths in development and production readiness, focusing on creating a development environment that facilitates the development of the said design system.

## Contents

root : `/src/index.ts`
components : `/src/ttflow-design-system/*`

## Prerequisite(Setup)

Install emotion-auto-css VScode Extension

## Usage

build using tsup (or build style file using postcss-cli)

```bash
pnpm install
pnpm build:with-tsup
```

run playground for implementing design system for ttflow

```bash
pnpm dev:playground
```
