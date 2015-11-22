/* vim: set softtabstop=2 shiftwidth=2 expandtab : */

class UserService {
  constructor () {
    this.loggedIn = false;
    this.userInfo = {
      loggedIn: false,
      email: 'guillaume.leclerc@epfl.ch',
      firstName: 'Guillaume',
      lastName: 'Leclerc',
      picture: 'http://people.epfl.ch/cgi-bin/people/getPhoto?id=224338&show='
    }
  }

  isLoggedIn () {
    return this.loggedIn;
  }

  login (email, password) {
    console.log(email, password);
    console.log(password);
    this.userInfo.loggedIn = true;
  }
}

module.exports = new UserService();
