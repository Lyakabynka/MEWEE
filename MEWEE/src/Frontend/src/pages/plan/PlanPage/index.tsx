import { useEffect } from "react";
import { usePlanStore } from "../usePlanStore";
import { Box, CircularProgress } from "@mui/material";
import { CreatePlanListenPlaceHolder } from "../../../features/exportFeaturesComponents";

export const PlanPage = () => {
  const { isLoading, plans, getPlans } = usePlanStore();

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box></Box>
      )}
      <CreatePlanListenPlaceHolder />
    </>
  );
};
//{plans?.map((plan: IPlan) => {
//    return <PlanCard key={plan.id} plan={plan} />
//})}
