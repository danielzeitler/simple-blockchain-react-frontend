// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StarContract is ERC721Enumerable, Ownable {
    string constant starName = "Star Service";
    string constant starSymbol = "STAR";

    struct Star {
        string name;
    }

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;

    constructor() ERC721(starSymbol, starSymbol) {}

    function createStar(string memory _name, uint256 _tokenId) public {
        tokenIdToStarInfo[_tokenId] = Star({
            name: _name
        });
        uint256 id = totalSupply();
        _safeMint(msg.sender, _tokenId);
        id++;
        setApprovalForAll(address(this), true);
    }

    modifier senderMustBeOwner(uint256 _tokenId) {
        require(ownerOf(_tokenId) == msg.sender, "sender must be owner");
        _;
    }

    function sellStar(uint256 _tokenId, uint256 _price) senderMustBeOwner(_tokenId) public {
        starsForSale[_tokenId] = _price;
    }

    function delistStar(uint256 _tokenId) public {
        starsForSale[_tokenId] = 0;
    }

    function buyStar(uint256 _tokenId) public payable {
        require(starsForSale[_tokenId] > 0, "The star should be up for sale");

        uint256 starCost = starsForSale[_tokenId];
        address starOwner = ownerOf(_tokenId);

        require(msg.value >= starCost, "Not enough ETH send");
     
        ERC721(address(this)).transferFrom(starOwner, msg.sender, _tokenId); // assign contract to make the sale
        starsForSale[_tokenId] = 0; // star shouldn't be for sale anymore 

        payable(starOwner).transfer(starCost);
    }
}