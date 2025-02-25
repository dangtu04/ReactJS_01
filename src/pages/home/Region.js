import React from "react";

import CN from "../../assets/images/icons/flags/CN.png";
import DE from "../../assets/images/icons/flags/DE.png";
import AU from "../../assets/images/icons/flags/AU.png";
import RU from "../../assets/images/icons/flags/RU.png";
import IN from "../../assets/images/icons/flags/IN.png";
import GB from "../../assets/images/icons/flags/GB.png";
import TR from "../../assets/images/icons/flags/TR.png";
import UZ from "../../assets/images/icons/flags/UZ.png";
import bn from "../../assets/images/banners/ad-sm.png";


const Region = () => (
<>
<section  className="padding-bottom">

<header className="section-heading heading-line">
    <h4 className="title-section text-uppercase">Choose region</h4>
</header>

<ul className="row mt-4">
    <li className="col-md col-6"><a href="#" className="icontext"> <img className="icon-flag-sm" src={CN}/> <span>China</span> </a></li>
    <li className="col-md col-6"><a href="#" className="icontext"> <img className="icon-flag-sm" src={DE}/> <span>Germany</span> </a></li>
    <li className="col-md col-6"><a href="#" className="icontext"> <img className="icon-flag-sm" src={AU}/> <span>Australia</span> </a></li>
    <li className="col-md col-6"><a href="#" className="icontext"> <img className="icon-flag-sm" src={RU}/> <span>Russia</span> </a></li>
    <li className="col-md col-6"><a href="#" className="icontext"> <img className="icon-flag-sm" src={IN}/> <span>India</span> </a></li>
    <li className="col-md col-6"><a href="#" className="icontext"> <img className="icon-flag-sm" src={GB}/> <span>England</span> </a></li>
    <li className="col-md col-6"><a href="#" className="icontext"> <img className="icon-flag-sm" src={TR}/> <span>Turkey</span> </a></li>
    <li className="col-md col-6"><a href="#" className="icontext"> <img className="icon-flag-sm" src={UZ}/> <span>Uzbekistan</span> </a></li>
    <li className="col-md col-6"><a href="#" className="icontext"> <i className="mr-3 fa fa-ellipsis-h"></i> <span>More regions</span> </a></li>
</ul>
</section>
<article className="my-4">
    <img src={bn} className="w-100"/>
</article></>
);
export default Region;