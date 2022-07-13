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

### **setup**

The `snaplet config setup` command is used to setup local project configuration.

**Usage**

```bash
snaplet config setup [project-id] [connection-string]
```

**Command Flags**

| Name       | Type    | Default |
| ---------- | ------- | ------- |
| --generate | boolean | true    |
| --yes      | boolean | false   |

### **create**

The `snaplet config create` command is used to create a new project.

**Usage**

```bash
snaplet config create [name]
```

**Command Flags**

| Name   | Alias | Type   |
| ------ | ----- | ------ |
| --team | -t    | string |

### **pull**

The `snaplet config pull` command is used to pull cloud project config to local.

**Usage**

```bash
snaplet config pull
```

**Command Flags**

| Name   | Alias | Type   | Choices                    | Default                    |
| ------ | ----- | ------ | -------------------------- | -------------------------- |
| --type | -t    | string | schemas,transform,typedefs | schemas,transform,typedefs |

### **push**

The `snaplet config push` command is used to push local project config to cloud.

**Usage**

```bash
snaplet config push
```

**Command Flags**

| Name   | Alias | Type   | Choices                      | Default                      |
| ------ | ----- | ------ | ---------------------------- | ---------------------------- |
| --type | -t    | string | schemas,transform,subsetting | schemas,transform,subsetting |

### **generate**

The `snaplet config generate` command is used to generate transform files.

**Usage**

```bash
snaplet config generate
```

**Command Flags**

| Name      | Alias | Type    | Choices            | Default  |
| --------- | ----- | ------- | ------------------ | -------- |
| --type    | -t    | string  | typedefs,transform | typedefs |
| --dry-run |       | boolean |                    | false    |

## **project**

The `snaplet project` command is used to manage project configuration.

**Usage**

```bash
snaplet project [action]
```

### **setup**

The `snaplet project setup` command is used to set up a project.

**Usage**

```bash
snaplet project setup [project-id]
```

### **info**

The `snaplet project info` command is used to display information about the project.

**Usage**

```bash
snaplet project info
```

**Command Flags**

| Name  | Type   |
| ----- | ------ |
| --abc | string |

### **invite**

The `snaplet project invite` command is used to create an invite URL for this project.

**Usage**

```bash
snaplet project invite
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

| Name      | Alias         | Type   | Choices     | Default |
| --------- | ------------- | ------ | ----------- | ------- |
| --env     | --environment | string | cloud,local | local   |
| --message | -m            | string |             |         |
| --subset  | --subset-path | string |             |         |

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

### **restore**

The `snaplet snapshot restore` command is used to restore a snapshot.

**Usage**

```bash
snaplet snapshot restore [snapshot-name]
```

**Command Flags**

| Name          | Alias     | Description                                                    | Type    | Deprecated | Default |
| ------------- | --------- | -------------------------------------------------------------- | ------- | :--------: | ------- |
| --db          | --db-name |                                                                | string  |     ✅      |         |
| --new         |           |                                                                | boolean |     ✅      | false   |
| --schema-only |           | Skip data, only restore schema                                 | boolean |            | false   |
| --data-only   |           | Restore data only (keep the current schema and indexes)        | boolean |            | false   |
| --tables      |           | Specify which tables to restore data for (used with data-only) | string  |            |         |
| --yes         | -y        | Performs a restore without a confirmation message              | boolean |            | false   |

### **list**

The `snaplet snapshot list` command is used to list all snapshots.

**Usage**

```bash
snaplet snapshot list
```

### **share**

The `snaplet snapshot share` command is used to Share a snapshot.

**Usage**

```bash
snaplet snapshot share [snapshot-name|snapshot-path]
```

**Command Args**

| Name         | Description | Type   |
| ------------ | ----------- | ------ |
| snapshotName |             | string |

**Command Flags**

| Name      | Alias | Description                  | Type    | Default |
| --------- | ----- | ---------------------------- | ------- | ------- |
| --latest  |       | The latest snapshot captured | boolean | false   |
| --message | -m    |                              | string  |         |

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
snaplet team create [name]
```

## **proxy**

The `snaplet proxy` command is used to start a database proxy.

**Usage**

```bash
snaplet proxy
```

## **upgrade**

The `snaplet upgrade` command is used to upgrade this binary.

**Usage**

```bash
snaplet upgrade
```

## **database** 🥚 (experimental feature)

The `snaplet database` command is used to manage instant databases.

**Usage**

```bash
snaplet database [action]
```

### **create**

The `snaplet database create` command is used to create an instant database from a snapshot.

**Usage**

```bash
snaplet database create [database-name]
```

**Command Args**

| Name         | Description | Type   |
| ------------ | ----------- | ------ |
| databaseName |             | string |

**Command Flags**

| Name       | Description                                                     | Type    | Default |
| ---------- | --------------------------------------------------------------- | ------- | ------- |
| --snapshot | The unique name of the snapshot to use to populate the database | string  |         |
| --git      | Infer the database name from the current git branch             | boolean | false   |
| --latest   | Select the latest snapshot captured to populate the database    | boolean | false   |

### **delete**

The `snaplet database delete` command is used to delete an instant database.

**Usage**

```bash
snaplet database delete [database-name]
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

The `snaplet database list` command is used to list instant databases.

**Usage**

```bash
snaplet database list
```

### **url**

The `snaplet database url` command is used to show an instant database url.

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

### **cache**

The `snaplet database cache` command is used to cache a snapshot into the instant database server.

**Usage**

```bash
snaplet database cache [snapshot]
```

**Command Args**

| Name     | Description | Type   |
| -------- | ----------- | ------ |
| snapshot |             | string |

**Command Flags**

| Name     | Description                                                                 | Type    | Default |
| -------- | --------------------------------------------------------------------------- | ------- | ------- |
| --latest | Select the latest snapshot captured to cache in the instant database server | boolean | false   |
| --clear  | Remove the snapshot from the instant database server cache                  | boolean | false   |

## **completion**

The `snaplet completion` command is used to generate completion script.

**Usage**

```bash
snaplet completion
```
