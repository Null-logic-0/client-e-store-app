import Slider from "rc-slider";

function PriceRangeSlider({ value, handleChange, minValue, maxValue }) {
  return (
    <>
      <Slider
        range
        minValue={minValue}
        maxValue={maxValue}
        value={value}
        onChange={handleChange}
      />
    </>
  );
}

export default PriceRangeSlider;
