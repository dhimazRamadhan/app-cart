import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="bg bg-dark" style={{ width: "100%", display: "flex", justifyContent: "center", gap: '4px' }}>
      {/* <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" /> */}
      <Spinner animation="grow" variant="light" />
      {/* <Spinner animation="grow" variant="dark" /> */}
    </div>
  );
};

export default Loader;
