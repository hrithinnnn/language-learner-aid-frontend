import React from 'react'
import {Link} from 'react-router-dom'

export default function Footer() {

    return (
        <footer>
           <center> 
                <div className="card1">
                    <div className="card-info">
                        <p className="title"><Link to="/create">New Note</Link></p>
                    </div>
                </div>
                {/* <div class="card1">
                    <div class="card-info">
                        <p class="title"><Link to="/translator">Translator</Link></p>
                    </div>
                </div> */}
            </center>
        </footer>
    )
}
