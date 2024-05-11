import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "./auth/AuthRoutes";
import { RecoveryRoutes } from "./auth/RecoveryRoutes";
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