import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Modal from './Modal';

beforeEach(() => {
  const modal = document.createElement('div');
  modal.id = 'modal';
  document.body.appendChild(modal);
});

afterEach(() => {
  document.querySelector('#modal')?.remove();
});

describe('Modal', () => {
  it('Renders!', () => {
    const message = 'Modal my test text';

    render(
      <Modal isOpen onClose={() => {}}>
        <div>{message}</div>
      </Modal>
    );

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('isOpen = false', () => {
    const message = 'Modal my test text';

    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>{message}</div>
      </Modal>
    );

    expect(screen.queryByText(message)).toBeNull();
  });
});
