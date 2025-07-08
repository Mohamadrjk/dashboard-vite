import { ISalesByGenderAndCityReport } from "@/types/genderTypes";
import { useEffect, useState } from "react";
import styles from "@/components/gender-components/city-and-gender/city-and-gender.module.css";
export const provinceData = [
  { id: 360, name: "tehran" },
  { id: 357, name: "esfahan" },

  { id: 353, name: "azarbayjan-sharghi" },
  { id: 354, name: "azarbayjan-gharbi" },
  { id: 355, name: "ardabil" },
  { id: 356, name: "alborz" },
  { id: 358, name: "ilam" },
  { id: 359, name: "bushehr" },
  { id: 361, name: "chaharmahal-bakhtiari" },
  { id: 362, name: "khorasan-jonobi" },
  { id: 363, name: "khorasan-razavi" },
  { id: 364, name: "khorasan-shomali" },
  { id: 365, name: "khozestan" },
  { id: 366, name: "zanjan" },
  { id: 367, name: "semnan" },
  { id: 368, name: "sistan-balouchestan" },
  { id: 369, name: "fars" },
  { id: 370, name: "qazvin" },
  { id: 371, name: "qom" },
  { id: 372, name: "kurdestan" },
  { id: 373, name: "kerman" },
  { id: 374, name: "kermanshah" },
  { id: 375, name: "kohgiluyeh-boyer-ahmad" },
  { id: 376, name: "golestan" },
  { id: 377, name: "gilan" },
  { id: 378, name: "lorestan" },
  { id: 379, name: "mazandaran" },
  { id: 380, name: "markazi" },
  { id: 381, name: "hormozgan" },
  { id: 382, name: "hemedan" },
  { id: 383, name: "yazd" },
];

const useCityChoose = () => {
  const [cityId, setCityId] = useState<number | undefined>(undefined);
  const [cityName, setCityName] = useState<number | undefined>(undefined);

  const [tempElement, setTempElement] = useState<HTMLElement | undefined>(
    undefined
  );
  const [cityInfo, setCityInfo] = useState<
    ISalesByGenderAndCityReport | undefined
  >(undefined);
  const [mapCityInfo, setMapCityInfo] = useState<
    ISalesByGenderAndCityReport[] | undefined
  >(undefined);
  const [cityInfoInMap, setCityInfoInMap] = useState<
    ISalesByGenderAndCityReport | undefined
  >(undefined);
  const [allData, setAllData] = useState<ISalesByGenderAndCityReport[]>();
  let hideTimeout: ReturnType<typeof setTimeout>;

  const onShowToolTipInMap = (mapCityID: number) => {
    clearTimeout(hideTimeout); // Clear any existing hide timeout

    const cityName = provinceData.find((item) => item.id == mapCityID);
    const container = document.getElementById("map-container");
    setCityName(mapCityID);
    if (cityName) {
      const city = document.getElementById(cityName.name);
      if (city) {
        city.classList.add(styles.activeProvince);
        // Get the city's and container's position
        const cityRect = city.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Calculate position relative to the container
        const offsetX = cityRect.left - containerRect.left + cityRect.width / 2;
        const offsetY = cityRect.top - containerRect.top + cityRect.height / 2;

        const tooltip = document.getElementById("city-tooltip");
        tooltip.style.left = `${offsetX}px`;
        tooltip.style.top = `${offsetY}px`;

        tooltip.classList.add(styles.visible);

        // Smooth animation
        tooltip.style.transition = "all 0.3s ease";
        setTempElement(city);
      }
    }
  };

  const onHideTooltip = () => {
    // Set delay to hide the tooltip
    hideTimeout = setTimeout(() => {
      if (tempElement) {
        setMapCityInfo(undefined);
        tempElement.classList.remove(styles.activeProvince);
        const tooltip = document.getElementById("city-tooltip");
        tooltip.classList.remove(styles.visible);
        setTempElement(undefined);
        setCityName(undefined);
      }
    }, 500); // 300ms delay
  };

  const onHideTooltipFast = () => {
    clearTimeout(hideTimeout);
    if (tempElement) {
      setMapCityInfo(undefined);
      tempElement.classList.remove(styles.activeProvince);
      const tooltip = document.getElementById("city-tooltip");
      tooltip.classList.remove(styles.visible);
      setTempElement(undefined);
      setCityName(undefined);
    }
  };

  // Optional: Clear timeout on immediate re-enter
  const onCancelHideTooltip = () => {
    clearTimeout(hideTimeout);
  };

  const getTheCItyElemnt = () => {
    const cityName = provinceData.find((item) => item.id == cityId);
    const container = document.getElementById("map-container");
    if (cityName) {
      const city = document.getElementById(cityName.name);
      city.classList.add(styles.activeProvince);
      // Get the city's and container's position
      const cityRect = city.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Calculate position relative to the container
      const offsetX = cityRect.left - containerRect.left + cityRect.width / 2;
      const offsetY = cityRect.top - containerRect.top + cityRect.height / 2;

      const tooltip = document.getElementById("city-tooltip");
      tooltip.style.left = `${offsetX}px`;
      tooltip.style.top = `${offsetY}px`;

      tooltip.classList.add(styles.visible);

      // Smooth animation
      tooltip.style.transition = "all 0.3s ease";
      setTempElement(city);
    }
  };

  useEffect(() => {
    if (cityId) {
      setMapCityInfo(undefined);
      if (tempElement) {
        tempElement.classList.remove(styles.activeProvince);
        const tooltip = document.getElementById("city-tooltip");
        tooltip.classList.remove(styles.visible);
        setTempElement(undefined);
      }
      getTheCItyElemnt();
    } else if (tempElement) {
      tempElement.classList.remove(styles.activeProvince);
      const tooltip = document.getElementById("city-tooltip");
      tooltip.classList.remove(styles.visible);
      setTempElement(undefined);
    }
  }, [cityId]);

  useEffect(() => {
    if (allData && allData.length > 0 && cityName) {
      const find = allData.filter((item) => item.state_id == cityName);

      if (find) setMapCityInfo(find);
    }
  }, [cityName]);

  return {
    cityId,
    cityInfo,
    setCityId,
    setCityInfo,
    getTheCItyElemnt,
    onShowToolTipInMap,
    onHideTooltip,
    onCancelHideTooltip,
    setAllData,
    mapCityInfo,
    onHideTooltipFast,
    allData,
  };
};

export default useCityChoose;
