import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../features/exportFeaturesComponents";
import { AuthRoutes } from "./auth/AuthRoutes";
import { RecoveryRoutes } from "./auth/RecoveryRoutes";
import { PlanGroupPage, PlanPage } from "../../pages/exportPageComponents";
import { PrivateRoute } from "./PrivateRoute";
import { EnumUserRole } from "../../entities";
import { ManagePlanGroupPage } from "../../pages/exportPageComponents";
import { ScheduledPlanPage } from "../../pages/plan/ScheduledPlanPage";
import PostShow from "../../pages/post-show/PostShow";
import { SideToolbar, TopSearchBar } from "../../features/exportFeaturesComponents";
import { Grid } from "@mui/material";
export const Routing = () => {
  return (

    <Grid container>
      <div className="div_global">
        <Grid item md={3}>
          <SideToolbar />
        </Grid>
      </div>
      <div>
        <TopSearchBar />
        <Grid item md={12}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post-show" element={<PostShow />} />
            <Route
              path="plans"
              element={
                <PrivateRoute requiredRole={EnumUserRole.user}>
                  <PlanPage />
                </PrivateRoute>
              }
            />
            <Route
              path="plan-groups"
              element={
                <PrivateRoute requiredRole={EnumUserRole.user}>
                  <PlanGroupPage />
                </PrivateRoute>
              }
            />
            <Route
              path="plan-groups/:id"
              element={
                <PrivateRoute requiredRole={EnumUserRole.user}>
                  <ManagePlanGroupPage />
                </PrivateRoute>
              }
            />

            <Route
              path="plans/:id/scheduled"
              element={
                <PrivateRoute requiredRole={EnumUserRole.user}>
                  <ScheduledPlanPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Grid>
      </div>
    </Grid>

  );
};
