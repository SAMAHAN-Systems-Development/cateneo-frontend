# Cateneo Frontend Repository

## Table of Contents

| Section | Description |
| --- | --- |
| [Description](#description) | Overview of the Cateneo frontend repository |
| [Project Tech Stack](#project-tech-stack) | Main technologies, libraries, and tools used |
| [Pre-requisite Installations](#pre-requisite-installations) | Required apps and VSCode extensions |
| [Project setup](#project-setup) | Steps for cloning and preparing the project |
| [Project Folder Structure](#project-folder-structure) | Overview of the main folders and config files |

## Description

Official frontend repository for the **Cateneo Website**, built with **Next JS**

## Project Tech Stack

| Category | Technology |
| --- | --- |
| Framework | Next.js 16 |
| Language | TypeScript |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui, Radix UI |
| Icons | Lucide React, React Icons |
| Forms | React Hook Form |
| Validation | Zod |
| Data Fetching | TanStack React Query |
| Testing | Vitest, Testing Library |
| Linting | ESLint |

## Pre-requisite Installations

Install the following:

- Git

- Node.js

- VSCode

VSCode Extension:

- Prettier (VSCode Extension)

- ESlint

## Project setup

1. Clone the repository

```bash
$ git clone https://github.com/SAMAHAN-Systems-Development/cateneo-frontend
```

2. Change Directory to "cateneo-frontend"

```bash
$ cd cateneo-frontend
```

3. Fetch the updates

```bash
$ git fetch
```


4. Install the libraries with this command:

```bash
$ npm i
```

5. Paste the .env

6. Make a separate branch for your PR

```bash
$ [type]/[ticket number]--[your branch name]
$ e.g feat/21--add-hero-section
```

7. Run the server

``` bash
$ npm run dev
```

## Project Folder Structure

```bash
cateneo-frontend/
|-- public/                 # Static assets such as images, fonts, SVGs, and page media
|-- src/
|   |-- app/                # Next.js App Router pages, layouts, route groups, and providers
|   |   |-- (public)/       # Public-facing website routes
|   |   |-- (superadmin)/   # Superadmin dashboard routes
|   |   |-- (volunteer)/    # Volunteer dashboard routes
|   |   `-- test/           # Test/demo route pages
|   |-- client/             # API service functions, React Query queries, and mutations
|   |   |-- mutations/      # Client-side mutation hooks
|   |   |-- queries/        # Client-side query hooks
|   |   `-- service/        # API request functions and DTO types
|   |-- components/         # Reusable UI and page section components
|   |   |-- sections/       # Larger page sections
|   |   `-- ui/             # Shared UI components
|   |-- data/               # Static local data used by components/pages
|   |-- lib/                # Shared utilities, mappers, guards, and helpers
|   |-- schemas/            # Form validation schemas and inferred form types
|   |-- styles/             # Global or shared styles
|   `-- __tests__/          # Test files
|-- components.json         # shadcn/ui component configuration
|-- eslint.config.mjs       # ESLint configuration
|-- next.config.ts          # Next.js configuration
|-- package.json            # Project scripts and dependencies
|-- tailwind.config.ts      # Tailwind CSS theme/configuration
|-- tsconfig.json           # TypeScript configuration
`-- vitest.config.ts        # Vitest test configuration
```

