const Notification = ({ message }) => {
    if (message === [null, null]) return null;
    return (
        <div className={message[1]}>
            {message[0]}
        </div>
    )
}

export default Notification
