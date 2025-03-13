document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const homeSection = document.getElementById('home');
    const addPostForm = document.getElementById('add-post-form');
    const postsContainer = document.getElementById('posts-container');
    const loginLink = document.getElementById('login-link');
    const signupLink = document.getElementById('signup-link');
    const homeLink = document.getElementById('home-link');
    const addPostButton = document.getElementById('add-post-button');

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

    const showSection = (sectionId) => {
        document.querySelectorAll('.form-section, .home-section').forEach(section => section.style.display = 'none');
        document.getElementById(sectionId).style.display = 'block';
    };

    const saveUsers = () => localStorage.setItem('users', JSON.stringify(users));
    const savePosts = () => localStorage.setItem('posts', JSON.stringify(posts));
    const saveCurrentUser = () => localStorage.setItem('currentUser', JSON.stringify(currentUser));

    const renderPosts = () => {
        postsContainer.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';
            postElement.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                ${post.image ? `<img src="${post.image}" alt="Post Image">` : ''}
                ${post.video ? `<video controls><source src="${post.video}" type="video/mp4"></video>` : ''}
            `;
            postsContainer.appendChild(postElement);
        });
    };

    if (currentUser) {
        showSection('home');
        renderPosts();
    } else {
        showSection('login-form');
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            currentUser = user;
            saveCurrentUser();
            showSection('home');
            renderPosts();
        } else {
            alert('Invalid email or password');
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        if (users.find(u => u.email === email)) {
            alert('Email already registered');
        } else {
            users.push({ username, email, password });
            saveUsers();
            alert('Sign up successful. Please log in.');
            showSection('login-form');
        }
    });

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('home');
        renderPosts();
    });

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('login-form');
    });

    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('signup-form');
    });

    addPostButton.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('add-post-form');
    });

    addPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const image = document.getElementById('post-image').value;
        const video = document.getElementById('post-video').value;
        const newPost = { title, content, image, video };
        posts.push(newPost);
        savePosts();
        showSection('home');
        renderPosts();
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';
        document.getElementById('post-image').value = '';
        document.getElementById('post-video').value = '';
    });
});