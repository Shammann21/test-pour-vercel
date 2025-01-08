// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestUSDC is ERC20, Ownable {
    uint8 private _decimals = 6; // USDC utilise 6 décimales

    constructor() 
        ERC20("Test USDC", "tUSDC") 
        Ownable(msg.sender)
    {
        // Mint 10 millions USDC to owner pour les tests
        _mint(msg.sender, 10_000_000 * 10**decimals());
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

    // Fonction pour minter plus de tokens si nécessaire
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Fonction pour que n'importe qui puisse obtenir des tokens de test
    function faucet() public {
        // Donne 1000 USDC à celui qui appelle la fonction
        _mint(msg.sender, 1000 * 10**decimals());
    }
} 