// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../server/db/client";
import {
  useQuery,
  QueryClient,
  useQueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { getGetHerobyID } from "../../../../services/getHerobyID";

const queryClient = new QueryClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
    const newTotalVotes = existingVotesFor.totalVotes + 1;
    const newWinPercentage = (existingVotesFor.votedFor / newTotalVotes) * 100;

    const updateVotes = await prisma.votes.update({
      where: {
        id: newVid,
      },
      data: {
        totalVotes: newTotalVotes,
        winPercent: newWinPercentage,
      },
    });

    res.status(200).json("updating against vote");
  } else {
    const decodedName = decodeURIComponent(req.query.name);
    const decodedImage = decodeURIComponent(req.query.image);

    //create new vote for id
    const createVotes = await prisma.votes.create({
      data: {
        id: newVid,
        name: decodedName,
        image: decodedImage,
        votedFor: 0,
        totalVotes: 1,
        winPercent: 0,
      },
    });

    res.status(200).json("creating against vote");
  }
};

export default handler;
