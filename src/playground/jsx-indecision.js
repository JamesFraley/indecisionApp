console.log("App.js is running!");

const appRoot = document.getElementById('app');

const app={
   title: "Indecision App",
   subtitle: "Bed time!",
   options: []
};

const onFormSubmit = (event) => {
   event.preventDefault();
   const option = event.target.elements.option.value;
   if (option) {
      app.options.push(option);
      event.target.elements.option.value="";
   }
   renderPage();
}

const onRemoveAll = () => {
   app.options = [];
   renderPage();
}

const onMakeDecision = () => {
   const x = Math.floor((Math.random()*app.options.length));
   const option = app.options[x];
   console.log(option);
}

const numbers = [ 55, 100, 150 ];

const renderPage = () => {
   const template = (
      <div>
         <h1> {app.title} </h1>
         { app.subtitle && (<p> {app.subtitle} </p>)}
         <p>{ app.options.length > 0 && "Here are your options:" || "No options" }</p>
         <p>{app.options.length}</p>
         <ol>
         </ol>
         <form onSubmit={onFormSubmit}>
            <button disabled={app.options.length===0} onClick={onMakeDecision}>What should I do?</button>
            <button onClick={onRemoveAll}>Remove All</button>
            {
               numbers.map((number, idx)=>{
                  return <p key={idx}>Number: {number}</p>
               })
            }
            <ol>
            {
               app.options.map((option, idx)=> <li key={idx}>{option}</li> )
            }
            </ol>
            
            <input type="text" name="option"/>
            <button>Add Option</button>

         </form>
      </div>
   );
   ReactDOM.render(template, appRoot);
}

renderPage();

/*
babel \
   src/app.js \
   --out-file=public/scripts/app.js \
   --presets=env,react \
   --watch
*/
