import React from 'react'
import Navbar from './navbar';

type AppShellProps = {
    children : React.ReactNode;
};

function AppShell(props: AppShellProps) {
    const {children} = props;
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}

export default AppShell