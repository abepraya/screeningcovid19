import React from 'react';

import './SymptomsItems.css';

function Symptomsitems(props) {

    return (
            <ul className="grid-container" key={props.id}>
                    <li>
                        <label>
                            <input type="checkbox" onChange={props.onChange} checked={props.checked} value={props.value} />
                            {props.title}
                        </label>
                    </li>
            </ul>
    )
}

export default Symptomsitems;
