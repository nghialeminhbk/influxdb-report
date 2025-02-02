import { Select } from 'antd';
import {
    HistoryOutlined
} from '@ant-design/icons';

const SearchBox = ({ time, onSelectTime }) => {
    const onChange = (v) => {
        console.log(`selected ${v}`);
        onSelectTime(v)
    };
    return (
        <Select
            placeholder="Time"
            optionFilterProp="label"
            onChange={onChange}
            style={{ width: 150 }}
            prefix={<HistoryOutlined style={{ marginRight: "5px" }} />}
            value={time}
            options={[
                {
                    value: '-1h',
                    label: 'Past 1h',
                },
                {
                    value: '-12h',
                    label: 'Past 12h',
                },
                {
                    value: '-24h',
                    label: 'Past 24h',
                },
                {
                    value: '-2d',
                    label: 'Past 2d',
                },
                {
                    value: '-7d',
                    label: 'Past 7d',
                },
            ]}
        />
    )
};
export default SearchBox;