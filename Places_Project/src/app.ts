// Code goes here!
import axios from "axios";
const GOOGLE_API = "";
const form = document.querySelector("form")!;
const addressInput = document.getElementById("address")! as HTMLInputElement;
// declare var google: any;
type GeoCodingResponseType = {
    results:
    {
        geometry: {
            location: {
                lat: number,
                lng: number
            }
        }
    }[],
    status: "OK" | "ZERO_RESULTS"
}
const handleSubmit = async (event: Event) => {
    event.preventDefault();
    const addressValue = addressInput.value;
    try {
        // const response = await axios.get<{ results: { geometry: { location: { lat: number, lng: number } } }[] }>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(addressValue)}&key=${GOOGLE_API}`)
        const response = await axios.get<GeoCodingResponseType>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(addressValue)}&key=${GOOGLE_API}`)
        if (response.data.status !== "OK") {
            throw new Error("Could not fetch");
        }
        const { lat, lng } = response.data.results[0].geometry.location;
        var coordinates = { lat, lng };
        var map = new google.maps.Map(
            document.getElementById('map')! as HTMLDivElement, { zoom: 8, center: coordinates });
        new google.maps.Marker({ position: coordinates, map: map });
    } catch (error) {
        console.log(error.message);
    }
}

form?.addEventListener("submit", handleSubmit);