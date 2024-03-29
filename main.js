// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

//TESTS
const testValid = [1, 1, 1, 1, 1, 1, 1]; //valid, but not a real credit card number. If added to batch, it makes it past the first validation, so doesn't get flagged as a fraudulent number.
const testInvalid = [1, 1, 1, 1, 1, 1, 1, 1]; //invalid, so it makes it to the company checker and doesn't pass as a real company.

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
  //testValid,
  //testInvalid,
];

// Add your functions below:
const validateCred = (arr) => {
  doubledNums = [];
  regNums = [];
  //CREATES ARRAY WITH DOUBLED NUMBERS
  for (let i = arr.length - 2; i >= 0; i -= 2) {
    //goes from 2nd to last to 0 by 2s
    let num = arr[i];
    let newDigit = num * 2;
    if (newDigit > 9) {
      newDigit = newDigit - 9;
    }
    doubledNums.push(newDigit);
  }
  //console.log(doubledNums)
  //NORMAL NUMBER ARRAY
  for (let j = arr.length - 1; j >= 0; j -= 2) {
    let normNum = arr[j];
    regNums.push(normNum);
  }
  //ADDING TOGETHER ALL THE NUMBERS
  doubledNums = doubledNums.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });
  regNums = regNums.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });
  let total = doubledNums + regNums;
  //ONLY VALID IF THERE'S NOT A REMAINDER
  let sumMod = total % 10;
  if (sumMod === 0) {
    //define sumMod
    return "valid";
  } else {
    return "invalid";
  }
};

//Find Invalid Cards
let invalidCards = [];
const findInvalidCards = (arr) => {
  for (let k = 0; k < arr.length; k++) {
    let card = validateCred(arr[k]);
    if (card === "invalid") {
      invalidCards.push(arr[k]);
    }
  }
  return invalidCards; //How do I get the index of these or the name of the variable they belong to?
};

//CALL AN ARRAY WITH ALL INVALID CARD NUMBERS
invalidCards = findInvalidCards(batch);
//console.log(testCards);

//ID FRAUDULENT CARD COMPANIES
/*
1) compare 1st digit to list - if...else
2) Return array of the involved card companies (no duplicates)
 */

const idInvalidCardCompanies = (arr) => {
  let companies = []; //arr for card companies
  for (let m = 0; m < arr.length; m++) {
    if (arr[m][0] === 3) {
      if (!companies.includes("Amex (American Express)")) {
        companies.push("Amex (American Express)");
      }
    } else if (arr[m][0] === 4) {
      if (!companies.includes("Visa")) {
        companies.push("Visa");
      }
    } else if (arr[m][0] === 5) {
      if (!companies.includes("Mastercard")) {
        companies.push("Mastercard");
      }
    } else if (arr[m][0] === 6) {
      if (!companies.includes("Discover")) {
        companies.push("Discover");
      }
    } else {
      if (!companies.includes("Company not found")) {
        companies.push("Company not found");
      }
    }
  }
  return companies;
};

console.log(idInvalidCardCompanies(invalidCards)); //Used testValid and testInvalid to make sure they were using the right values. To test, ungrey the test values at the top too.
//console.log(validateCred(testValid))
//console.log(validateCred(testInvalid))

//TEST ALL CARD NUMBERS
/*console.log(
  validateCred(valid1),
  validateCred(valid2),
  validateCred(valid3),
  validateCred(valid4),
  validateCred(valid5)
);

console.log(
  validateCred(invalid1),
  validateCred(invalid2),
  validateCred(invalid3),
  validateCred(invalid4),
  validateCred(invalid5)
);

console.log(
  validateCred(mystery1),
  validateCred(mystery2),
  validateCred(mystery3),
  validateCred(mystery4),
  validateCred(mystery5)
);*/



