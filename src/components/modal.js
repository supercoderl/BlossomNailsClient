const Modal = ({ open, title }) => {
    return (
        <div class={`popup-container ${open && 'active'}`}>
            <div class="popup-box">
                <h1>{title}</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore eius itaque molestiae sit quidem ullam, quis ut molestias quas dolores cum ratione, sint quibusdam iusto.</p>
                <div className="d-flex">
                    <button class="close-btn">OK</button>
                    <button class="close-btn">OK</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;