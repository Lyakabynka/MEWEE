import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../exportWigetComponents";
import { RecoveryRoutes } from "../exportWigetComponents";
const RegLogRouting: FC = () => {
    return (
        <Routes>
            <Route path="/auth" element={<AuthRoutes />} />
            <Route path="auth/:url" element={<AuthRoutes />} />
            <Route path="auth/recovery/:url" element={<RecoveryRoutes />} />
        </Routes>

    )
}
export default RegLogRouting;