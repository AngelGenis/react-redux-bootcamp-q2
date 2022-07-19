import React from "react";
import AuthGaurd from "./guards/AuthGaurd";

const RootGaurd = ({ children }) => {
    return <AuthGaurd>{children}</AuthGaurd>;
};

export default RootGaurd;