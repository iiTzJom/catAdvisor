import React, { useEffect, useState } from "react";
import styled from "@emotion/styled/macro";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import custom icon image
const iconCat = new L.Icon({
  iconUrl: process.env.PUBLIC_URL + "/Catstand.png",
  iconSize: [100, 100], // size of the icon
});

var popup = L.popup({
  offset: [0, -30],
});

const Contain = styled.div`
  max-width: 100%;
  padding: 40px 240px;
`;

const DivInside = styled.div`
  width: 100%;
  display: flex;
`;

const DivMap = styled.div`
  width: 50%;
  height: 750px;
  .leaflet-popup {
    bottom: 20px !important;
  }
`;

const ButtonClinic = styled.div`
  font-size: 34px;
  color: #ffffff;
  width: 440px;
  background-color: #3d80cb;
  padding: 20px 40px;
  margin-bottom: 20px;
  border-radius: 40px;
  text-align: center;
  &:hover {
    opacity: 0.7;
    background-color: #ffbf6b;
  }
  cursor: pointer;
`;

const DivHeadText = styled.div`
  margin-bottom: 25px;
  text-shadow: 2px 2px #00000050;
  padding: 20px 40px;
  color: #000000;
  font-size: 48px;
  width: 440px;
  text-align: center;
`;

const DivClinic = styled.div`
  width: 50%;
  position: relative;
`;

const DivClinicInside = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function DetailMap() {
  const dataClinic = [
    { name: "คลีนิคแม่ต๋ำรักษาสัตว์", lat: 19.153773, lng: 99.911259 },
    { name: "โรงพยาบาลสัตว์แสนสุข", lat: 19.1732, lng: 99.905109 },
    { name: "คลีนิคฮักพะเยารักษาสัตว์", lat: 19.026309, lng: 99.922846 },
  ];
  const [nameClinic, setNameClinic] = useState(dataClinic[0].name);
  const [position, setPosition] = useState([19.021278, 99.920639]);
  function FlyMapTo() {
    const map = useMap();

    useEffect(() => {
      map.flyTo(position);
    }, [position]);

    return null;
  }
  // console.log(position);
  return (
    <Contain>
      <DivInside>
        <DivMap>
          <MapContainer
            center={position}
            scrollWheelZoom={true}
            zoom={18}
            style={{ height: "100%", width: "100%" }}
          >
            <FlyMapTo />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={iconCat}>
              <Popup className="leaflet-popup">{nameClinic}</Popup>
            </Marker>
          </MapContainer>
        </DivMap>
        <DivClinic>
          <DivClinicInside>
            <DivHeadText>คลีนิคที่เเนะนำ</DivHeadText>
            {dataClinic.map((data) => (
              <ButtonClinic
                key={data.name}
                onClick={() => (
                  setPosition([data.lat, data.lng]), setNameClinic(data.name)
                )}
              >
                {data.name}
              </ButtonClinic>
            ))}
          </DivClinicInside>
        </DivClinic>
      </DivInside>
    </Contain>
  );
}

export default DetailMap;
