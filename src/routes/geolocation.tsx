import { useEffect, useState } from "react";
import Layout from "../layout/layout";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const Geolocation = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY || "",
    libraries: ["places"],
  });
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>();
  const [found, setFound] = useState<{
    location: google.maps.LatLngLiteral;
    name: string;
  } | null>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCenter({ lat: coords.latitude, lng: coords.longitude });
    });
  }, []);

  const onLoad = (map: google.maps.Map) => {
    let request: google.maps.places.FindPlaceFromQueryRequest = {
      query: "restaurant",
      fields: ["name", "geometry"],
      locationBias: { ...center! },
    };

    const service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results) => {
      if (results && results[0].geometry?.location && results[0].name) {
        console.log(results[0]);
        setFound({
          location: {
            lat: results[0].geometry?.location.lat(),
            lng: results[0].geometry?.location.lng(),
          },
          name: results[0].name,
        });
      }
    });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Layout>
      {center && (
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          zoom={17}
          center={center}
          onLoad={onLoad}
        >
          <Marker position={center} />
          {found && (
            <Marker
              position={found.location}
              label={found.name}
              icon={{
                path: "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
                fillColor: "#34495e",
                fillOpacity: 1,
                strokeColor: "#000",
                strokeWeight: 1,
                scale: 1,
              }}
            />
          )}
        </GoogleMap>
      )}
    </Layout>
  );
};

export default Geolocation;
