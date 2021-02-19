import React from "react";

export default React.createContext({
  userId: null,
  setUserId: (id: string) => {},
})
