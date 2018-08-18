# Graph Cockpit
[![Build Status](https://travis-ci.org/sholloway/graph-cockpit.svg?branch=ci)](https://travis-ci.org/sholloway/graph-cockpit)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.png?v=103)](https://opensource.org/licenses/mit-license.php)
[![Open Source Love](https://badges.frapsoft.com/os/v3/open-source.png?v=103)](https://github.com/ellerbrock/open-source-badges/)
- - -
An Electron based fat client for working with graphs.

Status: Under active development working towards version 0.1.0. Not stable. Do not use.

## Getting Started
### Dependencies
* Electron has its own install of Node.js. You must use the same version of node
  as Electron's to run the tests. It is recommended to use something like NVM
  to manage the Node version.
```shell
git clone <this repo>
cd graph-cockpit
brew update
brew install nvm
#Follow the brew directions to update your .bash_profile to finish setting up NVM.
nvm install 7.9.0
npm install
./node_modules/.bin/electron-rebuild
```
* Compiling native dependencies against Electron. This needs to be done every
  time the dependencies are upgraded or new ones added.
```shell
./node_modules/.bin/electron-rebuild
```

### Development
The application is an Electron application. To run it without bundling you
need to start the server side component and then launch the Electron app.
This can be done with two terminals.
1. In a terminal, start the Node.js server side application.
  ```shell
  npm run start-server
  ```
2. In a second terminal, start Electron via WebPack development server.
  ```shell
  npm run start-client-dev
  ```

### NPM Tasks
All tasks are run in the form:
```shell
npm run <task>
```  

| Task             | Description                                                                                             |
|------------------|---------------------------------------------------------------------------------------------------------|
| list             | List installed NPM packages with their dependencies.                                                    |
| outdated         | List all installed packages for which a latest version of package is available in NPM registry.         |
| start-client     | Runs the application in production mode. Must start the WebPack server first via the start-server task. |
| start-client-dev | Runs the application. Must start the WebPack server first via the start-server task.                    |
| start-server     | Compiles the WebPack bundle and launches the WebPack dev server.                                        |
| docs             | Generates the JavaScript documentation.                                                                 |
| test             | Runs the unit tests.                                                                                    |

## Development
### Updating Dependencies
1. Detect updates via `npm outdated`
2. Change the dependencies version number to the desired version.
3. `npm update --save`
4. `npm update --dev`
5. Run the tests.

## Related Resources
### Electron
* [Electron](http://electron.atom.io)

### React
* [Facebook's Create React App](https://github.com/facebookincubator/create-react-app)
* [React.js](https://facebook.github.io/react/index.html)
* [Flux Diagram](https://github.com/facebook/flux)
* [Flux Architecture](https://facebook.github.io/flux/docs/overview.html)
* [Cartoon Guide for Flux](https://medium.com/code-cartoons/a-cartoon-guide-to-flux-6157355ab207)
* [Thinking in React](http://facebook.github.io/react/docs/thinking-in-react.html)
* [Top Level API (Global)](https://facebook.github.io/react/docs/top-level-api.html)
* [Component API (Class)](https://facebook.github.io/react/docs/component-api.html)
* [Component Lifecycle (Class Methods)](https://facebook.github.io/react/docs/component-specs.html)
* [Component Lifecycle (Diagrams)](http://javascript.tutorialhorizon.com/2014/09/13/execution-sequence-of-a-react-components-lifecycle-methods/)
* [React Components](http://react-components.com/)
* [React Widgets](https://github.com/jquense/react-widgets)
* [React Router](https://github.com/reactjs/react-router)

### Testing
* [Sinon Mocks](http://sinonjs.org/)
* [Chai Tests](http://chaijs.com/)

### Redux
* [Github](https://github.com/reactjs/redux)
* [Docs](http://redux.js.org/)
* [Videos](https://egghead.io/series/getting-started-with-redux)
* [React Redux](https://github.com/reactjs/react-redux)
* [Collection of Redux Resources](https://github.com/xgrommx/awesome-redux)

### JSDoc
* [Github Page](https://github.com/jsdoc3/jsdoc)
* [Documentation](http://usejsdoc.org)

### Project Governance
* [Change Log](http://keepachangelog.com/)
* [Gitbook](https://github.com/GitbookIO/gitbook)

### Security & Privacy
* [NIST Authentication Guidelines](https://pages.nist.gov/800-63-3/)
* [Password Strength Test](https://github.com/nowsecure/owasp-password-strength-test)
* [Owasp Password Guidelines](https://www.owasp.org/index.php/Authentication_Cheat_Sheet#Implement_Proper_Password_Strength_Controls)
* [Owasp Password Reset](https://www.owasp.org/index.php/Forgot_Password_Cheat_Sheet)
* [Owasp Password Storage](https://www.owasp.org/index.php/Password_Storage_Cheat_Sheet)
* [Scala jBCrypt Wrapper](https://github.com/t3hnar/scala-bcrypt)
* [Broken Session](https://www.owasp.org/index.php/Top_10_2013-A2-Broken_Authentication_and_Session_Management)
* [Owasp Session Management Guide](https://www.owasp.org/index.php/Session_Management_Cheat_Sheet)
* [Owasp TLS Guide](https://www.owasp.org/index.php/Transport_Layer_Protection_Cheat_Sheet)
* [Owas XSS Guide](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet)
