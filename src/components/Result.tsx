import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { FC } from 'react';

const Result: FC = () => {
  return (
    <>
      <div className="w-full shadow-lg bg-white rounded-lg p-4 flex items-center">
        <div className="rounded-full h-20 w-20 bg-indigo-200 mr-4 shrink-0"></div>
 
        <p className="grow text-left font-bold text-gray-700 pr-4">Hero Name Hero Name Hero Name</p>

        <p className="font-bold text-gray-700">98%</p>

      </div>
    </>
  );
};

export default Result;
