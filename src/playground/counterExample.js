class Counter extends React.Component {
   constructor(props){
      super(props);
      this.addOne = this.addOne.bind(this);
      this.subtractOne = this.subtractOne.bind(this);
      this.resetCount = this.resetCount.bind(this);
      this.state = {
         count: 0
      };
   }

   componentDidMount(){
      try {
         const countString = localStorage.getItem('count');
         if (!countString) return;

         const count = parseInt(countString);
         if (!count) return;

         this.setState(()=>({count: count}));
      } catch (e) {
         console.log("error")
       }
   }

   componentDidUpdate(prevProps, prevState){
      if (prevProps.count !== this.state.count){
         localStorage.setItem('count', this.state.count);
      }
   }

   addOne() {
      this.setState((prevState)=>{
         return {
            count: prevState.count += 1
         };
      });
      console.log("count", this.count);
   }

   subtractOne() {
      this.setState((prevState)=>{
         return {
            count: prevState.count -= 1
         };
      });
      console.log("count", this.count);
   }

   resetCount() {
      this.setState(()=>{
         return {
            count: 0
         };
      });
      console.log("count", this.count);
   }

render() {
      return (
         <div>
            <h1>Count: {this.state.count} </h1>
            <button onClick={this.addOne}>+1</button>
            <button onClick={this.subtractOne}>-1</button>
            <button onClick={this.resetCount}>Reset</button>
         </div>
      );
   }
}

Counter.defaultProps = { count: 10 }

ReactDOM.render(<Counter />, document.getElementById('app'));
