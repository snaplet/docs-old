---
slug: /
---

# Overview

Snaplet is a command line utility that captures snapshots of a database that can be shared with a team, so that everyone can code against the same database.

Snaplet gives developers PostgresQL data that they can code against. It does this by capturing a snapshot of a database: copying the schema and providing a JavaScript runtime for transforming, reducing (subsetting) and generating the data.

## The problem

As a developer it's difficult to get an accurate representation of data in production. Coding against accurate data clears assumptions and removes ambiguiety when adding features or fixing bugs.

The most common approaches for solving this are to write seed scripts, or to copy the production database.

<div style={{textAlign: 'center'}}>

![Urgh, I just want to code!](/img/problem-statement.svg)

</div>

Seed scripts are tedious to write and maintain, inaccurate and a tiny representation of accurate data. Whilst copying from production lacks decent workflows, is slow because you have to copy all the data, and contains personal information.

## The solution

Snaplet is a self-service workflow that allows developers to copy whilst transforming a data, which can then be shared and restored into any development environment.

### Examples

1. Join a new team, run `snaplet snapshot restore` and get a copy from the evening before
2. See a bug in production? run `snaplet snapshot restore --new` and restore an "on demand" snapshot in an instant
3. Write E2E tests again actual data
4. Spin up pull request/ deploy preview databases with accurate data
5. Write data-migrations against accurate data

### The workflow

<div style={{textAlign: 'center'}}>

![The Snaplet Workflow](/img/workflow.svg)

</div>

1. Snaplet's snapshot workers connect to your database
2. The workers copy and transform your data.
3. The data is archived, encrypted, and the snapshot is stored in a private bucket.
4. The snapshots are restored into development environments with the Snaplet CLI.
