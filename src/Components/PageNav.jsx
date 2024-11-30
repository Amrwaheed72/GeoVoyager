import { Link } from "react-router-dom"

function PageNav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home Page</Link>
                </li>
                <li>
                    <Link to='/product'>Products</Link>
                </li>
                <li>
                    <Link to='/pricing'>Pricing</Link>
                </li>
            </ul>
        </nav>
    )
}

export default PageNav
