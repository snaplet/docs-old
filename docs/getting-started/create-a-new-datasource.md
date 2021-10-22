---
sidebar_position: 1
---

# Create a New Datasource

Once you've [created a Snaplet account](https://app.snaplet.dev/login), allow Snaplet to connect to your database, by creating a new datasource. If you're still testing Snaplet then try our test connection string!

We never write to your database and recommend that you [create a readonly role](postgresql/create-read-only-role).

:::note

**Self-hosted snapshot workers are coming in Q4 2021.** This means that developers will no longer have to give us access to your database, or stored snapshots.

:::

Snaplet uses the `54.93.75.84` and `18.158.21.101` IP addresses to connect to your database. It's a good idea to restrict all traffic to Postgres and grant  access where it's absolutely required!

<div style={{textAlign: 'center'}}>

![Creds please!](/screenshots/onboarding_datasource.png)

</div>

Once you've entered you're connection credentials Snaplet will validate that we have the correct privileges to operate smoothly.

<div style={{textAlign: 'center'}}>

![Validating credentials](/screenshots/onboarding_datasource_test.png)

</div>
