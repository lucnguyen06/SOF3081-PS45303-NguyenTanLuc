// Authentication utilities
export const authService = {
  // Lấy user hiện tại
  getCurrentUser() {
    const user = localStorage.getItem('currentUser')
    return user ? JSON.parse(user) : null
  },

  // Đăng nhập
  login(email, password) {
    const users = this.getAllUsers()
    const user = users.find(u => u.email === email && u.password === password)
    
    if (user) {
      const userWithoutPassword = { ...user }
      delete userWithoutPassword.password
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))
      return { success: true, user: userWithoutPassword }
    }
    
    return { success: false, message: 'Email hoặc mật khẩu không đúng' }
  },

  // Đăng ký
  register(userData) {
    const users = this.getAllUsers()
    
    // Kiểm tra email đã tồn tại
    if (users.some(u => u.email === userData.email)) {
      return { success: false, message: 'Email đã được sử dụng' }
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      avatar: userData.avatar || 'https://via.placeholder.com/150',
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    const userWithoutPassword = { ...newUser }
    delete userWithoutPassword.password
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword))

    return { success: true, user: userWithoutPassword }
  },

  // Đăng xuất
  logout() {
    localStorage.removeItem('currentUser')
  },

  // Lấy tất cả users
  getAllUsers() {
    const users = localStorage.getItem('users')
    return users ? JSON.parse(users) : []
  },

  // Cập nhật thông tin user
  updateUser(userId, userData) {
    const users = this.getAllUsers()
    const index = users.findIndex(u => u.id === userId)
    
    if (index !== -1) {
      users[index] = { ...users[index], ...userData }
      localStorage.setItem('users', JSON.stringify(users))
      
      const currentUser = this.getCurrentUser()
      if (currentUser && currentUser.id === userId) {
        const updatedUser = { ...users[index] }
        delete updatedUser.password
        localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      }
      
      return { success: true, user: users[index] }
    }
    
    return { success: false, message: 'Không tìm thấy người dùng' }
  },

  // Kiểm tra đã đăng nhập
  isAuthenticated() {
    return !!this.getCurrentUser()
  }
}

// Post utilities
export const postService = {
  // Lấy tất cả bài viết
  getAllPosts() {
    const posts = localStorage.getItem('posts')
    return posts ? JSON.parse(posts) : []
  },

  // Lấy bài viết theo ID
  getPostById(id) {
    const posts = this.getAllPosts()
    return posts.find(p => p.id === id)
  },

  // Tạo bài viết mới
  createPost(postData) {
    const posts = this.getAllPosts()
    const currentUser = authService.getCurrentUser()

    const newPost = {
      id: Date.now().toString(),
      ...postData,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      createdAt: new Date().toISOString(),
      comments: []
    }

    posts.unshift(newPost)
    localStorage.setItem('posts', JSON.stringify(posts))

    return { success: true, post: newPost }
  },

  // Cập nhật bài viết
  updatePost(id, postData) {
    const posts = this.getAllPosts()
    const index = posts.findIndex(p => p.id === id)

    if (index !== -1) {
      posts[index] = {
        ...posts[index],
        ...postData,
        updatedAt: new Date().toISOString()
      }
      localStorage.setItem('posts', JSON.stringify(posts))
      return { success: true, post: posts[index] }
    }

    return { success: false, message: 'Không tìm thấy bài viết' }
  },

  // Xóa bài viết
  deletePost(id) {
    const posts = this.getAllPosts()
    const filteredPosts = posts.filter(p => p.id !== id)
    localStorage.setItem('posts', JSON.stringify(filteredPosts))
    return { success: true }
  },

  // Lấy bài viết của user
  getPostsByUser(userId) {
    const posts = this.getAllPosts()
    return posts.filter(p => p.authorId === userId)
  }
}

// Comment utilities
export const commentService = {
  // Thêm bình luận
  addComment(postId, commentData) {
    const posts = postService.getAllPosts()
    const postIndex = posts.findIndex(p => p.id === postId)

    if (postIndex !== -1) {
      const currentUser = authService.getCurrentUser()
      
      const newComment = {
        id: Date.now().toString(),
        content: commentData.content,
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorAvatar: currentUser.avatar,
        createdAt: new Date().toISOString()
      }

      if (!posts[postIndex].comments) {
        posts[postIndex].comments = []
      }

      posts[postIndex].comments.unshift(newComment)
      localStorage.setItem('posts', JSON.stringify(posts))

      return { success: true, comment: newComment }
    }

    return { success: false, message: 'Không tìm thấy bài viết' }
  },

  // Xóa bình luận
  deleteComment(postId, commentId) {
    const posts = postService.getAllPosts()
    const postIndex = posts.findIndex(p => p.id === postId)

    if (postIndex !== -1) {
      posts[postIndex].comments = posts[postIndex].comments.filter(c => c.id !== commentId)
      localStorage.setItem('posts', JSON.stringify(posts))
      return { success: true }
    }

    return { success: false, message: 'Không tìm thấy bài viết' }
  }
}

// Initialize sample data
export const initSampleData = () => {
  if (!localStorage.getItem('users')) {
    const sampleUsers = [
      {
        id: '1',
        name: 'Nguyễn Văn A',
        email: 'user@example.com',
        password: '123456',
        avatar: 'https://i.pravatar.cc/150?img=1',
        bio: 'Blogger đam mê công nghệ',
        createdAt: new Date().toISOString()
      }
    ]
    localStorage.setItem('users', JSON.stringify(sampleUsers))
  }

  if (!localStorage.getItem('posts')) {
    const samplePosts = [
      {
        id: '1',
        title: 'Giới thiệu về Vue.js 3',
        content: 'Vue.js 3 là phiên bản mới nhất của framework Vue.js, mang đến nhiều cải tiến về hiệu suất và tính năng. Composition API là một trong những điểm nổi bật nhất, giúp tổ chức code tốt hơn và tái sử dụng logic dễ dàng hơn.',
        image: 'https://picsum.photos/800/400?random=1',
        authorId: '1',
        authorName: 'Nguyễn Văn A',
        authorAvatar: 'https://i.pravatar.cc/150?img=1',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        comments: [
          {
            id: '1',
            content: 'Bài viết rất hữu ích, cảm ơn bạn!',
            authorId: '1',
            authorName: 'Nguyễn Văn A',
            authorAvatar: 'https://i.pravatar.cc/150?img=1',
            createdAt: new Date(Date.now() - 43200000).toISOString()
          }
        ]
      },
      {
        id: '2',
        title: 'Bootstrap 5 - Framework CSS phổ biến',
        content: 'Bootstrap 5 đã loại bỏ jQuery và cải thiện đáng kể về hiệu suất. Với hệ thống grid linh hoạt và các component sẵn có, Bootstrap giúp xây dựng giao diện responsive nhanh chóng.',
        image: 'https://picsum.photos/800/400?random=2',
        authorId: '1',
        authorName: 'Nguyễn Văn A',
        authorAvatar: 'https://i.pravatar.cc/150?img=1',
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        comments: []
      }
    ]
    localStorage.setItem('posts', JSON.stringify(samplePosts))
  }
}
