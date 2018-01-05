# PINT-PWA

## Dependencies

### Required
* Node >= 9.3.0
* npm
* bower
* homebrew + xcode (macOS)

### Recommended
* nvm (node version manager)

## Getting started

### 1. Gitlab setup
Before starting, you'll need to make sure you have SSH keys added into the https://gitlab.pint.com website appropriately. https://docs.gitlab.com/ce/ssh/README.html#generating-a-new-ssh-key-pair

### 2. Environment Installation (macOS)
* Note: If any of these fail, you probably need to re-run the command with sudo.

1. Install nvm: 
`$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash` 
* Note: If you see a prompt to install xcode command line tools, follow the steps on that prompt. You will need to re-run this command again after it installs.

2. Install at least v9.3.0 of node 
`$ nvm install 9.3.0`

3. Install bower
`$ npm install -g bower`

4. Install firebase-tools
`$ npm install -g firebase-tools`

5. Authenticate with your pint.com email in the browser window that pops open.
`$ firebase login`

### 3. Obtain the repository
`$ git clone git@gitlab.pint.com:pwa/pint.git && cd pint`

### 4. Development 

1. Install all dependencies
`$ npm run 📦`
or
`$ npm run start`
This will install all npm dependencies including the pwa-build repo, which will handle all the build steps.

2. Start development server
`$ npm run  🔥`
or
`$ npm run dev`

Note: The first time running the development server may take a while. (Installing client side dependencies)

And you should be up and running!

Any changes to the /src folder will be auto-compiled and your browser should reload and detect those changes.

## Commands

#### $ npm run build:dev
Creates a static ES6 build, and firebase assets

#### $ npm run build:prod
Creates a production ready build with ES5/ES6

#### $ npm run dev
Creates a "live-reloading" environment that watches for content changes, builds a fresh ES6 build, and reloads the browser automatically.