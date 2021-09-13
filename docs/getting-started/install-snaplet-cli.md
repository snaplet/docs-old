---
sidebar_position: 2
---

# Install Snaplet CLI

## 1. Snaplet Setup

### Install Snaplet CLI

If you are on a Mac, you can install the CLI with Homebrew:

```bash
brew install snaplet/brew/cli
```

If you are on linux, you can install the CLI with curl

```bash
curl -sL https://app.snaplet.dev/get-cli/ | bash
```

Run `snaplet --help` at any time to see all available commands. Here are some of the common commands you will be using.

- `snaplet login [access-token]` - Authenticate with your personal access token
- `snaplet init [database-id]` - Initialize snaplet by specifying where to restore your snapshots
- `snaplet ls` - List all available snapshots
- `snaplet restore [snapshot-name]` - Restore a snapshot
- `snaplet db <command>` - Database tools

### Check version number with `snaplet --version`

Run the following command to check your version after installing the CLI.

```bash
snaplet --version
```

```
0.0.1-beta.11
```

### Login with access token and `snaplet login`

![01-snaplet-dashboard-team-members](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4oiyi9ssnx0r31d5rupp.png)

Click the "Access tokens" tab on the left side of the page, and then click "New access token". Use this token to login from the CLI.

```bash
snaplet login [access-token]
```

```
Testing access token...
✔ Logged in as: anthony@stepzen.com
✔ Updated system config: /Users/ajcwebdev/.snaplet/config.json
```
