import { useState } from "react";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import AccountList from "./pages/AccountList"
import CandidateRegister from "./pages/CandidateRegister"
import ElectionCommision from "./pages/ElectionCommision"
import VoterRegister from "./pages/VoterRegister"

import Wallet from './components/Wallet'
import './App.css'
import ConnectedAccount from "./components/ConnectedAccount";

function App() {
  const [account,setAccount]=useState("");
  const saveAccount = (address)=>{
    console.log(address)
     setAccount(address);
  }
  const router = createBrowserRouter([
    {path:"/",element:<AccountList saveAccount={saveAccount}/>},
    {path:"/candidate",element:<CandidateRegister account={account}  />},
    {path:"/voter",element:<VoterRegister account={account}/>},
    {path:"/election-commision",element:<ElectionCommision account={account} />},

  ])
  
  return (
    <>
      <ConnectedAccount account={account}/>
      <Wallet>
        <RouterProvider router={router}></RouterProvider>
      </Wallet>
    </>
  )
}

export default App
