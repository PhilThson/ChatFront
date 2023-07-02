const ValidationMessage = ({ message }) => {
  return (
    <div className='alert alert-warning' role='alert'>
      <h3 className='fst-italic text-warning'>{ message }</h3>
    </div>
  );
};

export default ValidationMessage;