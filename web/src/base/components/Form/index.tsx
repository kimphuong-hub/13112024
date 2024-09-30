import React from 'react';

type Props = React.ComponentProps<'form'> & {
  onSubmit: (e: React.FormEvent) => void;
};

export default function Form(props: Props) {
  const { onSubmit, ...restProps } = props;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
      {...restProps}
    />
  );
}
