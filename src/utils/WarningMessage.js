const WarningMessage = ({ message }) => {
  return (
    <div className="row">
      <div className="column small-12">
        <div className="alert-warning" role="alert">
          <h3 className="fst-italic text-warning">{message}</h3>
        </div>
      </div>
    </div>
  );
};

export default WarningMessage;
