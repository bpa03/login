class User {
  email: string;
  password: string;
  username: string;

  constructor(_email: string, _password: string, _username: string) {
    this.email = _email;
    this.password = _password;
    this.username = _username;
  }
}

export default User;
