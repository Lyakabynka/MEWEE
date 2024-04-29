import { FC, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import {
  photoVideoSlidersPropTypes,
  videoDataTypes,
} from "../widget.interface";
import styles from "./photo_video_sliders.module.scss";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const SwipeableTextMobileStepper: FC<photoVideoSlidersPropTypes> = ({
  sliderData,
  title,
}) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState<number>(0);

  const maxSteps = sliderData.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box className={styles.div}>
      <div className={styles.div_title}>
        <h1>{title}</h1>
      </div>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {sliderData.map((step: videoDataTypes, index) => (
          <div key={step.id}>
            {Math.abs(activeStep - index) <= 2 ? (
              <div className={styles.image_div}>
                <Box
                  className={styles.image_box}
                  component="img"
                  src={step.imgPath1}
                />
                <Box
                  className={styles.image_box}
                  component="img"
                  src={step.imgPath2}
                />
              </div>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
};

export default SwipeableTextMobileStepper;
