import { callApi } from '../utils/api/index';
import moment from 'moment';

// export const fetchStashAwayReturns = async (filters) => {

//     let symbol = "";
//     let start_date = "";
//     let end_date = "";
//     let today = moment().format("YYYY-MM-DD");

//     if(filters.benchmark == 1){
//         symbol = "VTI"
//     } else {
//         symbol = "AAPL"
//     }

//     if(filters.time == '1mo'){
//         start_date = moment().subtract(1, 'month').format("YYYY-MM-DD");
//         end_date = today;
//     } else if(filters.time == '6mo') {
//         start_date = moment().subtract(6, 'month').format("YYYY-MM-DD");
//         end_date = today;
//     } else if(filters.time == 'YTD') {
//         start_date = moment().set({'year': moment().year(), 'month': 0, 'date': 1}).format("YYYY-MM-DD");
//         end_date = today;
//     } else if(filters.time == '1y') {
//         start_date = moment().subtract(1, 'year').format("YYYY-MM-DD");
//         end_date = today;
//     } else if(filters.time == '5y') {
//         start_date = moment().subtract(5, 'year').format("YYYY-MM-DD");
//         end_date = today;
//     } else {
//         end_date = today;
//     }

//     let config = {
//         params: {
//             "symbol":symbol,
//             "interval":"1day",
//             "apikey":"788412f3b48a4211a6d64b107a331cb6",
//             "start_date": start_date,
//             "end_date":end_date,
//             "order":"ASC"
//         }
//     };
//     return await callApi("GET", "https://api.twelvedata.com/time_series", config);
// };

export const fetchReturns = async (filters) => {

    let symbol = "";
    let start_date = "";
    let end_date = "";
    let today = moment().format("YYYY-MM-DD");

    if(filters.benchmark == 0){
        symbol = "VTI"
    } else {
        symbol = "AAPL"
    }

    if(filters.time == '1mo'){
        start_date = moment().subtract(1, 'month').format("YYYY-MM-DD");
        end_date = today;
    } else if(filters.time == '6mo') {
        start_date = moment().subtract(6, 'month').format("YYYY-MM-DD");
        end_date = today;
    } else if(filters.time == 'YTD') {
        start_date = moment().set({'year': moment().year(), 'month': 0, 'date': 1}).format("YYYY-MM-DD");
        end_date = today;
    } else if(filters.time == '1y') {
        start_date = moment().subtract(1, 'year').format("YYYY-MM-DD");
        end_date = today;
    } else if(filters.time == '5y') {
        start_date = moment().subtract(5, 'year').format("YYYY-MM-DD");
        end_date = today;
    } else {
        end_date = today;
    }

    let config = {
        params: {
            "symbol":symbol,
            "interval":"1day",
            "apikey":"788412f3b48a4211a6d64b107a331cb6",
            "start_date": start_date,
            "end_date":end_date,
            "order":"ASC"
        }
    };
    return await callApi("GET", "https://api.twelvedata.com/time_series", config);
};


