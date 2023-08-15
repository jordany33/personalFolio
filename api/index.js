import express from 'express';
import session from 'express-session';

const app = express();
const router = express.Router();
const port = process.env.PORT || 1200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ 
    secret: 'xQN7Ep8NjsZjzy', 
    resave: true, 
    saveUninitialized: true, 
    cookie: { maxAge: 100000, secure: false } 
}));

app.use('/', router); 

// Serve static files
app.use('/', express.static('public')); 
app.use('/fonts', express.static('fonts'));
app.use('/imgs', express.static('imgs'));
app.use('/scripts', express.static('scripts'));

// Routes
router.get('/', (req, res) => {
    res.sendFile('landing.html', { root: '../public' });
});

router.get('/learn-more', (req, res) => {
    res.sendFile('learn-more.html', { root: '../public' });
});

router.get('/projects', (req, res) => {
    res.sendFile('projects.html', { root: '../public' });
});

app.listen(port);
console.log('server running on ' + port);

export default app;