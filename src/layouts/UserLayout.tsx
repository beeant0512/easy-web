import React from 'react';

const UserLayout = (props: any) => {
  const { children } = props;
  return <div style={{ height: '100vh' }}>{children}</div>;
};

export default UserLayout;
