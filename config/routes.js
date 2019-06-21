import { Router } from 'express'

import OrganizationController from '../controller/organization/OrganizationController'
import MemberController from '../controller/organization/MemberController'
import CommentController from '../controller/organization/CommentController'

const router = new Router()

/* Organization */
router.post('/orgs/:org', OrganizationController.post)

/* Member */
router.post('/orgs/:org/members', MemberController.post)
router.get('/orgs/:org/members', MemberController.getByOrg)

/* Comment */
router.post('/orgs/:org/comments', CommentController.post)
router.get('/orgs/:org/comments', CommentController.get)
router.delete('/orgs/:org/comments', CommentController.softDelete)

export default router