import React, { Component, useReducer, useEffect, createContext, useMemo, useRef } from 'react';
import Nav from './Nav';
import AllCharts from './charts/AllCharts';
import AllComments from './comments/AllComments';
import { BrowserRouter, Route } from 'react-router-dom';
import CountryPicker from './charts/CountryPicker';
import './All.css';
import Profile from './Profile';



// 명령어
export const IP_ADDRESS = '34.64.113.24'
// export const IP_ADDRESS = '127.0.0.1:8000'

export const GET_USER = 'GET_USER'
export const GET_COUNTRIES = 'GET_COUNTRIES'
export const COUNTRY_CHANGE = 'COUNTRY_CHANGE'
export const GET_COUNTRY_COMMENT = 'GET_COUNTRY_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const SET_CHART_DATA = 'SET_CHART_DATA'
export const SET_DAILY_DATA = 'SET_DAILY_DATA'


export const countryContext = createContext({
    country : '',
    dispatch : ()=>{},
    countries : [],
    comments:[],
    userProfile:{},
    reGetCountry:()=>{},
    chartData : {},
    dailyData: [],
})

const initialState ={
    country : '',
    countryShort : '',
    userProfile : {},
    comments : [],
    countries : [],
    chartData : {},
    dailyData: [],
}

const reducer = (state, action)=>{
    switch(action.type){
        case GET_USER:{
            return {...state, userProfile:action.userProfile}
        }
        case GET_COUNTRIES:{
            return {...state, countries:action.countries}
        }
        case COUNTRY_CHANGE:{
            return {...state, country:action.changedCountry}
        }
        case GET_COUNTRY_COMMENT:{
            return {...state, nextUrl: action.nextUrl , comments : action.countryComment}
        }
        case SET_CHART_DATA:{
            return {...state, chartData :action.chartData}
        }
        case SET_DAILY_DATA:{
            return {...state, dailyData :action.dailyData}
        }
        default:
            return state;
    }
}

// 보낼 컴포넌트
const All = ({username, userid})=>{

    const [state, dispatch] = useReducer(reducer, initialState);

    const reGetCountry = (country, dispatch)=>{
        if (country){
            console.log(country, " 나라의 코멘트들을 긁어옵니다")
            let url = `http://${IP_ADDRESS}/api/comment/?country=${country}`

            console.log('지금 나라는 ', url, IP_ADDRESS)
            fetch(url)
            .then(res=>res.json())
            .then(data=>{
               
                dispatch({type:GET_COUNTRY_COMMENT, countryComment:data})
            })
        }
    }



    
    useEffect(()=>{
        // country가 글로벌이 아니고 japan이면 ?= 로 코멘트들을 가져온다
        reGetCountry(state.country, dispatch)
    },[state.country])

    useEffect(()=>{
        if(userid !== "None"){
            let url = `http://${IP_ADDRESS}/api/user_profile/${userid}/`
            fetch(url)
            .then(res=>res.json())
            .then(data=>{
                dispatch({type:GET_USER, userProfile:data})
            })
        }
    },[userid])
    
    useEffect(()=>{
        fetch('https://covid19.mathdro.id/api/countries')
        .then(res=>res.json())
        .then(data=>{
            const countries = data.countries.map(item=>item.name)
            // console.log(countries[0])
            // const countries = ['Japan', 'China']
            dispatch({type:GET_COUNTRIES, countries:countries})
        })
    },[])
    useEffect(()=>{
        let url =`https://covid19.mathdro.id/api/`
        if(state.country){
            // 나라별 평균을 가져온다
            url =  `https://covid19.mathdro.id/api/countries/${state.country}`
        }
        fetch(url)
        .then(res=>res.json())
        .then(fetchedData=>{
            const {confirmed,recovered,deaths,lastUpdate} = fetchedData
            dispatch({type:SET_CHART_DATA, chartData:{confirmed,recovered,deaths,lastUpdate}})
        })
    },[state.country])

    useEffect(()=>{
        //daily데이터 가져오기
        const url = 'https://covid19.mathdro.id/api/daily/'
        fetch(url)
        .then(res=>res.json())
        .then(fetchedData=>{
            const dailyData = fetchedData.map(daily=>({
                    confirmed : daily.confirmed.total,
                    deaths : daily.deaths.total,
                    date : daily.reportDate,
            }))
            dispatch({type:SET_DAILY_DATA, dailyData:dailyData})
        })
    },[])
    
    
    const value = {
        country : state.country,
        dispatch,
        countries :state.countries,
        comments : state.comments,
        userProfile : state.userProfile,
        reGetCountry,
        chartData : state.chartData,
        dailyData : state.dailyData,
    }


    const onSubmitTest =(e)=>{
        e.preventDefault()
        console.log(tmpRef.current.value)

    }

    const tmpRef = useRef()
    
    return(
        <BrowserRouter>
        <countryContext.Provider value={value}>

        <Nav/>
        <CountryPicker/>
        {/* <div>root계정 유저명: {username} 유저번호: {userid}</div>
        <div>스테이트 계정 유저명: {state.userProfile.profile_name} 유저번호: {state.userProfile.id} 국가: {state.userProfile.user_nation}</div> */}

        
        <div className="row mx-auto">
            <div className="col-md-3">
                <Profile/>
            </div>

            <div className="col-md-8">
                <Route path = "/comment" render={()=> <AllComments/>} />
                <Route path = "/chart" render={()=> <AllCharts/>} />
            </div>
        </div>



        </countryContext.Provider>
        </BrowserRouter>



    )
}


export default All;