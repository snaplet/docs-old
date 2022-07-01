import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Self-hosting

`This document is a work in progress!`

The Snaplet CLI contains all the moving parts required to self-host.
The idea with self-hosting is that you don't want a 3rd party processor ("Snaplet") access to your database.
In this case you run the command to capture a snapshot of your database on a machine that you trust.

## Hosting the capture process

The Snaplet CLI requires access to your snapshot configuration: `.snaplet` directory and the configuration files in order to know _how you want to modify your snapshots._
Many people capture snapshots in CI/CD (GitHub Actions tutorial is coming soon!), which already has access to your source code, otherwise you can use a Snaplet Project to _pull the configuration._

<Tabs>
  <TabItem value="apple" label="With source-code (CI/CD)" default>
    <ol>
      <li>Checkout repository to get `.snaplet` config directory</li>
      <li>Install Snaplet CLI</li>
      <li>Run `SNAPLET_DATABASE_URL=[secret] snapshot capture /tmp/my-snapshot`</li>
    </ol>
  </TabItem>
  <TabItem value="orange" label="Without source-code (Snaplet Project)">
    <ol>
      <li>Install Snaplet CLI</li>
      <li>Run `SNAPLET_PROJECT_ID=[project-id] snaplet config pull`</li>
      <li>Run `SNAPLET_DATABASE_URL=[secret] snapshot capture /tmp/my-snapshot`</li>
    </ol>
  </TabItem>  
</Tabs>

Both the  will store a snapshot in `/tmp/my-snapshot` that you can upload to share with your team.

## Hosting the snapshots

[TODO]