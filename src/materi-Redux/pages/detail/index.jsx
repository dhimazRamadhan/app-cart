import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../store/product/action";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

const DetailPage = () => {
  const { id } = useParams();
  const { entity } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const fetchProduct = (productId) => {
    dispatch(getProductDetail(productId));
  };
  useEffect(() => {
    fetchProduct(id);
  }, []);
  return (
    <Container>
      <Row>
        <Col md={{ span: 4, offset: 2 }}>
          <Image
            rounded
            src={entity.image}
            style={{ height: "100%", width: "100%", objectFit: "contain" }}
          />
        </Col>
        <Col md={4}>
          <h3>{entity.title}</h3>
          <p>{entity.description}</p>
          <h5>{entity.price}</h5>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailPage;
