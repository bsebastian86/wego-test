import { Button } from '@/components/button';
import { render, screen } from '@testing-library/react';

describe('Button', () => {
  it('should render children', () => {
    render(<Button>Click Me</Button>);

    const children = screen.getByRole('button');
    expect(children).toBeInTheDocument();
    expect(children).toHaveTextContent(/click/i);
  });

  it('should call onClick', () => {
    const onClick = vitest.fn();
    render(<Button onClick={onClick}>Click Me</Button>);

    const button = screen.getByRole('button');
    button.click();
    expect(onClick).toHaveBeenCalled();
  });
});
