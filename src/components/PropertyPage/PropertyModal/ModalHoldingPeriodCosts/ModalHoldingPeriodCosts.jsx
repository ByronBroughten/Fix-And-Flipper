import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';


function ModalHoldingPeriodCosts() {

  const dispatch = useDispatch();

  const propertyOfInterest = useSelector((store) => store.propertyOfInterest);
  const [holdingName, setHoldingName] = useState("");
  const [holdingItemCost, setHoldingItemCost] = useState("");

  const addHoldingItem = () => {
    dispatch ({
        type: 'ADD_PROPERTY_HOLDING_ITEM',
        payload: {propertyId: propertyOfInterest.property[0].id, holdingName: holdingName, holdingCost: holdingItemCost }
    })
    setHoldingName("");
    setHoldingItemCost("");
}

const deleteHoldingItem = (itemId) => {
  dispatch ({
      type: 'DELETE_PROPERTY_HOLDING_ITEM',
      payload: {itemId: itemId, propertyId: propertyOfInterest.property[0].id}
  })
}

const updateTaxes = (propertyId) => {
  console.log('updateTaxes in holding period costs modal')
  dispatch ({
      type: 'UPDATE_PROPERTY_TAXES',
      payload: propertyId
  })
}

  const formattedCurrency = (value) => {
    const number = parseFloat(value);
    return `$${number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="container">
      {Object.keys(propertyOfInterest).length && 
        <>
          <p>Holding Items:</p>
          <input 
            type='text'
            placeholder='Holding Name'
            value={holdingName}
            onChange={e => setHoldingName(e.target.value)}
          />
          <input 
            type='text'
            placeholder='Holding Cost'
            value={holdingItemCost}
            onChange={e => setHoldingItemCost(e.target.value)}
          />
          <button className="modal-btn-2" onClick={addHoldingItem}>Add</button>
          {/* <ul> */}
          <table>
            {propertyOfInterest.property[0].taxes_yearly && propertyOfInterest.property[0].taxes_yearly > 0 ? 
            
            <div className="unordered-list">
              <thead></thead>
              <tr>
                <td>Taxes: {formattedCurrency(propertyOfInterest.property[0].taxes_yearly/12)}</td>
                <td><img onClick={() => {updateTaxes(propertyOfInterest.property[0].id)}} className="deleteBtn" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgy6cH4pk8uBtQ-_MBHx5MtDO8ms62KxR0UQ&s" /></td>
              </tr>
            </div> : ''}
            {propertyOfInterest.holdingItems.map((item) => {
              return (
                <div className="unordered-list">
                  <tr>
                <td className="list-items" key = {item.holding_items_id}>{item.holding_name}: {formattedCurrency(item.holding_cost)} </td>
                <td><img className="deleteBtn" onClick={() => {deleteHoldingItem(item.holding_items_id)}}  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgy6cH4pk8uBtQ-_MBHx5MtDO8ms62KxR0UQ&s" /></td>
                </tr>
                </div>
                
              )
            })}
          {/* </ul> */}
          
          </table>
          <p className="bold-text">Monthly Total: {formattedCurrency(monthlyHoldingCost(propertyOfInterest.property[0].taxes_yearly/12, propertyOfInterest.holdingItems))}</p>
          <p>Holding Period:
            <input
              value= {Number(propertyOfInterest.property[0].holding_period)}
              onChange={e => {e.preventDefault; dispatch({type: 'UPDATE_PROPERTY_HOLDING_PERIOD', payload: e.target.value})}}
            />
            Months</p>
        <p>
          <span className="bold-text">Total Holding Cost: {formattedCurrency(propertyOfInterest.property[0].total_holding_cost)}</span>
          </p>
        </>
      }
    </div>
  );
}

export default ModalHoldingPeriodCosts;