# Before we begin...

This section is all about getting started quickly with Snaplet.
We'll run you through a workflow that captures, transforms, and shares a snapshot of your **local development database.**
We're using your **local development database** because you're currently evaluating Snaplet, right? And you may not want to test it against your production or staging database! Frankly, we prefer it that way.

Once you're ready to **adopt Snaplet for real** then you can choose to capture snapshots in a self-hosted environment where you'll change the credentials via an environmental variable, or via a Snaplet Project where you'll give us read-only credentials to your database.

Let's go!

<div style={{textAlign: 'center'}}>

![Give me rubs... So that I can scratch you!](/img/snaplet-playing.svg)

</div>

# Install CLI

You can install the CLI from the command line, run:

```bash
curl -sL https://app.snaplet.dev/get-cli/ | bash
```


