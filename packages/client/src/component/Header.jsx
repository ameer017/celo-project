import React, { useContext } from "react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Web3Context } from "../context/Web3Context";

const Header = () => {
  const { account, contract, provider, signer, error } =
    useContext(Web3Context);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        console.log("Requesting accounts...");

        // Create a new Web3 provider using ethers.js
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        // Request access to the user's MetaMask account
        const accounts = await provider.send("eth_requestAccounts", []);
        console.log("Accounts received:", accounts);

        toast.success("Wallet connected");

        // You can use the provider and accounts further in your application logic
        // Example: const signer = provider.getSigner();
      } catch (error) {
        console.error("Error connecting to wallet:", error);
        toast.error("Failed to connect wallet");
      }
    } else {
      toast.warn("Ethereum provider not found. Install MetaMask.");
    }
  };

  return (
    <header className="bg-blue-600 p-4 flex justify-between items-center text-white">
      <Link to="/" className="text-xl font-bold">
        Net Celo
      </Link>
      <nav>
        {account && (
          <ul className="flex space-x-4">
            <li>
              <Link to="/create" className="hover:underline">
                Create Watch Party
              </Link>
            </li>
            <li>
              <Link to="/party-list" className="hover:underline">
                PartyList
              </Link>
            </li>
            <li>
              <Link to="/my-nfts" className="hover:underline">
                My NFTs
              </Link>
            </li>
          </ul>
        )}
      </nav>
      <div>
        <button
          className="px-4 py-2 bg-white text-blue-600 rounded"
          onClick={connectWallet}
        >
          {account ? `Connected: ${account}` : "Connect Wallet"}
        </button>
      </div>
    </header>
  );
};

export default Header;
