import laureates from "../data/laureates.json";
type DatasetProps = {
  label: string
  data: number[]
  backgroundColor: string[]
}

type DataProp = {
  labels: string[];
  datasets: DatasetProps[]
}
const colors: string[] = ["Red", "Blue", "Green", "Hotpink", "Purple", "Orange", "Yellow", "Steelblue", "Lavender", "gray"];

// ******************************************* Genders *******************************************
const genders: (string | undefined)[] = laureates
  .filter((x) => x.gender != undefined)
  .map((laureate) => laureate.gender);
const unspecified: number = laureates
  .filter((x) => x.gender == undefined)
  .filter((x) => x.orgName != undefined).length;

const males: number = genders.filter((gender) => gender == "male").length;
const females: number = genders.filter((gender) => gender == "female").length;

const genderData: DataProp = {
  labels: ["Males", "Females", "Organisations"],
  datasets: [
    {
      label: "Gender",
      data: [males, females, unspecified],
      backgroundColor: colors
    }
  ]
};

// ******************************************* Laureates per category *******************************************
const winsAll = laureates.map((x) => x.nobelPrizes);

const allWinners: string[] = [];
winsAll.forEach(winner => {
  winner.forEach((win: { category: { en: string } }) => {
    allWinners.push(win.category.en);
  });
});

allWinners.sort();
const uniquePrizes: string[] = [...new Set(allWinners)];

const amountOfWinners: number[] = [];

uniquePrizes.forEach((uniquePrize) => {
  let count = 0;
  allWinners.forEach((prize) => {
    uniquePrize == prize ? (count = count + 1) : null;
  });
  amountOfWinners.push(count);
});

const categoryLaureatesData: DataProp = {
  labels: uniquePrizes,
  datasets: [
    {
      label: "Category wins",
      data: amountOfWinners,
      backgroundColor: colors,
    },
  ],
};

// ******************************************* Countries *******************************************
const countryLaureates:string[] = laureates.map(winner => (
  winner.birth 
    ? winner.birth.place.country.en 
    : winner.founded 
      ? winner.founded.place.country 
        ? winner.founded.place.country.en 
        : 'No data' 
      : 'No data'
))

countryLaureates.sort()

const amountOfCountryWinners: number[] = [];

const uniqueCountries: string[] = [...new Set(countryLaureates)];
uniqueCountries.sort();

uniqueCountries.forEach((uniqueCountry) => {
  if (uniqueCountry) {
    let count = 0;
    countryLaureates.forEach((country) => {
      uniqueCountry == country ? (count = count + 1) : null;
    });
    amountOfCountryWinners.push(count);
  }
});

const countryData: DataProp = {
  labels: uniqueCountries,
  datasets: [
    {
      label: "Laureates",
      data: amountOfCountryWinners,
      backgroundColor: colors,
    },
  ],
};

// ******************************************* Most wins *******************************************
type WinnerObj = {
  name: string;
  wins: number;
};

const allNames: string[] = [];
const allWins: number[] = [];
const amountToShow: number = 10;
const winnersData: WinnerObj[] = laureates.map((x) => ({
  name: x.knownName != undefined ? x.knownName.en : x.orgName.en,
  wins: x.nobelPrizes.length,
}));

winnersData.sort((a, b) => (a.wins < b.wins ? 1 : b.wins < a.wins ? -1 : 0));

winnersData.forEach((winner) => {
  if (allWins.length < amountToShow) {
    allNames.push(winner.name);
    allWins.push(winner.wins);
  }
});

const mostWinsData: DataProp = {
  labels: allNames,
  datasets: [
    {
      label: "Category wins",
      data: allWins,
      backgroundColor: colors,
    },
  ],
};

export { genderData, categoryLaureatesData, countryData, mostWinsData };