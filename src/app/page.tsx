import { ConnectButton } from '../components/ConnectButton';
import { Connected } from '../components/Connected';
import { ReadContract } from '../components/ReadContract';
import { CreateVote } from '../components/CreateVote';
import { PollDisplay } from '../components/PollDisplay';
import React from 'react';

const Page: React.FC = () =>{
  return (
    <div className="bg-black text-white p-8">
      <h1 className="text-6xl font-bold mb-4 ">Let's Poll</h1>

      <ConnectButton />

      <Connected>

      <hr className="my-8 border-green-400 border-opacity-100" />
      <div className="flex flex-col md:flex-row justify-between">
        {/* Create Poll */}
        <div className="mb-4 md:w-1/2 md:flex-grow md:flex-shrink-0 md:flex md:flex-col md:items-center">
          <h2 className="text-3xl font-bold mb-2 md:items-center">Create Poll :</h2>
          <CreateVote />
        </div>

        {/* Get Poll N°? */}
        <div className="mb-4 md:w-1/2 md:flex-grow md:flex-shrink-0 md:flex md:flex-col md:items-center">
          <h2 className="text-3xl font-bold mb-2">Get Poll N° ?</h2>
          <ReadContract />
        </div>
      </div>

      <hr className="my-8 border-green-400 border-opacity-100" />

        {/* Poll Display */}
        <div className="mb-4">
          <PollDisplay />
        </div>
      </Connected>
    </div>
  );
}

export default Page;
