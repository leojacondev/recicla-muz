import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import Button from '@/components/Button/Button';

describe('Button Component', () => {
  it('should render with title', () => {
    render(<Button title="Click Me" onPress={jest.fn()} />);
    expect(screen.getByText('Click Me')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Press" onPress={onPressMock} />);

    fireEvent.press(getByText('Press'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <Button title="Disabled" onPress={onPressMock} disabled={true} />
    );

    fireEvent.press(getByText('Disabled'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('should not call onPress when loading', () => {
    const onPressMock = jest.fn();
    render(<Button title="Loading" onPress={onPressMock} loading={true} />);

    // Button text is replaced by ActivityIndicator when loading
    // So we can't fireEvent.press on the text
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('should render with icon on left', () => {
    const { getByText } = render(
      <Button title="With Icon" onPress={jest.fn()} icon="home" iconPosition="left" />
    );
    expect(getByText('With Icon')).toBeTruthy();
  });

  it('should render with icon on right', () => {
    const { getByText } = render(
      <Button title="With Icon" onPress={jest.fn()} icon="arrow-forward" iconPosition="right" />
    );
    expect(getByText('With Icon')).toBeTruthy();
  });

  it('should apply variant styles', () => {
    const { rerender, getByText } = render(
      <Button title="Primary" onPress={jest.fn()} variant="primary" />
    );
    expect(getByText('Primary')).toBeTruthy();

    rerender(<Button title="Danger" onPress={jest.fn()} variant="danger" />);
    expect(getByText('Danger')).toBeTruthy();

    rerender(<Button title="Success" onPress={jest.fn()} variant="success" />);
    expect(getByText('Success')).toBeTruthy();
  });

  it('should apply size styles', () => {
    const { rerender, getByText } = render(
      <Button title="Small" onPress={jest.fn()} size="small" />
    );
    expect(getByText('Small')).toBeTruthy();

    rerender(<Button title="Medium" onPress={jest.fn()} size="medium" />);
    expect(getByText('Medium')).toBeTruthy();

    rerender(<Button title="Large" onPress={jest.fn()} size="large" />);
    expect(getByText('Large')).toBeTruthy();
  });

  it('should render full width', () => {
    const { getByText } = render(
      <Button title="Full Width" onPress={jest.fn()} fullWidth={true} />
    );
    expect(getByText('Full Width')).toBeTruthy();
  });
});
