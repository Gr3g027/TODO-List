import { PureComponent, ReactNode } from 'react'
import styled from '@emotion/styled'

import { BoxProps } from './Box'

import { parseSize } from '../../Utils/utils';

export interface BtnProps extends BoxProps{
    action: (params?: any | Array<any>) => any;
    actionValue?: any;
}

class Button extends PureComponent<BtnProps> {
    /* Button component, basically a Box with extra props and a default style */
    render(): ReactNode {
        const props = this.props
        const { actionValue, action } = this.props
        return (
            <StyledButton 
                {...props}
                onClick={() => { actionValue ? action(actionValue) : action()
            }}/>
        )
    }
}

export default Button

const StyledButton = styled.button<BoxProps>`
    background-color: #716fb2;
    box-shadow: 4px 12px 24px rgba(0, 0, 0, 0.25);
    border-radius: 32px;
    border: none;
    text-align: center;
    align-items: center;
    cursor: pointer;
    transition: 0.2s;

    ${({ mar }) => mar !== undefined && `margin: ${parseSize(mar)};`}
	${({ pad }) => pad !== undefined && `padding: ${parseSize(pad)};`}
	${({ gap }) => gap !== undefined && `gap: ${parseSize(gap)};`}

    :focus {
        border: 1px solid white;
    }
    :hover {
        transform: scale(1.03);
    }
`

