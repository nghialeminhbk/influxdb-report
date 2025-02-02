import CardContent from "./component/CardContent"
import SearchBox from "./component/SearchBox"
import { Button, Spin, message } from "antd";
import {
    SendOutlined,
    FileExcelOutlined,
    MailOutlined
} from '@ant-design/icons';
import { useState } from "react";
import apiClient from '../../api/http-common'
import TabsReport from "./component/TabsReport";
const Report = (props) => {
    const [time, setTime] = useState("-1h")
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();

    const getReport = () => {
        setLoading(true)
        apiClient.get(`/reports?time=${time}`)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
                setLoading(false)
                messageApi.open({
                    type: 'success',
                    content: 'Query successfully!',
                });
            }).catch((err) => {
                console.log(err)
                messageApi.open({
                    type: 'error',
                    content: err.message,
                });
            })
    }

    return (
        <>
            {contextHolder}
            <CardContent className="filter" >
                <div style={{ display: "flex", gap: "12px" }}>
                    <SearchBox time={time} onSelectTime={(e) => setTime(e)} />
                    <div style={{ display: "flex", gap: "5px" }}>
                        <Button icon={<SendOutlined />} type="primary" color="bule" variant="solid" onClick={getReport}>Report</Button>
                        <Button icon={<FileExcelOutlined />} type="default" color="green" variant="solid">Excel</Button>
                        <Button icon={<MailOutlined />} type="dashed" color="orange" variant="solid">Email</Button>
                    </div>

                </div>
            </CardContent>
            {data &&
                <Spin spinning={loading}>
                    <CardContent>
                        <TabsReport data={data} onResize={props.onResize} />
                    </CardContent>
                </Spin>
            }
        </>

    );
}

export default Report