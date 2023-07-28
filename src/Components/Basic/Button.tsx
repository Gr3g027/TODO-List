import React, { PureComponent, ReactNode } from 'react'
import Box from './Box'
import styled from '@emotion/styled'
import Text from './Text';
import Icon from './Icon';

export interface BtnProps {
    action: any;
    text: string;
    actionValue?: any;
    icon?: "addIcon" | "binIcon" | "checkBoxIcon" | undefined;
}
interface State {}

class Button extends PureComponent<BtnProps, State> {
    constructor(props: BtnProps) {
        super(props)

        this.state = {
            
        }
    }

    render(): ReactNode {
        const { text, icon, action, actionValue } = this.props
        return (
            <StyledButton center onClick={() => {
                actionValue ? action(actionValue) : action()
            }}>
                <BtnContainer flex flexDir='row' center>
                    {icon && <Icon iconName={icon}/>}
                    <TextMedium>{text}</TextMedium>
                </BtnContainer>
            </StyledButton>
        )
    }
}

export default Button

const StyledButton = styled(Box)`
    background-color: #716fb2;
    box-shadow: 4px 12px 24px rgba(0, 0, 0, 0.25);
    border-radius: 32px;
    cursor: pointer;
`

const TextMedium = styled(Text)`
    font-size: 24px; 
    font-weight: 400;
    color: #01001e;
`

const BtnContainer = styled(Box)`
    gap: 24px;
    padding: 8px 32px;
`