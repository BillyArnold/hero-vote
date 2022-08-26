import type { NextPage } from "next";
import Head from "next/head";
import { FC, useEffect, useState, PropsWithChildren } from "react";
import axios from 'axios';

export interface Character {
  character: {
    name: string;
    image: {
      screen_large_url: string;
    };
  }
};

const Vote: NextPage = () => {
  const [firstChar, setFirstChar] = useState({name: "default", image: {screen_large_url: ""}});
  const [secondChar, setSecondChar] = useState({name: "default", image: {screen_large_url: ""}});
  useEffect(() => {
    const firstID = Math.floor(Math.random() * 152988) + 1253;;
    const secondID = Math.floor(Math.random() * 152988) + 1253;

    axios
    .get(`https://comicvine.gamespot.com/api/characters?format=json&api_key=${process.env.NEXT_PUBLIC_API_AUTH}&field_list=name,image,id&filter=id:49707|22634|`, {
      headers:{
      "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then(function(response) {
      setFirstChar(response.data.results[0]);
      setSecondChar(response.data.results[1]);
    })
    .catch(function(error) {
      console.log(error);
    });
    

  }, []);

  return (
    <>
      <Head>
        <title>The Hero Vote - Voting</title>
        <meta name="description" content="Vote for your favourite hero" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="vote-contain fixed h-screen w-full flex flex-col">
          <TopVote character={firstChar} />
          <BottomVote character={secondChar} />
      </div>
    </>
  );
};

const TopVote:FC<Character> = (props: Character) => {
  return(
    <div className={"h-[50vh] w-full relative bg-[url('" + props.character.image.screen_large_url + "')]"}>
              <div className="cover-bottom-left h-full w-full top-0 left-0 bottom-0 right-0"></div> 
              <h2 className="text-xl md:text-3xl leading-normal font-bold text-gray-700 absolute bottom-4 left-4">{props.character.name}</h2>
          </div>
  )
}

const BottomVote:FC<Character> = (props: Character) => {
  return(
    <div className={"h-[50vh] w-full relative bg-[url('" + props.character.image.screen_large_url + "')]"}>
              <div className="cover-bottom-left h-full w-full top-0 left-0 bottom-0 right-0"></div> 
              <h2 className="text-xl md:text-3xl leading-normal font-bold text-gray-700 absolute bottom-4 left-4">{props.character.name}</h2>
          </div>
  )
}

export default Vote;
