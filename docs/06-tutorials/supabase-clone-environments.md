# Supabase Clone Environments

This guide will help you get a development Supabase environmnent setup using Snaplet. You will create a snapshot of your production Supabase project and restore it to your [supabase local dev](https://supabase.com/docs/guides/cli/local-development) stack.

:::note
**Note:** We’ve spent a lot of time ensuring that Snaplet works seamlessly with Supabase, however, if you experience any issues with this integration or this guide, feel free to come chat with us on [Discord](https://app.snaplet.dev/chat).
:::

## Clone Supabase production data, without sensitive information, to a development environment

We're massive fans of supabase because it makes it so easy to start a project with a dedicated PostgreSQL database. However, achieving a development environment populated with data closely resembling producation, still requires some set up.

That's why we here! Snaplet makes populating your local development environments with data and keeping that data consistant with production, incredibly simple. This consistency accross environments is rooted in a philosophy we believe in here at Snaplet [Environment parity](https://www.oreilly.com/content/environment-parity-for-rapidly-deployed-cloud-native-apps/).

This guide will walk you through the exact steps to achieve this with your data in Supabase!. End-end, it shouldn't take more than 15 minutes and doing so will allow you to code against an accurate development environment that you can sync with production.

<div style={{textAlign: 'center'}}>

![I absolutely love Supabase!](/img/snappy-holding-supabase-logo.svg)

</div>

### Step 1: Connect your source database (Production Database)

The first thing you’ll want to do is navigate to https://www.snaplet.dev/ and sign up for a new account (it’s free). Once you have successfully signed up for a new account, you’ll begin the onboarding process...

<img src="/screenshots/onboarding_start.webp" alt="Snaplet onboarding select team name" style={{ border: "1px solid #e5e7eb" }} />

On the “Connect database” step click on "Connect Supabase" to connect your supabase account to snaplet. Proceed through all the steps of authorizing your Supabase organization, selecting a Supabase project and giving us the password associated to the project.

<img src="/screenshots/connect_to_supabase.webp" alt="Snaplet onboarding connect your database" style={{ border: "1px solid #e5e7eb" }} />

### Step 2: Create a snapshot

Once that is done, continue to the next steps:

- Subsetting (skipping will create a snapshot with all your data).
- Transforming (skipping will leave all your table columns untouched).

Once you have gone through those steps, a new snapshot process will start and you will now be on the “capture step.” Wait for it to finish - this is the snapshot you will restore into your **target database.**

<img src="/screenshots/onboarding_capture.webp" alt="Snaplet onboarding capturing your database" style={{ border: "1px solid #e5e7eb" }} />

### Step 3: Set up your Supabase local development stack

Below is a summary of commands you will have to run in your terminal to get Supabase set up on your local machine. For a more detailed steps you can visit the Supabase docs [here](https://supabase.com/docs/guides/cli/local-development).

```bash
# log in to the Supabase CLI
supabase login

# initial your supabase configuration in your project folder
supabase init

# with docker running, start your supabase services
supabase start
```

Running `supabase start`, your Supabase credentials, copy the **DB_URL** field, we will use it in your snaplet configuration file (the next step).

```
Started supabase local development setup.

         API URL: http://localhost:54321
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
        anon key: eyJh......
service_role key: eyJh......
```

### Step 4: Install the Snaplet CLI

1. Open your terminal and run `curl -sL https://app.snaplet.dev/get-cli/ | bash`
2. Run `snaplet auth login`
3. Navigate to `https://app.snaplet.dev/access-token/cli` to get your access token.
4. Paste the access token in the terminal.

### Step 5: Config setup

You're now ready to restore your production snapshot into your Supabase development project.

1. Navigate to your project directory
2. Run `snaplet config setup`

   1. You will be shown a warning to write create `.snaplet/config` in your project directory. Select yes (y) to create the file.
   2. Then you will be asked for a **target database connection string.** . Paste in the **DB URL** you copied in step 3.

3. Run `snaplet project setup` - you will be presented with a list of projects, these are databases that are connected to your Snaplet account. Choose the project that contains the snapshot you created in step 2.

### Step 6: Restore the data target

With all the above steps complete, we can now restore!

1. Run `snaplet snapshot restore` in your project path.

<div style={{textAlign: 'center'}}>

![Supabase is fun!](/img/snappy-with-supabase-ball.svg)

</div>

## All done!

If you want to learn more about Snaplet, you can explore our docs. If you have any questions, feel free to reach out on [Discord](https://app.snaplet.dev/chat).

That’s it! You’re all done, and should have restored a version of your Supabase production database with transformed data into your target database. You can now safely code against production-realistic data.

You can use the `generate` command to seed your local dev setup. Read this [guide](https://supabase.com/docs/guides/cli/seeding-your-database) for more information.

## Troubleshooting

### Warnings after restoring

When running the restore command, you may see warnings such as:

```jsx
Could not drop schema "auth", Snaplet will try to truncate all tables and related objects as a fallback: error: must be owner of schema auth
[Schema] Warning: type "aal_level" already exists, statement: "CREATE TYPE auth.aal_level AS ENUM (...
```

Supabase includes a few schemas that are not owned by the `postgres` user, for example: **auth**, **graphql**, **realtime,** and **storage.** During the capture process, Snaplet will try to capture data for tables under these schemas (if it has permission to read data from them)

Your **target database** may already contain these schemas when restoring. The warnings just mean that when Snaplet attempted to restore these schemas (**auth, graphql**, etc) but was unable to drop the ones already existing in your **target database** (since the user is not an owner of these), and consequently it was not able to create any structure for them (since that structure still exists)

Snaplet will still make sure to clear all data for tables in these schemas and restore data for each of these tables to what is in the snapshot. In other words, **these warnings do not mean that the restore failed, but rather show you what Snaplet tried to do.**

If you aren't actually needing the data for some of these schemas, you can stop these warnings by excluding the schema from the captured snapshots. You can read more on how to do this [over here in our docs](https://docs.snaplet.dev/references/data-operations/exclude):

![Example of excluding a schema](/img/snaplet-supabase-schema-exclude.png)

---

### Restoring in to a Supabase project

When restoring to Supabase project hosted in cloud, you will run into issues restoring a snapshot in to that project. This is because
when restoring Snaplet drops the whole database, before restoring any schemas and tables again. Where your project will break is where Snaplet is unable to restore a schema that Supabase requires a super user role to perform write operations.

To get around this, run the `restore` command with the `--no-reset` flag, e.g:

```bash
snaplet snapshot restore --no-reset
```
