---
slug: /overview
---

# Overview

Snaplet gives developers production-accurate PostgreSQL data and preview databases that they can code against. It does this by capturing a 'snapshot' of a database, copying the schema, and providing a JavaScript runtime for transforming, reducing (subsetting) and generating synthetic data. Developers can then share these snapshots with their team for collaborative development.

## The problem

As a developer, it's difficult to get accurate data to code against. Coding against accurate data reduces errors as a result of fewer assumptions, and generally removes ambiguity when adding features or fixing bugs.

The two most common approaches to getting production-accurate data is to generate it via a seed script, or to directly copy a database, either production itself, or a production-like database such as staging or QA.

<div style={{textAlign: 'center'}}>

![Urgh, I just want to code!](/img/problem-statement.svg)

</div>

Both of these approaches have drawbacks. Seed scripts are tedious to write and maintain, are often inaccurate, and generally offer a tiny, non-representative subsetting of  data. Copying from production happens outside of established development workflows, is slow and cumbersome because you have to copy all the data, and almost certainly contains personal information about your users.

## The solution

Snaplet is a command line tool that gives developers a "code as configuration" environment for transforming, reducing (subsetting), and generating data.
The data is stored as snapshots that can be restored into any development environment, and shared with teammates for collaborative development against a shared database.

### Examples

1. Join a new team, run `snaplet snapshot restore` and get a snapshot of the production database from the evening before
2. See a bug in production? Run `snaplet snapshot restore --new` and restore an "on demand" snapshot in an instant
3. Write E2E tests against actual data
4. Spin up pull requests or deploy preview databases with accurate data
5. Write data-migrations against accurate data

### The workflow

<div style={{textAlign: 'center'}}>

![The Snaplet Workflow](/img/workflow.svg)

</div>

1. Capture a snapshot
2. Generate, transform, reduce or exclude data
3. Share the snapshot
4. Restore to dev environment
