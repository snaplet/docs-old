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

| Name      | Alias | Type    | Choices                      | Default  |
| --------- | ----- | ------- | ---------------------------- | -------- |
| --type    | -t    | string  | typedefs,transform,keys | typedefs |
| --dry-run |       | boolean |                              | false    |

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

## **database**

The `snaplet database` command is used to manage preview databases.

**Usage**

```bash
snaplet database [action]
```

### **cache**

The `snaplet database cache` command is used to cache a snapshot into the preview database server.

**Usage**

```bash
snaplet database cache [snapshot]
```

**Command Args**

| Name     | Description | Type   |
| -------- | ----------- | ------ |
| snapshot |             | string |

**Command Flags**

| Name     | Description                                                                 | Type    |
| -------- | --------------------------------------------------------------------------- | ------- |
| --tags   | Filter snapshots by tags                                                    | array   |
| --latest | Select the latest snapshot captured to cache in the preview database server | boolean |
| --clear  | Remove the snapshot from the preview database server cache                  | boolean |

### **create**

The `snaplet database create` command is used to create a preview database from a snapshot.

**Usage**

```bash
snaplet database create [database-name] [snapshot]
```

**Command Args**

| Name          | Description | Type   |
| ------------- | ----------- | ------ |
| database-name |             | string |
| snapshot      |             | string |

**Command Flags**

| Name          | Description                                                                             | Type    |
| ------------- | --------------------------------------------------------------------------------------- | ------- |
| --tags        | Filter snapshots by tags                                                                | array   |
| --latest      | Restore the latest snapshot                                                             | boolean |
| --no-snapshot | Create an empty database not based on a snapshot                                        | boolean |
| --git         | Infer the database name from the current git branch                                     | boolean |
| --force       | Force the database creation, it will drop and recreate the existing database if present | boolean |

### **destroy**

The `snaplet database destroy` command is used to destroy the database server.

**Usage**

```bash
snaplet database destroy
```

**Command Flags**

| Name  | Alias | Description                                 | Type    | Default |
| ----- | ----- | ------------------------------------------- | ------- | ------- |
| --yes | -y    | Automatically answer "yes" to all questions | boolean | false   |

### **drop**

The `snaplet database drop` command is used to drop a preview database.

**Usage**

```bash
snaplet database drop [database-name]
```

**Command Args**

| Name         | Description | Type   |
| ------------ | ----------- | ------ |
| databaseName |             | string |

**Command Flags**

| Name  | Description                                         | Type    | Default |
| ----- | --------------------------------------------------- | ------- | ------- |
| --git | Infer the database name from the current git branch | boolean | false   |

### **list**

The `snaplet database list` command is used to list preview databases.

**Usage**

```bash
snaplet database list
```

### **setup**

The `snaplet database setup` command is used to create a preview database server.

**Usage**

```bash
snaplet database setup
```

**Command Flags**

| Name     | Description              | Type   | Choices                                                                                                 |
| -------- | ------------------------ | ------ | ------------------------------------------------------------------------------------------------------- |
| --region | Filter snapshots by tags | string | ams,cdg,den,dfw,ewr,fra,gru,hkg,iad,jnb,lax,lhr,maa,mad,mia,nrt,ord,otp,scl,sea,sin,sjc,syd,waw,yul,yyz |

### **url**

The `snaplet database url` command is used to show a preview database url.

**Usage**

```bash
snaplet database url [database-name]
```

**Command Args**

| Name         | Description | Type   |
| ------------ | ----------- | ------ |
| databaseName |             | string |

**Command Flags**

| Name  | Description                                         | Type    | Default |
| ----- | --------------------------------------------------- | ------- | ------- |
| --git | Infer the database name from the current git branch | boolean | false   |

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

| Name      | Description | Type   |
| --------- | ----------- | ------ |
| projectId |             | string |


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

| Name             | Alias         | Description                                    | Type   | Choices            | Default |
| ---------------- | ------------- | ---------------------------------------------- | ------ | ------------------ | ------- |
| --env            | --environment | Environment to use when capturing the snapshot | string | cloud,local        | local   |
| --message        | -m            | Attach a message to the snapshot               | string |                    |         |
| --subset         | --subset-path | Path to a subset config file                   | string |                    |         |
| --tags           |               | Attach tags to the snapshot                    | array  |                    |         |
| --transform-mode | -t            | Transformation mode to apply to the snapshot   | string | strict,unsafe,auto |         |

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

| Name          | Description   | Type |
| ------------- | ------------- | ---- | ------ |
| snapshot-name | snapshot-path |      | string |

**Command Flags**

| Name          | Alias | Description                                                               | Type    | Deprecated | Default |
| ------------- | ----- | ------------------------------------------------------------------------- | ------- | :--------: | ------- |
| --data        |       | Restore data on the database (skip with --no-data)                        | boolean |            | true    |
| --schema      |       | Restore schema on the database (skip with --no-schema)                    | boolean |            | true    |
| --reset       |       | Drop destination database before restoring schemas (skip with --no-reset) | boolean |            | true    |
| --tags        |       | Filter snapshots by tags                                                  | array   |            |         |
| --latest      |       | Restore the latest snapshot                                               | boolean |            | false   |
| --yes         | -y    | Performs a restore without a confirmation message                         | boolean |            | false   |
| --schema-only |       | Skip data, only restore schema                                            | boolean |     ✅     | false   |
| --data-only   |       | Restore data only (keep the current schema and indexes)                   | boolean |     ✅     | false   |

### **share**

The `snaplet snapshot share` command is used to Share a snapshot.

**Usage**

```bash
snaplet snapshot share [snapshot-name|snapshot-path]
```

**Command Args**

| Name          | Description   | Type |
| ------------- | ------------- | ---- | ------ |
| snapshot-name | snapshot-path |      | string |

**Command Flags**

| Name         | Description               | Type    | Default |
| ------------ | ------------------------- | ------- | ------- |
| --no-encrypt | Disable encryption        | boolean | false   |
| --tags       | Filter snapshots by tags  | array   |         |
| --latest     | Share the latest snapshot | boolean | false   |

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
