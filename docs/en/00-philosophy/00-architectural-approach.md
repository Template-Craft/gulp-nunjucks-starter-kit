# Architectural Approach

## Introduction

The Architectural Approach is the foundation of the entire Build System.

It defines the overall project organization, the responsibilities of architectural entities, and the principles governing their interaction. Rather than creating these rules, the Build System implements them and automates the processes built around them.

For this reason, the architectural approach is considered the highest level of the system, while the choice of technologies is treated as its consequence.

---

## Why Architecture Matters More Than Tools

When developing small websites, choosing a template engine or build tool often appears to be the most important decision.

As projects grow, however, it becomes clear that long-term complexity is determined not by the tools themselves, but by the architecture behind them.

Architecture answers questions such as:

- How is the project organized?
- What responsibilities does each template type have?
- Where is data stored?
- How is code reuse achieved?
- How do architectural entities interact?
- How do changes propagate throughout the project?

Without clear architectural decisions, even the best technology stack gradually becomes difficult to maintain.

---

## Architecture Defines the Tools

Technology was never the starting point of this project.

The architectural approach evolved over many years through real-world development. As it matured, it naturally established requirements for the template engine, build system and supporting tools.

This is why the Build System is based on Gulp and Nunjucks. These technologies were selected because they support the architectural principles established by the project—not because they define them.

Should more suitable technologies become available in the future, the architectural approach itself would remain unchanged.

---

## The Foundation of the Build System

Every capability provided by the Build System originates from the architectural approach.

It directly influences:

- project organization;
- architectural entities;
- Template API;
- Dependency Graph;
- Incremental Build;
- the Build Pipeline.

Each layer builds upon the previous one.

For this reason, the Build System should be viewed as an implementation of the architectural approach rather than a collection of independent development tools.

The following sections explore each of these concepts in greater detail.
