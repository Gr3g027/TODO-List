import styled from '@emotion/styled'
import React, { PureComponent, ReactNode } from 'react'

import {
    HTMLMotionProps,
    motion,
} from "framer-motion";

import { PropsOf, Theme } from '@emotion/react';

export interface TextProps {
    children?: React.ReactNode;

    fontSize?: string;
    bold?: string | number;
    color?: string;
}

class Text extends PureComponent<TextProps> {
    
    render(): ReactNode {
        const props = this.props
        return (
            <StyledText
                {...props}
            />
        )
    }
}

export default Text

const StyledText = styled.p<TextProps>`
    ${({ fontSize }) => fontSize && `font-size: ${fontSize};`}
    ${({ bold }) => bold && `font-weight: ${bold};`}
    ${({ color }) => color && `color: ${color};`}
`
