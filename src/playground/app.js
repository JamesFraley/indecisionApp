class IndecisionApp extends React.Component {
   constructor(props){
      super(props);
      this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
      this.handlePick = this.handlePick.bind(this);
      this.handleAddOption = this.handleAddOption.bind(this);
      this.handleDeleteOption = this.handleDeleteOption.bind(this);

      this.state = {
         options: []
      };
   }

   componentWillUnmount(){console.log("componentWillUnmount")}

   componentDidMount(){
      try {
         const json = localStorage.getItem('options');
         if (json){
            const options = JSON.parse(json);
            this.setState(()=>({options: options}))
            }
         } catch (e) {

      }
   }

   componentDidUpdate(prevProps, prevState){
      if (prevState.options.length !== this.state.options.length){
         const json = JSON.stringify(this.state.options);
         localStorage.setItem('options', json);
      }
   }

   handleDeleteOptions(){ this.setState(() => ({ options: [] }))}

   handleDeleteOption(optionToRemove){
      this.setState((prevState)=> ({
         options: prevState.options.filter((option)=> optionToRemove !== option)
      }))
   }

   handlePick(){
      let idx=Math.floor((Math.random()*this.state.options.length));
      let msg=`index: ${idx} - value: ${this.state.options[idx]}`;
      console.log(msg);
   };

   handleAddOption(option){
      if (!option){
         return 'Enter valid value to add.';
      } else if (this.state.options.indexOf(option)>-1){
         return 'Duplicate option';
      }

      this.setState((prevState)=>({options: prevState.options.concat([option])}));
   }

   render() {
      const title = 'Indecision';
      const subtitle = 'Put your life in the hands of a computer';

      return (
         <div>
            <Header title={title} subtitle={subtitle} />
            <Action
               hasOptions={this.state.options.length>0}
               handlePick={this.handlePick} />
            <Options
               options={this.state.options}
               handleDeleteOptions={this.handleDeleteOptions}
               handleDeleteOption={this.handleDeleteOption}/>
            <AddOption
               handleAddOption={this.handleAddOption} />
         </div>
      );
   };
}

const Header = (props) => {
   return (
      <div>
         <h1>{props.title}</h1>
         <h2>{props.subtitle}</h2>
      </div>
   );
};

const Action = (props) => {
   return (
      <div>
         <button
            onClick={props.handlePick}
            disabled={!props.hasOptions} >
            What should I do?
         </button>
      </div>
   );
}

const Options = (props) => {
   console.log("options - props", props);
   return (
      <div>
         <button onClick={props.handleDeleteOptions}>Remove All</button>
         { props.options.length === 0 && <p>Please add an option tog get started</p> }

         {props.options.map((option) => (
            <Option
               key={option}
               optionText={option}
               handleDeleteOption={props.handleDeleteOption} />
            ))
         }
      </div>
   );
};

const Option = (props) => {
   return (
      <div>
         {props.optionText}
         <button
            onClick={(e)=>{
               props.handleDeleteOption(props.optionText);
            }}>
            remove
         </button>
      </div>
   );
}

// class Option extends React.Component {
//    render(){
//       return (
//          <div>
//              {this.props.optionText}
//          </div>
//       );
//    };
// };


class AddOption extends React.Component {
   constructor(props){
      super(props);
      this.handleAddOption = this.handleAddOption.bind(this);
      this.state = {
         error: undefined
      };
   }

   handleAddOption(e){
      e.preventDefault();
      const option=e.target.elements.option.value.trim();
      const error = this.props.handleAddOption(option);
      this.setState(()=> ({ error: error }));
      e.target.elements.option.value = '';
   }

   render(){
      return (
         <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.handleAddOption}>
               <input type="text" name="option" />
               <button>Add Option</button>
            </form>
         </div>
      );
   };
};

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));