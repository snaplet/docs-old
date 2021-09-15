---
sidebar_position: 2
---

# GitHub Action - Postgres Docker Image with "Baked-In" Data

TK Codespaces + docker login

## Introduction

Snaplet copies a production database, transforming personal information so that developers can safely code against actual data.

This action allows us to use Snaplet on-demand and create docker image with "baked-in" data.

## Why is that important?

Let's use codespaces as an example. Github codespaces can set up development environments in seconds and most applications need data to work with.

Traditionally, applications are setup with minimal, unrealistic data from seed scripts. Coding against unrelastic data could lead to false assumptions that result in bugs and inaccurate features.

![Snaplet bring data to codespaces as soon as they are booted](/img/snaplet-codespaces.png)

This action can be used to periodically build a docker base image for Github codespaces, so as soon as your codespace boots up, it already has all the data in it.

Since it has gone through Snaplet's PII removal feature already, it is safe to use and realistic.

Your dev-env matches production. Why not do the same with the data?

## Prerequisites

1. If you are new to Snaplet, please [check us out here](https://www.snaplet.dev/). To follow this guide, you must have taken a snapshot with Snaplet already.
2. This guide assumes some familiarity with setting up Github codespaces. Please take some time to read through the [Github codespaces documentation here](https://docs.github.com/en/codespaces/getting-started/quickstart).

## How to use it to publish a docker image?

The action needs the following:

1. A workflow trigger, that can be a push to the repo or a workflow dispatch or even be run on a schedule.
1. A Github action service container running Postgres that matches the version of your production postgres.
1. Docker login in the Github action so it can publish the Postgres images with "baked-in" data.
1. Installing Snaplet CLI in the Github action so `snaplet restore` can be called.
1. Using this action with required parametes. Mainly docker registry username for Github containers.

Let's build this piece-by-piece, if you are eager and want to see a full example, see a [full example below](here-is-a-full-example-of-the-usage)

### 1. A workflow trigger, that can be a push to the repo or a workflow dispatch or even be run on a schedule.

```yml
on:
  workflow_dispatch:
  schedule:
    - cron: "0 5 * * *" # 5 AM everyday
```

An example that shows how this action can be run on schedule or on demand via `workflow_dispatch`.

### 2. A Github action service container running Postgres that matches the version of your production postgres.

```yml
services:
  postgres:
    image: postgres:13
    env:
      POSTGRES_PASSWORD: postgres
      POSTGRES_USER: postgres
      POSTGRES_DB: snaplet_development
    options: >-
      --health-cmd pg_isready
      --health-interval 10s
      --health-timeout 5s
      --health-retries 5
    ports:
      - 5432:5432
```

Note that for the best results, the Postgres version here should match the database from which Snaplet takes the snapshots.

Learn more about [Github actions service containers here](https://docs.github.com/en/actions/guides/about-service-containers).

### 3. Docker login in the Github action so it can publish the Posgres images with "baked-in" data.

```yml
uses: docker/login-action@v1
  with:
    registry: ${{ secrets.GHCR_CONTAINER_REGISTRY_SERVER }}
    username: ${{ secrets.GHCR_CONTAINER_REGISTRY_USER }}
    password: ${{ secrets.GHCR_CONTAINER_REGISTRY_PASSWORD }}
```

For this action to be able to push the docker image to a container registry. We need to be logged in to a docker registry.

### 4. Installing Snaplet CLI in the Github action so `snaplet restore` can be called.

```yml
- name: Install Snaplet
  run: curl -sL https://app.snaplet.dev/get-cli/ | bash
```

This action relies on Snaplet CLI being installed.

### 5. Using this action with required parametes. Mainly docker registry username for Github containers.

```yml
uses: snaplet/publish-postgres-with-data-docker-action@main
with:
  docker-container-registry-server: ghcr.io
  docker-container-registry-user: snaplet
  docker-image-name: snaplet-development-database
env:
  SNAPLET_ACCESS_TOKEN: ${{ secrets.SNAPLET_ACCESS_TOKEN }}
  SNAPLET_DATABASE_ID: ckrx7593s162141vrwgmv33u5j
  PGHOST: localhost
  PGUSER: postgres
  PGPASSWORD: postgres
  PGPORT: 5432
  PGDATABASE: snaplet_development
```

This action requires only one input, `docker-container-registry-user`. All other inputs are optional.

| Input                            | Required | Default          |
| -------------------------------- | -------- | ---------------- |
| docker-container-registry-server | false    | ghcr.io          |
| docker-container-registry-user   | true     |                  |
| docker-image-tag                 | false    | snaplet_database |

Note that the published image tag is constructed by combining the inputs in the format.

```
${docker-container-registry-server}/${docker-container-registry-user}/${docker-image-tag}:latest
```

Note: It is not possible to change the docker image version at the moment.

### Here is a full example of the usage

```yml
name: publish postgres container with snaplet data
on:
  push:
  workflow_dispatch:
  schedule:
    - cron: '0 5 * * *' # 5 AM everyday

jobs:
  # Label of the runner job
  publish-postgres-container:
    name: Snaplet Restore
    timeout-minutes: 10
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:latest # Must match the database where snapshot was taken
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_USER: postgres
          POSTGRES_DB: snaplet_development
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
        uses: actions/checkout@v2

        uses: docker/login-action@v1
        with:
          registry: ${{ secrets.GHCR_CONTAINER_REGISTRY_SERVER }}
          username: ${{ secrets.GHCR_CONTAINER_REGISTRY_USER }}
          password: ${{ secrets.GHCR_CONTAINER_REGISTRY_PASSWORD }}

      - name: Install Snaplet
        run: curl -sL https://app.snaplet.dev/get-cli/ | bash

        uses: snaplet/publish-postgres-with-data-docker-action@main
        with:
          docker-container-registry-server: ghcr.io
          docker-container-registry-user: snaplet
          docker-image-name: snaplet-development-database
        env:
          SNAPLET_ACCESS_TOKEN: ${{ secrets.SNAPLET_ACCESS_TOKEN }}
          SNAPLET_DATABASE_ID: ckrx7593s162141vrwgmv33u5j
          PGHOST: localhost
          PGUSER: postgres
          PGPASSWORD: postgres
          PGPORT: 5432
          PGDATABASE: snaplet_development
```

When you run this action, it should successfully publish a docker image with data. If you are logged in with docker CLI, you should be able to test your published docker image with

```bash
docker run ghcr.io/<docker-container-registry-user>/<docker-image-name>
```

## We published the docker image, now what?

Using this action to publish a docker image with data is one side of the story. To have a Github codespace booted with data we need to use it in Codespace devcontainer configuration.

We will now do the following:

1. Setup Github codespace with database using the image we published in the previous step.
1. (Optional, if your docker image is private). Setting up codespace to be able to access private docker image

### 1. Setup Github codespace with database using the image we published in the previous step.

Quoting the [Codespaces `devcontainer.json` documentation](https://docs.github.com/en/codespaces/customizing-your-codespace/configuring-codespaces-for-your-project)

> You can use a devcontainer.json file to define a Codespaces environment for your repository.

[Here is how](https://github.com/microsoft/vscode-dev-containers/blob/bd53a6615fa12ccb8fade3426b9c0ff0fbfce317/containers/javascript-node-postgres/.devcontainer/docker-compose.yml#L31) and example devcontainer.json looks like for a Codespace with a database.

Once we have a Docker image with data available, we can simply use that in `devcontainer.json` to build our codespace with data

```
  db:
    image: ghcr.io/<docker-container-registry-user>/<docker-image-name>
```

Important: if your published docker image is private, you need to follow step 2.

### 2. (Optional, if your docker image is private). Setting up codespace to be able to access private docker image

Note that Github codespace need to be able to "download" your docker image at its build time. If your docker image is private, you need to setup Codespace to be able to access it. Here is how.

You need to define Codespace secrets on the following URL.

```
https://github.com/<username>/<repository>/settings/secrets/codespaces
```

They must follow the pattern

```
<*>_CONTAINER_REGISTRY_SERVER
<*>_CONTAINER_REGISTRY_USER
<*>_CONTAINER_REGISTRY_PASSWORD
```

It doesn't matter what the value of `<*>` is as long as it is the same for all three variables.

![Codespaces Secrets in Github](/img/snaplet-codespaces-secrets.png)

After the codespace secrets are setup. You need to stop the codespace by pressing F1 and choosing "Stop current codespace". Note that this option [is different](https://github.com/github/feedback/discussions/5179#discussioncomment-1209507) from just "Rebuild container".

![Stop codespace image](/img/stop-codespace.png)

Follow the Github codespaces documentation about [using private docker registry here](https://docs.github.com/en/codespaces/codespaces-reference/allowing-your-codespace-to-access-a-private-image-registry)

After you follow these steps and rebuild your Codespace, it should already have the data and all the developer folks should be ready to ship amazing feature with realistic data.

## FAQ

- Is it possible to use other docker registry than Github container registry?

Yes, it is possible to provide inputs to the Github action and publsh to another registry than `ghcr.io`. Please follow all the [input options here](https://github.com/snaplet/publish-postgres-with-data-docker-action#inputs).

Please be aware that the actual docker image name is constructed based on these inputs and follows the following format

```
${docker-container-registry-server}/${docker-container-registry-user}/${docker-image-tag}:latest
```

## Links

- [Github Marketplace](https://github.com/marketplace/actions/postgres-docker-image-with-baked-in-data)
- [Github Source](https://github.com/snaplet/publish-postgres-with-data-docker-action)
