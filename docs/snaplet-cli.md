# CLI Reference

## **`auth`**

To manage your auth state use `snaplet auth`.

### `login`

** Description **

Login with an access token.

** Command Args **

| Option         | Required | Description                                                                                                                       |
| :------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| [access-token] | No       | The login command action will open a <br/> link at [Snaplet Cloud](https://app.snaplet.dev/) where you will find an access token. |

<br/>

## **`config`**

To manage your project configuration in the cloud & locally use `snaplet config`

### `setup`

** Description **

Setup local project configuration

** Command Args **

| Argument            | Required | Description                      |
| :------------------ | :------- | :------------------------------- |
| [database-id]       | No       | The source database id.          |
| [connection-string] | No       | The target db connection string. |

** Command Flags **

| Name       | Alias | Type    | Choices                        | Default | Usage                     |
| :--------- | :---- | :------ | :----------------------------- | :------ | :------------------------ |
| -—generate | -     | boolean | <code>true &#124; false</code> | `true`  | `config setup --generate` |

### `generate`

** Description **

Generate transformations file and stores it in your configuration file.

** Command Flags **

| Name   | Alias | Type   | Choices                                      | Default    | Usage                 |
| :----- | :---- | :----- | :------------------------------------------- | :--------- | :-------------------- |
| -—type | --t   | string | <code>typedefs &#124; transformations</code> | `typedefs` | `config generate --t` |

### `pull`

** Description **

Pull your configuration saved in the cloud into your local setup.

** Command Flags **

| Name   | Alias | Type   | Choices                                                                    | Default                                     | Usage                      |
| :----- | :---- | :----- | :------------------------------------------------------------------------- | :------------------------------------------ | :------------------------- |
| --type | --t   | string | <code>schemas &#124; transformations &#124; typedefs &#124; schemas</code> | <code>schemas &#124; transformations</code> | `config pull --t <choice>` |

### `push`

** Description **

Push your current local project config to the cloud.

** Command Flags **

| Name   | Alias | Type   | Choices                                     | Default                                     | Usage                     |
| :----- | :---- | :----- | :------------------------------------------ | :------------------------------------------ | :------------------------ |
| -—type | --t   | string | <code>schemas &#124; transformations</code> | <code>schemas &#124; transformations</code> | `config push -t <choice>` |

<br/>

## **`snapshot`**

To manage snapshots use `snaplet snapshot`. `[alias: ss]`.

### `capture`

** Description **

Capture a new snapshot. `[aliases: c]`

** Command Args **

| Argument           | Required | Description |
| :----------------- | :------- | :---------- |
| [destination-path] | No       | -           |

** Command Flags **

| Name          | Alias | Type   | Choices                         | Default | Usage                |
| :------------ | :---- | :----- | :------------------------------ | :------ | :------------------- |
| -—environment | —env  | string | <code>cloud &#124; local</code> | `local` | `ss c -env <choice>` |

### `create`

** Description **

create a snapshot in cloud

** Command Flags **

| Name   | Alias | Type    | Choices                        | Default | Usage              |
| :----- | :---- | :------ | :----------------------------- | :------ | :----------------- |
| --json | -     | boolean | <code>true &#124; false</code> | `true`  | `ss create --json` |

### `list`

** Description **

list all snapshots. `[aliases: ls]`

### `restore`

** Description **

To restore a snapshot. `[aliases: r]`

** Command Flags **

| Name       | Alias | Type    | Choices                        | Default | Usage              |
| ---------- | ----- | ------- | ------------------------------ | ------- | ------------------ |
| —data      | -     | boolean | <code>true &#124; false</code> | true    | `ss r --data`      |
| —data-only | -     | boolean | <code>true &#124; false</code> | false   | `ss r --data-only` |
| —tables    | -     | string  | -                              | -       | `ss r --tables`    |

<br/>

## **`proxy`**

To start a database proxy `[aliases: dev]`

<br/>

## **`db`**

To manage database

### `copy`

** Description **

Makes a copy of the database. `[aliases: clone | backup | cp]`

** Command Args **

| Argument | Required | Description |
| -------- | -------- | ----------- |
| [name]   | No       | -           |

<br/>

## **`upgrade`**

To upgrade the cli binary use `snaplet upgrade`.
