import React from 'react';

const Header = (props) =>
   (
      <div className='header'>
         <div className='container'>
            <h1 className='header__title'>{props.title}</h1>
            <h2 className='header__subtitle'>{props.subtitle}</h2>
         </div>
      </div>
   );

// const Header = (props) => {
//    return (
//       <div>
//          <h1>{props.title}</h1>
//          <h2>{props.subtitle}</h2>
//       </div>
//    );
// };


export default Header;