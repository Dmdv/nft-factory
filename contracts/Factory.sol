// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./FarawayNFT.sol";
import "./IFactory.sol";

contract Factory is IFactory, Ownable {
    // EVENTS
    event TokenCreated(address indexed owner, address indexed tokenAddress, string name, string indexed symbol);

    // FIELDS
    address[] public tokenList;
    mapping(address => bool) public tokenMapping;

    /**
     * @inheritdoc IFactory
     */
    function create(string calldata name, string calldata symbol)
    external
    returns (address) {

        // create nft
        IERC721 nft = new FarawayNFT(name, symbol);
        address addr = address(nft);

        // accounting
        tokenList.push(addr);
        tokenMapping[addr] = true;

        // output
        emit TokenCreated(msg.sender, addr, name, symbol);

        return addr;
    }

    /**
     * @return total number of tokens created by the factory
     */
    function count() public view returns (uint256) {
        return tokenList.length;
    }
}
