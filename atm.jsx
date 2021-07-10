const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ["Deposit", "Withdrawal (multiple of $20 only)"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input type="number" width="200" min="0" onChange={onChange} placeholder="Amount" ></input>
      <input type="submit" width="200" value="Submit" disabled={!isValid}></input>
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0); // state of this transaction
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  
  const handleChange = (event) => {
    
    const amount = Number(event.target.value);
    if (atmMode == "Cash Back" && amount > totalState || atmMode == "Cash Back" && amount % 20 != 0) {
      setValidTransaction(false);
    }
    else {
      setValidTransaction(true)
    }
    console.log(`deposit amount' ${deposit}`);
    console.log(`valid tx ${validTransaction}`);
    console.log(`formula ${deposit%20}`)
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
  };
  
  
  const handleSubmit = (event) => {
    console.log(`deposit amt ${deposit}`);
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
    
  };

  const handleSelectMode = (event) => {
    setAtmMode(event.target.value);
    setIsDeposit(event.target.value === "Deposit");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select a transaction below to continue</label>
      <div>    
      <select onChange={(e) => handleSelectMode(e)} name="mode" id="mode-select" multiple>
        
        <option id="deposit-selection" value="Deposit">Deposit</option>
        <option id="cashback-selection" value="Cash Back">Withdrawal</option>
        <option id="no-selection" value="">Cancel</option>
      </select>
      </div>
      {
        atmMode === "" ? null : (
      
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
        )
    }
      
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
