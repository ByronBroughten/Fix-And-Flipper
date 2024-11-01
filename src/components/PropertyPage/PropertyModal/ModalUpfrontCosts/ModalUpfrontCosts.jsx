import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';


function ModalUpfrontCosts() {

  const dispatch = useDispatch();

  const propertyOfInterest = useSelector((store) => store.propertyOfInterest);

  const [repairName, setRepairName] = useState("");
  const [repairItemCost, setRepairItemCost] = useState("");
  const [showText, setShowText] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const purchasePrice = (Object.keys(propertyOfInterest).length && propertyOfInterest.property[0].purchase_price);
  const propertyId = (Object.keys(propertyOfInterest).length && propertyOfInterest.property[0].id)

//runs when the user clicks "add" on the repair item
  const addRepairItem = () => {
      dispatch ({
          type: 'ADD_PROPERTY_REPAIR_ITEM',
          payload: {propertyId: propertyOfInterest.property[0].id, repairName: repairName, repairCost: repairItemCost }
      })
      setRepairName("");
      setRepairItemCost("");
  }
  // runs when the user clicks the trash can on the delete button
  const deleteRepairItem = (itemId) => {
    dispatch ({
        type: 'DELETE_PROPERTY_REPAIR_ITEM',
        payload: {itemId: itemId, propertyId: propertyOfInterest.property[0].id}
    })
  }

  const formattedCurrency = (value) => {
    const number = parseFloat(value);
    return `$${number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

//tracks the location of the mouse for the onhover text appearance
const handleMouseMove = (e) => {
  setPosition({ x: e.clientX, y: e.clientY });
};

  return (
    <div className="container">
      {Object.keys(propertyOfInterest).length && 
      <>

        <div className = "property-data">
          {/* This is the more info that appears on hover next to purchase price */}
          <div onMouseMove={handleMouseMove}>
            <img className='info-icon-data' src='info.png'onMouseEnter={() => setShowText(true)} onMouseLeave={() => setShowText(false)}/>
            {showText && (
              <div 
                className='info-text'
                style={{
                  position: 'absolute', 
                  left: position.x - 240, 
                  top: position.y - 110 
                }}>
                  The current listing price for the property selected
              </div>
            )}
          </div>
          <p> Purchase Price:</p> 
          <input
            className = "property-data-input" 
            placeholder="Purchase Price"
            value= {formattedCurrency(Number(propertyOfInterest.property[0].purchase_price))}
            onChange={e => {e.preventDefault; dispatch({type: 'UPDATE_PROPERTY_PURCHASE_PRICE', payload: e.target.value})}}
          />
        </div>

      <p className="top-border"> Repair Items:</p>
      <div className = 'item-form'>
        <input 
          type='text'
          placeholder='Repair Name'
          value={repairName}
          onChange={e => setRepairName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Repair Cost'
          value={repairItemCost}
          onChange={e => setRepairItemCost(e.target.value)}
        />
        <button className="modal-btn-2"onClick={addRepairItem}>Add</button>
      </div>

      <table className="table">
      {propertyOfInterest.repairItems.map((item) => {
        return (
          <div key = {item.id} className="unordered-list">
            <tr>
              <td className="list-items" >{item.repair_name}: </td>
              <td className="list-cost">{formattedCurrency(item.repair_cost)} </td>
              <td className="list-delete"><img className="deleteBtn" onClick={() => {deleteRepairItem(item.id)}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgy6cH4pk8uBtQ-_MBHx5MtDO8ms62KxR0UQ&s" /></td>
            </tr>
          </div>
        )
      })}
      </table>
      <p className = "item-list-total">Total Repair Cost: {formattedCurrency(propertyOfInterest.property[0].total_repair_cost)}</p>
      
        <p className="section-totals">
          <span className="bold-text">Total Upfront Cost: {formattedCurrency(propertyOfInterest.property[0].total_upfront_cost)}</span>
        </p>
        <p className="calculation-explanation">(Purchase Price + Total Repair Cost)</p>
      </>
      }

    </div>
  );
}

export default ModalUpfrontCosts;