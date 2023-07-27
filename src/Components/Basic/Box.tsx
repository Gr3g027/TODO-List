import React, { PureComponent, ReactNode } from "react";
import styled from "@emotion/styled";
import { parseSize } from "../../Utils/utils";

export interface BoxProps {
	onClick?: (item?: any) => void;
	children?: React.ReactNode;

	center?: boolean;

	flex?: boolean;
	flexDir?: "row" | "column";

	mar?: number | string; // margin

	pad?: number | string; // padding

	height?: string;
	width?: string;

	hideScrollBar?: boolean;
	animation?: "fade" | "slide" | "vibrate";

	borderRadius?: number | string;

	scroll?: boolean;
	border?: string;

	bgColor?: string;
}

class Box extends PureComponent<BoxProps> {
	render(): ReactNode {
		const props = this.props;
		return (
			<StyledBox
				{...props}
			/>
		);
	}
}

export default Box;

const StyledBox = styled.div<BoxProps>`
    transition: all 0.3s ease-in-out;
	display: -webkit-flex;

	// FLEX
	${({ flex }) => flex && `display: flex; flex-shrink: 0;`}
	${({ flexDir }) => `flex-direction: ${flexDir};`};


    ${({ hideScrollBar }) =>
		hideScrollBar && `
        ::-webkit-scrollbar { 
            display: none; 
        }`
   	}

    ${({ bgColor }) => bgColor && `background-color: ${bgColor};`}

	${({ center }) =>
		center && `justify-content: center; align-items: center; text-align: center;`}
	
	${({ mar }) => mar !== undefined && `margin: ${parseSize(mar)};`}
	${({ pad }) => pad !== undefined && `padding: ${parseSize(pad)};`}

	${({ height }) =>
		height !== undefined &&
		`height: ${typeof height === "number" ? `${height}px` : height};`}
	
	${({ width }) =>
		width !== undefined &&
		`width: ${typeof width === "number" ? `${width}px` : width};`}
	
	${({ onClick }) => !!onClick && `cursor: pointer;`}
	
	${({ borderRadius }) =>
		!!borderRadius && `border-radius: ${parseSize(borderRadius)};`}
	${({ scroll }) => scroll && `overflow: auto;`}
	${({ border }) => border && `border: ${border};`}
`;
