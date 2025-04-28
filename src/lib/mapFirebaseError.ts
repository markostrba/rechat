export const mapFirebaseError = (errorCode?: string) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/invalid-credential":
      return "Invalid email or password, please try again."
    default:
      return "An unexpected error occurred. Please try again.";
  }
}