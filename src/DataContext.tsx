import React from "react";

export const defaultData = {
    user1: {
        name: "Ali Bilmem",
        age: 40
    },
    user2: {
        name: "Veli Bilirim",
        age: 35
    }
}

export const Context = React.createContext( defaultData.user1 )