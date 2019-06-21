import Organization from '../../model/Organization'


const post = async (req, res) => {
  const { org } = req.params
  
  const orgData = await Organization.findOne({ name: org })
  
  if (orgData) {
    return res.status(400).send({
      err: 'Organization already exist!'
    })
  }
  
  try {
    const newOrg = new Organization({ name: org })
    await newOrg.save()
    
    return res.status(201).send(newOrg)
  } catch (error) {
    return res.status(500).send({
      err: error.message,
    })
  }
}

const organizationController = {
  post,
}

export default organizationController