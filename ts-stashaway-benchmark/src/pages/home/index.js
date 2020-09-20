import React from 'react';
import './index.scss';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../components/tabs/index';
import Overview from './overview/index';
import Maintenance from '../maintenance /index';

export default function Home(){

    const[value, setValue] = React.useState(0);
    const[hoverDropDown, setHoverDropDown] = React.useState(false);
    const[clickDropDown, setclickDropDown] = React.useState(false);
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const handleHoverDropDown = (event) => {
        setHoverDropDown(!hoverDropDown);
    }

    const handleClickDropdown = (value) =>{
        setclickDropDown(!clickDropDown);
    }

    return (
        <div className="flex flex-col">
            <div className="title-home flex flex-col justify-center">
                <div className="w-11/12 m-auto">
                    <div>
                        <div className="overview-button flex flex-row my-1">
                            <img className="h-4 my-auto mr-2" src={require("../../resources/images/arrow-back.png").default}/>
                            <div>Overview</div>
                        </div>
                        <div className="text-4xl font-bold mb-3">
                            <h1>General investing</h1>
                        </div>
                    </div>
                    <div className="actions flex flex-row justify-between">
                        <div>
                            <AppBar position="static">
                                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                    <Tab style={{textTransform: 'none'}} label="Overview" />
                                    <Tab style={{textTransform: 'none'}} label="Assets"/>
                                    <Tab style={{textTransform: 'none'}} label="Projection"/>
                                    <Tab style={{textTransform: 'none'}} label="About portfolio"/>
                                </Tabs>
                            </AppBar>
                        </div>
                        <div className="m-3">
                            <div className={`action-dropdown flex flex-row ${clickDropDown ? "hover" : ""}`}
                                onMouseEnter={handleHoverDropDown} 
                                onMouseLeave={handleHoverDropDown}
                                onClick={handleClickDropdown}>
                                <a className="text-sm mr-2">More actions</a>
                                <div class={`arrow-down ${clickDropDown ? "hover rotate" : ""} ${hoverDropDown ? "hover" : ""} my-auto`}></div>
                                <div className={`blocker ${!clickDropDown ? "display" : ""}`} onClick={handleClickDropdown}></div>
                                <div className={`dropdown-content ${clickDropDown ? "dropdown-content-display" : ""} h-50% mt-8`}>
                                    <div className="flex flex-col text-sm">
                                        <a href="#">Adjust risk / rename portfolio</a>
                                        <a href="#">Deposit</a>
                                        <a href="#">Transfer</a>
                                        <a href="#">Withdraw</a>
                                        <a href="#">View transactions</a>
                                        <a href="#">Delete portfolio</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-11/12 m-auto">
                <div>
                    <TabPanel value={value} index={0}>
                        <Overview/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Maintenance/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Maintenance/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Maintenance/>
                    </TabPanel>
                </div>
            </div>
        </div>
    )
}