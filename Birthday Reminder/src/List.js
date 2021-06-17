import React, {useState} from 'react';
import { Button } from 'react-bootstrap';

const List = ({people}) => {
    return (
        <React.Fragment>
            {people.map((person) => {
                return (
                    <MyComponent obj={person} key={person.id} />
                )
            })
            }
        </React.Fragment>

    );
};

const MyComponent = (props) => {
    const [person, setPerson] = useState(props.obj);
    const {id, name, age, image} = person;
    return (
        <article key={id} className="person">
            <img src={image} alt={name} />
            <div>
                <h4>{name}</h4>
                <p>{age} years</p>   
            </div>
            <Button variant="remove" onClick={(e) => e.target.parentNode.parentNode.removeChild(e.target.parentNode)}>Remove</Button>
        </article>
    );
}
export default List;