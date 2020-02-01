import { useState } from "react";

export const dummyUser = {
  "id": "ff1f1ec2-2454-44c0-a19b-d2629d0de69f",
  "email": "vikrantgajria@gmail.com",
  "mobile_number": 9930780001,
  "name": "Vikrant Gajria",
  "type_id": 1,
  "type": {
    "typeName": "volunteer",
    "id": 1,
  },
};


export const setUserDetails = (user) => localStorage.setItem("user", JSON.stringify(user));
export const getUserDetails = () => dummyUser || JSON.parse(localStorage.getItem("user"));
