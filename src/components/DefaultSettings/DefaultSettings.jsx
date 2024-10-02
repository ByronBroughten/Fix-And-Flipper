import React from 'react';
import './DefaultSettings.css'
import DefaultHoldingCost from './DefaultHoldingCost/DefaultHoldingCost';
import DefaultRepairItems from './DefaultRepairItems/DefaultRepairItems';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

function DefaultSettings() {
  const user = useSelector(store => store.user);
  const defaultSettings = useSelector(store => store.defaultSettings);
  const dispatch = useDispatch();


  // QUESTION:
  // 'user.holding_period_default' doesn't change with the db update.
  // Should be okay if we don't clear the holding period input?
  // Or should we make a dispatch call to fetch the new user data?
  const [holdingPeriod, setHoldingPeriod] = useState(user.holding_period_default)

  useEffect(() => {
    dispatch({
      type: "GET_DEFAULTS"
    })
  }, [dispatch])

  const updateHoldingPeriod = () => {
    dispatch({
      type: 'UPDATE_DEFAULT_HOLDING_PERIOD',
      payload: holdingPeriod
    })
  }

  console.log('defaultSettings data:', defaultSettings);
  console.log('user data:', user);
  

  return (
    <div className="defaultSettings">
      <h2 className="defaultSettingsTitle">Default Settings</h2>

      <div className='holdingPeriodDefault'>
        <span className='defaultSettingsText'>Holding Period (in months):</span>
        <input className='holdingPeriodInput'
              type='number'
              value={holdingPeriod}
              onChange={e => setHoldingPeriod(e.target.value)}
              />
      </div>

      <DefaultHoldingCost defaultSettings={defaultSettings} />
      <DefaultRepairItems defaultSettings={defaultSettings} />

      <button className='defaultSaveBtn'
              onClick={updateHoldingPeriod}>Save</button>
    </div>
  );
}

export default DefaultSettings;

// reducer name for default => defaultSettings
