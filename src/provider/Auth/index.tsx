'use client'

import { ReactNode } from "react";

interface AuthProps {
  children: ReactNode;
}

export const Auth = (props: AuthProps) => {

  return (<>
    {props.children}
  </>)
};
