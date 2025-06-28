import express from "express";
import  bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from 'url';
import multer from "multer"; // Import multer for handling file uploads

const __dirname = dirname(fileURLToPath(import.meta.url));
const upload = multer({ dest: 'public/uploads/' }); // Set the destination for uploaded files to the 'uploads' directory

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port or default to 3000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let posts = []; // Array to store blog posts
let curretDate = new Date(); // Variable to store the current date

// Static posts array
let staticPosts = [ // posts that will be already be there when the user loads the blog page
    {
        id: 1,
        title: "Understanding AI in Everyday Life",
        author: "EversonTheDev",
        category: "Emerging Trends",
        content: "Explore how AI is transforming daily tasks, from smart assistants to personalized recommendations, making life easier and more efficient. Artificial Intelligence has become an integral part of our daily lives, from the moment we wake up to when we go to sleep. Smart assistants like Siri, Alexa, and Google Assistant help us manage our schedules, control our smart homes, and provide instant information. Machine learning algorithms power our social media feeds, showing us content that matches our interests. Recommendation systems on platforms like Netflix, Amazon, and Spotify use AI to suggest products and content we might enjoy. Even our smartphones use AI for features like facial recognition, predictive text, and camera enhancements. As AI technology continues to advance, we can expect even more seamless integration into our everyday routines, making our lives more convenient and efficient.",
        imagePath: "images/blog images/post1.png",
        createdAt: new Date("2025-06-28"),
        comments: []
    },
    {
        id: 2,
        title: "The Rise of Smart Homes",
        author: "EversonTheDev",
        category: "Tech Tips & Hacks",
        content: "Discover the latest in smart home technology, from automated lighting to security systems, and how they enhance comfort and safety in Nigerian homes. Smart home technology is revolutionizing how we live, offering unprecedented levels of convenience, security, and energy efficiency. In Nigerian homes, smart devices are becoming increasingly popular as they provide solutions to common challenges. Smart lighting systems allow homeowners to control their lights remotely, set schedules, and create different moods for different occasions. Security systems with smart cameras and motion sensors provide real-time monitoring and alerts, giving peace of mind whether you're at home or away. Smart thermostats help regulate temperature efficiently, reducing energy costs. Voice-controlled assistants can manage multiple devices simultaneously, from playing music to adjusting the thermostat. As internet connectivity improves across Nigeria, more households are adopting these technologies to create more comfortable, secure, and efficient living spaces.",
        imagePath: "images/blog images/post2.jfif",
        createdAt: new Date("2025-06-28"),
        comments: []
    },
    {
        id: 3,
        title: "Gadgets for Small Businesses",
        author: "EversonTheDev",
        category: "Product Reviews",
        content: "Explore essential gadgets that can boost productivity and efficiency for small businesses in Nigeria, from point-of-sale systems to inventory management tools. Small businesses in Nigeria are increasingly turning to technology to streamline operations and improve customer service. Point-of-sale (POS) systems have revolutionized how businesses handle transactions, offering features like inventory tracking, sales reporting, and multiple payment options. Barcode scanners and label printers help maintain accurate inventory records and reduce manual errors. Digital scales and receipt printers ensure accurate measurements and professional documentation. Mobile payment solutions like Paystack and Flutterwave enable businesses to accept various payment methods, including cards and mobile money. Cloud-based accounting software helps track finances and generate reports without the need for expensive hardware. These gadgets not only improve efficiency but also help small businesses compete with larger enterprises by providing professional-level tools at affordable prices.",
        imagePath: "images/blog images/post3.jfif",
        createdAt: new Date("2025-06-28"),
        comments: []
    }
];

// Middleware to handle file uploads
app.post('/create', upload.single('image'), function (req, res) { // Render create page and handle file upload 
    // req.file is the name of your file in the form above, here 'image'

    const newPost = { // Create a new post object
        title : req.body.title,       // Get the title from the form
        author : req.body.author,     // Get the author from the form
        category : req.body.category,  // Get the category from the form
        content : req.body.content,   // Get the content from the form
        imagePath: req.file ? "uploads/" + req.file.filename : null, // Get the path of the uploaded file
        createdAt: curretDate,         // Add the current date/time
        id : Math.max(...staticPosts.map(p => p.id), ...posts.map(p => p.id), 0) + 1, // Assign a unique ID that doesn't conflict with static posts
        comments: [] // Initialize empty comments array for each post
    };

    posts.push(newPost); // Add the new post to the posts array

    console.log(posts);
    res.redirect(`/?success=true&postId=${newPost.id}`); // Redirect to home page with success parameter after creating a post
});


app.get("/", (req, res) =>{ // render home page
    const success = req.query.success === 'true'; // Check if the success parameter is true
    const postId = req.query.postId; // Get the post ID from the query parameter
    const action = req.query.action; // Get the action parameter (create, delete, etc.)
    
    // Combine static posts with user posts
    const allPosts = [...staticPosts, ...posts];
    
    res.render("home.ejs", 
        { activePage: "home", 
           posts: allPosts,  // Pass the combined posts array to the home page
           date : curretDate, // Pass the current date to the home page
           success: success,
           postId: postId,
           action: action
        }
    ); // Pass the posts array to the home page 
});

app.get("/post/:id", (req, res) =>{ // render post page when the user clicks on a post
    const postId = parseInt(req.params.id); // Get the post ID from the URL
    const success = req.query.success === 'true'; // Check if the success parameter is true

    // Search in both static posts and user posts
    const allPosts = [...staticPosts, ...posts];
    const post = allPosts.find(p => p.id === postId); // Find the post with the given ID

    if (post) {
        // Get recent posts for sidebar (excluding current post)
        const recentPosts = allPosts
            .filter(p => p.id !== postId) // Exclude the current post from the recent posts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort the recent posts by date in descending order
            .slice(0, 3); // Get the first 3 recent posts
            
        res.render("post.ejs", { 
            activePage: "post", 
            post: post,
            recentPosts: recentPosts,
            success: success
        }); // Render the post page with the found post
    } else {
        res.status(404).send("Post not found"); // Send a 404 error if the post is not found
    }
});

// Handle comment submission
app.post("/post/:id/comment", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        const newComment = {
            name: req.body.name,
            email: req.body.email,
            comment: req.body.comment,
            createdAt: new Date()
        };
        
        // Initialize comments array if it doesn't exist
        if (!post.comments) {
            post.comments = [];
        }
        
        post.comments.push(newComment);
        console.log(`Comment added to post ${postId}:`, newComment);
    }
    
    res.redirect(`/post/${postId}`);
});

app.get("/create", (req, res) =>{ // render create page when the user clicks on "Create Blog" in the home page
    res.render("create.ejs", { activePage: "create" });
});

// Edit post route
app.get("/post/:id/edit", (req, res) => {
    const postId = parseInt(req.params.id); // Get the post ID from the URL
    const post = posts.find(p => p.id === postId); // Find the post with the given ID
    
    if (post) {
        res.render("edit.ejs", { 
            activePage: "edit", 
            post: post 
        });
    } else {
        res.status(404).send("Post not found");
    }
});

// Update post route
app.post("/post/:id/update", upload.single('image'), (req, res) => {
    const postId = parseInt(req.params.id); // Get the post ID from the URL
    const postIndex = posts.findIndex(p => p.id === postId); // Find the index of the post with the given ID
    
    if (postIndex !== -1) { // is used to check if the post with the given ID actually exists in the posts array.
        const updatedPost = {
            ...posts[postIndex], // Spread operator to copy the existing post data
            title: req.body.title, // Update the title with the new value from the form (overrides the existing title in the spread operator)
            author: req.body.author, // Update the author with the new value from the form (overrides the existing author in the spread operator)
            category: req.body.category, // Update the category with the new value from the form (overrides the existing category in the spread operator)
            content: req.body.content, // Update the content with the new value from the form (overrides the existing content in the spread operator)
            imagePath: req.file ? "uploads/" + req.file.filename : posts[postIndex].imagePath // Update the image path with the new value from the form (overrides the existing image path in the spread operator)
        };
        
        posts[postIndex] = updatedPost; // Update the post in the posts array with the new post data
        console.log(`Post ${postId} updated:`, updatedPost);
        res.redirect(`/post/${postId}?success=true`); // Redirect to the post page with success parameter
    } else {
        res.status(404).send("Post not found");
    }
});

// Delete post route
app.post("/post/:id/delete", (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex !== -1) {
        posts.splice(postIndex, 1); // Remove the post from the posts array
        console.log(`Post ${postId} deleted`);
        res.redirect("/?success=true&action=delete");
    } else {
        res.status(404).send("Post not found");
    }
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});




