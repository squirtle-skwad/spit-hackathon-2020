export const dummyUser = {
  "id": "ff1f1ec2-2454-44c0-a19b-d2629d0de69f",
  "email": "vikrantgajria@gmail.com",
  "mobile_number": 9930780001,
  "name": "Vikrant Gajria",
  "type": {
    "typeName": "volunteer"
  }
};

export const setUserDetails = (user) => localStorage.setItem("user", JSON.stringify(user));
export const getUserDetails = () => JSON.parse(localStorage.getItem("user")) || dummyUser;
