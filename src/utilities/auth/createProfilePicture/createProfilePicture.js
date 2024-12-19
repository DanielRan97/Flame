
export const createProfilePicture =  () => {
    let num = (Math.floor(Math.random() * 9) + 1).toString();
    return "ph" + num;
};

export default createProfilePicture;