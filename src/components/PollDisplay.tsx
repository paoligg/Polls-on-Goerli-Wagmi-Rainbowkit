'use client'

import { useState } from 'react';
import { VotersPoll } from './VotersPoll';
import { ReadContracts } from './ReadContracts';


export function PollDisplay() {
  return (
    <div>
      <div>
        <DisplayPolls />
      </div>
    </div>
  )
}       

function DisplayPolls() {
  const [showVotersPoll, setShowVotersPoll] = useState(false);

  function handleAllVotes() {
    setShowVotersPoll(false);
  }

  function handleYourVotes() {
    setShowVotersPoll(true);
  }

  return (
    <div>
      <button
        className={`bg-${showVotersPoll ? 'gray' : 'green'}-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded`}
        onClick={handleAllVotes}
      >
        All Polls
      </button>
      <button
        className={`bg-${showVotersPoll ? 'green' : 'gray'}-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded`}
        onClick={handleYourVotes}
      >
        Your Polls
      </button>

      <br />
      <br />
      {showVotersPoll ? <VotersPoll /> : <ReadContracts />}
    </div>
  );
}

