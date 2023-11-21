'use client'
import { useState } from 'react';
import { useContractWrite } from 'wagmi';
import { wagmiContractConfig } from './contracts';

export function CreateVote() {
  return (
      <div>
        <ReadPolls />
      </div>
  );
}

function ReadPolls() {
  const { write } = useContractWrite({
    ...wagmiContractConfig,
    functionName: 'createNewPoll',
  });

  const [polldesc, setPolldesc] = useState('');
  const [endTimestamp, setEndTimestamp] = useState(0);
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [options, setOptions] = useState<string[]>([]);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCreateVote = async (
    polldesc: string,
    endTimestamp: number,
    optionIndex: string[]
  ) => {
    const now = new Date();
    const end = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + day,
      now.getHours() + hour,
      now.getMinutes() + minute
    );
    await setEndTimestamp(Math.floor(end.getTime() / 1000));
    await write({ args: [polldesc, BigInt(endTimestamp), optionIndex] });
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDay(Number(e.target.value));
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHour(Number(e.target.value));
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinute(Number(e.target.value));
  };

  return (
    <div>
      <label className="mb-4 block">
        Poll Description:
        <input
          type="text"
          value={polldesc}
          onChange={(e) => setPolldesc(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded"
        />
      </label>
      <label className="mb-4 block">
        End Time:
        <input
          type="number"
          value={day}
          onChange={handleDayChange}
          className="bg-gray-800 text-white p-2 rounded mr-2"
        />
        days
        <input
          type="number"
          value={hour}
          onChange={handleHourChange}
          className="bg-gray-800 text-white p-2 rounded mr-2"
        />
        hours
        <input
          type="number"
          value={minute}
          onChange={handleMinuteChange}
          className="bg-gray-800 text-white p-2 rounded"
        />
        minutes
      </label>
      <label className="mb-4 block">
        Options:
        <ul>
          {options.map((option, index) => (
            <li key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="bg-gray-800 text-white p-2 rounded mr-2"
              />
            </li>
          ))}
        </ul>
        <button
          onClick={handleAddOption}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add Option
        </button>
      </label>
      <button
        onClick={async () => handleCreateVote(polldesc, endTimestamp, options)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Create Vote
      </button>
    </div>
  );
}
