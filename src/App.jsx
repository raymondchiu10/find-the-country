import { useState, useEffect, useRef } from "react";
import "./App.scss";

import countryCodes from "./utils/country-codes.json";
import LeafMap from "./components/LeafMap/LeafMap";

const easyArr = Object.entries(countryCodes.easy);
const medArr = Object.entries(countryCodes.medium);
const hardArr = Object.entries(countryCodes.hard);
const allArr = [...easyArr, ...medArr, ...hardArr];

function App() {
	const [easyHold, setEasyHold] = useState(easyArr);
	const [medHold, setMedHold] = useState(medArr);
	const [hardHold, setHardHold] = useState(hardArr);
	const [allHold, setAllHold] = useState(allArr);

	const [selectedFlag, setSelectedFlag] = useState();
	const saveFlag = useRef();


	const flagSelector = (diff) => {
		if (diff === "easy") {
			const flagIndex = Math.floor(Math.random() * easyHold.length);
			setSelectedFlag(easyHold[flagIndex]);
			saveFlag.current = easyHold[flagIndex];
		}
		if (diff === "med") {
			const flagIndex = Math.floor(Math.random() * medHold.length);
			setSelectedFlag(medHold[flagIndex]);
			saveFlag.current = medHold[flagIndex];
		}
		if (diff === "hard") {
			const flagIndex = Math.floor(Math.random() * hardHold.length);
			setSelectedFlag(hardHold[flagIndex]);
			saveFlag.current = hardHold[flagIndex];
		}
		if (diff === "all") {
			const flagIndex = Math.floor(Math.random() * allHold.length);
			setSelectedFlag(allHold[flagIndex]);
			saveFlag.current = allHold[flagIndex];
		}
	};

	const guess = (guessVal, diff) => {
		if (diff === "easy") {
			const item = easyHold.filter((i) => i !== selectedFlag);

			setEasyHold(item);

			flagSelector("easy");
		}

		if (diff === "med") {
			const item = medHold.filter((i) => i !== selectedFlag);
			setMedHold(item);

			flagSelector("med");
		}

		if (diff === "hard") {
			const item = medHold.filter((i) => i !== selectedFlag);
			setHardHold(item);

			flagSelector("hard");
		}

		if (diff === "all") {
			const item = medHold.filter((i) => i !== selectedFlag);
			setAllHold(item);

			flagSelector("all");
		}
	};

	useEffect(() => {
		if (easyHold.length <= 1) {
			setEasyHold(easyArr);
		}
	}, [easyHold]);

	useEffect(() => {
		if (medHold.length <= 1) {
			setMedHold(medArr);
		}
	}, [medHold]);

	useEffect(() => {
		if (hardHold.length <= 1) {
			setHardHold(hardArr);
		}
	}, [hardHold]);

	useEffect(() => {
		if (allHold.length <= 1) {
			setAllHold(easyArr);
		}
	}, [allHold]);

	return (
		<section className="app">
			<div>
				<button onClick={() => guess("??", "easy")}>Guess</button>

				<button
					onClick={() => {
						flagSelector("all");
					}}
				>
					All
				</button>
				<button
					onClick={() => {
						flagSelector("easy");
					}}
				>
					Easy
				</button>
				<button
					onClick={() => {
						flagSelector("med");
					}}
				>
					Medium
				</button>
				<button
					onClick={() => {
						flagSelector("hard");
					}}
				>
					Hard
				</button>

				{selectedFlag && (
					<div className="app__flag">
						<img
							src={`https://flagcdn.com/${selectedFlag[0]}.svg`}
							alt={`country code ${selectedFlag[1]}`}
							width={100}
						/>
					</div>
				)}
			</div>

			<LeafMap selectedFlag={selectedFlag} saveFlag={saveFlag} />
		</section>
	);
}

export default App;
