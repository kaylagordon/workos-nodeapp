import express from 'express'
import session from 'express-session'
import { WorkOS } from '@workos-inc/node'

const app = express()
const router = express.Router()

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    })
)

const workos = new WorkOS(process.env.WORKOS_API_KEY)
const clientID = process.env.WORKOS_CLIENT_ID
const organizationID = 'org_01JBA994G94Z719PHEA4WMGXGR'
const redirectURI = 'http://localhost:8000/callback'
const state = ''

router.get('/', async (req, res) => {
    if (session.isloggedin) {
        res.render('login_successful.ejs', {
            profile: (JSON.parse(session.profile).profile)
        })
    } else {
        res.render('index.ejs', { title: 'Home' })
    }
})

router.post('/login', (req, res) => {
    const login_type = req.body.login_method

    const params = {
        clientID,
        redirectURI,
        state,
    }

    if (login_type === 'saml') {
        params.organization = organizationID
    } else {
        params.provider = login_type
    }

    try {
        const url = workos.sso.getAuthorizationURL(params)
        
        res.redirect(url)
    } catch (error) {
        res.render('error.ejs', { error: error })
    }
})

router.get('/callback', async (req, res) => {
    let errorMessage
    try {
        const { code, error } = req.query

        if (error) {
            errorMessage = `Redirect callback error: ${error}`
        } else {
            const profile = await workos.sso.getProfileAndToken({
                code,
                clientID,
            })
            const json_profile = JSON.stringify(profile, null, 4)

            session.first_name = profile.profile.first_name
            session.profile = json_profile
            session.isloggedin = true
        }
    } catch (error) {
        errorMessage = `Error exchanging code for profile: ${error}`
    }

    if (errorMessage) {
        res.render('error.ejs', { error: errorMessage })
    } else {
        res.redirect('/')
    }
})

router.get('/logout', async (req, res) => {
    try {
        session.first_name = null
        session.profile = null
        session.isloggedin = null

        res.redirect('/')
    } catch (error) {
        res.render('error.ejs', { error: error })
    }
})

router.get('/directory', async (req, res) => {
    try {
        const usersFromDirectory = await workos.directorySync.listUsers({
            directory: 'directory_01JBA9A2JR29G6RY3Q3756ANZ2',
        })

        res.render('directory.ejs', {
            users: usersFromDirectory.data,
        })

    } catch (error) {
        res.render('error.ejs', { error: error })
    }
})

export default router
