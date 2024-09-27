    import {createContext, useContext, useEffect, useState} from "react";
    import { getUsers} from "../../data/repository";

    const UserContext = createContext();

    export function useUser() {
        return useContext(UserContext)
    }

    export function UserProvider({ children }) {
        const [users, setUsers] = useState([]);

        useEffect(() => {
            loadUsers();
        }, []);

        const loadUsers = async () =>{
            const users = await getUsers();
            console.log(users);
            setUsers(users);
        }

        return (
            <UserContext.Provider value={{ users }}> {/* Update the key to users here */}
                {children}
            </UserContext.Provider>
        )
    }