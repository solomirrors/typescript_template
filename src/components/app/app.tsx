import * as React from "react";
import './app.scss'

const App = () => {
    return(
        <React.Fragment>
            <div id='structure'>
                <div id='opacity'/>
                <div id='content'>
                    <div id='template'>TypeScript React Template</div>
                    <h4 id='description'>Directory Style: Contains the styles you use</h4>
                    <h4 id='description'>Directory Script: Contains the scripts you are using.</h4>
                    <h4 id='description'>Directory Font: Contains the fonts you use.</h4>
                    <h4 id='description'>Directory Image: Contains the images you are using.</h4>
                </div>
            </div>
        </React.Fragment>
    )
}

export default App;