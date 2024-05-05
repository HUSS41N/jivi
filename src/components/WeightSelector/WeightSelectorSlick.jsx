import React, { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentWeight } from "../../redux/slices/UserSlice";
import { convertWeight } from "../../utils/user/user-utils";
import WeightHighlighterSvg from "../../assets/weightHighlighter.svg";
import Button from "../Button/Button";
import "./WeightSelector.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WeightSelectorSlick = ({
  initialUnit = "lbs",
  minWeight = 0,
  maxWeight = 140,
}) => {
  const dispatch = useDispatch();
  const { currentWeight } = useSelector((state) => state.user);
  const [unit, setUnit] = useState(initialUnit);
  const [sliderIndex, setSliderIndex] = useState(currentWeight - minWeight);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 11,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    initialSlide: sliderIndex,
    afterChange: (current) => handleWeightChange(current + minWeight),
  };

  useEffect(() => {
    dispatch(setCurrentWeight(currentWeight));
  }, [currentWeight, dispatch]);

  useEffect(() => {
    const convertedWeight = convertWeight(currentWeight, initialUnit, unit);
    setSliderIndex(convertedWeight - minWeight);
  }, [unit, initialUnit, currentWeight, minWeight]);

  const handleWeightChange = useCallback(
    (newWeight) => {
      dispatch(setCurrentWeight(newWeight));
      setSliderIndex(newWeight - minWeight);
    },
    [dispatch, minWeight]
  );

  const toggleUnit = useCallback(() => {
    setUnit((prevUnit) => (prevUnit === "kg" ? "lbs" : "kg"));
  }, []);

  const getDisplayWeight = () => {
    return unit === "lbs" ? Math.round(currentWeight * 2.20462) : currentWeight;
  };

  const generateWeights = () => {
    return Array.from(
      { length: maxWeight - minWeight + 1 },
      (_, i) => minWeight + i
    );
  };

  const buttonStyle = (metric) => ({
    width: "50%",
    height: "50px",
    backgroundColor: unit === metric ? "#242E49" : "#ffffff",
    borderRadius: "10px",
    border: unit === metric ? "5px solid #EDF5FF" : "none",
    color: unit !== metric ? "#5D6A85" : undefined,
    marginTop: "20px",
  });

  return (
    <div className="weight-selector-container">
      <h1 className="text-xl font-bold">What is your weight?</h1>
      <div className="flex justify-between items-center mb-10">
        <Button clickHandler={toggleUnit} style={buttonStyle("lbs")}>
          Lbs
        </Button>
        <Button clickHandler={toggleUnit} style={buttonStyle("kg")}>
          Kg
        </Button>
      </div>
      <div className="text-center mt-10">
        <p className="flex justify-center items-center mt-10">
          <span className="current-weight font-bold text-5xl leading-tight tracking-tighter px-2">
            {getDisplayWeight()}
          </span>
          <span className="current-unit font-semibold text-xl leading-snug tracking-tight">
            {unit}
          </span>
        </p>
      </div>
      <div className="slider-container mt-20 relative">
        <Slider {...sliderSettings}>
          {generateWeights().map((weight) => (
            <div
              key={weight}
              className={`h-10 ${weight % 5 === 0 ? "buzz-weight" : "weights"}`}
            ></div>
          ))}
        </Slider>
        <img
          src={WeightHighlighterSvg}
          alt="weight"
          className="weight-highlighter"
        />
      </div>
    </div>
  );
};

export default WeightSelectorSlick;
