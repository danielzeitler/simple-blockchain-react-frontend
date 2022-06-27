import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import ABI from '../contract/abi.json';

export default function Home() {

  const [input, setInput] = useState({
    stern: '',
    id: ''
  });

  const [wallet, setWallet] = useState("");
  const [contract, setContract] = useState("");
  const [success, setSuccess] = useState("");

  const buyStar = async () => {
    if(wallet === "") return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    const contractWithSigner = await contract.connect(signer);
    const create = await contractWithSigner.createStar(input.stern, input.id);
    console.log(create.hash);

    const tx = await create.wait();
    setSuccess(`Yay, your star is minted. TX Hash: ${create.hash}`);
  }

  const getContract = async () => {
    if(!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      "0xd7f865F9682C775194eEb704352671f5976F6e2b",
      ABI,
      provider
    );
    setContract(contract);
  }

  const getStarById = async () => {
    const star = await contract.tokenIdToStarInfo(420);
    console.log("star", star)
  }

  const connectWallet = async () => {
    if(window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const [accounts] = await provider.send("eth_requestAccounts", []);
      setWallet(accounts);
    }
  }

  const handleChange = (e) => {
    setInput({...input, [e.target.name]: e.target.value});
  }

  const getTotalSupply = async () => {
    const supply = await contract.totalSupply();
    const convertNumber = ethers.BigNumber.from(supply).toNumber();
    console.log(convertNumber);
  }

  // AUFGABE 1: Hole das Symbol vom Contract
  const getSymbol = async () => {
    const symbol = await contract.symbol();
    console.log(symbol);
  }

  useEffect(() => {
    getContract();
  }, [])

  useEffect(() => {
    if(contract) {
      getTotalSupply();
      getSymbol();
      getStarById();
    }
  }, [contract])
  
  return (
    <div className="max-w-5xl mx-auto">
      { wallet !== "" ? 
        (
        <button className="bg-blue-500 mt-3 text-white font-bold py-2 px-4 rounded" type="button">
          {wallet.slice(0, 6)}...{wallet.slice(38, 42)}
        </button>
        )
      : (
        <button onClick={() => connectWallet()} className="bg-blue-500 mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Connect Wallet
        </button>
      )}
      <h1 className="text-center mt-20 text-3xl font-bold">
        Kauf dein Stern &#127775; &#127775; &#127775;
      </h1>
      <p className="text-center mt-4 text-lg font-regular">
        total supply: 
      </p>
      <p className="text-center mt-4 text-lg font-regular">
        {success}
      </p>
      <div className="max-w-5xl mx-auto mt-20">
        <input onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="stern" type="text" placeholder="Dein Stern" />
        <input onChange={handleChange} className="shadow border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="id" type="text" placeholder="Deine ID" />
        <button onClick={() => buyStar()} className="bg-blue-500 mx-auto justify-center flex mt-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          To The Moon &#128640; &#128640; &#128640;
        </button>
      </div>
    </div>
  )
}
