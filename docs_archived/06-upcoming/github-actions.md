---
sidebar_position: 2
---

# GitHub Actions

[GitHub Actions](https://docs.github.com/en/actions) can be used to automate, customize, and execute your software development workflows right in your repository. You can discover, create, and share actions to perform any job you'd like, including CI/CD, and combine actions in a completely customized workflow.

This example is built from the official GitHub documenation provided at the following link, [Creating PostgreSQL service containers](https://docs.github.com/en/actions/guides/creating-postgresql-service-containers).

## Create an Action

To create an Action, you need a `.yml` file inside a folder called `workflows` nested inside another folder called `.github`. We will also include a Node script called `client.js` to test the database.

```bash
mkdir snaplet-actions
cd snaplet-actions
mkdir -p .github/workflows
touch .github/workflows/main.yml client.js .gitignore
```

Initialize a `package.json` file and install the `pg` dependency.

```bash
npm init -y
npm i pg
```

Include the following in your `.gitignore` file.

```
node_modules
.DS_Store
```

## Workflow

This is a basic workflow to help you get started with running Postgres on GitHub Actions.

### Name

GitHub displays the `name` of your workflows on your repository's actions page.

```yaml
name: PostgreSQL service example
```

### On

`on` controls when the workflow will run.

```yaml
on:
  push:
    branches: [main]
```

We have selected `push` events to trigger the workflow but only for the `main` branch.

### Jobs

A workflow run is made up of one or more `jobs` that can run sequentially or in parallel.

```yaml
jobs:
  container-job:
    runs-on: ubuntu-latest
    container: node:10.18-jessie
```

Our workflow contains a single `container-job` that is running on `ubuntu-latest` with a `container` called `node:10.18-jessie`.

### Services

`services` are used to host service containers for a job in a workflow and are useful for creating databases or cache services like Redis.

```yaml
    services:
      postgres:
        image: postgres
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
```

This workflow configures a service container with the label `postgres` and uses the `postgres` container `image` from Docker Hub. The default PostgreSQL password is provided along with health check options to make sure the service is running.

### Steps

`steps` represent a sequence of tasks that will be executed as part of the job.

```yaml
    steps:
      - name: Check out repository code
        uses: actions/checkout@v2

      - name: Install dependencies
        run: npm ci

      - name: Connect to PostgreSQL
        run: node client.js
        env:
          POSTGRES_HOST: postgres
          POSTGRES_PORT: 5432
```

We have three steps:

1. `uses` checks-out your repository and downloads a copy of the code so your job can access it.
2. The first `run` will run `npm ci` to perform a clean installation of all dependencies in the `package.json` file.
3. The second `run` will run a script that creates a PostgreSQL table, populates the table with data, and then retrieves the data. `env` includes the environment variables used by the `client.js` script to create a new PostgreSQL table with a host name and port number.

### Complete GitHub Action

```yaml
name: PostgreSQL service example

on:
  push:
    branches: [main]

jobs:
  container-job:
    runs-on: ubuntu-latest
    container: node:10.18-jessie
    
    services:
      postgres:
        image: postgres
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - name: Check out repository code
        uses: actions/checkout@v2

      - name: Install dependencies
        run: npm ci

      - name: Connect to PostgreSQL
        run: node client.js
        env:
          POSTGRES_HOST: postgres
          POSTGRES_PORT: 5432
```

## Create Node script to test database

Include the following script to test your workflow by connecting to the PostgreSQL service with `pg` and adding a new table with placeholder data. The script then prints the values stored in the PostgreSQL table to the terminal.

```javascript
const { Client } = require('pg')

const pgclient = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
})

pgclient.connect()

const table = 'CREATE TABLE snaps(id SERIAL PRIMARY KEY, name VARCHAR(40) NOT NULL)'
const text = 'INSERT INTO snaps(name) VALUES($1) RETURNING *'
const values = ['Snappy the Snaplet']

pgclient.query(table, (err, res) => {
    if (err) throw err
})

pgclient.query(text, values, (err, res) => {
    if (err) throw err
})

pgclient.query('SELECT * FROM snaps', (err, res) => {
    if (err) throw err
    console.log(err, res.rows)
    pgclient.end()
})
```

## Create a blank GitHub repository

Go to [repo.new](https://repo.new) and create a new repository.

```bash
git init
git add .
git commit -m "first action"
git branch -M main
git remote add origin https://github.com/ajcwebdev/snaplet-actions.git
git push -u origin main
```

Go to the actions tab on your GitHub repository to see your action.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i0mrjmqqq4r0kyvvwlan.png)

Click your action to see the specific workflow.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/x6m4wms0ms4d2rbwqgjr.png)

Click `container-job` to see more details.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ln07onwddrhi8629ctza.png)

We can see if our test worked by opening the Connect to PostgreSQL section.

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3fhnnlzkbsgohnbtgdp5.png)