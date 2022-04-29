class VisibilityToggle extends React.Component {
   constructor(props){
      super(props);
      this.handleToggleVisibility=this.handleToggleVisibility.bind(this);
      this.state = {
         visibility: false
      };
   }

   handleToggleVisibility(){
      this.setState((prevState)=>{
         return {
            visibility: !prevState.visibility
         };
      });
   }

   render() {
      let vis = this.state.visibility;
      console.log('this.state.visibility', this.state.visibility, 'vis', vis);
      return (
         <div>
            <h1>Visibility Toggle</h1>
            <button onClick={this.handleToggleVisibility}>{ this.state.visibility && ("Hide Details") || ("Show Details") }</button>
            <p>{ this.state.visibility && ("Hey, these are some details you can sometimes see.") || ("") }</p>
         </div>
      );
   }
}

ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));