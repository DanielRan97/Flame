export const getFirebaseAuthErrorMessage = (error) => {
  const errorMessages = {
    "auth/invalid-email": "The email address is not valid.",
    "auth/user-disabled":
      "The user account has been disabled by an administrator.",
    "auth/user-not-found": "No user found with this email address.",
    "auth/wrong-password": "The password is invalid.",
    "auth/email-already-in-use":
      "The email address is already in use by another account.",
    "auth/weak-password":
      "The password is too weak. Please choose a stronger password.",
    "auth/operation-not-allowed":
      "This operation is not allowed. Please contact support.",
    "auth/network-request-failed":
      "A network error has occurred. Please try again.",
    "auth/too-many-requests": "Too many requests. Please try again later.",
    "auth/requires-recent-login":
      "This operation requires recent authentication. Please sign in again.",
    "auth/invalid-credential": "You entered an incorrect email or password, if you don't have an account yet please sign up.",
    "auth/account-exists-with-different-credential":
      "An account already exists with the same email address but different sign-in credentials.",
    "auth/invalid-verification-code": "The verification code is invalid.",
    "auth/invalid-verification-id": "The verification ID is invalid.",
    "auth/missing-verification-code": "The verification code is missing.",
    "auth/missing-verification-id": "The verification ID is missing.",
    "auth/provider-already-linked":
      "The account is already linked to this provider.",
    "auth/credential-already-in-use":
      "This credential is already associated with a different user account.",
  };

  return errorMessages[error.code] || false;
};

export default getFirebaseAuthErrorMessage;
