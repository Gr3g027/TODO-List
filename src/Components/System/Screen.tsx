/* Component for screen size, responsive use */

import { PureComponent, ReactNode } from "react";
import ToDoList from "../ToDoList/ToDoList";

interface Props { }
interface State {
    responsive: boolean
}
class Screen extends PureComponent<Props, State>{
    mobileWidth: number;

    constructor(props: Props) {
        super(props)

        this.mobileWidth = 768;

        this.state = {
            responsive: window.innerWidth <= this.mobileWidth,
        }

        this.handleResize = this.handleResize.bind(this);
    }

    handleResize = () => {
        this.setState({ responsive: (window.innerWidth <= this.mobileWidth) ? true : false });
    }

    componentDidMount(): void {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.handleResize);
    }

    render(): ReactNode {
        const { responsive } = this.state

        return (
            <>
                <ToDoList responsive={responsive} />
            </>
        )
    }
}

export default Screen;