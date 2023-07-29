import React, { PureComponent, ReactNode } from 'react'
import { Icons } from '../../Utils/icons';
import Box from './Box';
import styled from '@emotion/styled';

interface IconProps {
    iconName: string
              | "addIcon"
              | "binIcon"
              | "checkBoxIcon";
    onClick?: (item?: any) => void;
}

class Icon extends PureComponent<IconProps> {
    render(): ReactNode {
        const props = this.props
        const { iconName } = this.props
        {switch (iconName) {
            case "addIcon":
                return(
                    <IconBox center>
                        <Ico src={Icons.addIcon} {...props}/>
                    </IconBox>
                )
                break;
            
            case "binIcon":
                return(
                    <IconBox center>
                        <Ico src={Icons.binIcon} {...props} />
                    </IconBox>
                )
                break;
            
            case "checkBoxIconOn":
                return(
                    <IconBox center>
                        <Ico src={Icons.checkBoxOn} {...props} />
                    </IconBox>
                )
                break;
                
            case "checkBoxIconOff":
                return(
                    <IconBox center>
                        <Ico src={Icons.checkBoxOff} {...props} />
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
    transition: 3s;

    ${({ onClick }) => !!onClick && `cursor: pointer;`}
`
