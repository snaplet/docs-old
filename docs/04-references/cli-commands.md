# CLI Reference

## **auth**

The `snaplet auth` command is used to manage auth state.

**Usage**

```bash
snaplet auth [action]
```

### **login**

The `snaplet auth login` command is used to login with an access token.

**Usage**

```bash
snaplet auth login [access-token]
```

## **config**

The `snaplet config` command is used to manage configuration.

**Usage**

```bash
snaplet config [action]
```

### **generate**

The `snaplet config generate` command is used to generate transform files.

**Usage**

```bash
snaplet config generate
```

**Command Flags**

| Name                | Alias | Description                                                 | Type    | Choices                 | Default  |
| ------------------- | ----- | ----------------------------------------------------------- | ------- | ----------------------- | -------- |
| --type              | -t    |                                                             | string  | typedefs,transform,keys | typedefs |
| --dry-run           |       |                                                             | boolean |                         | false    |
| --connection-string |       | The connection string to use for introspecting the database | string  |                         |          |

### **list**

The `snaplet config list` command is used to list config variables.

**Usage**

```bash
snaplet config list
```

### **pull**

The `snaplet config pull` command is used to pull cloud project config to local.

**Usage**

```bash
snaplet config pull
```

**Command Flags**

| Name   | Alias | Type   | Choices                              | Default                              |
| ------ | ----- | ------ | ------------------------------------ | ------------------------------------ |
| --type | -t    | string | schemas,transform,typedefs,publicKey | schemas,transform,typedefs,publicKey |

### **push**

The `snaplet config push` command is used to push local project config to cloud.

**Usage**

```bash
snaplet config push
```

**Command Flags**

| Name   | Alias | Type   | Choices                                | Default                                |
| ------ | ----- | ------ | -------------------------------------- | -------------------------------------- |
| --type | -t    | string | schemas,transform,subsetting,publicKey | schemas,transform,subsetting,publicKey |

### **setup**

The `snaplet config setup` command is used to setup local project configuration.

**Usage**

```bash
snaplet config setup [targetDatabaseUrl]
```

**Command Flags**

| Name       | Type    | Default |
| ---------- | ------- | ------- |
| --generate | boolean | true    |
| --yes      | boolean | false   |

## **dev**

The `snaplet dev` command is used to keeps your dev database and its data in sync with your git branch so you don't have to, powered by Neon.

**Usage**

```bash
snaplet dev
```

**Command Flags**

| Name   | Description                     | Type   | Default |
| ------ | ------------------------------- | ------ | ------- |
| --port | the port to expose the proxy on | number | 2345    |

## **discord**

The `snaplet discord` command is used to opens the Snaplet Discord chat window in your browser.

**Usage**

```bash
snaplet discord
```

## **documentation**

The `snaplet documentation` command is used to opens the Snaplet Documentation in your browser.

**Usage**

```bash
snaplet documentation
```

## **preview-database**

The `snaplet preview-database` command is used to manage preview databases.

**Usage**

```bash
snaplet preview-database [action]
```

### **create**

The `snaplet preview-database create` command is used to create a preview database from a snapshot.

**Usage**

```bash
snaplet preview-database create [snapshot]
```

**Command Args**

| Name     | Description                                                             | Type   |
| -------- | ----------------------------------------------------------------------- | ------ |
| snapshot | the identifier of the snapshot you want to base the preview database on | string |

**Command Flags**

| Name     | Description                                                  | Type    | Default |
| -------- | ------------------------------------------------------------ | ------- | ------- |
| --name   | assign a custom name to the preview database                 | string  |         |
| --git    | derive the preview database name from the current git branch | boolean | false   |
| --tags   | apply tag-based filters to the snapshots                     | array   |         |
| --latest | use the most recent snapshot                                 | boolean | false   |

### **url**

The `snaplet preview-database url` command is used to get a connection URL for a specified preview database.

**Usage**

```bash
snaplet preview-database url [name]
```

**Command Args**

| Name | Description                                                                      | Type   |
| ---- | -------------------------------------------------------------------------------- | ------ |
| name | the identifier of the preview database whose connection URL you want to retrieve | string |

**Command Flags**

| Name  | Description                                                  | Type    | Default |
| ----- | ------------------------------------------------------------ | ------- | ------- |
| --git | derive the preview database name from the current git branch | boolean | false   |

### **list**

The `snaplet preview-database list` command is used to shows all preview databases created from a specific snapshot.

**Usage**

```bash
snaplet preview-database list [snapshot]
```

**Command Args**

| Name     | Description                                                             | Type   |
| -------- | ----------------------------------------------------------------------- | ------ |
| snapshot | the identifier of the snapshot whose preview databases you want to list | string |

**Command Flags**

| Name     | Description                              | Type    |
| -------- | ---------------------------------------- | ------- |
| --tags   | apply tag-based filters to the snapshots | array   |
| --latest | use the most recent snapshot             | boolean |

### **reset**

The `snaplet preview-database reset` command is used to reset a specified preview database state.

**Usage**

```bash
snaplet preview-database reset [name]
```

**Command Args**

| Name | Description                                              | Type   |
| ---- | -------------------------------------------------------- | ------ |
| name | the identifier of the preview database you want to reset | string |

**Command Flags**

| Name  | Description                                                  | Type    | Default |
| ----- | ------------------------------------------------------------ | ------- | ------- |
| --git | derive the preview database name from the current git branch | boolean | false   |

### **drop**

The `snaplet preview-database drop` command is used to drops a specified preview database.

**Usage**

```bash
snaplet preview-database drop [name]
```

**Command Args**

| Name | Description                                               | Type   |
| ---- | --------------------------------------------------------- | ------ |
| name | the identifier of the preview database you want to delete | string |

**Command Flags**

| Name  | Description                                                  | Type    | Default |
| ----- | ------------------------------------------------------------ | ------- | ------- |
| --git | derive the preview database name from the current git branch | boolean | false   |

## **project**

The `snaplet project` command is used to manage project configuration.

**Usage**

```bash
snaplet project [action]
```

### **create**

The `snaplet project create` command is used to create a new project.

**Usage**

```bash
snaplet project create <name>
```

**Command Flags**

| Name   | Alias | Type   |
| ------ | ----- | ------ |
| --team | -t    | string |

### **invite**

The `snaplet project invite` command is used to create an invite URL for this project.

**Usage**

```bash
snaplet project invite
```

### **setup**

The `snaplet project setup` command is used to set up a project.

**Usage**

```bash
snaplet project setup [project-id]
```

**Command Args**

| Name      | Description    | Type   |
| --------- | -------------- | ------ |
| projectId | The project id | string |

## **generate**

The `snaplet generate` command is used to populates an empty database with generated data.

**Usage**

```bash
snaplet generate
```

**Command Flags**

| Name        | Description                                                        | Type    | Default |
| ----------- | ------------------------------------------------------------------ | ------- | ------- |
| --sql       | Send the sql statements to stdout instead of executing them        | boolean | false   |
| --keep-data | Do not clear existing data in the db when inserting generated data | boolean | false   |
| --yes       | Bypass interactive prompts                                         | boolean | false   |

## **setup**

The `snaplet setup` command is used to Initialize or connect an existing Snaplet project.

**Usage**

```bash
snaplet setup
```

## **snapshot**

The `snaplet snapshot` command is used to manage snapshots.

**Usage**

```bash
snaplet snapshot [action]
```

### **capture**

The `snaplet snapshot capture` command is used to capture a new snapshot.

**Usage**

```bash
snaplet snapshot capture [destination-path]
```

**Command Flags**

| Name             | Alias         | Description                                  | Type   | Choices            |
| ---------------- | ------------- | -------------------------------------------- | ------ | ------------------ |
| --message        | -m            | Attach a message to the snapshot             | string |                    |
| --subset         | --subset-path | Path to a subset config file                 | string |                    |
| --tags           |               | Attach tags to the snapshot                  | array  |                    |
| --transform-mode | -t            | Transformation mode to apply to the snapshot | string | strict,unsafe,auto |

### **create**

The `snaplet snapshot create` command is used to create a snapshot in cloud.

**Usage**

```bash
snaplet snapshot create
```

**Command Flags**

| Name   | Type    | Default |
| ------ | ------- | ------- |
| --json | boolean | false   |

### **list**

The `snaplet snapshot list` command is used to list all snapshots.

**Usage**

```bash
snaplet snapshot list
```

**Command Flags**

| Name   | Type  |
| ------ | ----- |
| --tags | array |

### **restore**

The `snaplet snapshot restore` command is used to restore a snapshot.

**Usage**

```bash
snaplet snapshot restore [snapshot-name|snapshot-path]
```

**Command Args**

| Name                        | Description                             | Type   |
| --------------------------- | --------------------------------------- | ------ |
| snapshot-name|snapshot-path | the unique name or path of the snapshot | string |

**Command Flags**

| Name             | Alias | Description                                                               | Type    | Deprecated | Default |
| ---------------- | ----- | ------------------------------------------------------------------------- | ------- | :--------: | ------- |
| --data           |       | Restore data on the database (skip with --no-data)                        | boolean |            | true    |
| --schema         |       | Restore schema on the database (skip with --no-schema)                    | boolean |            | true    |
| --reset          |       | Drop destination database before restoring schemas (skip with --no-reset) | boolean |            | true    |
| --tags           |       | Filter snapshots by tags                                                  | array   |            |         |
| --latest         |       | Restore the latest snapshot                                               | boolean |            | false   |
| --yes            | -y    | Performs a restore without a confirmation message                         | boolean |            | false   |
| --schema-only    |       | Skip data, only restore schema                                            | boolean |      ✅     | false   |
| --data-only      |       | Restore data only (keep the current schema and indexes)                   | boolean |      ✅     | false   |
| --tables         |       | Restore only the specified tables to the target database                  | array   |            |         |
| --exclude-tables |       | Exclude the specified tables from being restored to the target database   | array   |            |         |

### **share**

The `snaplet snapshot share` command is used to Share a snapshot.

**Usage**

```bash
snaplet snapshot share [snapshot-name|snapshot-path]
```

**Command Args**

| Name                        | Description                             | Type   |
| --------------------------- | --------------------------------------- | ------ |
| snapshot-name|snapshot-path | the unique name or path of the snapshot | string |

**Command Flags**

| Name         | Description               | Type    | Default |
| ------------ | ------------------------- | ------- | ------- |
| --no-encrypt | Disable encryption        | boolean | false   |
| --tags       | Filter snapshots by tags  | array   |         |
| --latest     | Share the latest snapshot | boolean | false   |

### **subset**

The `snaplet snapshot subset` command is used to create a subset of a database.

**Usage**

```bash
snaplet snapshot subset [destination-path]
```

**Command Flags**

| Name          | Alias                | Description                                 | Type    | Choices     | Default |
| ------------- | -------------------- | ------------------------------------------- | ------- | ----------- | ------- |
| --env         | --environment        | Environment to use when slicing the databse | string  | cloud,local | local   |
| --subset-path | --subset-config-path | Path to a subset config file                | string  |             |         |
| --force       | -f                   | Force overwrite of existing subset file     | boolean |             | false   |

## **subset**

The `snaplet subset` command is used to manage subsetting.

**Usage**

```bash
snaplet subset [action]
```

### **setup**

The `snaplet subset setup` command is used to configure subsetting.

**Usage**

```bash
snaplet subset setup
```

## **team**

The `snaplet team` command is used to manage team configuration.

**Usage**

```bash
snaplet team [action]
```

### **create**

The `snaplet team create` command is used to create a new team.

**Usage**

```bash
snaplet team create <name>
```

## **upgrade**

The `snaplet upgrade` command is used to upgrade this binary.

**Usage**

```bash
snaplet upgrade
```

## **completion**

The `snaplet completion` command is used to generate completion script.

**Usage**

```bash
snaplet completion
```