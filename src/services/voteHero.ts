import { getVotingOptions } from "../utils/getRandomHero";


export const voteHero = (heroId : number) => { 

    
    //return new voting options
    const [first, second] = getVotingOptions();

    return [first, second];
}