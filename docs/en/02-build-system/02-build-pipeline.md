# Build Pipeline

The Build Pipeline defines the sequence of stages performed by the Build System when processing a project.

Each stage has a single responsibility and operates independently from the internal implementation of the others.

## Pipeline Stages

A typical build consists of the following stages:

```text
Reset
   │
   ▼
Assets Processing
   │
   ▼
Template Rendering
   │
   ▼
Output Generation
```

Each stage receives the result of the previous one and passes its output to the next stage.

## Responsibility

Every stage of the Build Pipeline is responsible only for its own task.

For example:

- asset processing prepares project resources;
- template rendering generates HTML pages;
- output generation writes the final files to the build directory.

This separation keeps the Build System modular and predictable.

## Independence

Pipeline stages do not depend on the internal implementation of one another.

As long as the input and output contracts remain unchanged, individual stages can evolve independently.

This simplifies maintenance and allows the Build System to grow without affecting unrelated parts of the pipeline.

## Integration with Other Mechanisms

The Build Pipeline works together with other Build System mechanisms.

For example:

- Dependency Graph determines which architectural entities are affected;
- Incremental Build decides which pipeline stages must be executed;
- Watch Mode detects file changes and triggers the pipeline.

Together, these mechanisms provide an efficient development workflow.
