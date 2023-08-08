const Responses = {
    success: (res, result, message = "OK") => {
        res.status(200).send({
            message,
            result
        });
    },
    badRequest: (res, result, next) => {
        res.status(200).send({
            message: "BAD_REQUEST",
            result
        });
        next(result);
    },
    failed: (res, result, next) => {
        res.status(500).send({
            message: "ERROR",
            result
        });
        next(result);
    },
    tokenError: (res, result, next) => {
        res.status(401).send({
            message: "ERROR",
            result
        })
    }
};

export default Responses;
