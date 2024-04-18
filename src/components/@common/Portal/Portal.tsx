import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

function Portal(props: PropsWithChildren) {
  const { children } = props;
  const container = globalThis?.document?.body;

  return container ? createPortal(<div>{children}</div>, container) : null;
}

export default Portal;
