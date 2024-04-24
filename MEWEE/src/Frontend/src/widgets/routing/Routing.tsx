import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../features/exportFeaturesComponents";
import { PlanGroupPage, PlanPage } from "../../pages/exportPageComponents";
import { PrivateRoute } from "./PrivateRoute";
import { EnumUserRole } from "../../entities";
import { ManagePlanGroupPage } from "../../pages/exportPageComponents";
import { ScheduledPlanPage } from "../../pages/plan/ScheduledPlanPage";
import PostShow from "../../pages/post-show/PostShow";
import Groups from "../../pages/groups/Groups";
import { SideToolbar, TopSearchBar } from "../../features/exportFeaturesComponents";
import { Grid } from "@mui/material";
//
export const Routing = () => {
  return (

    <Grid container>
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }} className="div_global">
        <Grid item md={3}>
          <SideToolbar />
        </Grid>
        <div>
          <Grid item md={12}>
            <TopSearchBar />
            <Routes>
              <Route path="/feed" element={<HomePage />} />
              <Route path="/post-show" element={<PostShow />} />
              <Route path="/groups" element={<Groups />} />
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
      </div>
    </Grid>

  );
};
