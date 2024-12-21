import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
const [loading, setLoading]=useState(true)
  const onChange = (newUser) => {
    setUser(newUser);
  };

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      fetch(`http://localhost:5005/users?id=${id}`)
        .then((r) => r.json())
        .then((users) => users[0])
        .then((user) => {
          setUser(user);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      setUser(null)
    }
  }, []);

 useEffect(()=>{
  if(loading){
    return 
  }
  if(user?.id){
    localStorage.setItem("userId", user.id)
  } else {
    localStorage.removeItem("userId")
  }
 },[user?.id, loading])

  return (
    <UserContext.Provider value={{ user, setUser, onChange, loading}}>
      {children}
    </UserContext.Provider>
  );
}
