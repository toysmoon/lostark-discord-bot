import Character from './Character';

type Todo = {
  [index: string]: boolean;
  chaos: boolean;
  gardian: boolean;
  abyss: boolean;
  argos: boolean;
  commander: boolean;
};

export default function todoChecker(c: Character): Todo {
  const day = getBaseDay();
  const week = getWendsday();

  return {
    chaos: day > c.chaos,
    gardian: day > c.gardian,
    abyss: week > c.abyss,
    argos: week > c.argos,
    commander: week > c.commander,
  };
}

export function todoCounter(c: Character) {
  const todo = todoChecker(c);
  let count = 0;
  for (let key in todo) {
    if (todo[key]) {
      count++;
    }
  }

  return count;
}

function getBaseDay() {
  const today = new Date();
  const result = new Date(0);
  result.setFullYear(today.getFullYear());
  result.setMonth(today.getMonth());
  result.setDate(today.getDate());
  result.setHours(6);

  return result;
}

function getWendsday() {
  const today = new Date();
  const result = getBaseDay();
  result.setHours(10);

  if (today.getDay() === 3 && today.getHours() > 6) {
    return result;
  }

  const day = today.getDay();
  result.setDate(result.getDate() - day + (day > 3 ? 3 : -4));

  return result;
}
