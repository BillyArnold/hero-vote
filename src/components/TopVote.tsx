import { FC } from "react";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { getGetHerobyID } from "../services/getHerobyID";
import { Dna } from "react-loader-spinner";
import { useRouter } from "next/router";
import addVoteFor from "../services/prisma/AddVoteFor";
import addVoteAgainst from "../services/prisma/AddVoteAgainst";
import { Character } from "../pages/vote";

const queryClient = new QueryClient();

const TopVote: FC<Character> = (props) => {
  const { isLoading, error, data } = useQuery<
    any,
    Error,
    any,
    (number | undefined)[]
  >([props.character], () => getGetHerobyID(props.character));
  const {
    isLoading: isLoadingOpponent,
    error: isErrorOpponent,
    data: dataOpponent,
  } = useQuery<any, Error, any, (number | undefined)[]>([props.opponent], () =>
    getGetHerobyID(props.opponent)
  );

  const router = useRouter();

  const handleVote = () => {
    const encodedName = encodeURIComponent(data.name);
    const encodedImage = encodeURIComponent(data.images.lg);
    addVoteFor(props.character, encodedName, encodedImage);

    if (dataOpponent) {
      const encodedNameO = encodeURIComponent(dataOpponent.name);
      const encodedImageO = encodeURIComponent(dataOpponent.images.lg);

      addVoteAgainst(props.opponent, encodedNameO, encodedImageO);
    }

    queryClient.invalidateQueries([props.character, props.opponent]);
    props.onVoteHandler();
  };

  if (isLoading) {
    return (
      <>
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
      </>
    );
  }

  if (error) {
    return (
      <>
        <p>{error.message}</p>
      </>
    );
  }

  if (data) {
    return (
      <>
        <div
          className="h-[50vh] md:h-[100vh] w-full md:w-[50%] relative hero transition hover:cursor-pointer"
          onClick={handleVote}
        >
          <img
            src={data.images.lg}
            className="absolute object-cover h-full w-full  top-0 left-0 bottom-0 right-0 z-[-1]"
          />
          <div className="cover-bottom-left h-full w-full top-0 left-0 bottom-0 right-0 transition"></div>
          <h2 className="text-xl md:text-3xl leading-normal font-bold text-gray-700 absolute bottom-4 left-4">
            {data.name}
          </h2>
        </div>
      </>
    );
  }

  return null;
};

export default TopVote;
