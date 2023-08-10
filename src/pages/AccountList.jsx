import { useEffect,useContext } from "react";
import PropTypes from "prop-types";
import { WalletContext } from "../components/Wallet";
import Navigation from "../components/Navigation";

const AccountList=({saveAccount})=>{
  const {web3}=useContext(WalletContext);
 
  useEffect(() => {
      const allAccounts = async () => {
        var select = document.getElementById("selectNumber");
        
        //array of accounts available in ganache
        var options = await web3.eth.getAccounts();
  
        for (var i = 0; i < options.length; i++) {
          var opt = options[i];
          var el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          select.appendChild(el);
        }
      };
      web3 && allAccounts();
    }, [web3]);
    const selectAccount = async () => {
      let selectedAccountAddress = document.getElementById("selectNumber").value;
  
      if (
        selectedAccountAddress &&
        selectedAccountAddress !== "Choose an account"
      ) {
   
        saveAccount(selectedAccountAddress);
      }
  };
  return(
   <>
     <Navigation/>
    
    <form className="label0" id="myForm">
      <label htmlFor="">Choose an account</label>
      <select className="innerBox" id="selectNumber" onChange={selectAccount}>
        <option></option>
      </select>
    </form>
    </>
  )
}
AccountList.propTypes = {
  saveAccount: PropTypes.node.isRequired,
};
export default AccountList;