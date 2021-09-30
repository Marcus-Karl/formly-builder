import { Engine, Rule, RuleProperties } from 'json-rules-engine';
import { getEngine } from './default-engine.rules';
import { marker as translateMarker } from '@biesbjerg/ngx-translate-extract-marker';

export const INVALID_BUSINESS_RULE = translateMarker('One or more rules are invalid');

export const addDefaultFacts = (engine: Engine) => {
  engine.addFact('containsAtLeastOneParams', (params, almanac) => {
    return {
      value: params.value,
      negate: params.negate
    };
  });

  engine.addFact('currentDate', (params, almanac) => {
    return new Date();
  });

  engine.addFact('calculateDate', (params, almanac) => {
    return almanac.factValue(params.fact, {}, params.path)
      .then((factValue) => {
        let retValue = addPeriod({
          baseDate: factValue,
          period: params.period,
          amount: params.amount
        });

        return retValue;
      });
  });

  engine.addFact('loop', async (params, almanac) => {
    const results: any[] = [];
    const loopEngine = getEngine();
    const factArray = await almanac.factValue(params.fact, {}, params.path) as any;

    if (!factArray) {
      return false;
    }

    await Promise.all(factArray.map(async (fact: any) => {
      addRulesToRulesEngine(loopEngine, params.rules);
      const iterationResult = await loopEngine.run(fact);
      results.push(iterationResult.events && iterationResult.events.length > 0);
    }));

    return results;
  });

  engine.addFact('increment', async (params, almanac) => {
    const factValue = await almanac.factValue(params.fact, {}, params.path) as any;

    return parseInt(factValue, 10) + parseInt(params.incrementAmount, 10);
  });
}

export const addPeriod = (params: any) => {
  const dt = new Date(params.baseDate);
  let year = dt.getFullYear();
  let month = dt.getMonth();
  let day = dt.getDate();

  switch (params.period) {
    case 'years':
      year = year + params.amount;
      break;
    case 'months':
      month = month + params.amount;
      break;
    case 'days':
      day = day + params.amount;
  }

  return new Date(year, month, day);
}

export const addRulesToRulesEngine = (engine: Engine, rules: RuleProperties[] | string[]) => {
  let success = true;

  rules.map((json: RuleProperties | string) => {
    try {
      const rule = new Rule(json);
      engine.addRule(rule);
    } catch (err: any) {
      console.log(err, err.stack);
      success = false;
    }
  });

  if (!success || rules.length < 1) {
    return INVALID_BUSINESS_RULE;
  }

  return;
}
