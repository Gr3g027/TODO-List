import React, { PureComponent, ReactNode } from 'react'
import addIcon from '../../Imgs/Adds.svg'
import binIcon from '../../Imgs/Bin.svg'
import checkBoxOff from '../../Imgs/Checkbox_Off.svg'
import checkBoxOn from '../../Imgs/Checkbox_On.svg'
import Box from './Box';
import styled from '@emotion/styled';

interface IconProps {
    iconName: "addIcon" | "binIcon" | "checkBoxIcon";
    onClick?: (item?: any) => void;
}

interface State{
    checked: boolean;
}

class Icon extends PureComponent<IconProps, State> {
    constructor(props: IconProps) {
        super(props)

        this.state = {
            checked: false,
        }
    }

    render(): ReactNode {
        const props = this.props
        const { iconName } = this.props
        const { checked } = this.state
        {switch (iconName) {
            case "addIcon":
                return(
                    <IconBox center>
                        <Ico src={addIcon} {...props}/>
                    </IconBox>
                )
                break;
            
            case "binIcon":
                return(
                    <IconBox center>
                        <Ico src={binIcon} {...props} />
                    </IconBox>
                )
                break;
            
            case "checkBoxIcon":
                return(
                    <IconBox center onClick={() => {
                        this.setState({checked: !checked})
                    }}>
                    {
                        checked ? 
                        <Ico src={checkBoxOn} {...props}/>
                        : 
                        <Ico src={checkBoxOff} {...props}/>
                    }
                    </IconBox>
                )
                
                break;
            
            default:
                return(<>Icon not found</>)
                break;
        }}
                
    }
}

export default Icon

const IconBox = styled(Box)`
    border-radius: 50%;
    width: 60px;
    height: 60px;
    :hover{
        background-color: rgba(0,0,0,0.2);
    }
`

const Ico = styled.img`
    width: 40px;
    height: 40px;
`
