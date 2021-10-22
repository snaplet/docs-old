# Authenticate Snaplet CLI

In order to restore your snapshots you need to be authenticated. 


### Local development environment

For local development use `snaplet login` to associate your machine to your Snaplet account. This only needs to happen once as the access-token is stored in `~/.snaplet/config.json`

```bash
$ snaplet login
Get your personal access token from this page: https://app.snaplet.dev/access-token/cli
✔ Paste your access token … xxxx-xxxx-xxxx-xxxx
Verifying credentials...
✔ Logged in as peter@snaplet.dev
```

### CI/CD

Use the `SNAPLET_ACCESS_TOKEN` envar in CI/CD. As an example, if you want to restore a snapshot in your e2e tests, you could run the following:

```bash
SNAPLET_ACCESS_TOKEN=xxxx-xxxx snaplet restore
```

<div style={{textAlign: 'center'}}>

![Snappy says "Sup!"](/img/snappy-lying-down-whistling.svg)

</div>