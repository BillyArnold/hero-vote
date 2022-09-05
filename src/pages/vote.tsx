import type { NextPage } from "next";
import Head from "next/head";
import { FC, useEffect, useState } from "react";
import { getVotingOptions } from "../utils/getRandomHero";
import { useQuery, QueryClient } from '@tanstack/react-query';
import { getGetHerobyID } from "../services/getHerobyID";
import axios from "axios";
import Image from "next/image";
import { Dna } from  'react-loader-spinner'
import { useRouter } from "next/router";
import addVoteFor from '../services/prisma/AddVoteFor';
import addVoteAgainst from '../services/prisma/AddVoteAgainst';
import Link from 'next/link';

interface Character {
  character: number | undefined,
  opponent: number | undefined,
}


const queryClient = new QueryClient()

const Vote: NextPage = () => {
  const [firstHero, setFirstHero] = useState<number | undefined>();
  const [secondHero, setSecondHero] = useState<number | undefined>();

  const resetVotingOptions = () => {
    const [first, second] = getVotingOptions();
    setFirstHero(first);
    setSecondHero(second); 
  }

  useEffect(() => {
    resetVotingOptions();
  }, []);

  const onVoteHandler = () => {
    console.log("voteHandled");
    resetVotingOptions();
    console.log("newFirst", firstHero);
    console.log("newSecond", secondHero);
  }
  

  return (
    <>
      <Head>
        <title>The Hero Vote - Voting</title>
        <meta name="description" content="Vote for your favourite hero" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="vote-contain fixed h-screen w-full flex flex-col md:flex-row">
        <div className="fixed z-10 bottom-4 md:bottom-10 right-4 md:right-10">
          <Link href="/results"><a className="rounded-2xl font-extrabold bg-gray-700 text-purple-300 text-md md:text-md border-purple-300 border-2 p-2 md:p-3">RESULTS</a></Link>
        </div>
      {firstHero && <TopVote character={firstHero} opponent={secondHero} onVoteHandler={onVoteHandler}/>}
      {secondHero && <BottomVote character={secondHero} opponent={firstHero} onVoteHandler={onVoteHandler}/>}
      </div> 
    </>
  );
};






const TopVote:FC<Character> = (props: Character) => {
  
  const { isLoading, error, data } = useQuery([props.character], () => getGetHerobyID(props.character));
  const { isLoading : isLoadingOpponent, error : isErrorOpponent, data : dataOpponent } = useQuery([props.opponent], () => getGetHerobyID(props.opponent));

  const router = useRouter();
  
  const handleVote = () => {
    
    const encodedName =  encodeURIComponent(data.name);
    const encodedImage =  encodeURIComponent(data.images.lg);
    addVoteFor(props.character, encodedName, encodedImage);

    if(dataOpponent){
      const encodedNameO =  encodeURIComponent(dataOpponent.name);
      const encodedImageO =  encodeURIComponent(dataOpponent.images.lg);

      addVoteAgainst(props.opponent, encodedNameO, encodedImageO );
    }
    
    queryClient.invalidateQueries([props.character, props.opponent]);
    //router.reload();
    props.onVoteHandler();

    
  }
  
  if (isLoading) {
    return(
      <div className="h-[100vh] w-full md:w-[50%] relative" >  
                
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
      <div className="h-[100vh] w-full md:w-[50%] relative hero transition hover:cursor-pointer" onClick={handleVote}>  
                <img src={data.images.lg} className="absolute object-cover h-full w-full  top-0 left-0 bottom-0 right-0 z-[-1]"/>
                <div className="cover-bottom-left h-full w-full top-0 left-0 bottom-0 right-0 transition"></div>  
                <h2 className="text-xl md:text-3xl leading-normal font-bold text-gray-700 absolute bottom-4 left-4">{data.name}</h2>
            </div>
    )
  }
}










const BottomVote:FC<Character> = (props: Character) => {
  const { isLoading, error, data } = useQuery([props.character], () => getGetHerobyID(props.character));
  const { isLoading : isLoadingOpponent, error : isErrorOpponent, data : dataOpponent } = useQuery([props.opponent], () => getGetHerobyID(props.opponent));

  const handleVote = () => {

    const encodedName =  encodeURIComponent(data.name);
    const encodedImage =  encodeURIComponent(data.images.lg);
    addVoteFor(props.character, encodedName, encodedImage);

    if(dataOpponent){
      const encodedNameO =  encodeURIComponent(dataOpponent.name);
      const encodedImageO =  encodeURIComponent(dataOpponent.images.lg);

      addVoteAgainst(props.opponent, encodedNameO, encodedImageO );
    }
    
    queryClient.invalidateQueries([props.character, props.opponent]);
    //router.reload();
    props.onVoteHandler();
  }

  const router = useRouter();  
  
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
      <div className="h-[100vh]  w-full md:w-[50%]  relative hero transition hover:cursor-pointer" onClick={handleVote}>
                <img src={data.images.lg} className="absolute object-cover h-full w-full  top-0 left-0 bottom-0 right-0 z-[-1]"/>
                <div className="cover-top-right h-full w-full top-0 left-0 bottom-0 right-0 transition"></div> 
                <h2 className="text-xl md:text-3xl leading-normal font-bold text-gray-700 absolute top-4 right-4">{data.name}</h2>
            </div>
    )
  }
  
}

export default Vote;
