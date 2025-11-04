import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import LoadingSkeleton from '@/components/LoadingSkeleton/LoadingSkeleton';

describe('LoadingSkeleton Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<LoadingSkeleton />);
    expect(toJSON()).toBeTruthy();
  });

  it('should render with default props', () => {
    const { toJSON } = render(<LoadingSkeleton />);
    expect(toJSON()).toBeTruthy();
  });

  it('should render with custom width', () => {
    const { toJSON } = render(<LoadingSkeleton width={200} />);
    expect(toJSON()).toBeTruthy();
  });

  it('should render with custom height', () => {
    const { toJSON } = render(<LoadingSkeleton height={50} />);
    expect(toJSON()).toBeTruthy();
  });

  it('should render with custom border radius', () => {
    const { toJSON } = render(<LoadingSkeleton borderRadius={12} />);
    expect(toJSON()).toBeTruthy();
  });

  it('should render with percentage width', () => {
    const { toJSON } = render(<LoadingSkeleton width="80%" />);
    expect(toJSON()).toBeTruthy();
  });

  it('should render with custom style', () => {
    const { toJSON } = render(
      <LoadingSkeleton style={{ marginTop: 10, marginBottom: 10 }} />
    );
    expect(toJSON()).toBeTruthy();
  });

  it('should render multiple skeletons', () => {
    const { toJSON } = render(
      <View>
        <LoadingSkeleton width="100%" height={20} />
        <LoadingSkeleton width="80%" height={20} />
        <LoadingSkeleton width="60%" height={20} />
      </View>
    );
    expect(toJSON()).toBeTruthy();
  });
});
