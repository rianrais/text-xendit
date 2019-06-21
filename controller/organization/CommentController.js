import Comment from '../../model/Comment'
import Organization from '../../model/Organization'

const post = async (req, res) => {
  const { org } = req.params
  const { content } = req.body

  const orgData = await Organization.findOne({ name: org })

  if (!orgData) {
    return res.status(400).send({
      err: "Organization couldn't be found."
    })
  }

  try {
    const comment = await new Comment({
      content,
      organizationId: orgData._id,
    })
    await comment.save()
    
    return res.status(201).send({
      msg: 'Comment created!'
    })
  } catch (error) {
    return res.status(500).send({
      err: error.message,
    })
  }
}

const get = async (req, res) => {
  const { org } = req.params

  const orgData = await Organization.findOne({ name: org })

  if (!orgData) {
    return res.status(400).send({
      err: "Organization couldn't be found."
    })
  }

  const comments = await Comment.find({ organizationId: orgData, isDeleted: false })

  return res.status(200).send(comments)
}

const softDelete = async (req, res) => {
  const { org } = req.params

  const orgData = await Organization.findOne({ name: org })

  if (!orgData) {
    return res.status(400).send({
      err: "Organization couldn't be found."
    })
  }

  try {
    const comments = await Comment.updateMany({
      organizationId: orgData._id,
      isDeleted: false,
    }, {
      isDeleted: true,
    })

    return res.status(200).send({
      msg: `Successfully deleted ${comments.nModified} comments from ${org} organization!`
    })

  } catch (error) {
    return res.status(500).send({
      err: error.message,
    })
  }
}

const commentController = {
  post,
  get,
  softDelete,
}


export default commentController