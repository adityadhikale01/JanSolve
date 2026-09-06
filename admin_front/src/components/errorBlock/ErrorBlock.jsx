import "./ErrorBlock.css";

function ErrorBlock({ errors = [], messageToShow }) {
    const hasErrors = errors.length > 0;
    const hasMessage = Boolean(messageToShow);

    if (!hasErrors && !hasMessage) return null;

    return (
        <>
            {hasMessage && (
                <div className="message-block" role="alert">
                    <span className="icon">i</span>
                    <p>{messageToShow}</p>
                </div>
            )}

            {hasErrors && (
                <div className="error-block" role="alert">
                    <div className="error-header">
                        <span className="icon">!</span>
                        <h3>Please fix the following errors</h3>
                    </div>

                    <ul>
                        {errors.map((error, index) => (
                            <li key={error.field || index}>
                                {error.message || error}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default ErrorBlock;
