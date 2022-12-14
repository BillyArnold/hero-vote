import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import ResultList from "../components/ResultList";

const Results: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Hero Vote - Results</title>
        <meta name="description" content="Vote for your favourite hero" />
        <link rel="icon" href="/herofavicon.png" />
      </Head>

      <main className="container mx-auto flex flex-col items-center pt-20 md:pt-40 text-center min-h-screen p-4 text-gray-700">
        <h1 className="text-5xl md:text-[5rem] font-extrabold leading-tight text-gray-700 mb-4">
          The <span className="text-purple-300">Best</span> Superhero{" "}
          <span className="text-purple-300">Results</span>
        </h1>
        <p className="text-xl md:text-3xl leading-normal font-bold text-gray-700">
          See the public results of the hero vote with their win percentage
        </p>

        <section className="max-w-full w-[600px] pt-10 md:pt-24">
          <ResultList />
        </section>

        <div className="fixed z-10 bottom-4 md:bottom-10 right-4 md:right-10">
          <Link href="/vote">
            <a className="rounded-2xl font-extrabold bg-gray-700 text-purple-300 text-md md:text-md border-purple-300 border-2 p-2 md:p-3">
              VOTE
            </a>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Results;
