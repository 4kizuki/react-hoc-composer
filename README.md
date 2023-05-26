# React HOC Composer

Chaining HOC is a pain.

```tsx
import { FunctionComponent } from 'react';

const Component: FunctionComponent<{ a: number }> = ({ a }) => {
  return <>a</>;
};
export const EnhancedComponent = withSomething(withSomething2(withSomething3(Component)));
```

With this library we can write like:

```tsx
import { FunctionComponent } from 'react';
import { Composer } from './index';

export const EnhancedComponent = new Composer()
  .decorate(withSomething)
  .decorate(withSomething2)
  .decorate(withSomething3)
  .build(function Component({ a }) {
    return <>a</>;
  });
```

Much more readable!

This library also provides certain kind of Type Safety. Generic HOCs are allowed here.

## Installation

- `npm i react-hoc-composer`
