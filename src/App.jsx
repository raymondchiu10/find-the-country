import { useState } from "react";
import "./App.css";

import countryCodes from "./utils/country-codes.json";

function App() {
	const [difficulty, setDifficulty] = useState();
	const [selectedFlag, setSelectedFlag] = useState();

	const easyArr = Object.entries(countryCodes.easy);
	const medArr = Object.entries(countryCodes.medium);
	const hardArr = Object.entries(countryCodes.hard);
	const allArr = [...easyArr, ...medArr, ...hardArr];

	const setDifficultyLevel = (diff) => {
		setDifficulty(diff);
		const flagIndex = Math.floor(Math.random() * diff.length);
		setSelectedFlag(diff[flagIndex]);
	};
	return (
		<section>
			<button
				onClick={() => {
					setDifficultyLevel(allArr);
				}}
			>
				All
			</button>
			<button
				onClick={() => {
					setDifficultyLevel(easyArr);
				}}
			>
				Easy
			</button>
			<button
				onClick={() => {
					setDifficultyLevel(medArr);
				}}
			>
				Medium
			</button>
			<button
				onClick={() => {
					setDifficultyLevel(hardArr);
				}}
			>
				Hard
			</button>

			{selectedFlag && (
				<img
					src={`https://flagcdn.com/${selectedFlag[0]}.svg`}
					alt={`country code ${selectedFlag[1]}`}
					width={100}
				/>
			)}
		</section>
	);
}

export default App;
