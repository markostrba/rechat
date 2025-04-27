export const mapFirebaseError = (errorCode: string) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
}