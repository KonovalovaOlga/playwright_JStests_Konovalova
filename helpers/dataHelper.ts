import { User } from "../types";

const getRandomString = (length) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const generateValidUserData = (): User => {
  return {
    firstName: getRandomString(5),
    lastName: getRandomString(5),
    email: `automation${Date.now()}@example.com`,
    password: "Password13",
  };
};
