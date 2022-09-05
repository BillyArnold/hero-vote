// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import {
  useQuery,
  QueryClient,
  useQueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const Votes: object | null = await prisma.votes.findMany({
    orderBy: [
      {
        winPercent: "desc",
      },
      {
        totalVotes: "desc",
      },
    ],
  });

  if (Votes) {
    res.status(200).json(Votes);
  } else {
    res.status(500).send({ error: "failed to fetch data" });
  }
};

export default handler;
