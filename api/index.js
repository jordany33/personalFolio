import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import path from 'path';

const app = express();
const router = express.Router();
const port = process.env.PORT || 1200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // request logger

app.use(session({ 
    secret: 'xQN7Ep8NjsZjzy', 
    resave: true, 
    saveUninitialized: true, 
    cookie: { maxAge: 100000, secure: false } 
}));

// Serve all static files from the 'public' directory
app.use('/', express.static(path.resolve(__dirname, '../public')));

// Use the router
app.use('/', router);

// Routes
router.get('/', (req, res) => {
    res.sendFile('landing.html', { root: path.resolve(__dirname, '../public') });
});

router.get('/learn-more', (req, res) => {
    res.sendFile('learn-more.html', { root: path.resolve(__dirname, '../public') });
});

router.get('/projects', (req, res) => {
    res.sendFile('projects.html', { root: path.resolve(__dirname, '../public') });
});

// Logger route (you can remove this if not needed)
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
