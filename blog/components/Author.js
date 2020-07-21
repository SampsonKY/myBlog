import {Avatar, Divider, Tooltip} from 'antd'
import '../public/style/components/Author.css'

const Author = ()=>{
    return(
        <div className="author-div comm-box">
            <div><Avatar size={100} src="https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2964964565,851203754&fm=26&gp=0.jpg" /></div>
            <div className="author-introduction">
                专注web
                <Divider>社交账号</Divider>
                <Tooltip title="https://github.com/SampsonKY">
                    <a href="https://github.com/SampsonKY" target="_blank">
                    <Avatar size={28} icon="github" className="account"  />
                    </a>
                </Tooltip>
                <Tooltip title="QQ:1911171549">
                    <Avatar size={28} icon="qq"  className="account" />
                </Tooltip>
            </div>
        </div>
    )
}

export default Author
