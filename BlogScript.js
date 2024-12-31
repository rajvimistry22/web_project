document.addEventListener('DOMContentLoaded', function () {
            const createPostBtn = document.getElementById('createPostBtn');
            const createPostModal = document.getElementById('createPostModal');
            const closeModal = document.getElementById('closeModal');
            const postForm = document.getElementById('postForm');
            const postContainer = document.querySelector('.post-container');
            const postDetailModal = document.getElementById('postDetailModal');  
            const closeDetailModal = document.getElementById('closeDetailModal');
            const detailTitle = document.getElementById('detailTitle');
            const detailDate = document.getElementById('detailDate');
            const detailDescription = document.getElementById('detailDescription');
            const commentsList = document.getElementById("commentsList");
            const commentInput = document.getElementById("commentInput");

            // Load posts and comments from localStorage
            loadPosts();
            loadComments();

            createPostBtn.addEventListener('click', function () {
                createPostModal.style.display = 'flex';
            });

            closeModal.addEventListener('click', function () {
                createPostModal.classList.add('fadeOut');
                setTimeout(() => {
                    createPostModal.style.display = 'none';
                    createPostModal.classList.remove('fadeOut');
                }, 500);
            });

            postForm.addEventListener('submit', function (event) {
                event.preventDefault();

                const postCategory = document.getElementById('postCategory').value;
                const postTitle = document.getElementById('postTitle').value;
                const postDescription = document.getElementById('postDescription').value;

                if (postCategory.trim() === '' || postTitle.trim() === '' || postDescription.trim() === '') {
                    alert('Please fill out all fields.');
                    return;
                }

                const currentDate = new Date();
                const day = currentDate.getDate();
                const month = currentDate.toLocaleString('default', { month: 'short' });
                const year = currentDate.getFullYear();
                const formattedDate = `${day} ${month} ${year}`;

                const post = { title: postTitle, category: postCategory, description: postDescription, date: formattedDate };
                savePost(post);
                displayPost(post);

                createPostModal.style.display = 'none';
                postForm.reset();
            });

            function savePost(post) {
                const posts = JSON.parse(localStorage.getItem('posts')) || [];
                posts.push(post);
                localStorage.setItem('posts', JSON.stringify(posts));
            }

            function loadPosts() {
                const posts = JSON.parse(localStorage.getItem('posts')) || [];
                posts.forEach(displayPost);
            }

            function displayPost(post) {
                const newPost = document.createElement('div');
                newPost.className = 'post-box';
                newPost.innerHTML = `
                    <h1 class="post-title" data-title="${post.title}" data-date="${post.date}" data-description="${post.description}">
                        ${post.title}
                    </h1><br>
                    <h2 class="category">${post.category}</h2><br>
                    <span class="post-date">${post.date}</span>
                    <p class="post-description">${post.description.substring(0, 100)}...</p>
                    <button class="delete-post" data-title="${post.title}">Delete</button>
                    <span class="load-more" data-title="${post.title}" data-date="${post.date}" data-description="${post.description}">Load more</span>
                `;
                postContainer.insertBefore(newPost, postContainer.firstChild);
            }

            postContainer.addEventListener('click', function (event) {
                if (event.target.classList.contains('load-more') || event.target.classList.contains('post-title')) {
                    const title = event.target.getAttribute('data-title');
                    const date = event.target.getAttribute('data-date');
                    const description = event.target.getAttribute('data-description');

                    detailTitle.textContent = title;
                    detailDate.textContent = date;
                    detailDescription.textContent = description;

                    postDetailModal.style.display = 'flex';
                }

                if (event.target.classList.contains('delete-post')) {
                    const titleToDelete = event.target.getAttribute('data-title');
                    const posts = JSON.parse(localStorage.getItem('posts')) || [];
                    const updatedPosts = posts.filter(post => post.title !== titleToDelete);
                    localStorage.setItem('posts', JSON.stringify(updatedPosts));

                    const postToDelete = document.querySelector(`.post-title[data-title="${titleToDelete}"]`).closest('.post-box');
                    postToDelete.classList.add('fadeOut');
                    setTimeout(() => {
                        postContainer.removeChild(postToDelete);
                    }, 500);
                }
            });

            document.getElementById("addCommentBtn").addEventListener("click", function () {
                const commentText = commentInput.value.trim();
                if (commentText) {
                    saveComment(commentText);
                    displayComment(commentText);
                    commentInput.value = "";
                }
            });

            function saveComment(commentText) {
                const comments = JSON.parse(localStorage.getItem('comments')) || [];
                comments.push(commentText);
                localStorage.setItem('comments', JSON.stringify(comments));
            }

            function loadComments() {
                const comments = JSON.parse(localStorage.getItem('comments')) || [];
                comments.forEach(displayComment);
            }

            function displayComment(commentText) {
                const comment = document.createElement("p");
                comment.textContent = commentText;
                commentsList.appendChild(comment);
            }

            document.getElementById("searchBar").addEventListener("keyup", function () {
                const query = this.value.toLowerCase();
                const posts = document.querySelectorAll(".post-box");

                posts.forEach((post) => {
                    const title = post.querySelector(".post-title").textContent.toLowerCase();
                    post.style.display = title.includes(query) ? "block" : "none";
                });
            });

            closeDetailModal.addEventListener('click', function () {
                postDetailModal.classList.add('fadeOut');
                setTimeout(() => {
                    postDetailModal.style.display = 'none';
                    postDetailModal.classList.remove('fadeOut');
                }, 500);
            });
        });

        document.addEventListener('DOMContentLoaded', function () {
            const commentsList = document.getElementById("commentsList");
            const commentInput = document.getElementById("commentInput");
        
            // Load existing comments from localStorage
            loadComments();
        
            // Add comment event
            document.getElementById("addCommentBtn").addEventListener("click", function () {
                const commentText = commentInput.value.trim();
                if (commentText) {
                    saveComment(commentText);
                    displayComment(commentText);
                    commentInput.value = ""; // Clear input after adding
                }
            });
        
            // Save comment to localStorage
            function saveComment(commentText) {
                const comments = JSON.parse(localStorage.getItem('comments')) || [];
                comments.push(commentText);
                localStorage.setItem('comments', JSON.stringify(comments));
            }
        
            // Load comments from localStorage and display them
            function loadComments() {
                const comments = JSON.parse(localStorage.getItem('comments')) || [];
                comments.forEach(displayComment);
            }
        
            // Display a comment and its delete button
            function displayComment(commentText) {
                const commentDiv = document.createElement("div");
                commentDiv.classList.add("comment");
        
                const commentPara = document.createElement("p");
                commentPara.textContent = commentText;
        
                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.classList.add("delete-comment");
                deleteBtn.addEventListener('click', function () {
                    deleteComment(commentText, commentDiv);
                });
        
                commentDiv.appendChild(commentPara);
                commentDiv.appendChild(deleteBtn);
                commentsList.appendChild(commentDiv);
            }
        
            // Delete a comment from both DOM and localStorage
            function deleteComment(commentText, commentDiv) {
                const comments = JSON.parse(localStorage.getItem('comments')) || [];
                const updatedComments = comments.filter(comment => comment !== commentText);
                localStorage.setItem('comments', JSON.stringify(updatedComments));
        
                commentDiv.classList.add('fadeOut');
                setTimeout(() => {
                    commentsList.removeChild(commentDiv);
                }, 500);
            }
        
            // Listen for Enter key press in comment input (for faster comment submission)
            commentInput.addEventListener("keydown", function (event) {
                if (event.key === "Enter" && commentInput.value.trim() !== "") {
                    const commentText = commentInput.value.trim();
                    saveComment(commentText);
                    displayComment(commentText);
                    commentInput.value = ""; // Clear input after adding
                    event.preventDefault(); // Prevent form submission on Enter key
                }
            });
        });
                