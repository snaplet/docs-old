---
slug: /
---

# Overview

Snaplet gives developers PostgresQL data that they can code against. It does this by capturing a snapshot of a database: copying the schema and providing a JavaScript runtime for transforming, reducing (subsetting) and generating the data.

## The problem

As a developer, it's difficult to get accurate data to code against. Coding against accurate data clears assumptions and removes ambiguiety when adding features or fixing bugs.

The most common approaches for solving this are to write seed scripts, or to copy the production database.

<div style={{textAlign: 'center'}}>

![Urgh, I just want to code!](/img/problem-statement.svg)

</div>

Seed scripts are tedious to write and maintain, inaccurate and a tiny representation of accurate data, whereas copying from production lacks decent workflows, is slow because you have to copy all the data, and it contains personal information.

## The solution

Snaplet is a command line tool that gives developers a "code as configuration" environment for transforming, reducing (subsetting), and generating data.
The data is stored as snapshots that can be restored into any development environment.

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
