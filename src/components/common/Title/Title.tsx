import { Flex, Typography } from 'antd';

export interface ITitleProps {
  description: string;
  highlight: string;
}

export default function Title(data: ITitleProps) {
  return (
    <Flex>
      <Typography.Text strong style={{ paddingRight: '5px' }}>
        {data.highlight}
      </Typography.Text>
      <Typography.Text>{data.description}</Typography.Text>
    </Flex>
  );
}
