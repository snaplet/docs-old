import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Self-hosting

`This document is a work in progress!`

The Snaplet CLI contains all the moving parts required to self-host.
The idea with self-hosting is that you don't want a 3rd party processor ("Snaplet") access to your database.
In this case you run the command to capture a snapshot of your database on a machine that you trust.

## Hosting the capture process

The Snaplet CLI requires access to your `.snaplet` config directory in order to know _how you want to modify your snapshots._
Many people capture snapshots in CI/CD because it's already trusted, already has access to the `.snaplet` config directory via the source code and fits into a gitops development workflow.
Otherwise you can store and retrieve the config via a Snaplet Project.


1. Install Snaplet CLI
2. Checkout your source code from repository, or run `SNAPLET_PROJECT_ID=[project-id] snaplet config pull` to retrieve a config via Snaplet Project.
3. Run `SNAPLET_DATABASE_URL=[secret] snapshot capture /tmp/my-snapshot` 

That's it, you have now a snapshot in `/tmp/my-snapshot` that you can upload and share with your team.

## Uploading and sharing snapshots


