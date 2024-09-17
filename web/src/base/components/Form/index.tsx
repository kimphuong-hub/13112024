import React from 'react';

type Props = React.ComponentProps<'form'>;

export default function Form(props: Props) {
  const { onSubmit, ...restProps } = props;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) {
          onSubmit(e);
        }
      }}
      {...restProps}
    />
  );
}
