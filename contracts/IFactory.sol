// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

/**
 * @title Factory interface
 *
 * @notice this defines the interface for the main factory contract
 */
interface IFactory {
    /**
     * @notice create a new NFT contract
     * @param name token name
     * @param symbol token symbol
     * @return address of newly created token
     */
    function create(string calldata name, string calldata symbol) external returns (address);
}
