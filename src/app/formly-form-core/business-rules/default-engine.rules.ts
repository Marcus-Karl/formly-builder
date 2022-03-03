import { Engine, RuleProperties } from 'json-rules-engine';

import { addDefaultEventHandler } from './default-events.rules';
import { addDefaultFacts, addRulesToRulesEngine } from './default-facts.rules';
import { addDefaultOperators } from './default-operators.rules';

export const evaluateFactsWithEngine = async (engine: Engine, facts: Record<string, any>) => {
  try {
    const result = await engine.run(facts);

    return result;
  } catch (err: any) {
    if (err.code && err.code === 'UNDEFINED_FACT') {
      console.error(`One or more required facts were not provided. ${err}`, err.stack);

      throw err;
    } else {
      throw err;
    }
  }
}

export const getEngineWithRuleset = (rules: RuleProperties[] | string[]) => {
  const engine = getEngine();

  const loadError = addRulesToRulesEngine(engine, rules);

  if (loadError) {
    console.error(loadError);
    throw new Error(loadError);
  }

  return engine;
}

export const getEngine = () => {
  const options = {
    allowUndefinedFacts: true
  };

  const engine = new Engine([], options);

  addDefaultFacts(engine);
  addDefaultOperators(engine);
  addDefaultEventHandler(engine);

  return engine;
}
