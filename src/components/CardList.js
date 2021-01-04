import React from 'react';
import Card from './Card';

const CardList = ({robots}) => {
    //set to true to cause the ErrorBoundry component to take over via the componentDidCatch() lifecycle hook 
    if(false){
        throw new Error('OH NOOO')
    }

    return (
        <div>
            {
                //generate cards from the list of robots with the map function.
                robots.map((user,i) => {
                    return <Card key={i} id={robots[i].id} name={robots[i].name} email={robots[i].email}/>
                })
            }
        </div>
    );
}

export default CardList;