import { useEffect, useMemo, useRef } from "react";
import clsx from "clsx";

import { ISalesByGenderAndCityReport } from "@/types/genderTypes";

import style from "@/styles/IranMap.module.css";
import { MapDataPAths } from "./map.data-paths";
import { useCursorTooltip } from "@/hooks/new-useCity/useCursorTooltip";
import { CursorTooltip } from "./tooltip-components/CursorTooltip";
const provinceData: Record<string, { id: number; color: string }> = {
  tehran: { id: 360, color: "#1E3A8A" }, // Dark Blue
  esfahan: { id: 357, color: "#2563EB" }, // Blue
  "azarbayjan-sharghi": { id: 353, color: "#3B82F6" }, // Light Blue
  "azarbayjan-gharbi": { id: 354, color: "#60A5FA" }, // Sky Blue
  ardabil: { id: 355, color: "#93C5FD" }, // Soft Blue
  alborz: { id: 356, color: "#1E40AF" },
  ilam: { id: 358, color: "#1D4ED8" },
  bushehr: { id: 359, color: "#2563EB" },
  "chaharmahal-bakhtiari": { id: 361, color: "#3B82F6" },
  "khorasan-jonobi": { id: 362, color: "#60A5FA" },
  "khorasan-razavi": { id: 363, color: "#93C5FD" },
  "khorasan-shomali": { id: 364, color: "#1E3A8A" },
  khozestan: { id: 365, color: "#2563EB" },
  zanjan: { id: 366, color: "#3B82F6" },
  semnan: { id: 367, color: "#60A5FA" },
  "sistan-baluchestan": { id: 368, color: "#93C5FD" },
  fars: { id: 369, color: "#1E40AF" },
  qazvin: { id: 370, color: "#1D4ED8" },
  qom: { id: 371, color: "#2563EB" },
  kurdestan: { id: 372, color: "#3B82F6" },
  kerman: { id: 373, color: "#60A5FA" },
  kermanshah: { id: 374, color: "#93C5FD" },
  "kohgiluyeh-boyer-ahmad": { id: 375, color: "#1E3A8A" },
  golestan: { id: 376, color: "#2563EB" },
  gilan: { id: 377, color: "#3B82F6" },
  lorestan: { id: 378, color: "#60A5FA" },
  mazandaran: { id: 379, color: "#93C5FD" },
  markazi: { id: 380, color: "#1E40AF" },
  hormozgan: { id: 381, color: "#1D4ED8" },
  hamedan: { id: 382, color: "#2563EB" },
  yazd: { id: 383, color: "#3B82F6" },
};

interface IranMapProps {
  allData: ISalesByGenderAndCityReport[];
}

const IranMapComponent: React.FC<IranMapProps> = ({ allData }) => {
  const svgRef = useRef<HTMLDivElement>(null);
  const { tooltip, showTooltip, hideTooltip } = useCursorTooltip();

  // Memoize the cities with purchase data
  const cityDataSet = useMemo(
    () => new Set(allData.map(({ state_id }) => state_id)),
    [allData]
  );

  // Cache province elements and apply styles
  useEffect(() => {
    const svgContainer = svgRef.current;
    if (!svgContainer) return;

    const links = svgContainer.querySelectorAll("a");

    links.forEach((link) => {
      const cityId = link.getAttribute("id");
      const cityInfo = provinceData[cityId];

      if (cityInfo) {
        const hasData = cityDataSet.has(cityInfo.id);
        link.classList.toggle(style.withData, hasData);
        link.classList.toggle(style.noData, !hasData);
      } else {
        link.classList.add(style.noData);
      }
    });
  }, [cityDataSet]);

  // Handle mouse events efficiently
  //   const handleMouseEnter = (cityId: string | null) => {
  //     const city = cityId ? provinceData[cityId] : null;
  //     if (city) onShowToolTipInMap(city.id);
  //   };

  return (
    <div className={clsx(style["svg-wrapper"])} ref={svgRef}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1248 1123"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full"
        id="iran-svg"
      >
        {MapDataPAths.map(({ id, pathList }, index) => (
          <g
            key={index}
            // onMouseEnter={() => handleMouseEnter(id)}

            onMouseMove={(e) => {
              const city = provinceData[id];
              showTooltip(
                e,
                {
                  element: "hoveredMapInfo",
                  data: allData.filter(
                    (item) => item.state_id == Number(city.id)
                  ),
                },
                { followCursor: true, targetId: null }
              );
            }}
            onMouseLeave={hideTooltip}
          >
            <a id={id}>
              <path d={pathList[0]} fill="#D9D2AB" />
              <path d={pathList[1]} fill="black" />
            </a>
          </g>
        ))}
      </svg>
      <CursorTooltip tooltip={tooltip} />
    </div>
  );
};

export default IranMapComponent;
