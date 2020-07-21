import Head from 'next/head'
import React,{useState} from 'react'
import Link from 'next/link'
import {Row,Col,List,Icon,BackTop} from 'antd'
import axios from 'axios'

import Header from '../components/Header'
import '../public/style/pages/index.css'
import Author from '../components/Author'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

export default function Home(list) {

  const renderer = new marked.Renderer()
  const [mylist,setMylist] = useState(list.data)
  
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false, //不忽略html
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitizer: false,
    xhtml: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header/>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={18} lg={18} xl={14}  >
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item=>(
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><Icon type="calendar" />{item.addTime}</span>
                  <span><Icon type="folder"/>{item.typeName}</span>
                  <span><Icon type="fire"/>{item.view_count}人</span>
                </div>
                <div className="list-context" dangerouslySetInnerHTML={{__html:marked(item.introduce)}}></div>
              </List.Item>
            )}
          />
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={6} lg={5} xl={4}>
          <Author/>
          {/* <Advert/> */}
        </Col>
      </Row>
      <BackTop/>
      <Footer/>
    </div>
  )
}

Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
        resolve(res.data)
      }
    )
  })
  return await promise
}
