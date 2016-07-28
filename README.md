# Graph Cockpit
- - -
An Electron based fat client for working with graphs.

Status: Under active development working towards version 0.1.0. Not stable. Do not use.

## Getting Started
### Dependencies
* Install npm via node.
```
brew install node
```

### NPM Tasks
| Task     | Description                                          |
|----------|------------------------------------------------------|
| list     | List installed npm packages with their dependencies. |
| outdated | List all installed packages for which a latest version of package is available in npm registry. |
| prune    | Removes “extraneous” packages i.e. packages installed but not listed in package.json file. |
| pack     | Creates an installable tarball from a package. This tarball can then be published on npm registry or installed in some other environment e.g. production. |

## Development
### Updating Dependencies
1. Detect updates via `npm outdated`
2. Change the dependencies version number to the desired version.
3. `npm update --save`
4. `npm update --dev`
5. Run the tests.

## Related Resources
* [Electron](http://electron.atom.io)

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
