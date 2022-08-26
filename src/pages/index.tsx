import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";


const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Hero Vote</title>
        <meta name="description" content="Vote for your favourite hero" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center text-center min-h-screen p-4 text-gray-700">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold leading-tight text-gray-700 mb-4">
          The <span className="text-purple-300">Best</span> Superhero
        </h1>
        <p className="text-xl md:text-3xl leading-normal font-bold text-gray-700">The definitive vote - Click/tap on your favourite hero</p>
        <p className="text-xl md:text-3xl leading-normal font-bold text-gray-700">Vote 5 times to see the result</p>
        <br/>
        <Link href="/vote"><a className="font-extrabold text-purple-300 text-xl md:text-2xl border-purple-300 border-2 p-2 md:p-4">BEGIN VOTING</a></Link>
      </main>
    </>
  );
};

export default Home;
