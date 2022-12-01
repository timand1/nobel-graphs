import laureates from "../data/laureates.json";
const colors: string[] = [
  "Red",
  "Blue",
  "Green",
  "Hotpink",
  "Purple",
  "Orange",
  "Yellow",
  "Steelblue",
  "Lavender",
  "gray",
];

// Genders
const genders: (string | undefined)[] = laureates
  .filter((x) => x.gender != undefined)
  .map((laureate) => laureate.gender);
const unspecified: number = laureates
  .filter((x) => x.gender == undefined)
  .filter((x) => x.orgName != undefined).length;

const males: number = genders.filter((gender) => gender == "male").length;
const females: number = genders.filter((gender) => gender == "female").length;

const genderData = {
  labels: ["Males", "Females", "Organisations"],
  datasets: [
    {
      label: "Gender",
      data: [males, females, unspecified],
      backgroundColor: [
        "rgb(255, 99, 132, 0.6)",
        "rgb(54, 162, 235, 0.6)",
        "rgb(9, 126, 9)",
      ],
      borderColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(9, 126, 9)"],
      borderWidth: 1,
    },
  ],
};

// Laureates per category

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

const categoryLaureatesData = {
  labels: uniquePrizes,
  datasets: [
    {
      label: "Category wins",
      data: amountOfWinners,
      backgroundColor: colors,
    },
  ],
};

// Countries

let countryPersons: string[] = laureates
  .filter((person) => person.birth != undefined)
  .map((person) => (person?.birth ? person.birth.place.country.en : ""));

const countryOrgs: string[] = laureates
  .filter((org) => org.founded != undefined)
  .map((org) => org?.founded?.place.country)
  .filter((country) => country != undefined)
  .map((org) => (org ? org.en : ""));

const amountOfNoCountry: number =
  laureates.length - (countryOrgs.length + countryPersons.length);
const allCountries: string[] = [...countryPersons];
const amountOfCountryWinners: number[] = [];

countryOrgs.forEach((winner) => {
  allCountries.push(winner);
});
const uniqueCountries: string[] = [...new Set(allCountries)];
uniqueCountries.sort();

uniqueCountries.forEach((uniqueCountry) => {
  if (uniqueCountry) {
    let count = 0;
    allCountries.forEach((country) => {
      uniqueCountry == country ? (count = count + 1) : null;
    });
    amountOfCountryWinners.push(count);
  }
});
uniqueCountries.push("No data");
amountOfCountryWinners.push(amountOfNoCountry);

const countryData = {
  labels: uniqueCountries,
  datasets: [
    {
      label: "Laureates",
      data: amountOfCountryWinners,
      backgroundColor: colors,
    },
  ],
};

// Most wins
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

const mostWinsData = {
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
