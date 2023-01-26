# Quickstart

Need data to code against? You're in the right place!

### 0. Create a project on [Snaplet Cloud](https://app.snaplet.dev) and follow the onboarding to capture your first snapshot:

<div style={{textAlign: 'center'}}>

![Onboarding starting screen](/screenshots/onboarding_start.png)

</div>

### 1. Install `snaplet` CLI:

```bash
curl -sL https://app.snaplet.dev/get-cli/ | bash
```

### 2. Setup `snaplet` CLI in your local project:

Run this command in your local project root directory.

```bash
snaplet setup
```

A new `.snaplet` folder is created in your project containing your configuration from Snaplet Cloud.

### 3. Restore your snapshot:

```bash
snaplet snapshot restore
```

Congratulations - **you can start coding against your data**.