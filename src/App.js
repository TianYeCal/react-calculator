import styled from "styled-components";
import dollar from "./images/icon-dollar.svg";
import people from "./images/icon-person.svg";
import { useState } from "react";
import { useEffect } from "react";
function App() {
  const [billAmount, setBillAmount] = useState(0);
  const [peopleNum, setPeopleNum] = useState(1);
  const [tipAmount, setTipAmount] = useState(null);
  const [total, setTotal] = useState(null);
  const [tip, setTip] = useState(null);
  const [customTip, setCustomTip] = useState("");
  const [billError, setBillError] = useState(false);
  const [PeopleError, setPeopleError] = useState(false);

  const resetBtn = () => {
    setBillError(false);
    setPeopleError(false);
    setBillAmount(0);
    setTipAmount(null);
    setPeopleNum(1);
    setTip(null);
  };
  useEffect(() => {
    function calculate() {
      if (billAmount < 0) {
        return setBillError(true);
      }
      if (peopleNum < 1 || peopleNum - Math.floor(peopleNum) !== 0) {
        return setPeopleError(true);
      }
      if (customTip) {
        setBillError(false);
        setPeopleError(false);
        setTipAmount((billAmount * customTip) / peopleNum / 100);
        setTotal(billAmount / peopleNum + tipAmount);
        return;
      } else {
        setBillError(false);
        setPeopleError(false);
        setTipAmount((billAmount * tip) / peopleNum);
        setTotal(billAmount / peopleNum + tipAmount);
      }
    }
    calculate();
  }, [billAmount, peopleNum, tip, tipAmount, customTip]);
  return (
    <Wrapper>
      <div>
        <h1>
          spli <br /> tter
        </h1>
        <div className="content">
          <div className="input-area">
            <div className="single-input">
              <label className="form-label" htmlFor="bill">
                Bill
              </label>
              <div className="input-img">
                <img src={dollar} className="img-icon" alt="dollar icon" />
                <input
                  className={
                    billError
                      ? "form-input bill-amount error"
                      : "form-input bill-amount"
                  }
                  name="bill"
                  type="number"
                  value={billAmount}
                  placeholder="0"
                  onChange={(e) => setBillAmount(e.target.value)}
                />
                {billError && (
                  <p className="small">please input the right bill amount</p>
                )}
              </div>
            </div>
            <label className="form-label" htmlFor="select-tip">
              Select Tip %
            </label>
            <div className="input-group">
              <div className="input-control">
                <input
                  type="radio"
                  name="buttonGroup"
                  value="0.05"
                  id="one"
                  onChange={(e) => setTip(e.target.value)}
                />
                <label className="tip-label" htmlFor="one">
                  5%
                </label>
              </div>
              <div className="input-control">
                <input
                  type="radio"
                  name="buttonGroup"
                  value="0.1"
                  id="two"
                  onChange={(e) => setTip(e.target.value)}
                />
                <label className="tip-label" htmlFor="two">
                  10%
                </label>
              </div>
              <div className="input-control">
                <input
                  type="radio"
                  name="buttonGroup"
                  value="0.15"
                  onChange={(e) => setTip(e.target.value)}
                  id="three"
                />
                <label className="tip-label" htmlFor="three">
                  15%
                </label>
              </div>
              <div className="input-control">
                <input
                  type="radio"
                  name="buttonGroup"
                  value="0.25"
                  id="four"
                  onChange={(e) => setTip(e.target.value)}
                />
                <label className="tip-label" htmlFor="four">
                  25%
                </label>
              </div>
              <div className="input-control">
                <input
                  type="radio"
                  name="buttonGroup"
                  value="0.5"
                  id="five"
                  onChange={(e) => setTip(e.target.value)}
                />
                <label className="tip-label" htmlFor="five">
                  50%
                </label>
              </div>
              <div className="input-control">
                <input
                  type="number "
                  name="buttonGroup"
                  value={customTip}
                  id="custom"
                  className="custom-input"
                  placeholder="Custom"
                  onChange={(e) => setCustomTip(e.target.value)}
                />
              </div>
            </div>
            <div className="single-input">
              <label className="form-label" htmlFor="bill">
                Number of People
              </label>
              <div className="input-img">
                <img src={people} className="img-icon" alt="dollar icon" />
                <input
                  className={PeopleError ? "error form-input " : "form-input"}
                  name="bill"
                  type="number"
                  placeholder="0"
                  value={peopleNum}
                  onChange={(e) => setPeopleNum(e.target.value)}
                />
                {PeopleError && (
                  <p className="small">please input the right people amount</p>
                )}
              </div>
            </div>
          </div>
          <div className="show-tips">
            <div className="tip-amount">
              <div className="info">
                <p className="tip-num">Tip Amount</p>
                <p className="per-person"> / person</p>
              </div>
              <p className="num-show">${tipAmount?.toFixed(2) || 0}</p>
            </div>
            <div className="tip-amount">
              <div className="info">
                <p className="tip-num">Total</p>
                <p className="per-person">/ person</p>
              </div>
              <p className="num-show">${total?.toFixed(2) || 0}</p>
            </div>
            <button className="btn reset" onClick={resetBtn}>
              RESET
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.main`
  max-width: 100vw;
  min-height: 100vh;

  input[type="radio"][name="buttonGroup"] {
    display: none;
  }
  input[type="number"][name="buttonGroup"] {
    display: none;
  }
  .custom-tip {
    background: var(--grey-200);
  }
  /* Clicking a label will select its corresponding hidden radio button
   We can select that radio buttons sibling label and style it. */
  input[type="radio"][name="buttonGroup"]:checked + label {
    background-color: var(--primary-400);
    color: var(--primary-800);
  }
  .single-input {
    margin-bottom: 2rem;
  }
  .form-input {
    text-align: right;
    font-weight: 700;
    font-size: 18px;
    color: var(--primary-800);
    margin-bottom: 0;
  }
  .form-input::placeholder {
    text-align: right;
    font-weight: 700;
    font-size: 18px;
  }
  .img-icon {
    position: absolute;
    left: 10px;
    top: 8px;
    font-weight: 700;
  }
  .input-group {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
  .small {
    color: var(--red-dark);
    text-align: right;
    margin-bottom: 2rem;
  }
  .input-area {
    width: 100%;
  }
  input:focus {
    outline: none;
  }
  .tip-label {
    display: inline-block;
    width: 5.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    background-color: #f0f0f0;
    text-align: center;
    color: white;
    background: var(--primary-800);
  }
  input {
    cursor: pointer;
  }
  .tip-label {
    cursor: pointer;
  }
  .tip-amount {
    display: flex;
    justify-content: space-between;
  }
  h1 {
    text-transform: uppercase;
    font-size: 32px;
    color: var(--primary-700);
    line-height: 40px;
    letter-spacing: 10px;
    margin-bottom: 2rem;
    text-align: center;
    margin-top: 10rem;
  }
  .content {
    max-width: 80vw;
    width: 800px;
    margin: 0 auto;
    background: white;
    border-radius: var(--border-radius);
    padding: 1.5rem 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .show-tips {
    background: var(--primary-800);
    border-radius: var(--border-radius);
    padding: 1.5rem 1rem;
  }
  .info {
    margin-bottom: 3rem;
  }
  .reset {
    margin-top: 4rem;
    width: 100%;
    padding: 0.75rem 1.5rem;
    color: var(--primary-800);
    font-weight: 900;
    font-size: 16px;
  }
  .form-label {
    margin-bottom: 1rem;
  }
  .num-show {
    font-size: 28px;
    color: var(--primary-300);
  }
  .tip-num {
    color: var(--grey-200);
    margin-bottom: 0.5rem;
  }
  .per-person {
    color: var(--grey-500);
  }
  .input-img {
    position: relative;
  }
  .custom-input {
    display: inline-block;
    width: 5.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    background-color: #f0f0f0;
    text-align: center;
    color: var(--primary-800);
    background: var(--primary-800);
    font-size: inherit;
    font-weight: 800;
    background: var(--grey-200);
  }
  .custom-input::placeholder {
    color: var(--primary-800);
    font-size: 14px;
  }
  .error {
    border: 1px solid var(--red-dark);
  }
  @media (max-width: 768px) {
    .content {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    h1 {
      margin-top: 2rem;
    }
    .input-group {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }
    .tip-label {
      width: 100%;
    }
    .custom-input {
      width: 100%;
    }
  }
`;
export default App;
