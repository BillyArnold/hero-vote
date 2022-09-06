import { getRandomHero } from "../utils/getRandomHero";

export const getGetHerobyID = (heroId: number | undefined) => {
  return fetch(
    "https://akabab.github.io/superhero-api/api/id/" + heroId + ".json"
  ).then((res) => res.json());
};
