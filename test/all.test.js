const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app.js')

chai.use(chaiHttp)

const expect = chai.expect

describe('A successful flow from creating organization, member, comment and delete comment before getting the deleted comment again:', () => {
  it('Should successfully create an organization named: randomorg', (done) => {
    chai.request(app)
      .post('/orgs/randomorg')
      .end((err, res) => {
        if (err) throw err
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('Should successfully create a member for randomorg', (done) => {
    chai.request(app)
      .post('/orgs/randomorg/members')
      .send({
        loginName: 'Sneezing Wizard',
        followersAmount: 1000000,
        followingAmount: 1,
      })
      .end((err, res) => {
        if (err) throw err
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object')
        expect(res.body.loginName).to.equal('Sneezing Wizard')
        expect(res.body.followersAmount).to.equal(1000000)
        expect(res.body.followingAmount).to.equal(1)
        done()
      })
  })

  it('Should successfully create a comment for randomorg', (done) => {
    chai.request(app)
      .post('/orgs/randomorg/comments')
      .send({ content: 'Yuhuuu' })
      .end((err, res) => {
        if (err) throw err
        expect(res).to.have.status(201)
        expect(res.body.msg).to.equal('Comment created!')
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('Should get all members from randomorg with array length of 1', (done) => {
    chai.request(app)
      .get('/orgs/randomorg/members')
      .end((err, res) => {
        if (err) throw err
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        expect(res.body).to.have.lengthOf(1)
        done()
      })
  })

  it('Should get all comment from randomorg with array length of 1', (done) => {
    chai.request(app)
      .get('/orgs/randomorg/comments')
      .end((err, res) => {
        if (err) throw err
        expect(res).to.have.status(200)
        expect(res.body).to.be.an('array')
        expect(res.body[0].content).to.equal('Yuhuuu')
        done()
      })
  })

  it('Should delete 1 comment attached to randomorg', (done) => {
    chai.request(app)
      .delete('/orgs/randomorg/comments')
      .end((err, res) => {
        if (err) throw err
        expect(res).to.have.status(200)
        expect(res.body.msg).to.equal('Successfully deleted 1 comments from randomorg organization!')
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it(`Shouldn't show any more comment attached to randomorg`, (done) => {
    chai.request(app)
    .get('/orgs/randomorg/comments')
    .end((err, res) => {
      if (err) throw err
      expect(res).to.have.status(200)
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.lengthOf(0)
      done()
    })
  })
})

describe('A flow where all should return error code:', () => {
  it(`Shouldn't create a new data on an existing organization (randomorg)`, (done) => {
    chai.request(app)
      .post('/orgs/randomorg')
      .end((err, res) => {
        if (err) throw err
        expect(res).to.have.status(400)
        expect(res.body.err).to.equal('Organization already exist!')
        done()
      })
  })

  it(`Shouldn't create a comment on non-existant organization`, (done) => {
    chai.request(app)
      .post('/orgs/nonexistingorg/comments')
      .send({ content: 'Random witty message, cant think of any.' })
      .end((err, res) => {
        if (err) throw err
        expect(res).to.have.status(400)
        expect(res.body.err).to.equal(`Organization couldn't be found.`)
        done()
      })
  })

  it(`Shouldn't create a member on non-existant organization`, (done) => {
    chai.request(app)
      .post('/orgs/nonexistingorg/members')
      .send({ loginName: 'Kaladin Stormbblessed' })
      .end((err, res) => {
        if (err) throw err
        expect(res).to.have.status(400)
        expect(res.body.err).to.equal(`Organization couldn't be found.`)
        done()
      })
  })

  it(`Shouldn't fetch any member on non-existant organization`, (done) => {
    chai.request(app)
      .get('/orgs/nonexistingorg/members')
      .end((err, res) => {
        if (err) throw err
        expect(res).to.have.status(400)
        expect(res.body.err).to.equal(`Organization couldn't be found.`)
        done()
      })
  })

  it(`Shouldn't fetch any comment on non-existing organization`, (done) => {
    chai.request(app)
      .get('/orgs/nonexistingorg/comments')
      .end((err, res) => {
        if (err) throw err
        expect(res).to.have.status(400)
        expect(res.body.err).to.equal(`Organization couldn't be found.`)
        done()
      })
  })
})