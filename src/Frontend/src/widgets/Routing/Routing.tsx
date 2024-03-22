import { Route, Routes } from "react-router-dom";
import {
    PlanGroupPage,
    PlanPage,
    HomePage,
} from "../../pages";
import { PrivateRoute } from "./PrivateRoute";
import { EnumUserRole } from "../../entities";
import { LogoutPage } from "../../pages";
import { ManagePlanGroupPage } from '../../pages';
import { ScheduledPlanPage } from '../../pages/plan/ScheduledPlanPage';
import { AuthRoutes } from './auth/AuthRoutes';
import { RecoveryRoutes } from './auth/RecoveryRoutes';

export const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthRoutes />} />
            <Route path="auth/:url" element={<AuthRoutes />} />
            <Route path="recovery/:url" element={<RecoveryRoutes />} />
            <Route path="logout" element={<LogoutPage />} />
            <Route path="/feed" element={<HomePage />} />
            <Route path="plans" element={
                <PrivateRoute requiredRole={EnumUserRole.user}>
                    <PlanPage />
                </PrivateRoute>
            } />
            <Route path="plan-groups" element={
                <PrivateRoute requiredRole={EnumUserRole.user}>
                    <PlanGroupPage />
                </PrivateRoute>
            } />
            <Route path="plan-groups/:id" element={
                <PrivateRoute requiredRole={EnumUserRole.user}>
                    <ManagePlanGroupPage />
                </PrivateRoute>
            } />

            <Route path="plans/:id/scheduled" element={
                <PrivateRoute requiredRole={EnumUserRole.user}>
                    <ScheduledPlanPage />
                </PrivateRoute>
            } />
        </Routes >
    );
};