---
sidebar_position: 1
slug: /
---

# Introduction

Snaplet is a workflow tool for developers that copies a Postgres database whilst removing personal information by transforming the data. The data is stored, secured and versioned. These database snapshots can be restored by team members, or machines, that have appropriate access with the Snaplet CLI.

This gives developers the ability to access realistic data without leaking private information. No more seed scripts, or connecting to a production database.

<div style={{textAlign: 'center'}}>

![Snappy says "Sup!"](/img/workflow.svg)

</div>

1. Snaplet's workers connect to your database.
2. The workers copy your data and transform your data.
3. The data is archived, encrypted, and stored "at rest" in a secure bucket. You now have a snapshot of your database.
4. Team members, or CI/CD, can restore the snapshots with the Snaplet CLI.
