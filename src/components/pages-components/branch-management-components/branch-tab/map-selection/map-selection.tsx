"use client";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import clsx from "clsx";
import L, { LatLngExpression, LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";

interface IMapProps {
  location?: LatLngExpression | null;
  onChange: (e: LatLngLiteral) => void;
  containerClassname?: string;
}

export default function SelectAddressMap(props: IMapProps) {
  const { location, onChange } = props;
  const [position, setPosition] = useState<LatLngExpression>(
    location ? location : [36.297972, 59.606152]
  );

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onChange(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    useEffect(() => {
      map.locate();
    }, [map]);

    const customIcon = L.icon({
      iconUrl: "https://api.iconify.design/hugeicons/location-09.svg",
      iconSize: [32, 32],
      pane: "sdas",
    });

    return (
      <Marker position={position} icon={customIcon}>
        <Popup>مقصد انتخابی شما</Popup>
      </Marker>
    );
  }

  return (
    <div
      className={clsx("h-full relative aspect-video", props.containerClassname)}
    >
      <MapContainer
        className={clsx(props.containerClassname, "h-full")}
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="h-full"
        />
        <LocationMarker />
        <LeafletSearch />
      </MapContainer>
    </div>
  );
}

declare module "leaflet" {
  namespace Control {
    function geocoder(options?: any): any;
  }
}

const LeafletSearch = () => {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", function (e: any) {
        const { center, bbox } = e.geocode;
        map.fitBounds([
          [bbox[0], bbox[1]],
          [bbox[2], bbox[3]],
        ]);
        L.marker(center).addTo(map);
      })
      .addTo(map);

    return () => {
      map.removeControl(geocoder);
    };
  }, [map]);

  return null;
};
