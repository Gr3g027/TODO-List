import React, { PureComponent, ReactNode } from "react";
import styled from "@emotion/styled";

import { parseSize } from "../../Utils/utils";

export interface BoxProps {
	children?: React.ReactNode | any;
	className?: string;
	id?: any;
	
	onClick?: (item?: any) => void;
	center?: boolean;

	flex?: boolean;
	flexDir?: "row" | "column";

	mar?: number | string;
	pad?: number | string;
	gap?: number | string;

	height?: string;
	width?: string;

	borderRadius?: number | string;
	bgColor?: string;
}

class Box extends PureComponent<BoxProps> {
	/* Box component */
	render(): ReactNode {
		const props = this.props
		return (
			<StyledBox
				id={props.id}
				className={props.className}
				{...props}
			/>
		);
	}
}

export default Box;

const StyledBox = styled.div<BoxProps>`
    transition: all 0.3s ease-in-out;
	display: -webkit-flex;

	${({ onClick }) => onClick && `cursor: pointer;`}
	${({ center }) =>
		center && `justify-content: center; align-items: center; text-align: center;`}

	${({ flex }) => flex && `display: flex; flex-shrink: 0;`}
	${({ flexDir }) => flexDir && `flex-direction: ${flexDir};`};
	
	${({ mar }) => mar !== undefined && `margin: ${parseSize(mar)};`}
	${({ pad }) => pad !== undefined && `padding: ${parseSize(pad)};`}
	${({ gap }) => gap !== undefined && `gap: ${parseSize(gap)};`}

	${({ height }) => height !== undefined && `height: ${parseSize(height)};`}
	${({ width }) => width !== undefined && `width: ${parseSize(width)};`}
	
	
	${({ borderRadius }) => borderRadius && `border-radius: ${parseSize(borderRadius)};`}
	${({ bgColor }) => bgColor && `background-color: ${bgColor};`}
`;
