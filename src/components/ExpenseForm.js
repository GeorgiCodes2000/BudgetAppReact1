import React from 'react'
import { MdSend } from 'react-icons/md'

export default function ExpenseForm({handleCharge, handleAmount, handleSubmit, charge, amount, edit}) {


    return (
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <label htmlFor="charge">charge</label>
                    <input type="text" className="form-control" id="charge" name="charge" value={charge} onChange={handleCharge}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">amount</label>
                    <input type="number" className="form-control" id="amount" name="amount" value={amount} onChange={handleAmount}  ></input>
                </div>   
            </div>

            <button type="submit" className="btn">{edit?'edit':'submit'} <MdSend/></button>

        </form>
    )
}
