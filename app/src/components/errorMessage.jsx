import React from "react";
import { Dialog, Text } from "@rneui/themed";

const ErrorMessage = ({ showError, setShowError, error }) => {
    return (
        <Dialog
            isVisible={showError}
            onBackdropPress={() => setShowError(false)}
        >
            <Dialog.Title title="Error" />
            <Text>{error}</Text>
        </Dialog>

    );
};

export default ErrorMessage;