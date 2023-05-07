import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
    state = {
        listItems: [],
        newTodoTitle: "",
        newTodoContent: "",
    };

    componentDidMount() {
        axios
            .get("https://todolist-backend-production-efd5.up.railway.app/todo/list")
            .then((response) => {
                this.setState({ listItems: response.data });
            })
            .catch((error) => {
                this.setState({ text: "Error fetching data" });
            });
    }

    handleNewTodoTitleChange = (event) => {
        this.setState({ newTodoTitle: event.target.value });
    };

    handleNewTodoContentChange = (event) => {
        this.setState({ newTodoContent: event.target.value });
    };

    handleAddTodo = () => {
        const newTodo = {
            title: this.state.newTodoTitle,
            content: this.state.newTodoContent,
            completed: false,
        };

        axios
            .post("https://todolist-backend-production-efd5.up.railway.app/todo/add", newTodo, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                this.setState((prevState) => ({
                    listItems: [...prevState.listItems, response.data],
                    newTodoTitle: "",
                    newTodoContent: "",
                }));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        const completedColor = "#a9ffb7";
        const notCompletedColor = "#ffb7b2";

        const containerStyle = {
            backgroundColor: "#303030",
            color: "#fff",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "1rem"
        };

        const formStyle = {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "500px",
            marginBottom: "1rem"
        };

        const inputStyle = {
            marginRight: "1rem",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "none",
            boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
            width: "100%"
        };

        const buttonStyle = {
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "0.5rem",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer"
        };

        const listStyle = {
            listStyle: "none",
            padding: 0,
            margin: 0,
            width: "100%",
            maxWidth: "500px"
        };

        const itemStyle = {
            backgroundColor: notCompletedColor,
            color: "#303030",
            borderRadius: "4px",
            padding: "1rem",
            marginBottom: "0.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        };

        const completedStyle = {
            backgroundColor: completedColor
        };

        const notCompletedStyle = {
            backgroundColor: notCompletedColor
        };

        const titleStyle = {
            marginBottom: "0.5rem"
        };

        return (
            <div style={containerStyle}>
                <h1 style={{marginBottom: "1rem"}}>Todo List</h1>
                <form style={formStyle}>
                    <input
                        type="text"
                        placeholder="Title"
                        style={inputStyle}
                        value={this.state.newTodoTitle}  // Fixed here
                        onChange={this.handleNewTodoTitleChange}
                    />
                    <input
                        type="text"
                        placeholder="Content"
                        style={inputStyle}
                        value={this.state.newTodoContent}  // Fixed here
                        onChange={this.handleNewTodoContentChange}
                    />
                    <button style={buttonStyle} onClick={this.handleAddTodo}>
                        Add
                    </button>
                </form>
                <ul style={listStyle}>
                    {this.state.listItems
                        .sort((a, b) => (a.completed && !b.completed ? 1 : -1))
                        .map(item => (
                            <li key={item.id}
                                style={{...itemStyle, ...(item.completed ? completedStyle : notCompletedStyle)}}>
                                <h2 style={titleStyle}>{item.title}</h2>
                                <p>{item.content}</p>
                                <p>Completed: {item.completed ? "YES" : "NO"}</p>
                            </li>
                        ))}
                </ul>
            </div>
        );
    }
}

export default App;