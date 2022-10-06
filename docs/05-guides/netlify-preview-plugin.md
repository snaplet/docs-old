# How to use Snaplet Snapshots, Preview Databases and Netlify Preview Deployments

Snaplet gives developers databases with data to code against. Using Snaplet and Netlify Preview Deployments is a match made for the clouds: Once you have a preview database for each Netlify Preview Environment you no longer have to worry about conflicting migrations and unexpected mutations to data, since each preview database is isolated and scoped to a deployment.

Below is a video of Snaplet founder, Peter Pistorius, presenting the plugin at Prisma's - What's new in Prisma.

<iframe width="560" height="315" src="https://www.youtube.com/embed/b1XXWPRSIjQ?start=587" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In this guide we’ll show you how to quickly combine Netlify Preview Deployments with Snaplet Preview Databases. Let’s go!


## Getting started

Let’s assume you have a producation database that you’re currently using against your Netlify Preview Deployments. We’re going to capture a snapshot of that production database, which we’ll then restore into your preview databases.

<div style={{textAlign: 'center'}}>
    <img align="center" width="480" src="/img/preview-plugin-logo.png" alt="you branch?" />
</div>


### Step 1: Prerequisites

**1.1. A Netlify account:** Connect to your git client to netlify and create a site by navigating to [https://app.netlify.com/](https://app.netlify.com/). Create a new site if you haven’t already, for this guide we will assume you have an existing site.

**1.2. A Snaplet Account:** Navigate to [https://www.snaplet.dev/](https://www.snaplet.dev/) and sign up for a new account (it’s free).

**1.2.1 CLI use:** For preview database creation, you will need a snapshot in Snaplet.

```bash
# Install the CLI
curl -sL https://app.snaplet.dev/get-cli/ | bash

# Setup your config
snaplet auth setup

# Create a local snapshot of your prod database.
SNAPLET_DATABASE_URL=[prod_db_url] snaplet snapshot capture
 
# Share to Snaplet cloud
snaplet snapshot share
```

<br/>

### Step 2: Install the plugin

**2.1. Install it as a dependency in your project.**

```bash
yarn add -D @snaplet/netlify-preview-database-plugin
```

**2.2. Add it as a build package in your `netlify.toml`**

```toml
[[plugins]]
package = "@snaplet/netlify-preview-database-plugin"
```

<br/>

### Step 3: Add environment variables

**3.1. Enable deploy contexts for environment variables (beta feature):** Navigate to `Netlify Labs` > `Scopes and Deploy Contexts for Environment Variables` and click on the enable button.

> **Why:** The plugin will update your database environment variable value linked to the deploy context.

![Netlify labs setting found on Avatar.](/screenshots/netlify-labs.png)

**3.2. Migrate to the new experience:** At this point, you will have a new tab, `Environment Variables (Beta)` appear in your site settings. Click on `Opt into the new experience` or `Migrate environment variables` if you have existing environment variables.

**3.3. Add the database URL environment variable if it doesn’t exist already:** Go to your site then navigate to `Site settings` > `Environment Variables (Beta)`

![Database environemnt variable.](/screenshots/netlify-db-url.png)

**3.4. Add required plugin environment variables.**

**3.4.1. A Snaplet access token (`SNAPLET_ACCESS_TOKEN`):** This can be found in the Snaplet UI, by clicking on the access tokens menu item at the top.

![Snaplet access token in dashboard.](/screenshots/netlify-snaplet-access-token.png)

**3.4.2. A Snaplet project id (`SNAPLET_PROJECT_ID`):** The project with which the preview database will be created with. Navigate to `Teams` > `Your team` > `Your project` > `Settings` and copy your project id.

![Snaplet project id in settings.](/screenshots/netlify-snaplet-projectId.png)

**3.4.3. A Netlify access token (`NETLIFY_ACCESS_TOKEN`):** This can be found in the Netlify UI, click on your avatar in the top right, then navigate to `User settings` > `Applications` > `OAuth` > `Personal access tokens`. Then proceed to create a new access token.

![Netlify access token in dashboard](/screenshots/netlify-access-token.png)

> **Note:** To have your environment variables scoped to just your builds, you will need a `Pro account` or above, then only check the `Builds` check item.

![Netlify build specific scope.](/screenshots/netlify-specific-scope.png)

<br/>

### Step 4: Trigger a preview build.

When you've completed all the steps, once a pr is created your git client, a new build will be triggered in Netlify and run the plugin before the build process begins.

![Netlify build logs output.](/screenshots/netlify-build-logs.png)

After your build is done, a preview button will appear which will allow you to preview the changes made in that pr.
