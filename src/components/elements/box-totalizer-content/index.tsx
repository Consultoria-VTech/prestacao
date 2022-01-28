import React from 'react';
import { BoxTotalizersStyled, BoxTotalizerContentStyledProps } from './styles';
import _isEmpty from 'lodash/isEmpty';

type BoxTotalizerContentProps = BoxTotalizerContentStyledProps & {}

export const BoxTotalizerContent: React.FC<BoxTotalizerContentProps> = () => {
  return (
    <BoxTotalizersStyled/>
  )
}
