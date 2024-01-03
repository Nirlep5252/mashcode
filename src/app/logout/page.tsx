"use client";

import React from "react";

export default function Logout() {
  React.useEffect(() => {
    window.localStorage.removeItem("gh-token");
    window.location.href = "/";
  }, []);
  return <></>;
}
