import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import Web3 from "web3";
import ABI from "../../ABI/ABI.json";
import { toast } from "react-hot-toast";

const WalletContext = createContext();

const Wallet = ({ children }) => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
    const init = async () => {
      if(window.ethereum){
        //For ganache
        // const web3 = new Web3("HTTP://127.0.0.1:7545");

        //For Metamask
        const web3 = new Web3(window.ethereum)
        const accounts = await window.ethereum.request({
          method:"eth_requestAccounts"
        })
        const contractAddress = "0xBb4629df0A6735be6e75786915794B93008CD289";
        //to create contract instance - abi and contract address
        const contract = new web3.eth.Contract(ABI, contractAddress);
        setState({ web3: web3, contract: contract });
      }else{
        toast.error("Metamask not installed")
      }
    };

  return (
    <>
    
    <WalletContext.Provider value={state}>{children}</WalletContext.Provider>
    <button onClick={init}>Connect Metamask</button>
    </>
  );
};

Wallet.propTypes = {
  children: PropTypes.node.isRequired,
};
export { WalletContext };
export default Wallet;
