import React from 'react';

export default class AddOption extends React.Component {
   state = { error: undefined };
   constructor(props){
      super(props);
      this.handleAddOption = this.handleAddOption.bind(this);
   }

   handleAddOption=(e)=>{
      e.preventDefault();
      const option=e.target.elements.option.value.trim();
      const error = this.props.handleAddOption(option);
      this.setState(()=> ({ error: error }));
      e.target.elements.option.value = '';
   };


   render(){
      return (
         <div>
            {this.state.error && <p className='add-option-error'>{this.state.error}</p>}
            <form onSubmit={this.handleAddOption} className="add-option">
               <input className='add-option__input' type="text" name="option" />
               <button className='button'>Add Option</button>
            </form>
         </div>
      );
   };
};
