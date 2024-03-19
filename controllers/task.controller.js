const taskSchema = require("../model/task")

exports.addTask = async (req, res) => {
    try {
        const { title, desc, priority, shared, toDate } = req.body
        let images = []
        images.push(`${process.env.IMAGE_URL}/${req.file.path.replace(/\\/g, "/")}`)
        const checkTitle = await taskSchema.findOne({ title })
        if (checkTitle) {
            return res.status(404).send({ message: 'This title is already used', isSuccess: false })
        }
        else {
            const data = taskSchema({
                title, desc, priority, createdBy: req.user.id, shared, toDate, notes: images
            })
            await data.save()
            return res.status(200).send({ message: 'Task is added', Result: data, isSuccess: true })
        }
    } catch (error) {
        console.log('error', error)
        return res.status(500).send({ message: error.message, isSuccess: false })

    }
}
exports.getAllTask = async (req, res) => {
    try {
        const { page = 1, search } = req.query;
        var perPage = req.query.perPage ? req.query.perPage : 25
        const data = await taskSchema
            .find({ createdBy: req.user.id, search })
            .skip(perPage * page - perPage)
            .limit(perPage)
            .sort({ '_id': -1 })
        const count = data.length
        res.status(201).send({
            message: "List of tasks",
            data,
            current: page,
            totalCount: count,
            pages: Math.ceil(count / perPage),
            isSuccess: true
        });
    } catch (error) {
        console.log('error', error)
        return res.status(500).send({ message: error.message, isSuccess: false })
    }
}
exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params
        const response = await taskSchema.findOne({ _id: id, createdBy: req.user.id })
        return res.status(200).send({ message: 'Get task details by id', data: response, isSuccess: true })

    } catch (error) {
        console.log('error', error)
        return res.status(500).send({ message: error.message, isSuccess: false })
    }
}
exports.deleteTaskById = async (req, res) => {
    try {
        const { id } = req.params
        await taskSchema.findOneAndDelete({ _id: id, createdBy: req.user.id })
        return res.status(200).send({ message: 'This Task is deleted', isSuccess: true })

    } catch (error) {
        console.log('error', error)
        return res.status(500).send({ message: error.message, isSuccess: false })
    }
}
exports.updateTaskById = async (req, res) => {
    try {
        const { id } = req.params
        const { title, desc } = req.body
        const response = await taskSchema.findByIdAndUpdate(id, { title, desc })
        return res.status(200).send({ message: 'This Task is updated', response, isSuccess: true })
    } catch (error) {
        return res.status(500).send({ message: error.message, isSuccess: false })
    }
}