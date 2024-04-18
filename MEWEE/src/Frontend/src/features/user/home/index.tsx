import { EnumActivityType } from "../../../entities";
import { useTranslation } from "react-i18next";
import { SideToolbar } from "../../exportFeaturesComponents";
import { TopSearchBar } from "../../exportFeaturesComponents";
import { FeedsContainer } from "../../exportFeaturesComponents";
import { ActivityPanel } from "../components/activityPanel";
import CreatePostForm from "../profile/forms/createPost";
import "./index.css";

export const HomePageForm = () => {
  const { t } = useTranslation();
  console.log(document.cookie);

  return (
    <div className="home-generic-container">
      <CreatePostForm></CreatePostForm>
      <SideToolbar></SideToolbar>
      <div className="home-main-container">
        <TopSearchBar></TopSearchBar>
        <div className="home-generic-content-holder">
          <FeedsContainer></FeedsContainer>
          <ActivityPanel
            activityType={EnumActivityType.Comments}
          ></ActivityPanel>
        </div>
      </div>
    </div>
  );
  // <Grid container direction="column" alignItems="center">
  //     <h4>Username: </h4>
  //     <h6>Email: {email} | {isEmailConfirmed ? 'Email confirmed' : 'Confirm your email' }</h6>
  //     <h6>Role: {role}</h6>
  //     <Link href="/logout">{t('Logout')}</Link>
  // </Grid>
};
