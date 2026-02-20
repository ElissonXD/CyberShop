import { createContext } from "react";

export const UserContext = createContext({
    login: false,
    user: {},
    total: 0,
    loading: false
})