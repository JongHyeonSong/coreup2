import React, { useContext } from 'react'
import {Bar, Line} from 'react-chartjs-2'
import { countryContext } from '../All'

const Chart = ()=>{
    const {country, dispatch, chartData, dailyData} = useContext(countryContext)
    const { confirmed, recovered, deaths, lastUpdate } = chartData;

    const lineChart = (
        dailyData.length
        ? <Line
        data={{
            labels:dailyData.map(item=>item.date),
            datasets:[{
                data:dailyData.map(item=>item.confirmed),
                label:"총 감염자수",
                borderColor: '#3333ff',
                fill : true,
            },{
                data:dailyData.map(item=>item.deaths),
                label:"사망자수",
                borderColor: 'red',
                backgroundColor:'rgba(255,0,0,0.5)',
                fill:true,
            }]
        }}
        />
        : <h1>loading...</h1>
    )

    const barChart = (
        confirmed
        ? <Bar
        data={{
            labels:['감염자 수', '회복자 수', '사망자 수'],
            datasets:[{
                label: 'People',
                backgroundColor:['rgba(0,0,255, 0.5)', 'rgba(0,255,0, 0.5)','rgba(255,0,0, 0.5)'],
                data:[confirmed.value, recovered.value, deaths.value ],
            }]
        }}
        options={{
            legend:{display:false},
            title:{display:true, text:`${country} 의 실시간 현황`}
        }}
        />
        : <h1>loading...</h1>
    )
    return(
        <div className="row flex-justify-center">
            <div className="col-8">
            {country ?barChart :lineChart}

            </div>
        </div>
    )
}

export default Chart;