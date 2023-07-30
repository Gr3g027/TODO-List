import { PureComponent, ReactNode } from 'react'
import styled from '@emotion/styled'

import { BoxProps } from './Box'

import { parseSize } from '../../Utils/utils';

export interface TextProps extends BoxProps {
    fontSize?: string;
    bold?: string | number;
    color?: string;
}

class Text extends PureComponent<TextProps> {
    /* Text component */
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
    
    ${({ mar }) => mar ? `margin: ${parseSize(mar)};` : `margin: auto;`}
	${({ pad }) => pad && `padding: ${parseSize(pad)};`}
	${({ gap }) => gap && `gap: ${parseSize(gap)};`}
`
