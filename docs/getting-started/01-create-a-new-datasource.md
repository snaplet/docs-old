# Create a datasource

Once you've [logged in](https://app.snaplet.dev/login), create a datasource that allows Snaplet to connect to your database. We never write to your database and recommend that you [create a readonly role](/postgresql/create-read-only-role).


<div style={{textAlign: 'center'}}>

![Creds please!](/screenshots/onboarding_datasource.png)

</div>


:::tip
Still testing Snaplet? No problem. Use our test database credentials.
```
postgresql://snaplet_readonly:a-very-good-password@db.bmkxarhsomwjwvhhhiqa.supabase.co:6543/postgres
```
:::

:::info
**Self-hosted snapshot workers are coming in Q4 2021.**

You will not have to give us access to your database, and snapshots can be stored in your own private bucket.
:::

## Snapshot worker IP addresses

Snaplet uses the `54.93.75.84` and `18.158.21.101` IP addresses to connect to your database. It's a good idea to restrict all traffic to Postgres and grant access where it's absolutely required!

## Test your database connection

Once you've entered the credentials we'll test them to validate that we have the correct priviledges to be a smooth operator.

<div style={{textAlign: 'center'}}>

![Validating credentials](/screenshots/onboarding_datasource_test.png)

</div>

## Transform your data...

Now we can copy you're data, but before creating your snapshot, we still need to know how to transform it.
