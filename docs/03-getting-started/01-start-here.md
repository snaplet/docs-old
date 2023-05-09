# Start here
Welcome to Snaplet! To help you get started quickly, we'll guide you through a sample workflow using the Snaplet Cloud and the Snaplet CLI. Using these two tools will allow you to capture, transform, and restore a snapshot of your source database into a target development database.

💡 _As a reminder, Snaplet gives you production-accurate PostgreSQL data and preview databases that you can code against. It does this by capturing a 'snapshot' of a source database, subsetting it to make smaller and easier to work with, and transforming any sensitive data._


While it's possible to capture snapshots from directly inside the Snaplet CLI, if you’re new, or intend to  evaluate Snaplet, we recommend using Snaplet Cloud, as it provides an easy-to-follow onboarding process with the option of using a provided demo database that makes it easy to capture your first snapshot. 

Once you're comfortable with the basics of how Snaplet works, you can connect Snaplet to your own database, explore the more powerful CLI, or even [self-host](/guides/self-hosting) Snaplet in your own trusted infrastructure.

Let's dive in!

<div style={{textAlign: 'center'}}>

![Give me rubs... So that I can scratch you!](/img/snaplet-playing.svg)
</div>

## Getting Started with Snaplet Cloud

1. Sign up for Snaplet: head over to **[https://app.snaplet.dev/](https://app.snaplet.dev/signup)** and create a free Snaplet Cloud account.
2. Once your account is created, follow the onboarding steps. If you’re evaluating Snaplet, or just don't want to use your own database just yet, select and use the provided demo database instead. Opt to subset it to create a sample of the data, opt to transform the values, and proceed to capture the snapshot. If you need help with the onboarding, you can watch this [video](https://www.loom.com/share/26f6aae49d8b425fb31358664d17e8a6) to understand more.
3. Well done! Once the onboarding is completed, you’ve should have a snapshot of the original database. You’ll can preview your snapshot in the data explorer in Snaplet Cloud, verifying that your snapshot has correctly captured.  
4. To code against this snapshot, you’ll need to restore it to your target database (typically your local environment), and for that, you'll need the Snaplet CLI. Follow the instructions in the "Installing the  CLI" section below to install the Snaplet CLI, and then setup and config the CLI.
5. Once you’ve installed and configured the Snaplet CLI, you can use it to restore that snapshot into a development database. Follow the instructions in on the [Restoring a snapshot](getting-started/restoring) page to do so.  
  
## Getting started with Snaplet CLI

### Installing the CLI

1. Install the CLI with a package manager: 

If you use JavaScript in your project and have a package manager, you can install the CLI as a dependency:

```bash
npm install snaplet
```

2. Install the CLI with bash

Alternatively, you can use our bash script to install the CLI:

```bash
curl -sL https://app.snaplet.dev/get-cli/ | bash
```

Whichever path you choose, it’s our goal to get you up and running with Snaplet in no time, so if you get stuck, you can always ask for help on our [Discord](https://app.snaplet.dev/chat). 

You’ll be able to switch between Snaplet Cloud and CLI as you become more familiar with the tool and its capabilities. 

Next, let’s setup and configure the Snaplet CLI to work in your codebase, before we use it to restore your snapshot.
