import { PureComponent, ReactNode } from 'react'
import styled from '@emotion/styled';

import Box from './Box';

import { Icons } from '../../Utils/icons';

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

        /* Icon component, returns correct icon based on 'iconName' prop */
        switch (iconName) {
            case "addIcon":
                return (
                    <IconBox center>
                        <Ico src={Icons.addIcon} {...props} />
                    </IconBox>
                )

            case "binIcon":
                return (
                    <IconBox center>
                        <Ico src={Icons.binIcon} {...props} />
                    </IconBox>
                )

            case "checkBoxIconOn":
                return (
                    <IconBox center>
                        <Ico src={Icons.checkBoxOn} {...props} />
                    </IconBox>
                )

            case "checkBoxIconOff":
                return (
                    <IconBox center>
                        <Ico src={Icons.checkBoxOff} {...props} />
                    </IconBox>
                )

            default:
                return (<img alt='IconError' />)
        }

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

    ${({ onClick }) => onClick && `cursor: pointer;`}
`
