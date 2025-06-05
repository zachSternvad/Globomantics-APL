import { Component } from 'react';
import logo from './GloboLogo.png';

class Header extends Component {
    render() {
        return (
        <header className="row">
            <div className="col-md-5">
                <img src={logo} className='logo' alt="logo" />
             </div>
            <div className="col-md-7 mt-5 subtitle">Provide houses around whole the world
            </div>
    </header>
        );
    }
}
export default Header;