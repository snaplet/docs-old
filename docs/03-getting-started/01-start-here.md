# Before we begin...

This section is all about getting started quickly with Snaplet.
We'll run you through a workflow that captures, transforms, and shares a snapshot of your **local development database.**

We're using your local development database because it demonstrates what Snaplet can do without having to connect to your production or staging database. Once you're ready to _adopt Snaplet for real_ you can choose to entirely or partially [self-host](/guides/self-hosting) Snaplet in your own infrastructure, while securely connecting a database of your choice.

Let's go!

<div style={{textAlign: 'center'}}>

![Give me rubs... So that I can scratch you!](/img/snaplet-playing.svg)

</div>

# Install CLI

Start by installing the Snaplet CLI. To install the CLI from the command line, run:

If you're JavaScript in your project, along with a package manager, you can install it into your dependencies:

```
npm install snaplet
```

Otherwise, use our bash script:

```terminal
curl -sL https://app.snaplet.dev/get-cli/ | bash
```


