1. create components folder
2. create Layout folder
3. create 3 files inside Layout folder

- Footer.js
- Layout.js
- Navbar.js

4. rafce to all the above 3 files
5. format Layout folder

```js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
```

6. wrap it app.js in Layout components

```js
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className="w-full min-h-screen bg-[#111111] text-gray-100">
      <Layout>
        <h1>Hello World</h1>
      </Layout>
    </div>
  );
}

export default App;
```

7. Check browser
8. Design Footer from mamba ui
9. Check browser
10. Design Navbar
11. Check browser

---

# Pages

1. create pages for navLinks inside src
2. rafce to all the pages
3. install react router dom
4. import BrowserRouter inside index.js file and wrap it app component with browserRouter
5. wrap all the pages with Layout component
6. go to app.js and import Routes and Route from react-router-dom

```js
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="w-full min-h-screen bg-[#111111] text-gray-100">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
```

7. import Navlinks from the react-router-dom in the navbar file and redirect the elements to the respective pages
