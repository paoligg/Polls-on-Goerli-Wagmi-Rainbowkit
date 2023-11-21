'use client'

import { useState, useEffect } from 'react'
import { type Address, useContractRead } from 'wagmi'
import ReadPoll from './ReadContract'
import { wagmiContractConfig } from './contracts'

export function ReadContracts() {
  return (
    <div>
      <div>
        <ReadPolls />
      </div>
    </div>
  )
}       

function ReadPolls() {

  const { data: polls } = useContractRead({
    ...wagmiContractConfig,
    functionName: 'getPolls',
  });

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Get All Polls:</h2>
      {polls && polls.length > 0 && polls.map((poll: any, index: number) => (
        <div key={index}>
          <ReadPoll index={index} />
        </div>
      ))}
    </div>
  );
}

