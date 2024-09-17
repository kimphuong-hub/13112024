import React from 'react';
import { NavLink as NavLinkDefault } from 'react-router-dom';

type Props = React.ComponentProps<typeof NavLinkDefault>;

export default function NavLink(props: Props) {
  return <NavLinkDefault {...props} />;
}
