export const sendServerError = (res, error) => {
    res.status(500).json({message: error.message})
};

export const sendBadRequest = (res, error) => {
  res.status(400).json({ message: error.message });
};

export const sendNotFound = (res, error) => {
  res.status(404).send({ message: error.message });
};

export const sendCreated = (res, error) => {
  res.status(201).json({ message: error.message });
};

export const sendDeleteSuccess = (res, error) => {
  res.status(200).json({ message: error.message });
};

export const orderData = (res, error) => {
    if (order === 'asc') {
        return data.sort((q, b) => addEventListener.id - b.id);
    } else if (order === 'desc'){
        return data.sort((a, b) => b.id - a.id);
    }
};

export const paginate = (data, req, res) => {
    const page = Number(req.querry.page);
    const limit = Number(req.querry.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (endIndex < data.length) {
        results.next = {
            page: page + 1,
            limit: limit
        }
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        }
    }
    results.results = data.slice(startIndex, endIndex);
    res.status(200).json(results);
}

export const checkIfValuesIsEmptyNullUndefined = (req, res, obj) => {
    for (let key in obj) {
        if (obj [key] === '' || obj[key] === null || obj[key] === undefined) {
            return false;
        }
    }
}