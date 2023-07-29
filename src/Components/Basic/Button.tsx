import React, { PureComponent, ReactNode } from 'react'
import styled from '@emotion/styled'
import Box, { BoxProps } from './Box'
import Text from './Text';
import Icon from './Icon';
import { MotionStyle } from 'framer-motion';
import { parseSize } from '../../Utils/utils';

export interface BtnProps extends BoxProps{
    action: any;
    actionValue?: any;
}

class Button extends PureComponent<BtnProps> {
    render(): ReactNode {
        const props = this.props
        return (
            <StyledButton 
                {...props}
                onClick={() => { props.actionValue ? props.action(props.actionValue) : props.action()
            }}/>
        )
    }
}

export default Button

const StyledButton = styled(Box)`
    background-color: #716fb2;
    box-shadow: 4px 12px 24px rgba(0, 0, 0, 0.25);
    border-radius: 32px;
    border: none;
    cursor: pointer;
    transition: 0.5s;

    ${({ mar }) => mar !== undefined && `margin: ${parseSize(mar)};`}
	${({ pad }) => pad !== undefined && `padding: ${parseSize(pad)};`}
	${({ gap }) => gap !== undefined && `gap: ${parseSize(gap)};`}
    :focus {
        border: 1px solid white;
    }
    :hover { 
        transform: scale(1.05)
    }
`

