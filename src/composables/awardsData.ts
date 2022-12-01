import award from "../data/award.json";

// Prize
type PrizeYear = {
  awardYear: string[];
  prizeAmount: number[];
  prizeAmountAdjusted: number[];
};
const awardYear: string[] = award.map((awardData) => awardData.awardYear);
const prizeAmount: number[] = award.map((awardData) => awardData.prizeAmount);
const prizeAmountAdjusted: number[] = award.map(
  (awardData) => awardData.prizeAmountAdjusted
);
const uniqueYears: string[] = [...new Set(awardYear)];

const prizeYearData: PrizeYear = {
  awardYear: awardYear,
  prizeAmount: prizeAmount,
  prizeAmountAdjusted: prizeAmountAdjusted,
};

// Category
const categories: string[] = award.map((awardData) => awardData.category.en);

const uniquePrizes: string[] = [...new Set(categories)];

const amountCategory: number[] = [];

uniquePrizes.forEach((uniquePrize) => {
  let count = 0;
  categories.forEach((prize) => {
    uniquePrize == prize ? (count = count + 1) : null;
  });
  amountCategory.push(count);
});

const colors: string[] = [
  "Red",
  "Blue",
  "Green",
  "Hotpink",
  "Purple",
  "Orange",
  "Yellow",
];
const categoryData = {
  labels: uniquePrizes,
  datasets: [
    {
      label: "Category wins",
      data: amountCategory,
      backgroundColor: colors,
    },
  ],
};

// Year

type LaurateYearObj = {
  year: string;
  category: string;
  laureates: string;
};

type YearProp = {
  [x: string]: string;
};

const laureateYearCategory: LaurateYearObj[] = award
  .filter((win) => win.laureates != undefined)
  .map((awardData) => ({
    year: awardData.awardYear,
    category: awardData.category.en,
    laureates: awardData?.laureates
      ? awardData.laureates[awardData.laureates?.length - 1].sortOrder
      : "",
  }));

const yearData: YearProp[] = [];

for (const laureateObj of laureateYearCategory) {
  yearData[laureateObj.category as unknown as number] = {};
  laureateYearCategory.forEach((data) => {
    laureateObj.category == data.category
      ? (yearData[laureateObj.category as unknown as number][data.year] =
          data.laureates)
      : null;
  });
}

const chartUpdate: (year: string) => string[] = (year) => {
  let updatedData: string[] = [];
  uniquePrizes.forEach((prize) => {
    updatedData.push(yearData[prize as unknown as number][year]);
  });

  return updatedData;
};

// total laureates per category
const amountOfWinners: number[] = [];
uniquePrizes.forEach((uniquePrize) => {
  let amountLaureates: number = 0;

  for (const value of Object.entries(
    yearData[uniquePrize as unknown as number]
  )) {
    typeof value[1] == "string"
      ? (amountLaureates = amountLaureates + parseInt(value[1]))
      : null;
  }

  amountOfWinners.push(amountLaureates);
});

const laureateData = {
  labels: uniquePrizes,
  datasets: [
    {
      label: "Category wins",
      data: amountOfWinners,
      backgroundColor: colors,
    },
  ],
};

export {
  prizeYearData,
  categoryData,
  chartUpdate,
  uniqueYears,
  laureateData,
  uniquePrizes,
  colors,
};
