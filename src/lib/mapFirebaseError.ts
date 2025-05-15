export const mapFirebaseError = (errorCode?: string) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered";
    case "auth/invalid-credential":
      return "Invalid email or password, please try again"
    case "not-found":
      return "User does not exists"
    default:
      return "Something went wrong, please try again later";
  }
}