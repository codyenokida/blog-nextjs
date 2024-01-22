import React, { createContext, useEffect, useState } from "react";

const PostContext = createContext({
  activePostId: "",
  setActivePostId: (_: string) => {},
});

const PostContextProvider = (props: any) => {
  const [activePostId, setActivePostId] = useState<string>("");

  return (
    <PostContext.Provider value={{ activePostId, setActivePostId }}>
      {props.children}
    </PostContext.Provider>
  );
};

export { PostContext, PostContextProvider };
