import { PureComponent, ReactNode } from 'react'
import styled from '@emotion/styled'
import { nanoid } from 'nanoid'

import Box from '../Basic/Box'
import Text from '../Basic/Text'
import Button from '../Basic/Button'
import Icon from '../Basic/Icon'

import PopUp from './PopUp'
import ToDoElement from './ToDoElement'
import { getJson, saveJson } from '../../Utils/utils'
import {
    AddAnimation,
    DeleteAnimation,
    SelectAnimation,
    setDefaultValues,
} from '../../Utils/animation'

interface Props {
    responsive: boolean;
}
interface State {
    showPopUp: boolean;
    todos: Array<any>;

    added: string;
    selected: {id: string, index: number};
    deleted: string;
}

class ToDoList extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            showPopUp: false,
            todos: [],

            added: '',
            deleted: '',
            selected: {id: '', index: 0},
        }
    }

    componentDidMount(): void {
        // Retriveing localStorage data, if it exists
        const todoList = getJson()
        if (todoList) {
            this.setState({ todos: todoList }, () => {
                // Setting the list visible on refresh
                this.updateOrder(todoList)
                setDefaultValues(todoList)
            })
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        const { todos, added, deleted, selected } = this.state
        const { responsive } = this.props

        // Saving in local storage every time the 'todos' state changes
        if (prevState.todos !== todos) {
            saveJson(todos);
        }

        // Refreshing values so that the list stay visible in responsive
        if (prevProps.responsive !== responsive){
            this.updateOrder(todos)
            setDefaultValues(todos)
        }
        
        // Animations
        if (prevState.added !== added) {
            /* Add animation setup */
            const isFirst = todos.findIndex((todo) => todo.id === added) === 0 ? true : false
            const nextIndex = todos.findIndex((todo) => todo.id === added) + 1

            let nextId
            if (todos.length - 1 >= nextIndex && nextIndex === 1) {
                nextId = todos[nextIndex].id
                AddAnimation(added, isFirst, nextId)
            } else {
                AddAnimation(added, isFirst)
            }
        }

        if (prevState.deleted !== deleted) {
            /* Delete animation setup */
            const nextIndex = todos.findIndex((todo) => todo.id === deleted) + 1
            const isFirst = nextIndex === 1 ? true : false

            let nextId
            if(todos.length - 1 >= nextIndex && isFirst){
                nextId = todos[nextIndex].id
                DeleteAnimation(deleted, nextId)
            }
            else {
                DeleteAnimation(deleted)
            }
        }

        if (prevState.selected !== selected) {
            /* Select animation setup */
            if (todos.length !== 1 || selected.index !== todos.length - 1){
                SelectAnimation(selected.id, todos[0].id)
            } else {
                setDefaultValues(todos)
            }
        }
    }      

    showPopUpHandler = (value: boolean) => {
        // Used for updating show state in child component "PopUp"
        this.setState({ showPopUp: value })
    }

    addToDo = (text: string) => {
        // Handles creation of a todo element
        const todoList = this.state.todos
        const todo = {
            id: `todo-${nanoid(5)}`,
            text: text,
            done: false,
        }

        //set state for the add animation
        this.setState({ added: todo.id }) 

        //creating two lists so that new todo can be placed before selected ones, but after unselected ones
        const selectedList = todoList.filter((todo) => todo.done === true)
        const unselectedList = todoList.filter((todo) => todo.done === false)

        //add to list
        let newList = [...unselectedList, todo, ...selectedList]
        this.setState({ todos: newList })
    }

    deleteTodo = (index: number) => {
        /* Handles the deletion of a todo element */
        const todoList = getJson()
        const todoDeleted = todoList.find((todo: any) => todo.id === todoList[index].id)

        this.setState({deleted: todoDeleted.id})

        //timeout for delete animation
        setTimeout(()=>{ 
            //delete from list
            todoList.splice(index, 1)
            this.setState({ todos: todoList })
        }, 500)

        return todoDeleted
    }

    selectToDo = (index: number) => {
        /* Handles the selection of a todo element */

        const todoList = getJson()

        //changing 'selected' class by modifying 'done' property
        if (todoList[index].done) {
            todoList[index].done = false
            this.setState({selected: {id: todoList[index].id, index: index}})
        } else {
            todoList[index].done = true
            this.setState({selected: {id: todoList[index].id, index: index}})
        }
        
        this.setState({ todos: todoList })

        //update order
        this.updateOrder(todoList)
    }

    updateOrder = (todoList: Array<any>) => {
        /* Updates the array order, sorts by boolean value 'done' */
        todoList.sort((a, b) => Number(a.done) - Number(b.done)) //false-first
        this.setState({ todos: todoList })
        console.log("ORDER ", todoList)
    };

    render(): ReactNode {
        const { showPopUp } = this.state
        const todoList = this.state.todos
        return (
            <>
                { this.props.responsive ? (
                    /* MOBILE */ <> 
                        { /* Shows 'PopUp' component if state 'showPopUp' is true */
                            showPopUp && <PopUp responsive={this.props.responsive} addToDo={this.addToDo} showHandler={this.showPopUpHandler} />}
                        <MobileLayout center flexDir='column'>
                            <ToDoContainerMobile flex>
                                <Text width='100%' textAlign='center' className='text-title' mar='30px 0px 64px 0px'>
                                    TODO
                                </Text>
                                <Line />
                                <ListContainerMobile id='todo-list'>
                                    { todoList.length !== 0 ? 
                                        <List>
                                        {
                                            // Rendering ToDo list
                                            todoList.map((todo: any, index: number) => {
                                                return (
                                                    <ToDoElement
                                                        key={todo.id}
                                                        
                                                        id={todo.id}
                                                        index={index}
                                                        className={todo.done ? 'selected' : ''}

                                                        todoData={todo}
                                                        deleteAction={this.deleteTodo}
                                                        selectAction={this.selectToDo}
                                                    />
                                                )
                                            })
                                        }
                                        </List> 
                                        : <></>
                                    }
                                </ListContainerMobile>
                            </ToDoContainerMobile>

                            {/* New ToDo button */}
                            <Box height='30%'>
                                <Button action={this.showPopUpHandler} actionValue={true}>
                                    <BtnInnerContainerMobile center>
                                        <Icon iconName='addIcon' />
                                        <Text className='text-medium'>Nuova Voce</Text>
                                    </BtnInnerContainerMobile>
                                </Button>
                            </Box>
                        </MobileLayout>
                    </>
                ) : (
                    /* DESKTOP */ <>
                    { /* Shows 'PopUp' component if state 'showPopUp' is true */
                        showPopUp && <PopUp responsive={this.props.responsive} addToDo={this.addToDo} showHandler={this.showPopUpHandler} />}
                        <DesktopLayout center>
                            <ToDoContainerDesktop flex flexDir='column'>
                                <ListContainerDesktop id='todo-list' flex flexDir='column' gap={64}>
                                    <Text className='text-title'>TODO</Text>
                                    { todoList.length !== 0 ? 
                                        <List>
                                        {
                                            // Rendering ToDo list
                                            todoList.map((todo: any, index: number) => {
                                                return (
                                                    <ToDoElement
                                                        key={todo.id}
                                                        
                                                        id={todo.id}
                                                        index={index}
                                                        className={todo.done ? 'selected' : ''}

                                                        todoData={todo}
                                                        deleteAction={this.deleteTodo}
                                                        selectAction={this.selectToDo}
                                                    />
                                                )
                                            })
                                        }
                                        </List> 
                                        : <></>
                                    }
                                </ListContainerDesktop>
                            </ToDoContainerDesktop>

                            {/* New ToDo button */}
                            <Button center action={this.showPopUpHandler} actionValue={true}>
                                <BtnInnerContainerDesktop>
                                    <Icon iconName='addIcon' />
                                    <Text className='text-medium'>Nuova Voce</Text>
                                </BtnInnerContainerDesktop>
                            </Button>
                        </DesktopLayout>
                    </>
                )}
            </>
        )
    }
}

export default ToDoList


// Common styles ---------------------------------------

const List = styled(Box)`
    flex-direction: column;
`


// Desktop styles ---------------------------------------

const DesktopLayout = styled(Box)`
    padding: 9vh 9vw;
    flex-direction: column;
    gap: 24px;
    max-height: 100vh;
`

const ToDoContainerDesktop = styled(Box)`
    background-color: var(--surface-color);
    box-shadow: var(--def-shadow);
    border-radius: 32px;
    padding: 80px 160px;
    width: 70%;
`

const ListContainerDesktop = styled(Box)`
    width: 100%;
    max-height: 50vh;
    overflow-y: scroll;
    overflow-x: hidden;
    flex-direction: column;

    ::-webkit-scrollbar-track{
        visibility: visible;
    }::-webkit-scrollbar-thumb{
        visibility: visible;
    }
`

const BtnInnerContainerDesktop = styled(Box)`
    gap: 24px;
    flex-direction: row;
    padding: 16px 32px;
`


// Mobile styles ---------------------------------------

const MobileLayout = styled(Box)`
    height: '100%';
    gap: 24px;
`

const Line = styled.hr`
    margin: 0px 20px;
    width: 80vw;
`

const ToDoContainerMobile = styled(Box)`
    background-color: var(--surface-color);;
    box-shadow: var(--def-shadow);
    flex-direction: column;
    overflow: hidden;
    align-items: center;
    width: 90%;
    height: 80vh;
    border-radius: 0px 0px 32px 32px;
    padding: 0px 15px;
`

const ListContainerMobile = styled(Box)`
    overflow-y: scroll;
    overflow-x: hidden;
    width: 70%;
    max-height: 75vh;
    flex-direction: column;
    margin: 30px 0px;

    ::-webkit-scrollbar-track {
        visibility: hidden;
    }
    ::-webkit-scrollbar-thumb {
        visibility: hidden;
    }
`

const BtnInnerContainerMobile  = styled(Box)`
    padding: 2px 8px;
`