# Quickstart

Want production-like data to code against? You're in the right place! 

Snaplet is a composable tool that helps developers manage the data in their development environments. 

**In this guide, we'll walk you through the process of:**
* Capturing your first snapshot with Snaplet.
* Installing the Visual Code extension. 
* Restoring that snapshot to your development environment.

Let's get started.

## 1. Sign in to Snaplet Cloud
First off, you'll need a free Snaplet account. Sign up to [Snaplet Cloud](https://app.snaplet.dev). 

## 2. Snaplet onboarding and snapshot capture

The Snaplet onboarding should start automatically once signed in. Click '**Let's go**'.

![Onboarding](/img/quickstart/01.png)

### 2.1. Source database

The first step is to choose the **source database** you're going to connect to Snaplet. The source database is typically your production database. 

:::tip

If you're uncomfortable connecting your actual production database, use a staging or QA database, or the Snaplet demo database. 

Supabase users should use the Supabase option and follow the [Supabase tutorial](/tutorials/supabase-clone-environments) for assistance. 

:::

For the purposes of this quickstart guide however we're going to guide you through the process of using your own database credentials. Select '**Provide my own db**'.

![Select own database](/img/quickstart/02.png)

You'll need to provide your database connection details. You can either do so individually for each of the values, or import a connection string.

Once done, test your connection and proceed. 

![Select own database](/img/quickstart/03.png)

<details>
  <summary><b>Troubleshooting database connection credentials</b></summary>
  <div>
    <div>Database connection strings can be tricky because of how URI encoding is handled. If you're experiencing errors you should refer to the <a href="/references/connection-strings/">Connection String guide</a>. Prisma also has a great reference guide on <a href="https://www.prisma.io/dataguide/postgresql/short-guides/connection-uris">URI encoding</a>.
        </div>
        <br/>
     </div>
</details>

### 2.2. Subsetting

You will now be prompted to create a subset of your source database. 

Subsetting is great for reducing the size of larger databases to a more managable size. 

Select the starting table for your subset (typically your "primary" table, like users or customers) and select how many rows of data you'd like. 

You can also opt not to subset at all. Select an option to proceed.

![Subset](/img/quickstart/04.png)

### 2.3 - Transform

You can now transform the data from your source database. Snaplet's transform process can scramble all data from your source database, while retaining the overall "shape" of that data, leaving personally-identifiable information safe to use.

You can also not to transform the data. Select either option to proceed.

![Transform](/img/quickstart/05.png)

### 2.4. Snapshot capture

Snaplet's workers will now connect to your source database, copy the contents, and depending on what you've selected, subset and transform the data. The output of this process is a **database snapshot**, which you can then restore into your development environment to code against. 

:::tip

A snapshot isn't a database. In order to code against this snapshot, it needs to be restored to a database, typically, your local development database. The Snaplet VS Code extension automates much of this process, and as such, we highly recommend installing it.
:::

While the snapshot is being created, let's install the [Snaplet Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=snaplet.snaplet-vscode). If you're not using VS Code, or would prefer to just use the Snaplet CLI, you can continue by viewing the [Snaplet CLI guide](/getting-started/start-here#installing-the-cli).

Click the '**Install the Snaplet extension**' to get started. We'll come back to the snapshot capture later.

![Capture](/img/quickstart/06.png)

## 3. Installing the Snaplet VS Code Extension

The [Snaplet VS Code extension](https://marketplace.visualstudio.com/items?itemName=snaplet.snaplet-vscode) brings Snaplet's functionality into your editor, and is the fastest and easiest way to use Snaplet to get production-like data in your development environment. 

The extension automatically restores your latest snapshot tagged `main` into a cloud preview database. By pointing your local database connection string to the Snaplet proxy, you will code against the production-like data captured in your snapshot and restored to this preview database. 

Practically, what does this mean? No more changing environment variables or schema drift - you're always coding against data that's up to date against your latest snapshot. It's also is fully branchable: when you branch your code, Snaplet branches your database, keeping the two in sync. 

Let's go ahead and get started on installing the extension.

:::tip

Need more detail? We've got a step-by-step guide to installing the VS Code extension you can follow [here](/guides/visual-studio-code-extension).

:::

### 3.1. Installation 

 Install the Snaplet VS Code extension from the VS Code Marketplace listing.

 ![Install Snaplet from the Extension Marketplace. Good things about to happen.](/img/vsce-02.webp)

### 3.2. Link Your Snaplet Account

After installation, you'll find a Snaplet icon on the sidebar. Click the '**Connect to Snaplet**' button to open the Snaplet panel.
    
![Installed! Now to connect your extension to your Snaplet account.](/img/vsce-03.webp)
    
Allow VS Code to navigate to the Snaplet web app. and then select the appropriate project you want to use in the VS Code extension, and click '**Connect**'. If prompted, allow [app.snaplet.dev](http://app.snaplet.dev) to open VS Code.
    
![Pick the right project from inside Snaplet.](/img/vsce-04.webp)
    
Allow the Snaplet VS Code extension to open the URI when prompted.
    
![Let the Snaplet extension read your project info.](/img/vsce-05.webp)
    
Your Snaplet VS Code extension is now associated with your Snaplet account, and installed. You just need to update your local development database environment to point to the Snaplet proxy.

![All done!](/img/vsce-06.webp)

## 4. Configure Your Development Environment

We're almost done. The last thing left to do is to point your local development database environment variable to the Snaplet proxy. 

Go to your active project workspace in your editor.

Change your local development database environment variable to point to **`postgresql://snaplet@localhost:2345/snaplet`**.

![Change your database variable](/img/quickstart/07.png)

## 5. Guide completed!
You're all done! Let's recap what we've done in this guide:

* You signed up for a free Snaplet account.
* You connected Snaplet to a database containing production or production-like data.
* You (optionally) subset this data if it was very large.
* You (optionally) transformed this data, in the process, removing any personally-identifiable information.
* You captured a snapshot of your original source database, using the variables above.
* You installed the Snaplet VS Code extension, and connected it to your active Snaplet project.
* You pointed your local development database environment variable to the Snaplet proxy in the extension.

You're now coding against the production-like data you captured originally as a snapshot. When you branch your code, Snaplet will also create a new database branch, keeping all your code and bug fixes isolated to a single database. You can also easily share this with colleagues - simply have them checkout the same branch, and they'll also have access to your data.

As always, if you have any issues, come join us on [Discord](https://app.snaplet.dev/chat) for real-time support.
