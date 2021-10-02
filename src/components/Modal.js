import "../css/Modal.css"
import { FaTimes } from 'react-icons/fa'
const Modal = ({show, cancel, children, title }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <h3>{title} <FaTimes className='delete-button' onClick={cancel}/></h3>
                <hr/>
                {children}
            </section>
        </div>
    )
}

export default Modal