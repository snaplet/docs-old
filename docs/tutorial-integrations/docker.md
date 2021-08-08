---
sidebar_position: 3
---

# PostgreSQL Database with Docker

## 1. Postgres Quick Setup

Clone the [example repository](https://github.com/fly-apps/postgres.git).

```bash
git clone https://github.com/fly-apps/postgres.git
cd postgres
```

### Initialize the app with `fly init`

```bash
fly init --name postgres-template-test --import fly.source.toml
```

```
Selected App Name: postgres-template-test

Automatically selected personal organization: Anthony Campolo

Importing configuration from fly.source.toml

New app created
  Name         = postgres-template-test  
  Organization = personal                
  Version      = 0                       
  Status       =                         
  Hostname     = <empty>                 

App will initially deploy to ewr (Secaucus, NJ (US)) region

Wrote config file fly.toml
```

### Create a volume with `fly volumes`

Postgres needs to be able to store and persist data on disk.

```bash
fly volumes create postgres --region ewr
```

```
        ID: vol_8zmjnv800y4ywgx5
      Name: postgres
    Region: ewr
   Size GB: 10
 Encrypted: true
Created at: 12 Jul 21 07:00 UTC
```

### Set encrypted password with `fly secrets set`

```bash
fly secrets set POSTGRES_PASSWORD=asdfqwerzxcv
```

```
Secrets are staged for the first deployment
```

```bash
fly deploy
```

```
Deploying postgres-template-test
==> Validating app configuration
--> Validating app configuration done

Services
TCP  ⇢ 5432

Searching for image 'postgres:13.1' remotely...
image found: img_rxdkzvq7j7p9nmwq
Image: registry-1.docker.io/library/postgres:13.1
Image size: 115 MB
==> Creating release
Release v0 created

You can detach the terminal anytime without stopping the deployment

Monitoring Deployment

1 desired, 1 placed, 1 healthy, 0 unhealthy [health checks: 1 total, 1 passing]
--> v0 deployed successfully
```

```bash
flyctl status -a postgres-template-test
```

```bash
flyctl info -a postgres-template-test
```

## 2. Postgres Long Setup

PostgreSQL clusters are on Fly are apps made up of VMs, persistent volumes, and extra memory if needed.

### Install a cluster with `fly pg create`

The `fly pg create` command will install a PostgreSQL cluster in your organization.

```bash
fly pg create
```

You will need to provide a name, organization, region, VM size, and volume size.

```
? App name: snaplet-fly
Automatically selected personal organization: Anthony Campolo
? Select region: sjc (Sunnyvale, California (US))
? Select VM size: shared-cpu-1x - 256
? Volume size (GB): 10
```

This will create a Postgres cluster called `snaplet-fly` in organization `personal`.

```
Postgres cluster snaplet-fly created
  Username:    postgres
  Password:    xxxx
  Hostname:    snaplet-fly.internal
  Proxy Port:  5432
  PG Port:     5433
```

Make sure to save your credentials in a secure place because you won't be able to see them again.

### Connect to database using a connection string

The way you will connect to your database will depend on whether you are using an app from within Fly or you are trying to connect an external application. Connection string URIs are a common way to describe a connection to a Postgres server regardless of whether you are connecting from inside or outside the network. Connection strings have the following format:

```
postgres://{username}:{password}@{hostname}:{port}/{database}?options
```

Enter the information for your cluster to see your connection string.

```
postgres://postgres:PASSWORD@snaplet-fly.internal:5432
```

Any app within the personal organization can connect to Postgres using the above credentials and the hostname `snaplet-fly.internal`. Fly's [private networking](https://fly.io/docs/reference/privatenetwork/) allows applications within the same organization to look up the app at `appname.internal`. This name, when looked up, can return one or more IPv6 addresses.

### `fly info`

```bash
fly info -a snaplet-fly
```

### `fly status`

```bash
flyctl status -a snaplet-fly
```

### List Postgres 

```bash
flyctl postgres list
```

### Attach Postgres to Fly App

```bash
flyctl postgres attach --postgres-app snaplet-fly
```

## 3. Connect from outside Fly using WireGuard

To access Fly's private networking for an organization from outside the Fly platform, you must configure a [WireGuard](https://www.wireguard.com/) tunnel from whichever system you are using to Fly. WireGuard is a flexible and secure way to plug into each one of your Fly organizations and connect to any and all apps within that organization.

### Install WireGuard

There are many ways to [install WireGuard](https://www.wireguard.com/install/) detailed on their site.

```bash
brew install wireguard-tools
```

### Create your tunnel configuration

The [`flyctl wireguard`](https://fly.io/docs/flyctl/wireguard/) command is used to manage WireGuard peer connections and perform common tasks with peer connections including `create`, `remove`, and `list` . It also can be used for managing delegated access tokens. [`flyctl wireguard create`](https://fly.io/docs/flyctl/wireguard-create/) will add a WireGuard peer connection to an organization.

```bash
fly wireguard create
```

```
Automatically selected personal organization: Anthony Campolo
Creating WireGuard peer "interactive-macbook-pro-123" in region "iad" for organization personal

!!!! WARNING: Output includes private key. Private keys cannot be recovered !!!!
!!!! after creating the peer; if you lose the key, you'll need to remove    !!!!
!!!! and re-add the peering connection.                                     !!!!
```

After configuring the Wireguard service, the create command generates a tunnel configuration file with unrecoverable private keys. This configuration file will be used in the next step and must be saved.

```
? Filename to store WireGuard configuration in, or 'stdout': interactive-macbook-pro-123.conf

Wrote WireGuard configuration to interactive-macbook-pro-123.conf; load in your WireGuard client
```

Fly's documentation suggests you give your configuration the same name as the peer you have created along with the extension `.conf`. This ensures it can be recognized by the various WireGuard apps as a configuration file for a tunnel.

```
[Interface]
  PrivateKey = iV9Tp+Vv7cy+wXMlkGjmKWGjlqEx5uPVmBNvCn6F6vw=
  Address = fdaa:0:2f5b:a7b:ce2:0:a:102/120
  DNS = fdaa:0:2f5b::3

[Peer]
  PublicKey = R2in3C4C5I1AVyoSrmsOgSkhPDKAegwUg6zwkLrhryk=
  AllowedIPs = fdaa:0:2f5b::/48
  Endpoint = iad1.gateway.6pn.dev:51820
  PersistentKeepalive = 15
```

To use `dig` to probe DNS on a WireGuard connection, supply the DNS server address to it. Make sure to put a `@` at the beginning of the address.

```bash
dig +short aaaa interactive-Anthonys-MacBook-Pro-anthony-stepzen-com-881.internal @fdaa:0:2f::3
```

```bash
fly wg list
```

```
Automatically selected personal organization: Anthony Campolo
+----------------------------------------------------------+--------+-----------------------------+
|                           NAME                           | REGION |           PEER IP           |
+----------------------------------------------------------+--------+-----------------------------+
| interactive-Anthonys-MacBook-Pro-anthony-stepzen-com-881 | iad    | fdaa:0:2f5b:a7b:ce2:0:a:102 |
+----------------------------------------------------------+--------+-----------------------------+
```