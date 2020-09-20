import React from 'react';
import './index.scss';

export default function Navbar(){

    const[hoverDropDown, setHoverDropDown] = React.useState(false);
    const[clickDropDown, setclickDropDown] = React.useState(false);

    const handleHoverDropDown = (event) => {
        setHoverDropDown(!hoverDropDown);
    }

    const handleClickDropdown = (value) =>{
        setclickDropDown(!clickDropDown);
    }

    return(
        <div className="nav-container w-full flex justify-center">
            <div className="h-24 w-11/12 flex justify-between items-center ">
                <div className="">
                    <img className="h-12" src={require('../../resources/images/nav-logo.png').default}/>
                </div>
                <div className="w-2/5">
                    <ul>
                        <li className="selected">Home</li>
                        <li>Manage deposits</li>
                        <li>Refer a friend</li>
                        <li>Support</li>
                        <li className={`dropdown-button ${clickDropDown ? "hover" : ""}`}
                             onMouseEnter={handleHoverDropDown} 
                             onMouseLeave={handleHoverDropDown}
                             onClick={handleClickDropdown}>
                            <div className="flex flex-row" >
                                <a className="mr-2">Azrie</a>
                                <div class={`arrow-down ${clickDropDown ? "hover rotate" : ""} ${hoverDropDown ? "hover" : ""} my-auto`}></div>
                                <div className={`blocker ${!clickDropDown ? "display" : ""}`} onClick={handleClickDropdown}></div>
                                <div className={`dropdown-content ${clickDropDown ? "dropdown-content-display" : ""} h-50% mt-8`}>
                                    <div className="flex flex-col text-sm">
                                        <a href="#">Settings</a>
                                        <a href="#">Statements</a>
                                        <a href="#">Transfer</a>
                                        <a href="#">Withdraw</a>
                                        <a href="#">Log out</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )    
}