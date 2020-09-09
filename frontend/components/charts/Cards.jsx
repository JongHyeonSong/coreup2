import React, { useContext } from 'react'
import { countryContext } from '../All';
import CountUp from 'react-countup';
import './Cards.css'

const Cards = ()=>{
    const {country, dispatch, chartData} = useContext(countryContext)
    const { confirmed, recovered, deaths, lastUpdate } = chartData;
    if (!confirmed){return 'loading';} //비동기라서 처음은 null이라 밑에서 에러날수있음

    return(
        <div className="row justify-content-center">
            <div className="col-3">
                <div className="col-md">
                    <div className="card text-center text-black mb-3" id="infected">
                        <div className="card-header">
                            <h5 className="card-title">감염자 수</h5>
                        </div>
                        <div className="card-body">
                            <h1>
                                <CountUp start={0} end={confirmed.value} duration={1.5} separator=","></CountUp>
                            </h1>
                            {new Date(lastUpdate).toDateString()}
                            <p>
                                COVID-19로 인한 감염자 수
                        </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-3">
                <div className="col-md">
                    <div className="card text-center text-black mb-3" id="recovered">
                        <div className="card-header">
                            <h5 className="card-title">회복자 수</h5>
                        </div>
                        <div className="card-body">
                            <h1>
                                <CountUp start={0} end={recovered.value} duration={1.5} separator=","></CountUp>
                            </h1>
                            {new Date(lastUpdate).toDateString()}
                            <p>
                                COVID-19로 인한 회복자 수
                        </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-3">
                <div className="col-md">
                    <div className="card text-center text-black mb-3" id="deaths">
                        <div className="card-header">
                            <h5 className="card-title">사망자 수</h5>
                        </div>
                        <div className="card-body">
                            <h1>
                                <CountUp start={0} end={deaths.value} duration={1.5} separator=","></CountUp>
                            </h1>
                            {new Date(lastUpdate).toDateString()}
                            <p>
                                COVID-19로 인한 사망자 수
                        </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cards;