import { FC } from "react";

export interface Hero {
  character: {
    id: number;
    image: string | undefined;
    name: string | undefined;
    winPercent: number;
  };
}

const Result: FC<Hero> = (hero) => {
  return (
    <>
      <div className="w-full shadow-lg bg-white rounded-lg p-4 flex items-center mb-4">
        <div className="rounded-full h-20 w-20 bg-indigo-200 mr-4 shrink-0 relative">
          <img
            alt={hero.character.name}
            src={hero.character.image}
            className="rounded-full absolute w-full h-full left-0 top-0 object-cover"
          />
        </div>

        <p className="grow text-left font-bold text-gray-700 pr-4">
          {hero.character.name}
        </p>

        <p className="font-bold text-gray-700">
          {hero.character.winPercent.toFixed(2)}%
        </p>
      </div>
    </>
  );
};

export default Result;
