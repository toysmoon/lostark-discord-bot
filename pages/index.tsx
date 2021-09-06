import { NextPage } from 'next';
import React, { useEffect } from 'react';

const Main: NextPage = () => {
  useEffect(() => {
    fetch('/api/bot');
  }, []);

  return <div>lostark discord bot</div>;
};

export default Main;
