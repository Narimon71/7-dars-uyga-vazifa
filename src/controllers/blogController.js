
const fs = require('fs');

const createBlog = (req, res) => {
  const { title, slug, content, tags } = req.body;

  fs.readFile('database/blog.json', (err, data) => {
    if (err) return res.status(500).send('Database error');
    const blogs = JSON.parse(data);

    const newBlog = {
      id: blogs.length + 1,
      title,
      slug,
      content,
      tags,
      comments: []
    };

    blogs.push(newBlog);
    fs.writeFile('database/blog.json', JSON.stringify(blogs), (err) => {
      if (err) return res.status(500).send('Error saving blog');
      res.status(201).send('Blog created successfully');
    });
  });
};

const getAllBlogs = (req, res) => {
  fs.readFile('database/blog.json', (err, data) => {
    if (err) return res.status(500).send('Database error');
    const blogs = JSON.parse(data);
    res.status(200).json(blogs);
  });
};

const updateBlog = (req, res) => {
  const { id } = req.params;
  const { title, slug, content, tags } = req.body;

  fs.readFile('database/blog.json', (err, data) => {
    if (err) return res.status(500).send('Database error');
    const blogs = JSON.parse(data);

    const blog = blogs.find(b => b.id === parseInt(id));
    if (!blog) return res.status(404).send('Blog not found');

    blog.title = title || blog.title;
    blog.slug = slug || blog.slug;
    blog.content = content || blog.content;
    blog.tags = tags || blog.tags;

    fs.writeFile('database/blog.json', JSON.stringify(blogs), (err) => {
      if (err) return res.status(500).send('Error saving blog');
      res.send('Blog updated successfully');
    });
  });
};

const deleteBlog = (req, res) => {
  const { id } = req.params;

  fs.readFile('database/blog.json', (err, data) => {
    if (err) return res.status(500).send('Database error');
    let blogs = JSON.parse(data);

    const blogIndex = blogs.findIndex(b => b.id === parseInt(id));
    if (blogIndex === -1) return res.status(404).send('Blog not found');

    blogs.splice(blogIndex, 1);
    fs.writeFile('database/blog.json', JSON.stringify(blogs), (err) => {
      if (err) return res.status(500).send('Error deleting blog');
      res.send('Blog deleted successfully');
    });
  });
};

module.exports = { createBlog, getAllBlogs, updateBlog, deleteBlog };
