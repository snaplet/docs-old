---
sidebar_position: 1
slug: /
---

# Introduction

Snaplet copies a Postgres database, transforming personal information, so that developers can **safely code against actual data.**

## The problem

As a developer it's difficult to get an accurate representation of production-like data. The most common approaches for solving this are to write seed scripts, to copy the production database.

<div style={{textAlign: 'center'}}>

![Urgh, I just want to code!](/img/problem-statement.svg)

</div>

Seed scripts are tedious to write and maintain, inaccurate and a tiny representation of actual data. Whilst copying from production lacks decent workflows, is slow because you have to copy all the data, and contains personal information.

## The solution

That's where Snaplet comes in! We're a self-service workflow that allows developers to copy and transform a database to create snapshots, which can be restored into any development environment in a snap! 

### Examples

1. Imagine joining a new team, typing `snaplet restore` and getting a snapshot of the database from the evening before
2. Seeing a bug in production, typing `snaplet restore --new` and restoring an "on demand" snapshot in an instant
3. Starting each PR with a fresh snapshot of the database
4. Writing data-migrations against actual data


### The workflow

<div style={{textAlign: 'center'}}>

![The Snaplet Workflow](/img/workflow.svg)

</div>

1. Snaplet's snapshot workers connect to your database
2. The workers copy and transform your data.
3. The data is archived, encrypted, and the snapshot is stored in a private bucket.
4. The snapshots are restored into development environments with the Snaplet CLI.

:::info
**Self-hosted snapshot workers are coming in Q4 2021.**

You will not have to give us access to your database, and snapshots can be stored in your own private bucket.
:::

## Getting started...

Great, you're still here! Let's [create your first snapshot!](/getting-started/create-a-new-datasource)