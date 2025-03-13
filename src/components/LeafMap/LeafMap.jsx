import "./leaf-map.scss";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LeafMap = (props) => {
	const { selectedFlag } = props;
	const [mouseOver, setMouseOver] = useState();
	const [click, setClick] = useState();
	const [countries, setCountries] = useState();

	const [answer, setAnswer] = useState();

	console.log("???", selectedFlag);

	useEffect(() => {
		fetch("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson")
			.then((response) => response.json())
			.then((data) => {
				setCountries(data);
			});
	}, []);

	useEffect(() => {
		const test = async () => {
			try {
				fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${selectedFlag}`)
					.then((res) => res.json())
					.then((data) => {
						setAnswer(data);
						console.log(data);
					});
			} catch (err) {
				console.error(err);
			}
		};

		test();
	}, [selectedFlag]);

	useEffect(() => {
		const test = async () => {
			try {
				fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${selectedFlag}`)
					.then((res) => res.json())
					.then((data) => {
						setAnswer(data);
						console.log(data);
					});
			} catch (err) {
				console.error(err);
			}
		};

		test();
	}, [selectedFlag]);

	// function calcDist(lat1, lon1, lat2, lon2) {
	// 	let R = 6371; // km
	// 	let dLat = toRad(lat2 - lat1);
	// 	let dLon = toRad(lon2 - lon1);
	// 	let latitude1 = toRad(lat1);
	// 	let latitude2 = toRad(lat2);

	// 	let a =
	// 		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	// 		Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(latitude1) * Math.cos(latitude2);
	// 	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	// 	let d = R * c;
	// 	return d;
	// }

	// // Converts numeric degrees to radians
	// function toRad(Value) {
	// 	return (Value * Math.PI) / 180;
	// }

	return (
		<div className="leaf-map">
			<p>{mouseOver || "Example Country"}</p>

			<p>{selectedFlag && JSON.stringify(selectedFlag[1])}</p>

			<MapContainer
				className="leaf-map__map-container"
				center={[20, 0]}
				zoom={5}
				minZoom={2}
				maxZoom={5}
				maxBounds={[
					[-90, -180],
					[90, 180],
				]}
			>
				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution=""
					minZoom={2}
					maxZoom={4}
					noWrap={true}
				/>

				{countries && (
					<GeoJSON
						data={countries}
						onEachFeature={(feature, layer) => {
							layer.on("mouseover", () => {
								const clickedCountry = feature.properties.ADMIN;
								setMouseOver(clickedCountry);
							});
							layer.on("click", () => {
								const clickedCountry = feature.properties.ADMIN;
								console.log(selectedFlag, clickedCountry);
								alert(
									clickedCountry === selectedFlag
										? "You got the right country"
										: "you got the wrong country"
								);
							});
						}}
					/>
				)}
			</MapContainer>
		</div>
	);
};

export default LeafMap;
