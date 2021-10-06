import { Fragment, useEffect, useState } from "react";
import Alert from "./components/Alert";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { v4 as uuidv4 } from 'uuid';


const initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];



function App() {

  const [expenses, setExpenses] =  useState(initialExpenses);

  const [charge, setCharge] = useState("");

  const [amount, setAmount] = useState(0);

  const [alert, setAlert] = useState({show:false});

  const [edit, setEdit] = useState(false);

  const [id, setId] = useState(0);

  useEffect(()=>{
    localStorage.setItem('expenses', JSON.stringify(expenses)); 
  }, [expenses])

  const handleCharge = e => {
    setCharge(e.target.value);
  }

  const handleAmount = e => {
    setAmount(e.target.value);
  }

  const handleAlert = ({type, text}) => {
    setAlert({show:true,type, text});
    setTimeout(()=>{
      setAlert({show:false})
    },3000)
  }

  const handleSubmit = e => {
    e.preventDefault();

    if(charge!=='' && amount>0){
      if(edit){
        let expense = expenses.find(el=>el.id===id);
        expense.amount = amount;
        expense.charge = charge;
        let arr = [...expenses];
        setExpenses(arr);
        setEdit(false);
      }
      else{
          let arr = [...expenses, {id:uuidv4(), charge: charge, amount:amount}]
            setExpenses(arr);
          handleAlert({show:true, text:"successfuly added", type:'success'})
          console.log('za kvo beee');
      } 
    }

    else{
      handleAlert({show:true, text:"invalid inputs", type:'danger'})
    }
    setCharge('');
    setAmount(0);
  }

  const clearItems = () => {
    setExpenses([]);
    handleAlert({show:true, text:"All items  deleted", type:'danger'})

  }

  const deleteItem = id => {
    let arr = expenses.filter(el=>el.id!==id);
    setExpenses(arr);
    handleAlert({show:true, text:"item deleted", type:'danger'})
  }

  const handleEdit = id => {
    let expense = expenses.find(el=>el.id===id);
    setCharge(expense.charge);
    setAmount(expense.amount);
    setEdit(true);
    setId(id);

  }

  

  return (
    <Fragment>
      {alert.show && <Alert type={alert.type} text={alert.text}/>}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm handleCharge={handleCharge} handleAmount={handleAmount} handleSubmit={handleSubmit} charge={charge} amount={amount} edit={edit}/>
        <ExpenseList expenses={expenses} deleteItem={deleteItem} clearItems={clearItems} handleEdit={handleEdit}/>
      </main>
      <h1>
        total spending: <span className="total">${expenses.reduce((acc, el)=>{
            return acc += parseInt(el.amount);
        }, 0)}</span>
      </h1>
    </Fragment>
  );

}

export default App; 
