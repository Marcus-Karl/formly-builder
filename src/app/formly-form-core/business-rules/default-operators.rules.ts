import { Engine } from 'json-rules-engine';

// Leave a space in front to represent a 0 check digit (which does not exist)
const checkDigits = ' ABCDEFGHXJKLMNYPQRSTUVW';

export const addDefaultOperators = (engine: Engine) => {
  /* Array */
  engine.addOperator('arrayLengthGreaterThan', (factValue: any, jsonValue: any) => {
    return arrayLengthGreaterThan(factValue, jsonValue);
  });

  engine.addOperator('arrayLengthGreaterThanEqual', (factValue: any, jsonValue: any) => {
    return arrayLengthGreaterThanEqual(factValue, jsonValue);
  });

  engine.addOperator('arrayLengthEquals', (factValue: any, jsonValue: any) => {
    return arrayLengthEquals(factValue, jsonValue);
  });

  engine.addOperator('arrayLengthLessThanEqual', (factValue: any, jsonValue: any) => {
    return arrayLengthLessThanEqual(factValue, jsonValue);
  });

  engine.addOperator('arrayLengthLessThan', (factValue: any, jsonValue: any) => {
    return arrayLengthLessThan(factValue, jsonValue);
  });

  engine.addOperator('containsMultiple', (factValue: any, jsonValue: any) => {
    return containsMultiple(factValue, jsonValue);
  });

  engine.addOperator('containsAtLeastOne', (factValue: any, valueParams: any) => {
    return containsAtLeastOne(factValue, valueParams);
  });

  /* String */
  engine.addOperator('startsWith', (factValue: any, jsonValue: any) => {
    return startsWith(factValue, jsonValue);
  });

  engine.addOperator('patternMatches', (factValue: any, jsonValue: any) => {
    return patternMatches(factValue, jsonValue);
  });

  engine.addOperator('patternDoesNotMatch', (factValue: any, jsonValue: any) => {
    return patternDoesNotMatch(factValue, jsonValue);
  });

  engine.addOperator('doesNotStartWith', (factValue: any, jsonValue: any) => {
    return doesNotStartWith(factValue, jsonValue);
  });

  engine.addOperator('oneStartsWith', (factValue: any, jsonValue: any) => {
    return oneStartsWith(factValue, jsonValue);
  });

  engine.addOperator('oneDoesNotStartWith', (factValue: any, jsonValue: any) => {
    return oneDoesNotStartWith(factValue, jsonValue);
  });

  engine.addOperator('noneStartsWith', (factValue: any, jsonValue: any) => {
    return noneStartsWith(factValue, jsonValue);
  });

  engine.addOperator('stringLengthEqual', (factValue: any, jsonValue: any) => {
    return stringLengthEqual(factValue, jsonValue);
  });

  engine.addOperator('stringLengthNotEqual', (factValue: any, jsonValue: any) => {
    return stringLengthNotEqual(factValue, jsonValue);
  });

  /* Date */
  engine.addOperator('dateGreaterThan', (factValue: any, jsonValue: any) => {
    return dateGreaterThan(factValue, jsonValue, false);
  });

  engine.addOperator('dateGreaterThanInclusive', (factValue: any, jsonValue: any) => {
    return dateGreaterThan(factValue, jsonValue, true);
  });

  engine.addOperator('anyDateGreaterThan', (factValue: any, jsonValue: any) => {
    return anyDateGreaterThan(factValue, jsonValue, false);
  });

  engine.addOperator('anyDateGreaterThanInclusive', (factValue: any, jsonValue: any) => {
    return anyDateGreaterThan(factValue, jsonValue, true);
  });

  engine.addOperator('allDateGreaterThan', (factValue: any, jsonValue: any) => {
    return allDateGreaterThan(factValue, jsonValue, false);
  });

  engine.addOperator('allDateGreaterThanInclusive', (factValue: any, jsonValue: any) => {
    return allDateGreaterThan(factValue, jsonValue, true);
  });

  engine.addOperator('dateLessThan', (factValue: any, jsonValue: any) => {
    return dateLessThan(factValue, jsonValue, false);
  });

  engine.addOperator('dateLessThanInclusive', (factValue: any, jsonValue: any) => {
    return dateLessThan(factValue, jsonValue, true);
  });

  engine.addOperator('anyDateLessThan', (factValue: any, jsonValue: any) => {
    return anyDateLessThan(factValue, jsonValue, false);
  });

  engine.addOperator('anyDateLessThanInclusive', (factValue: any, jsonValue: any) => {
    return anyDateLessThan(factValue, jsonValue, true);
  });

  engine.addOperator('allDateLessThan', (factValue: any, jsonValue: any) => {
    return allDateLessThan(factValue, jsonValue, false);
  });

  engine.addOperator('allDateLessThanInclusive', (factValue: any, jsonValue: any) => {
    return allDateLessThan(factValue, jsonValue, true);
  });

  // Misc
  engine.addOperator('isUndefined', (factValue: any, jsonValue: any) => {
    return isUndefined(factValue, jsonValue);
  });

  engine.addOperator('notUndefined', (factValue: any, jsonValue: any) => {
    return !isUndefined(factValue, jsonValue);
  });

  engine.addOperator('validCheckDigit', (factValue: any, jsonValue: any) => {
    return validCheckDigit(factValue, jsonValue);
  });
}

// Custom Operator Functions
export const arrayLengthGreaterThan = (array: any, length: any) => {
  if (!array) {
    return false;
  }

  return array.length > length;
}

export const arrayLengthGreaterThanEqual = (array: any, length: any) => {
  if (!array) {
    return false;
  }

  return array.length >= length;
}

export const arrayLengthEquals = (array: any, length: any) => {
  if (!array) {
    return false;
  }

  return array.length == length;
}

export const arrayLengthLessThanEqual = (array: any, length: any) => {
  if (!array) {
    return false;
  }

  return array.length <= length;
}

export const arrayLengthLessThan = (array: any, length: any) => {
  if (!array) {
    return false;
  }

  return array.length < length;
}

export const containsMultiple = (factValue: any, jsonValue: any) => {
  let i = 0;
  let count = 0;

  if (!factValue) {
    return false;
  }

  while (i < factValue.length && count < 2) {
    if (factValue[i] === jsonValue) {
      count++;
    }

    i++;
  }

  return count > 1;
}

export const containsAtLeastOne = (factValue: any, valueParams: any) => {
  if (!factValue || !valueParams || !valueParams.value) {
    return false;
  }

  let containsAtLeastOne;
  const value = valueParams.value;

  if (Array.isArray(value)) {
    containsAtLeastOne = value.some((r) => factValue.includes(r));
  } else {
    containsAtLeastOne = factValue.includes(value);
  }

  if (valueParams.negate) {
    return !containsAtLeastOne;
  } else {
    return containsAtLeastOne;
  }
}

export const startsWith = (stringToValidate: any, stringToCheckFor: any) => {
  if (!stringToValidate || !stringToValidate.length) {
    return false;
  }

  return stringToValidate.toLowerCase().startsWith(stringToCheckFor.toLowerCase());
}

export const doesNotStartWith = (stringToValidate: any, stringToCheckFor: any) => {
  if (!stringToValidate || !stringToValidate.length) {
    return false;
  }

  return !stringToValidate.toLowerCase().startsWith(stringToCheckFor.toLowerCase());
}

export const oneStartsWith = (factValue: any, jsonValue: any) => {
  let i = 0;

  if (!factValue || !factValue.length) {
    return false;
  }

  while (i < factValue.length) {
    if (factValue[i].toLowerCase().startsWith(jsonValue.toLowerCase())) {
      return true;
    }

    i++;
  }

  return false;
}

export const oneDoesNotStartWith = (factValue: any, jsonValue: any) => {
  let i = 0;

  if (!factValue || !factValue.length) {
    return false;
  }

  while (i < factValue.length) {
    if (!factValue[i].toLowerCase().startsWith(jsonValue.toLowerCase())) {
      return true;
    }

    i++;
  }

  return false;
}

export const noneStartsWith = (factValue: any, jsonValue: any) => {
  let i = 0;

  if (!factValue || !factValue.length) {
    return false;
  }

  while (i < factValue.length) {
    if (factValue[i].toLowerCase().startsWith(jsonValue.toLowerCase())) {
      return false;
    }

    i++;
  }

  return true;
}

export const patternMatches = (factValue: any, jsonValue: any) => {
  if (!factValue || !factValue.length) {
    return false;
  }

  const re = new RegExp(jsonValue);

  return re.test(factValue);
}

export const patternDoesNotMatch = (factValue: any, jsonValue: any) => {
  return !patternMatches(factValue, jsonValue);
}

export const stringLengthEqual = (factValue: any, jsonValue: any) => {
  if (factValue == null) {
    return jsonValue == 0;
  }

  return factValue.length === jsonValue;
}

export const stringLengthNotEqual = (factValue: any, jsonValue: any) => {
  return !stringLengthEqual(factValue, jsonValue);
}

export const dateGreaterThan = (factValue: any, jsonValue: any, isInclusive: boolean) => {
  if (!factValue || !factValue.length || !jsonValue || !jsonValue.length) {
    return false;
  }

  const jsonValueDate = new Date(jsonValue);
  const factValueDate = new Date(factValue);

  if (isInclusive) {
    return factValueDate >= jsonValueDate;
  }

  return factValueDate > jsonValueDate;
}

export const anyDateGreaterThan = (factValue: any, jsonValue: any, isInclusive: boolean) => {
  let results = compareDates(factValue, jsonValue);

  if (isInclusive) {
    return (results.equal > 0 || results.greaterThan > 0);
  }

  return (results.greaterThan > 0);
}

export const allDateGreaterThan = (factValue: any, jsonValue: any, isInclusive: boolean) => {
  let results = compareDates(factValue, jsonValue);

  if (isInclusive) {
    return (results.lessThan == 0);
  }

  return (results.lessThan == 0 && results.equal == 0);
}

export const dateLessThan = (factValue: any, jsonValue: any, isInclusive: boolean) => {
  if (!factValue || !factValue.length || !jsonValue || !jsonValue.length) {
    return false;
  }

  const jsonValueDate = new Date(jsonValue);
  const factValueDate = new Date(factValue);

  if (isInclusive) {
    return factValueDate <= jsonValueDate;
  }

  return factValueDate < jsonValueDate;
}

export const anyDateLessThan = (factValue: any, jsonValue: any, isInclusive: boolean) => {
  let results = compareDates(factValue, jsonValue);

  if (isInclusive) {
    return ((results.lessThan + results.equal) > 0);
  }

  return (results.lessThan > 0);
}

export const allDateLessThan = (factValue: any, jsonValue: any, isInclusive: boolean) => {
  let results = compareDates(factValue, jsonValue);

  if (isInclusive) {
    return (results.greaterThan == 0);
  }

  return (results.equal == 0 && results.greaterThan == 0);
}

export const compareDates = (facts: any, date: any) => {
  const results = {
    lessThan: 0,
    equal: 0,
    greaterThan: 0
  };

  const undefinedResults = {
    lessThan: -1,
    equal: -1,
    greaterThan: -1
  };

  if (!date) {
    return undefinedResults;
  }

  if (!(Array.isArray(facts))) {
    facts = [facts];
  }

  date = new Date(date).getTime();
  facts.forEach((fact: any) => {
    fact = new Date(fact).getTime();

    if (fact < date) {
      results.lessThan++;
    } else if (fact == date) {
      results.equal++;
    } else if (fact > date) {
      results.greaterThan++;
    }
  });

  return results;
}

export const isUndefined = (factValue: any, jsonValue: any) => {
  return factValue === undefined;
}

export const validCheckDigit = (factValue: any, jsonValue: any) => {
  let i = 0;
  let checkSum = 0;

  if (!factValue) {
    return false;
  }

  factValue = factValue.toUpperCase();

  while (i < factValue.length - 1) {
    if (factValue[i] >= '0' && factValue[i] <= '9') {
      checkSum += (factValue.charCodeAt(i) - 48) * (7 - i);
    } else {
      checkSum += (factValue.charCodeAt(i) - 64) * (7 - i);
    }

    i++;
  }

  let checkValue = 23 - (checkSum % 23);

  return checkDigits[checkValue] != factValue[6];
}
