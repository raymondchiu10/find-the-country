import "./App.css";

import countryCodes from "./utils/country-codes.json";

function App() {
	console.log(Object.entries(countryCodes).filter((item) => item[1].includes("Canada")));

	const testArr = Object.entries(countryCodes);

	console.log(testArr.length);

	return (
		<>
			{testArr.map((item) => {
				return <img src={`https://flagcdn.com/${item[0]}.svg`} alt={`country code ${item[1]}`} width={100} />;
			})}
		</>
	);
}

export default App;
