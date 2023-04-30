import {Link} from "react-router-dom";
import {Input, Segmented} from "antd";
import React from "react";
import {SearchOutlined} from "@ant-design/icons";
import './header.styles.scss';

const Header = (props) => {
    const onSearch = (value) => console.log(value);

    return (
        <header className="d-flex flex-column justify-between align-center pl-20 pt-20 pr-20">
            <Input placeholder="input search text" allowClear onSearch={onSearch} prefix={<SearchOutlined />}
                   suffix={<span style={{borderLeft: '1px solid #d9d9d9', paddingLeft: '10px'}}>Найти</span>} />
            <Segmented className="mt-15 w100p" options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']} />
            {/*<Link to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="img/logo.png" alt="Logo" />
                    <div>
                        <h3 className="text-uppercase">Sneaker Spot</h3>
                        <p className="opacity-5">Best Sneakers-shop EUW</p>
                    </div>
                </div>
            </Link>*/}
            {/*<ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img width={18} height={18} src="img/cart.svg" alt="trashcan" />
                    <span>1205 eur.</span>
                </li>
                <li className="mr-20 cu-p">
                    <Link to ="/favorites">
                        <img width={18} height={18} src="img/heart.svg" alt="favorites" />
                    </Link>
                </li>
                <li>
                    <img width={18} height={18} src="img/user.svg" alt="user" />
                </li>
            </ul>*/}
        </header>
    );
}
export default Header;
