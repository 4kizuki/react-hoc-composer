import { ComponentType } from 'react';

type HOC<TIn, TOut> = (Component: ComponentType<TIn>) => ComponentType<TOut>;

interface ComposerInterface<TIn = Record<string, never>, TOut = Record<string, never>> {
  decorate<TNext>(hoc: HOC<TNext, TIn>): ComposerInterface<TNext, TOut>;

  build(Component: ComponentType<TIn>): ComponentType<TOut>;
}

class ChainedComposer<TIn = Record<string, never>, TOut = Record<string, never>>
  implements ComposerInterface<TIn, TOut>
{
  public constructor(private hoc: HOC<TIn, TOut>) {}

  public decorate<TNext>(hoc: HOC<TNext, TIn>): ComposerInterface<TNext, TOut> {
    return new ChainedComposer<TNext, TOut>(Component => this.hoc(hoc(Component)));
  }

  public build(Component: ComponentType<TIn>): ComponentType<TOut> {
    return this.hoc(Component);
  }
}

export class Composer<TOut = Record<string, never>> implements ComposerInterface<TOut, TOut> {
  public decorate<TNext>(hoc: HOC<TNext, TOut>): ComposerInterface<TNext, TOut> {
    return new ChainedComposer<TNext, TOut>(hoc);
  }

  public build(Component: ComponentType<TOut>): ComponentType<TOut> {
    return Component;
  }
}
