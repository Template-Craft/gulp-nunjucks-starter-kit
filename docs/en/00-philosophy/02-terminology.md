# Terminology

The shared vocabulary used throughout the documentation.

---

## Architectural Approach

The set of architectural principles and decisions that define a project's organization independently of the tools used.

---

## Build System

The implementation of the architectural approach: automates development, dependency analysis, and the build itself.

---

## Page

A template that acts as the entry point when generating a single HTML page.

---

## Section

A large functional block of a page. Groups related components, data, and other templates around a single concern (Hero, About, Gallery, etc.).

---

## Component

A reusable interface element with its own structure and area of responsibility. Can be used by any number of pages and sections.

---

## Template

An infrastructural template for supporting tasks (`<head>`, script injection, etc.). Not a standalone page or interface element.

---

## Data

Structured data (JSON) used when rendering templates. The data source is decoupled from the templates themselves.

---

## Template API

The set of functions (`getComponent`, `getSection`, `getTemplate`, `getData`) templates use to reach architectural entities by name instead of by file path.

---

## Dependency Graph

The map of relationships between a project's architectural entities. Used to analyze changes and determine the minimal set of files that need rebuilding.

---

## Incremental Build

A build mode where only the pages actually affected by a change get rebuilt.

---

## Build Pipeline

The sequence of processing stages the project goes through during development and build.
