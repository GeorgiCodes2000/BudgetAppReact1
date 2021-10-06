import React, { Fragment } from 'react'
import ExpenseItem from './ExpenseItem'
import {MdDelete} from 'react-icons/md';

export default function ExpenseList({expenses, deleteItem, handleEdit, clearItems}) {
   
    return (
        <Fragment>
            <ul className="list">
                {expenses.map(el=>{
                    return <ExpenseItem key={el.id} expense={el} deleteItem={deleteItem} handleEdit={handleEdit}/>;
                })}
            </ul>
            {expenses.length > 0 ? <button className="btn" onClick={clearItems}>Clear Expenses <MdDelete className="btn-icon"/></button> : null}
        </Fragment>
    )
}
