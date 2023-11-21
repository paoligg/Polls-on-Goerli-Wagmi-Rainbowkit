// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Poll {
    struct Pool {
        string description;
        uint256 id;
        uint256 startTimestamp;
        uint256 endTimestamp;
        address[] voters;
        address creator;
        string[] options;
        uint256[] voteCount;
        }

    Pool[] public pool;

    function createNewPoll(string memory _description, uint256 _endTimestamp, string[] memory _options) public {
        require(_options.length >= 2, "Poll must have at least two options");
        require(_endTimestamp > block.timestamp, "Poll must end after current time");
        
        uint256 _id=pool.length;
        pool.push(
            Pool({
                description: _description,
                id: _id,
                startTimestamp: block.timestamp,
                endTimestamp: _endTimestamp,
                voters: new address[](0),
                creator: msg.sender,
                options: _options,
                voteCount: new uint256[](_options.length)
            })
        );
        // for (uint i = 0; i < _options.length; i++) {
        //     require(!checkIfElementExists(_id, _options[i]), "Options must be unique");
        // }
        
        // pool.description = _description;
        // pool.id = 0;
        // pool.startTimestamp = block.timestamp;
        // pool.endTimestamp = _endTimestamp;
        // pool.voters = new address[](0);
        // pool.creator = msg.sender;
        // pool.options = _options;

    }

    // function checkIfElementExists(uint256 _id, string memory _element) public view returns (bool) {
    //     bytes32 elementHash = keccak256(abi.encodePacked(_element));
    //     for (uint i = 0; i < pool[_id].options.length; i++) {
    //         bytes32 optionHash = keccak256(abi.encodePacked(pool[_id].options[i]));
    //         if (optionHash == elementHash) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    function hasVoted(uint256 _id, address _voter) public view returns (bool){
        bytes32 elementHash = keccak256(abi.encodePacked(_voter));
        for (uint i = 0; i < pool[_id].voters.length; i++) {
            bytes32 optionHash = keccak256(abi.encodePacked(pool[_id].voters[i]));
            if (optionHash == elementHash) {
                return true;
            }
        }
        return false;
    }

    //  function getIndexOfOption(uint256 _id, string memory _option) internal view returns (uint256) {
    //     bytes32 optionHash = keccak256(abi.encodePacked(_option));
    //     for (uint i = 0; i < pool[_id].options.length; i++) {
    //         bytes32 elementHash = keccak256(abi.encodePacked(pool[_id].options[i]));
    //         if (elementHash == optionHash) {
    //             return i;
    //         }
    //     }
    //     revert("Option not found.");
    // }

    function vote(uint256 _id, uint256 _optionid) public {
        require(!hasVoted(_id, msg.sender), "You have already voted.");
        require(_optionid < pool[_id].options.length, "Invalid option.");
        require(block.timestamp < pool[_id].endTimestamp, "Poll has ended.");
        pool[_id].voters.push(msg.sender);
        pool[_id].voteCount[_optionid]++;
    }

    function getPoll(uint256 _id) public view returns (string memory, uint, uint, address[] memory, address, string[] memory, uint256[] memory) {
        return (pool[_id].description, pool[_id].startTimestamp, pool[_id].endTimestamp, pool[_id].voters, pool[_id].creator, pool[_id].options, pool[_id].voteCount);
    }

    function getPolls () public view returns (Pool[] memory) {
        return pool;
    }

    function getVoteCount(uint256 _id, uint256 _optionid) public view returns (uint256) {
        return pool[_id].voteCount[_optionid];
    }

   
}
