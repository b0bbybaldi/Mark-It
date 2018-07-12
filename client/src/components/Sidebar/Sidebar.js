import React, { Component } from "react";
import "./Sidebar.css";
import API from "../../utils/API";


class Sidebar extends Component {
    constructor(){
        super();
		this.handleFocus = this.handleFocus.bind(this);
		this.handleChange = this.handleChange.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.handleBlur = this.handleBlur.bind(this);		
        this.state = {
            userId: "6e91a560-80a8-11e8-a8aa-71792012fa45",
            content_add: "add +",
			width: 100,
            categories: []
        };
    }

    componentDidMount() {
        this.loadCategories();
    };

    //grabs all categories from API
    loadCategories = () => {
        API.getCategories().then(res => {
            this.setState({ categories: res.data })
            console.log(this.state.categories)
        }
        ).catch(error => {
            console.log("ERROR", error);
        })
    }

    //when you click on the input box, it clears the space in order in enter user value
    handleFocus(event) {
        console.log('handleFocus:', event)
		this.setState({ content_add: "" });
	}
    
    //looks out for any changes in input box and updates instantly
	handleChange(event) {
        console.log('handleChange:', event)
		const usr_input = event.target.value;
        this.setState({ content_add: usr_input });
	}

    //looks for enter
	handleKeypress(event) {
		if (event.key === "Enter") {
            var category = {
                UserUuid: this.state.userId,
                name: this.state.content_add
            }
            API.saveCategory(category);
            this.setState({
                content_add: ""
            });
           let time = setTimeout(() => {
            this.loadCategories();
           }, 100); 
        }
    }


    //when clicking away from input box, the input box then displays the value of the box
    handleBlur(event) {
        console.log('handleBlur:', event)
		this.setState({ content_add: "add +" });
    }

    render() {
        return (
            <div className="sidenav">
                {this.state.categories.map(category => { 
                    return  <div> 
                                <h1 value={category.id}>{category.name} </h1>
                            </div>
                })}
                
                <input
					id="add"
					type="text"
					name="initvalue"
					autoComplete="off"
				    maxLength="70"
					onFocus={this.handleFocus}
					onChange={this.handleChange}
                    onKeyPress={this.handleKeypress}
                    onBlur={this.handleBlur}
					value={this.state.content_add}
					style={{ width: this.state.width }}
				/>
            </div>
        )
    }
}



export default Sidebar;


