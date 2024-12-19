import { getOneUserFromDB } from "../../../firebase/firebaseDB";

export const createUniqFid = async (uid) => {
  try {
    const user = await getOneUserFromDB(uid);
    if (user === false) {
      const fid = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
      return fid;
    } else {
      return user.fid || "FID_NOT_FOUND";
    }
  } catch (error) 
  {
    console.log(error);

    throw new Error("Failed to generate unique FID");
  }
};

export default createUniqFid;
