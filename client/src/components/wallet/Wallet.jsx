import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import Web3 from "web3";
import ABI from "../../ABI/ABI.json";

const WalletContext = createContext();

const Wallet = ({ children }) => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });


    const init = async () => {
      //const web3 = new Web3("HTTP://127.0.0.1:7545");
      if(window.ethereum){
        //Metamask is installed
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({
          method:"eth_requestAccounts"
        })
        const contractAddress = "0x7B33d10c9BC67d3B8C0a6a40A66E992e39053b21";
        //to create contract instance - abi and contract address
        const contract = new web3.eth.Contract(ABI, contractAddress);
        setState({ web3: web3, contract: contract });
      }
    };
  return (
    <>
      <WalletContext.Provider value={state}>{children}</WalletContext.Provider>
      <button onClick={init}>Connect Metmask</button>
    </>
  );
};

Wallet.propTypes = {
  children: PropTypes.node.isRequired,
};
export { WalletContext };
export default Wallet;
