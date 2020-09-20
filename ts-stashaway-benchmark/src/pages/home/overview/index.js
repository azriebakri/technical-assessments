import React from 'react';
import './index.scss';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LineChart from '../../../components/charts/linechart/index';
import { fetchReturns } from '../../../services/dashboard.service';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


export default function Overview(){
    const classes = useStyles();
    const [benchmark, setBenchmark] = React.useState("");
    const [time, setTime] = React.useState("max");
    const [currency, setCurrency] = React.useState("SGD");
    const [lineChartData, setLineChartData] = React.useState([]);

    const details = {
        header: "Portfolio value based on gross return",
        sub: "Gross returns and exchange rates sourced from Bloomberg as of 2th May 2019"
    }

    const benchmarkList = [{ 
                            title: "60% VTSMX (Stocks) and 40% VBMFX (Bonds)",
                            breakdown:["VTSMX - Vanguard Total Stock Market Index", "VTBMX - Vanguard Total Bond Market Index"]
                           },
                           { 
                            title: "20% VTSMX (Stocks) and 80% VBMFX (Bonds)",
                            breakdown:["VTSMX - Vanguard Total Stock Market Index", "VTBMX - Vanguard Total Bond Market Index"]
                           }]
  
    const handleChangeBenchmark = (event) => {
        setBenchmark(event.target.value);
    };

    const handleChangeTime = (value) => {
        setTime(value);
    };

    const handleChangeCurrency = (value) => {
        setCurrency(value);
    };

    const getLineChartData = async() => {
                
        await fetchReturns({benchmark, time})
                .then(data => {

                    if(data && data.values){
                        let result = data.values.map(e => {
                            //assuming I own 1 unit of stock // 100 multiplier

                            let closeUSD = parseInt(e.close) * 100;
                            let stashAwayCloseUSD = closeUSD + (closeUSD * 0.14);
                            let closeSGD = parseInt(closeUSD * 1.33);
                            let stashAwayCloseSGD = parseInt(stashAwayCloseUSD * 1.33);
                            
                            return({
                                datetime: moment(e.datetime).format("DD MMM YYYY"),
                                shortDatetime: moment(e.datetime).format("MMM YY"),
                                closeUSD: closeUSD,
                                stashAwayCloseUSD: stashAwayCloseUSD,
                                closeSGD: closeSGD,
                                stashAwayCloseSGD: stashAwayCloseSGD
                            });
                        });

                        setLineChartData(result);

                    }

                });
    }

    React.useEffect(() => {
        getLineChartData();
    },[benchmark]);

    React.useEffect(() => {
        getLineChartData();
    },[time]);


    return (
        <div>
            <div className="text-2xl font-bold my-3">
                <h1>Portfolio benchmark</h1>
            </div>
            <div className="container-main-dropdown flex flex-row mb-8">
                <div className="p-8 flex-1">
                    <div className="">
                        General Investing
                    </div>
                    <div className="container-left font-bold mt-3">
                        StashAway Risk Index 14%
                    </div>
                </div>

                <div className="container-right flex flex-1">
                    <div className="container-versus">
                        vs
                    </div>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Which benchmark do you want to compare?</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={benchmark}
                            onChange={handleChangeBenchmark}
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {benchmarkList.map((e,i) => {
                                return (
                                    <MenuItem value={i}>{e.title}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="container-chart flex flex-col">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row">
                        <Button className={time == "1mo" ? "MuiButton-active-root" : ""} onClick={() => handleChangeTime("1mo")}>
                            1 month
                        </Button>
                        <Button className={time == "6mo" ? "MuiButton-active-root" : ""} onClick={() => handleChangeTime("6mo")}>
                            6 months
                        </Button>
                        <Button className={time == "YTD" ? "MuiButton-active-root" : ""} onClick={() => handleChangeTime("YTD")}>
                            Year-to-date
                        </Button>
                        <Button className={time == "1y" ? "MuiButton-active-root" : ""} onClick={() => handleChangeTime("1y")}>
                            1 year
                        </Button>
                        <Button className={time == "5y" ? "MuiButton-active-root" : ""} onClick={() => handleChangeTime("5y")}>
                            5 years
                        </Button>
                        <Button className={time == "max" ? "MuiButton-active-root" : ""} onClick={() => handleChangeTime("max")}>
                            Max
                        </Button>
                    </div>
                    <div className="flex flex-row">
                        <Button className={currency == "SGD" ? "MuiButton-active-root" : ""} onClick={() => handleChangeCurrency("SGD")}>
                            SGD
                        </Button>
                        <Button className={currency == "USD" ? "MuiButton-active-root" : ""} onClick={() => handleChangeCurrency("USD")}>
                            USD
                        </Button>
                    </div>
                </div>
                <div className="mt-8">
                    <LineChart details={details} data={lineChartData} benchmark={benchmarkList[benchmark]} currency={currency}/>
                </div>
            </div>
        </div>
    )
}