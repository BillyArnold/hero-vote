import type { NextPage } from "next";
import Head from "next/head";
import { FC, useEffect, useState } from "react";
import { getVotingOptions } from "../utils/getRandomHero";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { getGetHerobyID } from "../services/getHerobyID";
import { Dna } from "react-loader-spinner";
import { useRouter } from "next/router";
import addVoteFor from "../services/prisma/AddVoteFor";
import addVoteAgainst from "../services/prisma/AddVoteAgainst";
import Link from "next/link";
import VoteSelect from "../components/VoteSelect";

export interface Character {
  character?: number;
  opponent?: number;
  onVoteHandler(): void;
}

const queryClient = new QueryClient();

const Vote: NextPage = () => {
  const [firstHero, setFirstHero] = useState<number>(0);
  const [secondHero, setSecondHero] = useState<number>(0);

  const resetVotingOptions = () => {
    const [first, second] = getVotingOptions();
    setFirstHero(first);
    setSecondHero(second);
  };

  useEffect(() => {
    resetVotingOptions();
  }, []);

  const onVoteHandler = () => {
    resetVotingOptions();
  };

  return (
    <>
      <Head>
        <title>The Hero Vote - Voting</title>
        <meta name="description" content="Vote for your favourite hero" />
        <link rel="icon" href="/herofavicon.png" />
      </Head>

      <div className="vote-contain fixed h-screen w-full flex flex-col md:flex-row">
        <div className="fixed z-10 bottom-4 md:bottom-10 right-4 md:right-10">
          <Link href="/results">
            <a className="rounded-2xl font-extrabold bg-gray-700 text-purple-300 text-md md:text-md border-purple-300 border-2 p-2 md:p-3">
              RESULTS
            </a>
          </Link>
        </div>
        {firstHero && (
          <VoteSelect
            character={firstHero}
            opponent={secondHero}
            onVoteHandler={onVoteHandler}
          />
        )}
        {secondHero && (
          <VoteSelect
            character={secondHero}
            opponent={firstHero}
            onVoteHandler={onVoteHandler}
          />
        )}
      </div>
    </>
  );
};

export default Vote;
