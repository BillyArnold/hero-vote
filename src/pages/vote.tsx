import type { NextPage } from "next";
import Head from "next/head";
import { FC, useEffect, useState } from "react";
import { getVotingOptions } from "../utils/getRandomHero";
import { useQuery, QueryClient, useQueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getGetHerobyID } from "../services/getHerobyID";
import axios from "axios";
import Image from "next/image";
import { Dna } from  'react-loader-spinner'

interface Character {
  character: number | undefined
}

const queryClient = new QueryClient()


const Vote: NextPage = () => {
  const [firstHero, setFirstHero] = useState<number | undefined>();
  const [secondHero, setSecondHero] = useState<number | undefined>();
  

  useEffect(() => {
    const [first, second] = getVotingOptions();
    setFirstHero(first);
    setSecondHero(second); 
  }, []);

  return (
    <>
     <QueryClientProvider client={queryClient}>
      <Head>
        <title>The Hero Vote - Voting</title>
        <meta name="description" content="Vote for your favourite hero" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="vote-contain fixed h-screen w-full flex flex-col md:flex-row">
      {firstHero && <TopVote character={firstHero} />}
      {secondHero && <BottomVote character={secondHero} />}
      </div> 
      </QueryClientProvider>
    </>
  );
};

const TopVote:FC<Character> = (props: Character) => {
  
  const { isLoading, error, data } = useQuery(['heroData'], () => getGetHerobyID(props.character));
  
  
  if (isLoading) {
    return(
      <div className="h-[100vh] w-full md:w-[50%] relative">  
                
                <div className="cover-bottom-left h-full w-full top-0 left-0 bottom-0 right-0">
                  <div className="absolute bottom-4 left-4">
                <Dna
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="dna-loading"
                  wrapperClass="dna-wrapper"
                />
                </div>
                </div>  
            </div>
    )
  }

  if (error) { 
    return "An error has occurred: " + error.message;
  }

  if(data){
  
    return(
      <div className="h-[100vh] w-full md:w-[50%] relative">  
                <img src={data.images.lg} className="absolute object-cover h-full w-full  top-0 left-0 bottom-0 right-0 z-[-1]"/>
                <div className="cover-bottom-left h-full w-full top-0 left-0 bottom-0 right-0"></div>  
                <h2 className="text-xl md:text-3xl leading-normal font-bold text-gray-700 absolute bottom-4 left-4">{data.name}</h2>
            </div>
    )
  }
}

const BottomVote:FC<Character> = (props: Character) => {
  const { isLoading, error, data } = useQuery(['heroDataSecond'], () => getGetHerobyID(props.character));
  
  
  if (isLoading) {
    return(
      <div className="h-[100vh] w-full md:w-[50%] relative">  
                
                <div className="cover-bottom-left h-full w-full top-0 left-0 bottom-0 right-0">
                  <div className="absolute top-4 right-4">
                <Dna
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="dna-loading"
                  wrapperClass="dna-wrapper"
                />
                </div>
                </div>  
            </div>
    )
  }

  if (error) { 
    return "An error has occurred: " + error.message;
  }

  if(data){

    return(
      <div className="h-[100vh]  w-full md:w-[50%]  relative ">
                <img src={data.images.lg} className="absolute object-cover h-full w-full  top-0 left-0 bottom-0 right-0 z-[-1]"/>
                <div className="cover-top-right h-full w-full top-0 left-0 bottom-0 right-0"></div> 
                <h2 className="text-xl md:text-3xl leading-normal font-bold text-gray-700 absolute top-4 right-4">{data.name}</h2>
            </div>
    )
  }
}

export default Vote;
