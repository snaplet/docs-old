# How to Install and Configure the Snaplet Visual Studio Code Extension

## **What is the Snaplet Visual Studio Code Extension (VSCE)?**

Snaplet makes software development more efficient and accurate by providing a seamless way to work with production-like data in a safe and compliant manner. 

The Snaplet VSCE takes this a step further by integrating Snaplet's features directly into your Visual Studio Code environment. 

This automates the process of branching your database when you branch your code, ensuring you always have a local development database seeded with fresh, production-realistic data. 

## **Prerequisites**

- [Visual Studio Code](https://code.visualstudio.com/) installed.
- [An active Snaplet account](https://app.snaplet.dev/) (this can be a free account).

## **Step-by-Step Installation and Configuration**

### **Step 1: Open Visual Studio Code**

Launch Visual Studio Code on your computer.

### **Step 2: Access the Extension Marketplace**

1. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
2. Use the search bar to search for "Snaplet".
    
    ![Search for Snaplet in the Extension Marketplace](/img/vsce-01.webp)

(Optional - you can also install the VSCE directly from the Extension page via your browser [here](https://marketplace.visualstudio.com/items?itemName=Snaplet.snaplet-vscode).) 

### **Step 3: Install the Snaplet Extension**

1. Locate the Snaplet Extension in the search results.
2. Click the **`Install`** button next to the extension name.

    ![Install Snaplet from the Extension Marketplace. Good things about to happen.](/img/vsce-02.webp)

### **Step 4: Link Your Snaplet Account**

1. After installation, you'll find a Snaplet icon on the sidebar.
2. Click the `Connect to Snaplet` button to open the Snaplet panel.
    
    ![Installed! Now to connect your extension to your Snaplet account.](/img/vsce-03.webp)
    
3. Allow Visual Studio Code to navigate to the Snaplet web app.
4. Select the appropriate project you want to use in the Visual Studio Code Extension, and click `Connect`. If prompted, allow [app.snaplet.dev](http://app.snaplet.dev) to open Visual Studio Code.
    
    ![Pick the right project from inside Snaplet.](/img/vsce-04.webp)
    
5. Allow the Snaplet Visual Studio Code Extension to open the URI.
    
    ![Let the Snaplet extension read your project info.](/img/vsce-05.webp)
    
6. Your Snaplet Visual Studio Code Extension is now associated with your Snaplet account, and installed. You just need to update your local development database environment to point to the Snaplet proxy.

    ![All done!](/img/vsce-02.webp)

### **Step 5: Configure Your Development Environment**

1. Go to your active project workspace.
2. Change your local development database environment variable to point to **`postgresql://snaplet@localhost:2345/snaplet`**.

You're all done. Your Snaplet VSCE is now configured, and your local database will automatically branch when you switch branches in your code.

As always, if you have any issues, come join us on [Discord](https://app.snaplet.dev/chat) for real-time support.