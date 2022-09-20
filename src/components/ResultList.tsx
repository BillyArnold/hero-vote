import { FC } from "react";
import Result from "./Result";
import { useQuery } from "@tanstack/react-query";
import getVotes from "../services/prisma/getVotes";
import { Hero } from "./Result";
import { Dna } from "react-loader-spinner";

const ResultList: FC = () => {
  const { isLoading, error, data } = useQuery(["voteData"], () => getVotes());

  if (isLoading) {
    return (
      <Dna
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper"
      />
    );
  }

  if (error) {
    <p>Sorry, the data could not be loaded.</p>;
  }

  return (
    <>
      {data?.map((character: Hero["character"]) => (
        <Result key={character.id} character={character} />
      ))}
    </>
  );
};

export default ResultList;
