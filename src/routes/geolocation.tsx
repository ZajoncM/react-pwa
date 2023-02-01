import { useEffect, useState } from "react";
import Layout from "../layout/layout";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";

type MarkerProps = GoogleMapReact.Coords;

const Marker = (_: MarkerProps) => <FaMapMarkerAlt size="1rem" color="red" />;

const Geolocation = () => {
  const [center, setCenter] = useState<GoogleMapReact.Coords | undefined>(
    undefined
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCenter({ lat: coords.latitude, lng: coords.longitude });
    });

    const fetchNearestRestaurant = async () => {
      const url =
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
        "location=" +
        center?.lat +
        "," +
        center?.lng +
        "&radius=100&type=restaurant&key=<My API Key>";

      fetch(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=100&type=restaurant&key=AIzaSyCZUMvOWqr5bfJceXgt37pFf-twnYLg-8Y"
      )
        .then((response) => response.json())
        .then((JsonResponse) => {
          console.log(JsonResponse);
        })
        .catch((error) => {
          alert(error);
        });
    };

    fetchNearestRestaurant();
  }, []);

  if (!center) return <div>loading...</div>;

  return (
    <Layout>
      <div style={{ width: "100%", flexGrow: "1" }}>
        <GoogleMapReact
          defaultCenter={center}
          defaultZoom={15}
          key="AIzaSyCZUMvOWqr5bfJceXgt37pFf-twnYLg-8Y"
        >
          <Marker lat={center.lat} lng={center.lng} />
        </GoogleMapReact>
      </div>
    </Layout>
  );
};

export default Geolocation;
