import Member from '../../model/Member'
import Organization from '../../model/Organization'

const post = async (req, res) => {
  const { org } = req.params
  const payload = req.body

  const orgData = await Organization.findOne({ name: org })

  if (!orgData) {
    return res.status(400).send({
      err: "Organization couldn't be found."
    })
  }

  const newMember = new Member({
    ...payload,
    organizationId: orgData._id,
  })

  try {
    await newMember.save()
    return res.status(201).send(newMember)
  } catch (error) {
    return res.status(500).send({
      err: error.message,
    })
  }
}

const getByOrg = async (req, res) => {
  const { org } = req.params

  const orgData = await Organization.findOne({ name: org })

  if (!orgData) {
    return res.status(400).send({
      err: "Organization couldn't be found."
    })
  }

  try {
    const membersByOrg = await Member
      .find({ organizationId: orgData._id })
      .sort('-followersAmount')

    return res.status(200).send(membersByOrg)
  } catch (error) {
    return res.status(500).send({
      err: error.message,
    })
  }
}

const memberController = {
  post,
  getByOrg,
}

export default memberController