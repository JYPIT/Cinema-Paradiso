import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: true,
});

export const isLoginAtom = atom({
  key: "isLogin",
  default: false,
});

export const userDB = atom({
  key: "user",
  default: { id: "", email: "", password: "", password2: "" },
});

export const userIdAtom = atom({
  key: "userId",
  default: "",
});
