import { Button } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import CheckoutPage from "../pages/checkout";

const Layout = () => {
    const navigate = useNavigate()
    return (
        <div className="bg bg-dark">
            <div className='bg bg-dark'>
                <div class="container">
                    <div class="row align-items-start pt-5">
                        <div class="col-6 text-light">
                            <h1 className='text-align-start fw-bold fs-1'>
                                A Website That Sells Stuff, Whatever It Is <span className='text-warning'>:P</span>
                            </h1>
                        </div> 
                        <div class="col-6 text-light d-flex justify-content-end gap-3">
                            {/* <div>
                                Home
                            </div>
                            <div>
                                Cart
                            </div> */}
                        </div>      
                    </div>

                    {/* <div class="row justify-content-end">
                        <div className='col-4 mb-5 mt-5'>
                            <input class="form-control" placeholder="Search Product Name.."/>
                        </div>
                    </div> */}
                </div>
            </div>
            <Outlet className="bg bg-dark" />
            <CheckoutPage />
        </div>
    );
}

export default Layout;