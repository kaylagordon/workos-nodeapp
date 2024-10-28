# Node.js App with SSO & Directory Sync
## Kayla Gordon

An example application demonstrating SSO and Directory Sync from WorkOS.

## App Preview
![screen recording of app in motion](./public/images/screen_recording.gif)

## Deployed App

To view the app in action, head to [https://workos-nodeapp.onrender.com/](https://workos-nodeapp.onrender.com/). 

You should be able to:
1. Sign in using Google OAuth, Microsoft OAuth, or Enterprise SAML.
2. View a page that says "Hi [your name]!".
3. Click the "Directory" tab and see a list of users from a synced directory (through Okta).
4. Navigate back to the "Profile" page or log out.

## Local Set Up

### Prerequisites

Node.js version 10+

### Node.js Project Setup

1. Clone the main repo and install dependencies for the app you'd like to use:

    ```bash
    # HTTPS
    git clone https://github.com/kaylagordon/workos-nodeapp.git
    ```

    or

    ```bash
    # SSH
    git clone git@github.com:kaylagordon/workos-nodeapp.git
    ```

2. Install the dependencies.
    ```bash
    npm install
    ```

### Configure your environment

3. Grab your API Key and Client ID from your WorkOS Dashboard. Create a `.env`
   file at the project root, and store them like so:

    ```bash
    WORKOS_API_KEY=sk_xxxxxxxxxxxxx
    WORKOS_CLIENT_ID=project_xxxxxxxxxxxx
    ```

### Run the app

4. Start the server and head to http://localhost:8000/ to begin the login flow:

```sh
npm start
```
