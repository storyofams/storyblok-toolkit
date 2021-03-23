import React, { CSSProperties, ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
  style: CSSProperties;
}

export const Wrapper = ({ children, style }: WrapperProps) => (
  <div
    className="storyblok-image-wrapper"
    style={{ position: 'relative', overflow: 'hidden', ...style }}
  >
    {children}
  </div>
);
