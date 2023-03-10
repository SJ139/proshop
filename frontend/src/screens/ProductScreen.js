import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'
import { useNavigate } from 'react-router-dom'

const ProductScreen = ({history}) => {
    //The const{id}=useParams specific to Redux v8 previous versions use match.params.
    const [qty, setQty] = useState (0)
    const {id} = useParams()
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
    const navigate=useNavigate()

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [id])

    const addToCartHandler = () =>{
        navigate(`/cart/${id}?qty=${qty}`)
        
    }

    // const product = {}
  
    return(
        <>
    <Link className='btn btn-dark my-3' to='/'> Go Back
    </Link>
    {loading? < Loader/> : error ? <Message variant='danger'>{error}</Message>: 
    (
        <Row>
        <Col md={6}>
            <Image src={product.image}  alt={product.name} fluid/>
        </Col>
        <Col md={3}>
         <ListGroup variant='flush'>
             <ListGroup.Item>
                 <h3>{product.name}</h3>
             </ListGroup.Item>
             <ListGroup.Item>
                 <Rating value={product.rating} text={` ${product.numReviews}  reviews`}></Rating>
             </ListGroup.Item>
             <ListGroup.Item>
                 Price: ${product.price}
             </ListGroup.Item>
             <ListGroup.Item>
                 Description: {product.description}
             </ListGroup.Item>
         </ListGroup>
         </Col>   
         <Col md ={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <Row>
                            <Col>
                                Price:
                            </Col>
                            <Col>
                                <strong>${product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>
                                Status:
                            </Col>
                            <Col>
                                {product.countInStock > 0 ? 'In Stock' : "Out Of Stock"}
                            </Col>
                        </Row>
                    </ListGroupItem>
                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        QTY
                                    </Col>
                                    <Col>
                                        <Form.Control as='select' value={qty} onChange={(e) => 
                                        setQty(e.target.value)}>
                                        {
                                        [...Array(product.countInStock).keys()].map(x => (
                                        <option key={x+1} value={x+1}>{x+1}</option>            
                                        ))}
                                        
                                        ))
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                    <ListGroupItem>
                        <Button 
                        onClick={addToCartHandler}
                        className='btn-block' type='button'
                        disabled={product.countInStock === 0}>Add To Cart</Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
         </Col>
    </Row>
    )}
    
    </>
    ) 
}

    export default ProductScreen