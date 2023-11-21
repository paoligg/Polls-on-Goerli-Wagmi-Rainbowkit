'use client'
import { useState, useEffect } from 'react';
import { useContractRead, useContractWrite } from 'wagmi';
import { wagmiContractConfig } from './contracts';
import { Vote } from '@thirdweb-dev/sdk';

const getRandomColor = () => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500',
    'bg-lime-500',
    'bg-amber-500',
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export function ReadContract() {
  const [pollnumber, setPollNumber] = useState<number>(0);

  return (
    <div>
      <input
        type="number"
        onChange={(e) => setPollNumber(parseInt(e.target.value))}
        defaultValue={0}
        className="bg-gray-800 text-white p-2 rounded"
      />
      <div className="mt-4">
        <ReadPoll index={pollnumber} />
      </div>
    </div>
  );
}

function ReadPoll({ index }: { index: number }) {
  const { data } = useContractRead({
    ...wagmiContractConfig,
    functionName: 'getPoll',
    args: [BigInt(index)],
  });

  const [poll, setPoll] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [voteCount, setVoteCount] = useState<string[]>([]);
  const [limit, setLimit] = useState<number>(0);

  useEffect(() => {
    if (data && data.length > 0) {
      setPoll(data[0]);
      setStartTime(new Date(Number(data[1]) * 1000).toString());
      setEndTime(new Date(Number(data[2]) * 1000).toString());
      setLimit(Number(data[2]));
      setOptions(data[5].toString().split(','));
      setVoteCount(data[6].toString().split(','));
    }
  }, [data]);

  const { write, error } = useContractWrite({
    ...wagmiContractConfig,
    functionName: 'vote',
  });

  const handleVote = async (pollid: number, optionIndex: number) => {
    await write({ args: [BigInt(pollid), BigInt(optionIndex)] });
  };

  const isVotingDisabled = () => {
    const now = new Date().getTime() / 1000;
    return now > limit;
  };

  return (
    <div className="mt-8 bg-gray-800 text-white p-4 rounded ">
      {data ? (
        <div>
          <h2 className="text-2xl font-bold mb-4"> {poll}</h2>
          <p>End Time: {endTime}</p>
          <div className="mt-4">
            {options.map((option, optionindex) => (
              <div key={optionindex} className={`mb-2 p-2 rounded`}>
                {option} : {voteCount[optionindex]}
                <button
                  onClick={async () => await handleVote(index, optionindex)}
                  disabled={isVotingDisabled()}
                  className={!isVotingDisabled()? (`ml-2 ${getRandomColor()} text-white px-3 py-1 rounded`): (`ml-2 bg-gray-500 text-white px-3 py-1 rounded`)}
                >
                  Vote
                </button>
              </div>
            ))}
          </div>
          {error ? (
            <p className="text-red-500">You have already voted on this poll</p>
          ) : null}
          {isVotingDisabled() ? (
            <p className="text-gray-500">Poll has ended</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default ReadPoll;