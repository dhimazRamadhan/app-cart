import { useEffect, useState } from "react";
import { httpService } from "../../utils/service";
import { Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, getProductDetail } from "../../store/product/action";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCancel, faCartArrowDown, faEnvelope, faEye, faShoppingCart, faStar, faX } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';
import axios from "axios";
import Swal from 'sweetalert2';

const ListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { entities, loading } = useSelector((state) => state.product);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [cart, setCart] = useState([])
  const [keySearch, setKeySearch] = useState("")

  const fetchProducts = async () => {
    dispatch(getAllProduct(keySearch));
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = async (param) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${param}`)
      setSelectedProduct(response.data);
      console.log(selectedProduct.title)
      setIsOpen(true)
    } catch (error) {
      console.log(error) 
    }
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const addCart = async (param) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${param}`)
      const selectedProduct = response.data;
      setCart((prevCart) => [...prevCart, selectedProduct]);    
      Toast.fire({
        icon: "success",
        title: "Success Added to Cart"
      });
    } catch (error) {
      Toast.fire({
        icon: "danger",
        title: "Signed in successfully"
      }); 
    }
  }

  const [totalPrice, setTotalPrice] = useState(0);
  
  const calculateTotalPrice = () => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  };

  const handleSearch = (e) => {
    setKeySearch(e.target.value)
  }

  useEffect(() => {
    fetchProducts();
    calculateTotalPrice();
  }, [cart, keySearch]);

  return (
    <div className='bg bg-dark text-light'>
      <div className="container row justify-content-end">
          <div className='col-4 mb-5 mt-5' id="productList">
              <input class="form-control" placeholder="Search Product Name.." onChange={handleSearch}/>
          </div>
      </div>
      <div className="container d-flex justify-content-between flex-wrap gap-2">
          {entities.map((product, index) => (
              <div className="card text-bg-dark shadow-lg" key={index}>
                <img id="img" src={product.thumbnail} className='wrap w-100' style={{height: '170px'}}/>
                <div className="card-body">
                    <h5 className="card-title text-warning mt-1">{product.title}</h5>
                    <p className="card-texts">{product.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-between gap-1">
                    <div className='text-success'>
                        ${product.price}
                    </div>
                    <div>
                        <button className="btn btn-warning btn-sm text-dark me-1" type='button' onClick={() => openModal(product.id)}>
                            <FontAwesomeIcon icon={faEye} />
                        </button>
                        <button className="btn btn-warning btn-sm text-dark" type='button' onClick={() => {addCart(product.id); notify()}}>
                            <FontAwesomeIcon icon={faShoppingCart} />
                        </button>
                    </div>  
                </div>
              </div>
          ))}
      </div>
    
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
        className="bg bg-dark position-absolute top-50 start-50 translate-middle shadow-lg"   
      >
          <div className="card text-bg-dark shadow-lg">
              {/* <img className='wrap w-100' style={{height: '170px'}}/> */}
              <div className="card-body">
                  <h5 className="card-title text-warning mt-1 d-flex justify-content-between align-items-center">
                    {selectedProduct.title}       
                    <small className="fs-6 text-light" >
                      <FontAwesomeIcon icon={faStar} className="mx-1 text-warning" />{selectedProduct.rating}
                    </small>              
                  </h5>
                  <p className="card-texts">{selectedProduct.description}</p>
                  <small className="text-secondary">Brand: {selectedProduct.brand} / {selectedProduct.category}</small>
                  <small className="d-flex justify-content-start align-items-center mt-3">
                  </small>
              </div>
              <div>
              </div>
              <div className="card-footer d-flex justify-content-between gap-1">
                  <div className='text-success'>
                      ${selectedProduct.price}
                  </div>
                  <div>
                      <button className="btn btn-warning btn-sm text-dark" type='button'onClick={() => addCart(selectedProduct.id)}>
                          <FontAwesomeIcon icon={faShoppingCart} />
                      </button>
                  </div>  
              </div>
            </div>
      </Modal>

      <div id="cart" className="mt-5 mx-5 d-flex justify-content-center">
        {/* Menampilkan isi cart */}
        {/* <h4>Cart:{cart.}</h4> */}
        <div className="card bg bg-dark text-light">
          <div className="card-header d-flex justify-content-between">
            <div>
              <FontAwesomeIcon icon={faShoppingCart} className="text-warning pe-1" />
              Cart
            </div>
            <small className="text-secondary">{cart.length} Item</small>
          </div>
          {cart.map((item, index) => (
          <div className="card-body">
            <div className="d-flex justify-content-between">
            <h6 key={index}>{item.title}</h6>
            <h6 key={index} className="text-success">${item.price}</h6>
          </div> 
          <hr />
          </div>       
          ))}
          <div className="d-flex justify-content-end card-footer text-warning">
              <h1>${totalPrice}</h1>
          </div>
        </div>
      </div>

    </div> 
  );
};

export default ListPage;
