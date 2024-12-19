import { database, ref, set, get } from './firebase';

//Add user data to data base
const setUserToDB = (data , uid) => {
    const userRef = ref(database, 'users/' + uid);
    set(userRef, {
        ...data
      })
      .catch((error) => {
        throw new Error(error.message);
      });

}

//Get data of one user from data base
const getOneUserFromDB = async (uid) => {
  try {
    const userRef = ref(database, 'users/' + uid);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return false;
    }
  } catch (error) {
    throw new Error('Failed to get user');
  }
};

//Get all users data from data base
const getOAllUsersFromDB = async () => {
  try {
    const userRef = ref(database, 'users/');
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return false;
    }
  } catch (error) {
    throw new Error('Failed to get user');
  }
};


//Check if user name exist
const checkIfUserNameExistDB = async (newUserName) => {
  try {
    const userRef = ref(database, 'users/');
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      return false;
    }
    const users = snapshot.val();
    const trimmedNewUserName = newUserName.trim();

    for (const key of Object.keys(users)) {
      if (users[key].userName === trimmedNewUserName) {
        return true;
      }
    }

    return null;
  } catch (error) {
    throw error;
  }
};

//Check if user name exist
const checkIfFidExistDB = async (newFid) => {
  try {
    const userRef = ref(database, 'users/');
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      return false;
    }
    const users = snapshot.val();
    const trimmedFid = newFid.trim();

    for (const key of Object.keys(users)) {
      if (users[key].fid === trimmedFid) {
        return true;
      }
    }

    return false;
  } catch (error) {
    throw error;
  }
};

//Check if email exist
const checkIfEmailExistDB = async (newEmail) => {
  try {
    const userRef = ref(database, 'users/');
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      return false;
    }
    const users = snapshot.val();
    const trimmedNewUEmail = newEmail.trim();

    for (const key of Object.keys(users)) {
      if (users[key].email.trim() === trimmedNewUEmail) {
        return true;
      }
    }

    return false;
  } catch (error) {
    throw error;
  }
};

export { setUserToDB, getOneUserFromDB, checkIfUserNameExistDB, checkIfEmailExistDB, checkIfFidExistDB, getOAllUsersFromDB };
