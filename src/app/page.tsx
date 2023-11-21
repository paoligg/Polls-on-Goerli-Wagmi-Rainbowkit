import { ConnectButton } from '../components/ConnectButton';
import { Connected } from '../components/Connected';
import { ReadContract } from '../components/ReadContract';
import { ReadContracts } from '../components/ReadContracts';
import { CreateVote } from '../components/CreateVote';
import { PollDisplay } from '../components/PollDisplay';

export function Page() {
  return (
    <div className="bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Let's Poll</h1>

      <ConnectButton />

      <Connected>

      <hr className="my-8 border-white" />

        <div className="flex flex-col md:flex-row">
          {/* Create Poll */}
          <div className="mb-4 md:mr-4">
            <h2 className="text-3xl font-bold mb-2">Create Poll:</h2>
            <CreateVote />
          </div>

          {/* Get Poll N°? */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">Get Poll N°?</h2>
            <ReadContract />
          </div>
        </div>

        <hr className="my-8 border-white" />

        {/* Poll Display */}
        <div className="mb-4">
          <PollDisplay />
        </div>
      </Connected>
    </div>
  );
}

export default Page;
