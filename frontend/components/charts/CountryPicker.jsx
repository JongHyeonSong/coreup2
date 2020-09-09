import React, { useContext } from 'react'
import { countryContext } from '../All';
import {COUNTRY_CHANGE} from '../All';
const CountryPicker = ()=>{

    const {country, dispatch, countries} = useContext(countryContext)
    // console.log(country, countries, 'im in pidkcer')

    const handleCountryChange = (e)=>{
        dispatch({type: COUNTRY_CHANGE, changedCountry:e.target.value})
    }
    return(
        <>
        
        <div className="d-flex justify-content-center">
        {/* {country ? <img  src={`https://www.countryflags.io/${country}/flat/64.png`}/> : null } */}
        <select className="form-control col-6 mt-0" onChange={handleCountryChange} >
              <option  value='' >Global</option>
              {countries.map((country,i) => <option value={country}  key={i}>{country}</option>)}
              {/* {fetchedCountries.map(item=>item[0]).map((country,i)=> <option key={i} value={`${} ${}`} >{country}</option>)} */}
        </select>

        </div>
        </>
    )
}

export default CountryPicker;

