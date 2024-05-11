import { Grid } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import {
  SideToolbar,
  TopSearchBar,
} from "../../features/exportFeaturesComponents";
import { HomePage } from "../../features/exportFeaturesComponents";
import { PlanGroupPage, PlanPage } from "../../pages/exportPageComponents";
import { PrivateRoute } from "./PrivateRoute";
import { EnumUserRole, usePostsStore } from "../../entities";
import { ManagePlanGroupPage } from "../../pages/exportPageComponents";
import { ScheduledPlanPage } from "../../pages/plan/ScheduledPlanPage";
import PostShow from "../../pages/post-show/PostShow";
import Groups from "../../pages/groups/Groups";
import Profile from "../../pages/profile/Profile";
import Messenger from "../../pages/messenger/Messenger";
import Chat from "../../pages/chat/Chat";
import Setting from "../../pages/setting/Setting";
import Group from "../../pages/groups/group/Group";
import SettingProfile from "../../pages/setting/components/setting-profile/SettingProfile";
import SettingSecurity from "../../pages/setting/components/setting-security/SettingSecurity";
import SettingAccount from "../../pages/setting/components/setting-account/SettingAccount";
import PageDevelopment from "../сommon/page-development/PageDevelopment";
import Events from "../../pages/groups/eventsWindow/Events";
import Announcement from "../../pages/groups/announcementWindow/Announcement";
import NewsWindow from "../../pages/groups/newsWindow/NewsWindow";

export const Routing = () => {
  return (
    <Grid container>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Grid item md={12} style={{width:'100%', display: "flex", justifyContent: "center"}}>
              <div style={{paddingRight: "1rem"}}>
                  <SideToolbar />
              </div>
              <Grid item md={12} style={{height:'100%'}}>
                  <TopSearchBar />
                  <Routes>
                      <Route path="/feed" element={<HomePage />} />
                      <Route path="/post/:id" element={<PostShow />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/announcements" element={<Announcement />} />
                      <Route path="/news" element={<NewsWindow />} />
                      <Route path="/groups" element={<Groups />} />
                      <Route path="/jobs" element={<PageDevelopment />} />
                      <Route path="/group/:id" element={<Group />} />
                      <Route path="/profile/:username" element={<Profile />} />
                      <Route path="/messenger" element={<Messenger />} />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/settings" element={<Setting />} />
                      <Route path="/settings/profile" element={<SettingProfile />} />
                      <Route path="/settings/security" element={<SettingSecurity />} />
                      <Route path="/settings/account" element={<SettingAccount />} />
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
          </Grid>
      </div>
    </Grid>
  );
};
