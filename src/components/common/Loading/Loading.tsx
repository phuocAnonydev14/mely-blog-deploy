'use client';
import { Progress } from 'antd';
import { useState } from 'react';

export const Loading = () => {
  const [percent, setPercent] = useState(0);
  const style = {
    width: '50vw',
  };
  // useEffect(() => {
  //   setInterval(() => {
  //     if (percent === 99) return;
  //     setPercent((e) => e + 1);
  //   }, 100);
  // }, [percent]);
  return (
    <Progress
      showInfo={false}
      percent={percent}
      status='active'
      strokeColor={{ from: '#108ee9', to: '#87d068' }}
      style={style}
    />
  );
};
