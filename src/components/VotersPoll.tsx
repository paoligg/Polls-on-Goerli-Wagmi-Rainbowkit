'use client'

import { useState, useEffect } from 'react'
import { type Address, useContractRead } from 'wagmi'
import ReadPoll from './ReadContract'
import { wagmiContractConfig } from './contracts'
import { useAccount, useEnsName } from 'wagmi';

export function VotersPoll() {
  return (
    <div>
      <div>
        <ReadPolls />
      </div>
    </div>
  )
}       


function ReadPolls() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: polls } = useContractRead({
    ...wagmiContractConfig,
    functionName: 'getPolls',
  });

  polls ? console.log(polls[0].voters) : console.log("no polls");

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Your Polls:</h2>
      {polls &&
        polls.length > 0 &&
        polls.map((poll: any, index: number) => {
          if (poll.voters.includes(address)) {
            return (
              <div key={index}>
                <ReadPoll index={index} />
                <br />
              </div>
            );
          }
          return null;
        })}
    </div>
  );
}

