import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss'
import back from './background.jpg'

const App = () => {
    return(
        <React.Fragment>
            <div className='react-scss'>TypeScript React Template</div>
        </React.Fragment>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'))

