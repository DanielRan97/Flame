import { checkIfUserNameExistDB } from "../../firebase/firebaseDB";

export const createUniqUserName = async (userName) => {
    const check = await checkIfUserNameExistDB(userName);
    let uniqSerial = "";
    if(check) {
      for (let i = 0; i < 4; i++) {
        uniqSerial += Math.floor(Math.random() * 10);
      }
      return userName + uniqSerial;
    } else {
      return userName;
    }
  };
  
  export default createUniqUserName;
  