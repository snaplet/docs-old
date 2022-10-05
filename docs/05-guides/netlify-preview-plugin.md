# How to use Snaplet to get isolated Preview Databases for Netlify Preview Deployments

Netlify's Preview Deployments are a great way to preview changes and verify that your code is working as intended in a live environment. Unfortunately, one frustrating limitation is that all your preview environments typically run against a single shared database, generally a staging environment. Because this is a shared environment and not isolated, changes to the structure or data of this database may create conflicts for other preview environments. 

The solution is to create an isolated database for each preview environment, which is now possible with the Snaplet Netlify Preview Plugin. Once you have a preview database for each Netlify Preview Environment you no longer have worry about conflicting migrations and unexpected mutations to data, since each preview database is isolated and scoped to a deployment. In this guide we'll show you how to setup and configure the Netlify Preview Plugin from Snaplet. Let's go!


## Getting started

For this guide, we're assuming that you have a production database that you're currently using for your Netlify Preview Deployments. We're going to capture a snapshot of that production database, remove any personally identifiable information to make it safe to use, and then restore that data into a isolated preview database for each Netlify preview deployment. 

<div style={{textAlign: 'center'}}>
    <img align="center" width="480" src="/img/preview-plugin-logo.png" alt="you branch?" />
</div>


### Step 1: Prerequisites

**1.1. A Netlify account:** You'll need to connect your git client to Netlify and have an existing site on Netlify. 

**1.2. A Snaplet account:** You'll also need a Snaplet account - navigate to [snaplet.dev](https://www.snaplet.dev/) and sign up for a new account (it's free).

**1.3 CLI use:** We restore a Snaplet snapshot of your database into your preview database. You'll need to install the Snaplet CLI, setup your Snaplet config, capture a snapshot of your database and save it to Snaplet cloud for use by Netlify.

```bash
# Install the CLI
curl -sL https://app.snaplet.dev/get-cli/ | bash

# Setup your Snaplet config
snaplet auth setup

# Create a local snapshot of your production database
SNAPLET_DATABASE_URL=[prod_db_url] snaplet snapshot capture
 
# Share to Snaplet cloud
snaplet snapshot share
```

<br/>

### Step 2: Install the Snaplet Netlify Preview Plugin

**2.1. Install it as a dependency in your Netlify project.**

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

**3.1. Enable deploy contexts for environment variables. This is a beta feature - ** Navigate to `Netlify Labs` > `Scopes and Deploy Contexts for Environment Variables` and click on the enable button.

> **Why:** The plugin will update your the database environment variable value linked to the deploy context.

![Netlify labs setting found on Avatar.](/screenshots/netlify-labs.png)

**3.2. Migrate to the new experience:** At this point, you will have a new tab, `Environment Variables (Beta)` appearing in your site settings. Click on `Opt into the new experience` or `Migrate environment variables` if you have existing environment variables.

**3.3. Add the database URL environment variable if it doesn't exist already:** Go to your site then navigate to `Site settings` > `Environment Variables (Beta)`

![Database environment variable.](/screenshots/netlify-db-url.png)

**3.4. Add required plugin environment variables.**

**3.4.1. A Snaplet access token (`SNAPLET_ACCESS_TOKEN`):** This can be found in the Snaplet UI, by clicking on the Access tokens menu item at the top.

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

After your build is done, a preview button will appear which allow you to preview the changes made in that PR.

Well done! You've successfully captured a snapshot of your database (anonymizing sensitive personally-identifiable information), and restored that snapshot's data into your Netlify Preview Environment's database. You now have an isolated deployment environment with a unique, isolated database for each preview deployment! 

We hope this guide helped! If you get stuck or need assistance, come ask us on [Discord](https://www.snaplet.dev/)Discord. 
