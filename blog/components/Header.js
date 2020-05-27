import React,{useEffect, useState} from 'react'
import {Row,Col,Menu,Icon} from 'antd'
import Router from 'next/router'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../public/style/components/Header.css'

const Header = ()=>{
    const [navArray, setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const result = await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    },[])

    const handleClick=(e)=>{
        if(e.key == 0){
            Router.push('/index')
        }else{
            Router.push('/list?id='+e.key)
        }
    }

    
    return(
        <div className="header">
            <Row type="flex" justify="center">
                <Col  xs={24} sm={24} md={16} lg={18} xl={14}>
                    <span className="header-logo">SampsonKY</span>
                    <span className="header-txt">专注前端开发</span>
                </Col>
                <Col className="menu-div" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <Icon type="home" />
                            博客首页
                        </Menu.Item>
                        {
                            navArray.map((item)=>{
                                return (
                                    <Menu.Item key={item.Id}> 
                                        <Icon type={item.icon}/>
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}
 
export default Header
