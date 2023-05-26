import { Composer } from '../src';
import { ComponentType } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const Component = new Composer()
  .chain((Component: ComponentType<{ prop: number }>): ComponentType<Record<string, never>> => {
    return function A() {
      return <Component prop={1} />;
    };
  })
  .chain((Component: ComponentType<{ prop: number }>): ComponentType<{ prop: number }> => {
    return function B({ prop }) {
      return <Component prop={prop * 2} />;
    };
  })
  .finish(({ prop }) => {
    return <>{prop}</>;
  });

describe('Chain', () => {
  it('Props OK', async () => {
    render(<Component />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
