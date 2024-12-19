import { getOAllUsersFromDB } from "../../../firebase/firebaseDB";

export const createUniqUserName = async (userName, uid) => {
  const users = await getOAllUsersFromDB();
  let uniqUserName = userName.trim();

  const isUserNameTaken = (username) => {
    return Object.values(users).some(
      (user) => user.userName.trim() === username.trim() && user.uid !== uid
    );
  };

  while (isUserNameTaken(uniqUserName)) {
    const serial = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
    uniqUserName = `${userName.trim()}${serial}`;
  }

  return uniqUserName;
};

export default createUniqUserName;
