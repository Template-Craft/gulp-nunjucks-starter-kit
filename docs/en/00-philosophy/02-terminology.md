# Terminology

This documentation uses a consistent set of architectural terms.

Each term has a precise meaning and is used consistently throughout the documentation to eliminate ambiguity when describing both the architecture and the internal mechanisms of the Build System.

---

## Architectural Approach

The collection of architectural principles and design decisions that define the organization of a project independently of the technologies used to implement it.

---

## Build System

The implementation of the architectural approach responsible for automating development, dependency analysis and the build process.

---

## Page

A template that serves as the entry point for generating a single HTML page.

---

## Section

A major functional part of a page used to compose its overall structure.

A Section groups related interface elements and may use Components, Data and other Templates.

---

## Component

A reusable user interface element with its own structure and clearly defined responsibility.

Components may be shared across multiple Pages and Sections.

---

## Template

An infrastructure template intended to solve auxiliary rendering tasks.

A Template is neither an entry point nor an independent user interface element.

---

## Data

Structured information used during template rendering.

Data is separated from templates and treated as an independent architectural entity.

---

## Template API

A collection of conventions and interaction mechanisms used by architectural entities.

The Template API defines how templates are reused and how architectural entities communicate with one another.

---

## Dependency Graph

A model describing the relationships between architectural entities.

It is used by the Build System to analyze changes and determine the minimum set of files that must be rebuilt.

---

## Incremental Build

A build mode in which the Build System rebuilds only the pages and assets affected by recent changes.

---

## Build Pipeline

The sequence of processing stages executed by the Build System during development and production builds.
