import React from 'react';
import './index.scss';

import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip, Legend } from 'recharts';

export default function Linechart(props) {
    const { data, details, benchmark, currency } = props;
    const[chartWidth, setChartWidth] = React.useState(0);

    React.useEffect(() => {
        let width = document.getElementById("container-linechart").clientWidth;
        if(width !== null) {
            setChartWidth(width)
        }
    },[]);

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip flex flex-col no-wrap p-5">
                    <div className="text-xs font-bold mb-2 text-right">
                        {payload[0].payload.datetime}
                    </div>
                    <div className="text-right mb-2">
                      <div className="flex flex-row justify-end">
                        <div style={{height:10, width: 10, margin:"auto 10px", backgroundColor:`${payload[0].stroke}`}}></div>
                        <div className="text-xs">
                          {payload[0].name}
                        </div>
                      </div>
                      <div className="currency-text text-sm3 font-bold">
                        {"$" + payload[0].payload[`stashAwayClose${currency}`].toLocaleString() + " " + currency}
                      </div>
                    </div>
                    {benchmark ? 
                      <div className="text-right">
                        <div className="flex flex-row justify-end">
                          <div style={{height:10, width: 10, margin:"auto 10px", backgroundColor:`${payload[1].stroke}`}}></div>
                          <div className="text-xs">
                            {payload[1].name}
                          </div>
                        </div>
                        <div className="currency-text text-sm3 font-bold">
                          {"$" + payload[1].payload[`close${currency}`].toLocaleString() + " " + currency}
                        </div>
                      </div> : null}
                </div>
            );
        }
      
        return null;
    };

    const CustomLegend = (props) => {
      const { payload } = props;

      if (payload && payload.length) {

        let breakdown = null;

        if(benchmark){
          breakdown = 
          <div className="flex flex-row mt-8 mx-24 text-sm">
            <div className="mt-2 mx-3" style={{width:20, height:2, backgroundColor: payload[1].color}}></div>
            <div>
              <div className="mb-4">
                {payload[1].value}
              </div>
              {benchmark.breakdown.map((value) => {
                    return(
                      <div style={{color:"grey"}}>
                        {value}
                      </div>
                    )
                  })}
            </div>
          </div>
        }

        return (
          <div className="flex flex-row justify-center">
            <div className="flex flex-row mt-8 mx-24 text-sm">
              <div className="mt-2 mx-3" style={{width:20, height:2, backgroundColor: payload[0].color}}></div>
              <div>
                {payload[0].value}
              </div>
            </div>
            {breakdown}
          </div>
        )
      }
    };

    return (
        <div className="container-main p-12">
            <div className="header text-2xl mb-2">
                {details.header}
            </div>
            <div className="sub-header mb-8">
                {details.sub}
            </div>
            <div id="container-linechart" style={{ width: '100%', height: 500 }}>
                <LineChart width={chartWidth} height={500} data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid vertical={false} stroke="#415c72"/>
                    <YAxis axisLine={false}
                           tick={{fill:"white", fontSize:12}}
                           tickMargin={30}
                           tickLine={false}/>
                    <XAxis dataKey="shortDatetime"
                           stroke="white"
                           tick={{fill:"white", fontSize:12}}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Legend verticalAlign="bottom" height={100} content={<CustomLegend/>}/>
                    <Line name="StashAway Risk Index 14%" 
                          dataKey={`stashAwayClose${currency}`} 
                          dot={false} 
                          activeDot={false} 
                          strokeWidth={2}
                          stroke="#00afd7" />
                    {benchmark ? 
                      <Line name={benchmark.title} 
                            dataKey={`close${currency}`} 
                            dot={false} 
                            activeDot={false} 
                            strokeWidth={2}
                            stroke="#d09600" /> : null}
                </LineChart>
            </div>
        </div>
    )
}