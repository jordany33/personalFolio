import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import axios from 'axios';

const app = express();
const router = express.Router();
const port = process.env.PORT || 1200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // request logger

/* NOTE: 
The order of the 2 functions below is critical for the app to work
properly. The session middleware won't be called for any 
requests that get handled by the router if the router is 
initialized before the session data is set.
( if !session, the router will continue as normal )
*/

app.use(session({ secret: 'xQN7Ep8NjsZjzy', resave: true, saveUninitialized: true, cookie: { maxAge: 100000, secure: false } }));
app.use('/', router); /* this is what allows us to specify routes */

// setup all static files (css, html, scripts)
app.use('/', express.static('../public')); 
app.use('/fonts', express.static('../fonts'));
app.use('/imgs', express.static('../imgs'));
app.use('/scripts', express.static('../scripts'));

// get root dir (https://jordany.dev/) & send to index.html
router.get('/', (req, res, next) => {
    res.sendFile('landing.html', { root: '../public' });
});

router.get('/learn-more', (req, res) => {
    res.sendFile('learn-more.html', { root: '../public' });
});

router.get('/projects', (req, res) => {
    res.sendFile('projects.html', { root: '../public' });
});

router.get('/logger', (req, res, next) => {
    if (req.session.views) {
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        req.session.views++;
        res.setHeader('Content-Type', 'text/html');
        res.write('<p>session_id: ' + req.sessionID + '</p>');
        res.write('<p>path: ' + req.path + '</p>');
        res.write('<p>views: ' + req.session.views + '</p>');
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
        res.write('<p>IP: ' + ip + '</p>');
        res.end();
    } else {
        req.session.views = 1;
        res.send('welcome, refresh to start logging!');
    }
    next();
});

app.listen(port);
console.log('server running on ' + port);

export default app;
