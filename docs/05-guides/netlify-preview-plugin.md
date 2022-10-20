# How to use Snaplet to get isolated Preview Databases for Netlify Preview Deployments

[Netlify's](https://www.netlify.com/) Preview Deployments are a great way to preview changes and verify that your code is working as intended in a live environment. Unfortunately, one limitation is that all your preview environments typically run against a single shared database; generally a staging environment. As this is a shared environment and not isolated, changes to the structure or data of this database may create conflicts for other preview environments using the same database.

<div style={{textAlign: 'center'}}>
    <img align="center" width="480" src="https://uploads-ssl.webflow.com/60d0ad58b8f9ef348bdf3605/634d412e9f22e46149010ae6_preview-databases-problem.png" alt="the problem with preview deployments with a shared database" />
</div>
<br/>

The solution is to create an isolated database for each preview environment, which is now possible with the [Snaplet Netlify Preview Plugin](https://www.netlify.com/integrations/snaplet/). Once you have a preview database for each Netlify Preview Environment you no longer have worry about conflicting migrations and unexpected mutations to data, since each preview database is isolated and scoped to a deployment. As a bonus, your isolated preview environments will be using safely anonymized production-realistic data, allowing you to code against data that mirrors production.

<div style={{textAlign: 'center'}}>
    <img align="center" width="480" src="https://uploads-ssl.webflow.com/60d0ad58b8f9ef348bdf3605/634d4147c54c30321cf40c70_preview-databases-solution.png" alt="the solution - preview databases for preview deployments" />
</div>
<br/>

In this guide we'll show you how to setup and configure the Netlify Preview Plugin from Snaplet. Let's go!

## Getting started

For this guide, we're assuming that you have a production database that you're currently using for your Netlify site. We're going to capture a snapshot of that production database, remove any personally identifiable information to make it safe to use, and then restore that data into a unique isolated preview database for each individual Netlify preview deployment. Throw away your staging database, it's time to bootstrap your preview environments with production-realistic databases and data!

<div style={{textAlign: 'center'}}>
    <img align="center" width="480" src="/img/preview-plugin-logo.png" alt="you branch?" />
</div>


### Step 1: Prerequisites

**1.1. A Netlify account:** You'll need to have an existing site on Netlify, that's connected to your git client. Check the [Netlify Get Started guide](https://docs.netlify.com/get-started/) if you need help setting this up. 

**1.2. A Snaplet account:** You'll then need a Snaplet account - navigate to [Snaplet](https://www.snaplet.dev/) and sign up for a new account (it's free and quick).

Once you're signed up to use Snaplet, you'll need to capture a snapshot of your Netlify site's production database and share it, so Snaplet can restore that snapshot into your preview database for use in your preview deployments on Netlify. 

> **Note:** In capturing a snapshot of your production database, all personally-identifiable information (PII) is safely transformed. You'll have an opportunity to manually review the automatically detected PII, and transform additional data if necessary.

** 1.3.1 Capture a snapshot**
The fastest way to start capturing and restoring Snaplet snapshots is via the Snaplet web app. On the 'Start a new project' screen after setting up your Snaplet account, follow the Snaplet Cloud Capture journey which has Snaplet capture and host snapshots for you.

Follow the steps as indicated to connect to your Netlify site's production database, review your transformations, and capture a snapshot. If you get stuck with any of these steps or encounter issues, check the [Snaplet docs](https://docs.snaplet.dev/?utm_source=partner&utm_medium=netlify) or get help via the [Snaplet Discord](https://app.snaplet.dev/chat). We'll be happy to guide you.

Once you've successfully captured and shared a snapshot to Snaplet Cloud, you're ready to continue, and can move on to installing the Snaplet Netlify Preview Plugin. 

<br/>

### Step 2: Install the Snaplet Netlify Preview Plugin

**2.1. Ådd the build plugin to your Netlify project.**
Go to the [Snaplet Integration Page](https://www.netlify.com/integrations/snaplet/) on the Netlify Integration hub and click the 'Add build plugin' button to install the Preview Databases plugin to the correct Netlify site.

Almost there. Now it's just about configuring the plugin to work correctly. This requires adding some environment variables to your Netlify site. 

<br/>

### Step 3: Add environment variables

**3.1. Enable deploy contexts for environment variables.**
To get started, we need to enable deploy contexts for environment variables. This is currently a beta feature on Netlify. To enable it, - Navigate to 'Netlify Labs' > 'Scopes and Deploy Contexts for Environment Variables' and click on the enable button. 

![Netlify labs setting found on Avatar.](/screenshots/netlify-labs.png)

**3.2. Opt in to environment variables:** 
You'll now be able to opt in for using environment variables for your project. To do so, navigate to 'Site Settings' and look for the new 'Environment Variables (beta)' tag. Click on 'Opt into the new experience' or 'Migrate environment variables' if you happen to have existing environment variables.

Alright. Let's add some environment variables to your Netlify project. 

> **NB:** Environment variables must be named exactly as below for the plugin to work correctly.

**3.3. Add the database URL environment variable (`DATABASE_URL`):**

Start with the database URL environment variable, if this doesn't exist already. This is the URL of your actual Netlify site's production database. 

![Database environment variable.](/screenshots/netlify-db-url.png)

**3.4. Add a Snaplet access token (`SNAPLET_ACCESS_TOKEN`):** 

You'll need to add a Snaplet access token environment variable. Start by generating a new access token from within the Snaplet UI - look for 'Access tokens' in the top right of your browser. Generate a new access token, give it a name, copy the value, and add it to your Netlify project as a new environment variable `SNAPLET_ACCESS_TOKEN`.

![Snaplet access token in dashboard.](/screenshots/netlify-snaplet-access-token.png)

**3.5. Add a Snaplet project id (`SNAPLET_PROJECT_ID`):** 

You'll also need to add a Snaplet project id, which associates the preview database to the correct Snaplet project. The id is created automatically by Snaplet - you can find it in the Snaplet UI under  'Teams' > 'Your team' > 'Your project' > 'Settings'. Click to copy your project id and use it in creating a new environment variable for your Netlify project called `SNAPLET_PROJECT_ID`.

![Snaplet project id in settings.](/screenshots/netlify-snaplet-projectId.png)

**3.6. Add your Netlify access token (`NETLIFY_ACCESS_TOKEN`):** 

You'll also need to add an environment variable for your Netlify Access Token. This value can be found in the Netlify UI: click on your avatar in the top right, then navigate to 'User settings' > 'Applications' > 'OAuth' > 'Personal access tokens'. Copy this value and create a new environment variable for your Netlify project called `NETLIFY ACCESS TOKEN`.

![Netlify access token in dashboard](/screenshots/netlify-access-token.png)

That's it! All done and configured. You should have four environment variables in total, and you're now able to test your integration.

<br/>

### Step 4: Trigger a preview build.

With all steps completed, once a PR is created from your git client, a new build will be triggered in Netlify and the plugin will run before the build process. The sequence of events that happens is as follows:

1. Your latest Snaplet snapshot is used to populate a temporary database with data.
2. That unique, isolated preview database is associated with your preview deployment.
3. Once your preview deployment is closed, the database is destroyed.

![Netlify build logs output.](/screenshots/netlify-build-logs.png)

After your build is done, a preview button will appear which allow you to preview the changes made in that PR.

Well done! You've successfully captured a snapshot of your database (anonymizing sensitive personally-identifiable information), and restored that snapshot's data into your Netlify Preview Environment's database. You now have an isolated deployment environment with a unique, isolated database for each preview deployment! 

We hope this guide helped! If you get stuck or need assistance, come ask us on [Discord](https://www.snaplet.dev/)Discord. 
