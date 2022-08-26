import type { NextPage } from "next";
import Head from "next/head";
import { FC, useEffect, useState } from "react";
import axios from 'axios';

const Vote: NextPage = () => {
  const [votingChar, setVotingChar] = useState({0: {name: "default", image: {screen_large_url: ""}}, 1: {name: "default", image: {screen_large_url: ""}}});
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
      
      console.log(response);

      setVotingChar(response.data.results);
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
          <div className={"h-[50vh] w-full relative bg-[url('https://comicvine.gamespot.com/a/uploads/screen_kubrick/0/9241/522079-0000.jpg')]"}>
              <div className="cover-bottom-left h-full w-full top-0 left-0 bottom-0 right-0"></div> 
              <h2 className="text-xl md:text-3xl leading-normal font-bold text-gray-700 absolute bottom-4 left-4">{votingChar[0].name}</h2>
          </div>
          <TopVote character={votingChar[0]} />
          <BottomVote character={votingChar[1]} />
          <div className={"h-[50vh] w-full relative bg-[url('https://comicvine.gamespot.com/a/uploads/screen_kubrick/0/9241/522079-0000.jpg')]"}>
          <div className="cover-top-right h-full w-full top-0 left-0 bottom-0 right-0"></div>
            <h2 className="text-xl md:text-3xl leading-normal font-bold text-gray-700 absolute top-4 right-4">{votingChar[1].name}</h2>
          </div>
      </div>
    </>
  );
};

const TopVote:FC = (props) => {
  return(
    <div className={"h-[50vh] w-full relative bg-[url('" + props.character.image.screen_large_url + "')]"}>
              <div className="cover-bottom-left h-full w-full top-0 left-0 bottom-0 right-0"></div> 
              <h2 className="text-xl md:text-3xl leading-normal font-bold text-gray-700 absolute bottom-4 left-4">{props.character.name}</h2>
          </div>
  )
}

const BottomVote:FC = (props) => {
  return(
    <div className={"h-[50vh] w-full relative bg-[url('" + props.character.image.screen_large_url + "')]"}>
              <div className="cover-bottom-left h-full w-full top-0 left-0 bottom-0 right-0"></div> 
              <h2 className="text-xl md:text-3xl leading-normal font-bold text-gray-700 absolute bottom-4 left-4">{props.character.name}</h2>
          </div>
  )
}

export default Vote;
