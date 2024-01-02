"use client";

import React from "react";

export default function AfterLogin() {
  React.useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const githubToken = urlSearchParams.get("token");
    if (githubToken) window.localStorage.setItem("gh-token", githubToken);
    window.location.href = "/";
  }, []);
  return <></>;
}
