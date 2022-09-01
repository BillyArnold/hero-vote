import { getRandomHero } from "../utils/getRandomHero";

export const getGetHerobyID = (heroId : number = 1) => {
    console.log("ID", heroId);

    /*
    return fetch("https://comicvine.gamespot.com/api/characters?format=json&api_key=" + process.env.NEXT_PUBLIC_API_AUTH + "&field_list=name,image,id&limit=1&filter=id:" + heroId)
    .then(res => res.json());
    */
    
    return fetch("https://akabab.github.io/superhero-api/api/id/" + heroId + ".json")
    .then(res => res.json());
}          