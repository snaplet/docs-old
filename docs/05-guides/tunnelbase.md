# Local Development Branching Workflow

## Introduction

The `snaplet dev` command allows you to easily create and work with isolated, network-accessible, up-to-date snapshots of production accurate data for each branch in your code repository. This enables you to test and develop against a consistent and representative database state without one local branch affecting another.

The benefits of coding against a branch of your database are:
1. Mutations in one database do not affect another. 
2. The branch is in the cloud, so you're able to seamlessly code against the same database as your team.
3. Branches are updated when scheduled snapshots are captured, so you're always coding against production-accurate data.

## Prerequisites

Before using the `snaplet dev` command, ensure that you have the following prerequisites in place:

1. A Snaplet Project.
2. Your code repository has Snaplet configured.

## Setting up the Preview Database Proxy

### 1. Capture a snapshot and tag it "main"

Before you can start using the `snaplet dev` command, you need to capture a snapshot of your database and tag it as `"main"`. This snapshot will serve as the initial state for development. Each subsequent snapshot that is tagged main will become the default branch.


### 2. Run `snaplet dev`

Start the Snaplet development server in your codebase. Open a terminal  and run the following command:

```terminal
npx snaplet dev
```

This command starts the Snaplet development server and sets up the necessary infrastructure to enable the database proxy functionality.


### 3. Modify the Database Connection String

To connect your application to the `snaplet dev` proxy, you need to modify the database connection string in your codebase. Locate the configuration file or section in your codebase that defines the database connection details. Such as a `.env` file.

Change the connection string to point to the address of the database proxy provided by Snaplet: `postgres://snappy@localhost:2345/snappy`

## Usage

The `snaplet dev` command is long-running. It continuously watches for changes in your code repository branches. Whenever a repository branch is changed, the feature automatically creates a corresponding isolated database snapshot specifically for that branch.

This behavior ensures that each branch in your code repository has its own separate and up-to-date database, allowing you to work on different branches without interfering with each other's data.

For example, let's say you have a main branch and you create a new feature branch called "my-feature." When you switch to the "my-feature" branch in your code repository, the `snaplet dev` command will automatically branch the database and provide you with an isolated snapshot of the production accurate data specifically for the "my-feature" branch. This allows you to develop and test against a consistent and representative database state for that particular branch.


## Maintaining the "Main Branch"

To ensure that the "main branch" always has an up-to-date database snapshot, Snaplet can schedules periodic snapshots that are tagged as "main." The "main branch" refers to the default or primary branch in your code repository.

Overall, the combination of branching the database for each code repository branch and maintaining the "main branch" through scheduled snapshots ensures that you have isolated and up-to-date database snapshots for different branches while keeping a consistent snapshot for the main branch. This approach facilitates seamless development and testing workflows in Snaplet.
