# PINT-PWA

## Dependencies

### Required
* Node >= 9.3.0
* npm
* bower
* homebrew + xcode (macOS)

### Recommended
* nvm (node version manager)

### Environment Installation (macOS)
* Note: If any of these fail, you probably need to re-run the command with sudo.

1. Install xcode (from the app store) https://itunes.apple.com/us/app/xcode/id497799835?mt=12

2. Install xcode command line tools
`$ xcode-select --install`

3. Install nvm: `$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash`
 
4. Install at least v9.3.0 of node 
`$ nvm install 9.3.0`

5. Install bower
`$ npm install -g bower`

6. Install firebase-tools
`$ npm install -g firebase-tools`

7. $ `firebase login`

## Development 
cd into the current repository

1. Install all dependencies
`$ npm run 📦`
or
`$ npm run install`
This will install all npm dependencies including the pwa-build repo, which will handle all the build steps.

2. Start development server
`$ npm run  🔥`
or
`$ npm run dev`

Note: The first time running the development server may take a while. (Installing client side dependencies)


## Commands

#### $ npm run build:dev
Creates a static ES6 build, and firebase assets

#### $ npm run build:prod
Creates a production ready build with ES5/ES6

#### $ npm run dev
Creates a "live-reloading" environment that watches for content changes, builds a fresh ES6 build, and reloads the browser automatically.