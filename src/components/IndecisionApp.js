import React from 'react';

import AddOption from './AddOption';
import Options from './Options.js';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';

export default class IndecisionApp extends React.Component {
   state = {
      options: [],
      selectedOption: undefined
   };

   handleDeleteOptions=()=>{ this.setState(() => ({ options: [] }))}

   handleDeleteOption=(optionToRemove)=>{
      this.setState((prevState)=>({
         options: prevState.options.filter((option)=> optionToRemove !== option)
      }))
   };

   handleClearSelectedOption=()=>{
      this.setState(
         ()=>(
            { selectedOption: undefined }
         )
      )
   };

   handlePick=()=>{
      let idx=Math.floor((Math.random()*this.state.options.length));
      let msg=`index: ${idx} - value: ${this.state.options[idx]}`;
      //alert(msg);
      console.log(msg);
      this.setState((prevState)=>(
         { selectedOption: this.state.options[idx] }
      ));
   };

   handleAddOption=(option)=>{
      if (!option){
         return 'Enter valid value to add.';
      } else if (this.state.options.indexOf(option)>-1){
         return 'Duplicate option';
      }
      this.setState((prevState)=>({options: prevState.options.concat([option])}));
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
      console.log("componentDidUpdate:this.state", this.state);
   }

   render() {
      const title = 'Indecision';
      const subtitle = 'Put your life in the hands of a computer';
      console.log("IndecisionApp:render:this.props", this.props);

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
            <OptionModal
               appElement={this.props.app}
               selectedOption={this.state.selectedOption}
               handleClearSelectedOption={this.handleClearSelectedOption}
            />
         </div>
      );
   };
};