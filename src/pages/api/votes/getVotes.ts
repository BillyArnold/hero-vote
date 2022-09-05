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
  const Votes = await prisma.votes.findMany({
    orderBy: [
      {
        winPercent: "desc",
      },
      {
        name: "asc",
      },
    ],
  });

  if (Votes) {
    res.status(200).json(Votes);
  } else {
    res.status(500).json("Error with DB request");
  }
};

export default handler;
