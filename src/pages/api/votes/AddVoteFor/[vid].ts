// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../server/db/client";
import { QueryClient } from "@tanstack/react-query";
import { ExtendedNextApiRequest } from "../AddVoteAgainst/[vid]";

const queryClient = new QueryClient();

const handler = async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
  const { vid } = req.query;
  const newVid = parseInt(vid);
  //check for existing vote for id of FOR vote
  const existingVotesFor = await prisma.votes.findUnique({
    where: {
      id: newVid,
    },
  });

  if (existingVotesFor) {
    //update existing votes

    const newVotesFor = existingVotesFor.votedFor + 1;
    const newTotalVotes = existingVotesFor.totalVotes + 1;
    const newWinPercentage = (newVotesFor / newTotalVotes) * 100;

    const updateVotes = await prisma.votes.update({
      where: {
        id: newVid,
      },
      data: {
        votedFor: newVotesFor,
        totalVotes: newTotalVotes,
        winPercent: newWinPercentage,
      },
    });

    res.status(200).json("updating hero vote");
  } else {
    const decodedName = decodeURIComponent(req.query.name);
    const decodedImage = decodeURIComponent(req.query.image);

    //create new vote for id
    const createVotes = await prisma.votes.create({
      data: {
        id: newVid,
        name: decodedName,
        image: decodedImage,
        votedFor: 1,
        totalVotes: 1,
        winPercent: 100,
      },
    });

    res.status(200).json("adding hero vote");
  }
};

export default handler;
