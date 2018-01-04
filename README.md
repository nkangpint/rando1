# PINT-PWA

## Dependencies

### Required
* Node >= 9.3.0
* npm
* yarn
* bower
* homebrew + xcode (macOS)

### Recommended
* nvm (node version manager)

### Environment Installation (macOS)

1. Install nvm: `$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash`

2. Install at least v9.3.0 of node 
`$ nvm install 9.3.0`

3. Install xcode (from the app store) https://itunes.apple.com/us/app/xcode/id497799835?mt=12

4. Install xcode command line tools
`$ xcode-select --install`

5. Install homebrew - https://brew.sh/
`$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

6. Install yarn 
`$ brew install yarn --without-node`

## Development 

1. Install all dependencies
`$ yarn 📦`
or
`$ yarn install`
This will install all npm dependencies including the pwa-build repo, which will handle all the build steps.



2. Start development server
`$ yarn 🔥`
or
`$ yarn dev`

Note: The first time running the development server may take a while. (Installing client side dependencies)


## Commands

#### $ yarn build:dev
Creates a static ES6 build, and firebase assets

#### $ yarn build:prod
Creates a production ready build with ES5/ES6

#### $ yarn dev
Creates a "live-reloading" environment that watches for content changes, builds a fresh ES6 build, and reloads the browser automatically.